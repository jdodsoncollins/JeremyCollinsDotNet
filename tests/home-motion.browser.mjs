import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "playwright";

// Run against a separately started server, or set BASE_URL to a deployment.
const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const executablePath =
  process.env.CHROMIUM_PATH ??
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
let checks = 0;

async function pageIn(options = {}, saveData = false) {
  const context = await browser.newContext(options);
  await context.addInitScript((saveData) => {
    localStorage.setItem("jeremycollins-theme-era", "modern");
    if (saveData) {
      const connection = new EventTarget();
      connection.saveData = true;
      Object.defineProperty(navigator, "connection", {
        configurable: true,
        value: connection,
      });
    }
  }, saveData);
  const page = await context.newPage();
  page.setDefaultTimeout(3000);
  return { context, page };
}

async function openHome(page, mode = "ready") {
  assert.equal((await page.goto(baseURL)).status(), 200);
  await page.locator(`[data-home-motion="${mode}"]`).waitFor();
}

async function idle(target) {
  await target
    .page()
    .waitForFunction(
      (element) => !element.hasAttribute("data-home-playing"),
      await target.elementHandle(),
      { timeout: 3000 },
    );
}

async function playing(target, kind) {
  await target
    .page()
    .waitForFunction(
      ({ element, kind }) => element.dataset.homePlaying === kind,
      { element: await target.elementHandle(), kind },
      { timeout: 3000 },
    );
}

async function scrollTo(target) {
  await target.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
  );
}

async function assertProjectScroll(project) {
  assert.deepEqual(
    await project.evaluate((article) => ({
      article: article.scrollTop,
      art: article.querySelector("[data-home-artwork]").parentElement.scrollTop,
    })),
    { article: 0, art: 0 },
    "Scrolling artwork into view scrolls inside the project",
  );
}

async function replay(page, project) {
  await idle(project);
  await page.mouse.move(0, 0);
  await project.locator("[data-home-artwork]").hover();
  await playing(project, "project");
}

async function cleanStyles(page) {
  assert.equal(await page.locator("[data-home-playing]").count(), 0);
  const leftovers = await page
    .locator(
      "[data-home-landscape], [data-home-glow], [data-home-artwork], [data-home-artwork] figure, [data-home-light], [data-home-step]",
    )
    .evaluateAll((elements) =>
      elements.flatMap((element) =>
        ["transform", "filter", "opacity", "will-change", "--trail-progress"]
          .filter((property) => element.style.getPropertyValue(property))
          .map((property) => `${element.outerHTML.slice(0, 90)}: ${property}`),
      ),
    );
  assert.deepEqual(leftovers, [], "Disabled motion leaves inline effects");
}

async function stableText(page) {
  return page.locator("main").evaluate((main) => ({
    text: main.innerText.replace(/\s+/g, " ").trim(),
    links: [...main.querySelectorAll("a")].map((link) => [
      link.textContent.replace(/\s+/g, " ").trim(),
      link.getAttribute("href"),
    ]),
  }));
}

try {
  for (const width of [320, 390, 768, 1440]) {
    const { context, page } = await pageIn({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    await openHome(page, "static");
    const copy = await stableText(page);
    assert.equal(
      await page.getByText("Best on iPhone Duo.", { exact: true }).count(),
      2,
    );
    assert.equal(
      await page
        .getByRole("heading", {
          name: "Close your Duo. Make a fold.",
          exact: true,
        })
        .count(),
      1,
    );
    for (const era of ["modern", "1980s", "1990s"]) {
      await page.getByRole("button", { name: "Theme", exact: true }).click();
      await page
        .getByRole("radio", {
          name: `${era === "modern" ? "Modern" : era} theme`,
          exact: true,
        })
        .click();
      await page.keyboard.press("Escape");
      await page.locator('[data-home-motion="static"]').waitFor();
      const scenes = await page
        .locator("[data-home-scene]")
        .evaluateAll((elements) =>
          elements.map((element) => ({
            placement: element.dataset.homeScene,
            hidden: element.getAttribute("aria-hidden"),
            display: getComputedStyle(element).display,
          })),
        );
      assert.deepEqual(scenes.map((scene) => scene.placement).sort(), [
        "floor",
        "middle",
        "projects",
      ]);
      assert.ok(
        scenes.every(
          (scene) =>
            scene.hidden === "true" &&
            (scene.display !== "none") === (era === "modern"),
        ),
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
        `${era}/${width} overflows`,
      );
      assert.deepEqual(
        await stableText(page),
        copy,
        "Era changes alter homepage copy or links",
      );
      await cleanStyles(page);
      checks += 1;
    }
    await context.close();
  }

  for (const width of [390, 1440]) {
    const { context, page } = await pageIn({
      viewport: { width, height: 1000 },
      reducedMotion: "no-preference",
      isMobile: width === 390,
      hasTouch: width === 390,
    });
    await openHome(page);
    const copy = await stableText(page);
    const first = page.locator("[data-home-project]").first();
    await scrollTo(first.locator("[data-home-artwork]"));
    await assertProjectScroll(first);
    await playing(first, "project");
    await idle(first);
    const settled = await first
      .locator("[data-home-artwork]")
      .evaluate((artwork) => ({
        transform: artwork.style.transform,
        filter: artwork.style.filter,
        willChange: artwork.style.willChange,
      }));
    assert.deepEqual(settled, { transform: "", filter: "", willChange: "" });
    await page.waitForTimeout(150);
    assert.equal(
      await first.getAttribute("data-home-playing"),
      null,
      "Project entrance repeats while idle",
    );

    const opening = page.locator('[data-home-scene="projects"]');
    await scrollTo(opening);
    await page.waitForTimeout(100);
    const landscape = opening.locator("[data-home-landscape]");
    const offset = () =>
      landscape.evaluate(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).m42,
      );
    const before = await offset();
    await page.evaluate(() =>
      window.scrollBy({ top: 100, behavior: "instant" }),
    );
    await page.waitForFunction(
      ({ element, before }) =>
        Math.abs(
          new DOMMatrixReadOnly(getComputedStyle(element).transform).m42 -
            before,
        ) > 0.1,
      { element: await landscape.elementHandle(), before },
      { timeout: 3000 },
    );
    const after = await offset();
    assert.ok(Math.abs(before) <= (width === 390 ? 32 : 64) + 0.1);
    assert.ok(Math.abs(after) <= (width === 390 ? 32 : 64) + 0.1);
    await page.waitForTimeout(150);
    assert.equal(
      await offset(),
      after,
      "Scenery moves while scrolling is idle",
    );

    const step = page.locator("[data-home-step]").first();
    await scrollTo(step);
    await playing(step, "step");
    await idle(step);
    assert.equal(
      await step.evaluate((element) =>
        element.style.getPropertyValue("--trail-progress"),
      ),
      "",
    );
    const paired = page.locator("#app-codable");
    await scrollTo(paired.locator("[data-home-artwork]"));
    await assertProjectScroll(paired);
    await playing(paired, "project");
    await idle(paired);
    assert.deepEqual(
      await paired
        .locator("[data-home-artwork] figure")
        .evaluateAll((figures) =>
          figures.map((figure) => ({
            transform: figure.style.transform,
            opacity: figure.style.opacity,
            willChange: figure.style.willChange,
          })),
        ),
      [
        { transform: "", opacity: "", willChange: "" },
        { transform: "", opacity: "", willChange: "" },
      ],
      "Paired artwork leaves transforms after settling",
    );
    assert.deepEqual(
      await stableText(page),
      copy,
      "Motion changes homepage copy or links",
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth),
      width,
    );
    checks += 4;

    if (width === 1440) {
      await scrollTo(first.locator("[data-home-artwork]"));
      await replay(page, first);
      await idle(first);
      await page.waitForTimeout(150);
      assert.equal(
        await first.getAttribute("data-home-playing"),
        null,
        "Hover loops while held",
      );
      await page.mouse.move(0, 0);
      const links = first.locator("a");
      await page.locator("#apps-title").evaluate((element) => {
        element.tabIndex = -1;
        element.focus({ preventScroll: true });
      });
      await links.first().focus();
      await playing(first, "project");
      await idle(first);
      await links.nth(1).focus();
      assert.equal(
        await first.getAttribute("data-home-playing"),
        null,
        "Moving focus within a project replays it",
      );

      await replay(page, first);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.locator('[data-home-motion="static"]').waitFor();
      await cleanStyles(page);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.locator('[data-home-motion="ready"]').waitFor();
      await page.waitForTimeout(150);
      assert.equal(
        await first.getAttribute("data-home-playing"),
        null,
        "Restoring motion replays visible content",
      );

      await replay(page, first);
      await page.mouse.move(0, 0);
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await idle(first);
      await scrollTo(first.locator("[data-home-artwork]"));
      await page.waitForTimeout(150);
      assert.equal(
        await first.getAttribute("data-home-playing"),
        null,
        "Scrolling back replays an entrance",
      );

      await replay(page, first);
      await page.evaluate(() => {
        Object.defineProperty(document, "hidden", {
          configurable: true,
          get: () => true,
        });
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await page.locator('[data-home-motion="static"]').waitFor();
      await cleanStyles(page);
      await page.evaluate(() => {
        delete document.hidden;
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await page.locator('[data-home-motion="ready"]').waitFor();
      await page.waitForTimeout(150);
      assert.equal(
        await first.getAttribute("data-home-playing"),
        null,
        "Returning to the tab replays content",
      );
      checks += 5;
    }
    await context.close();
  }

  const saved = await pageIn({ viewport: { width: 1440, height: 1000 } }, true);
  await openHome(saved.page, "static");
  const project = saved.page.locator("[data-home-project]").first();
  await scrollTo(project.locator("[data-home-artwork]"));
  await project.locator("[data-home-artwork]").hover();
  await saved.page.waitForTimeout(150);
  await cleanStyles(saved.page);
  await saved.page.evaluate(() => {
    navigator.connection.saveData = false;
    navigator.connection.dispatchEvent(new Event("change"));
  });
  await saved.page.locator('[data-home-motion="ready"]').waitFor();
  await saved.page.waitForTimeout(150);
  assert.equal(
    await project.getAttribute("data-home-playing"),
    null,
    "Disabling Save-Data replays visited content",
  );
  await saved.context.close();
  checks += 1;

  const plain = await pageIn({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  assert.equal((await plain.page.goto(baseURL)).status(), 200);
  for (const selector of [
    "h1",
    "#apps-title",
    "[data-home-project] h4",
    "#about-title",
  ]) {
    for (const target of await plain.page.locator(selector).all())
      assert.ok(
        await target.isVisible(),
        `${selector} needs JavaScript to be visible`,
      );
  }
  assert.equal(await plain.page.locator("[data-home-project]").count(), 4);
  await cleanStyles(plain.page);
  await plain.context.close();
  checks += 1;

  const other = await pageIn({ reducedMotion: "no-preference" });
  for (const app of ["codable", "taktung", "tabforge", "paper-and-grain"]) {
    for (const suffix of ["", "/privacy"]) {
      assert.equal(
        (
          await other.page.goto(new URL(`/${app}${suffix}`, baseURL).href)
        ).status(),
        200,
      );
      assert.equal(
        await other.page
          .locator(
            "[data-home-page], [data-home-scene], [data-home-motion], [data-home-playing]",
          )
          .count(),
        0,
      );
      checks += 1;
    }
  }
  await other.context.close();
  console.log(`Homepage motion: ${checks} browser checks passed.`);
} finally {
  await browser.close();
}
