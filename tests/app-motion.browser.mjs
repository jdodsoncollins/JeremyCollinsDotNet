import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "playwright";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const apps = ["codable", "taktung", "tabforge", "paper-and-grain"];
const executablePath =
  process.env.CHROMIUM_PATH ??
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox"],
});
let checks = 0;

async function pageIn(context) {
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.motionStarts = [];
    document.addEventListener("animationstart", (event) => {
      const root = event.target.closest("[data-app-page]");
      if (!root) return;
      const style = getComputedStyle(event.target, event.pseudoElement || null);
      window.motionStarts.push({
        target: event.target.closest("[data-app-motion]")?.dataset.appMotion,
        name: event.animationName,
        iterations: style.animationIterationCount,
        duration: style.animationDuration,
      });
    });
  });
  return page;
}

async function openApp(page, app) {
  assert.equal(
    (await page.goto(new URL(`/${app}`, baseURL).href)).status(),
    200,
  );
  await page.waitForSelector("[data-app-motion-ready]");
}

async function idle(page) {
  await page.waitForFunction(
    () => !document.querySelector("[data-motion-active]"),
    undefined,
    { timeout: 4000 },
  );
}

async function replay(page, target) {
  await idle(page);
  await page.mouse.move(0, 0);
  await target.hover();
  await page.waitForFunction(
    (element) => element.hasAttribute("data-motion-active"),
    await target.elementHandle(),
  );
}

try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "no-preference",
      isMobile: width === 390,
      hasTouch: width === 390,
    });
    const page = await pageIn(context);
    for (const app of apps) {
      await openApp(page, app);
      for (const target of await page.locator("[data-app-motion]").all()) {
        const name = await target.getAttribute("data-app-motion");
        await target.scrollIntoViewIfNeeded();
        await page.waitForFunction(
          (name) => window.motionStarts.some((event) => event.target === name),
          name,
        );
        const starts = await page.evaluate(
          (name) =>
            window.motionStarts.filter((event) => event.target === name),
          name,
        );
        assert.ok(
          starts.every((event) =>
            event.iterations.split(", ").every((count) => count === "1"),
          ),
          `${app}/${name} loops`,
        );
        assert.ok(
          starts.every((event) =>
            event.duration
              .split(", ")
              .every((duration) => parseFloat(duration) <= 1.4),
          ),
          `${app}/${name} is too long`,
        );
        await idle(page);
        assert.equal(
          await target.evaluate(
            (element) =>
              element
                .getAnimations({ subtree: true })
                .filter((animation) => animation.playState === "running")
                .length,
          ),
          0,
        );
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth),
          width,
          `${app}/${width} overflows`,
        );
        checks += 1;
      }
    }
    await context.close();
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const page = await pageIn(context);
  for (const app of apps) {
    await openApp(page, app);
    const target = page.locator("[data-app-motion]").first();
    await replay(page, target);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForSelector('[data-reduced-motion="true"]');
    await idle(page);
    assert.equal(
      await page
        .locator("[data-app-page]")
        .evaluate((element) => element.getAnimations({ subtree: true }).length),
      0,
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.waitForSelector('[data-reduced-motion="false"]');
    assert.equal(
      await target.getAttribute("data-motion-active"),
      null,
      "Preference change replays an entrance",
    );

    await replay(page, target);
    await page.mouse.move(0, 0);
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
    );
    await page.waitForFunction(
      (element) => !element.hasAttribute("data-motion-active"),
      await target.elementHandle(),
    );
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(100);
    assert.equal(
      await target.getAttribute("data-motion-active"),
      null,
      "Scrolling back replays an entrance",
    );

    await replay(page, target);
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        get: () => true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await idle(page);
    assert.equal(
      await target.evaluate(
        (element) => element.getAnimations({ subtree: true }).length,
      ),
      0,
    );
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    checks += 3;
  }
  await context.close();

  for (const preference of ["reduce", "no-preference"]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 900 },
      reducedMotion: preference,
    });
    const page = await pageIn(context);
    for (const app of apps) {
      await openApp(page, app);
      if (preference === "reduce") {
        for (const target of await page.locator("[data-app-motion]").all()) {
          await target.scrollIntoViewIfNeeded();
          await target.hover();
          assert.equal(
            await target.evaluate(
              (element) => element.getAnimations({ subtree: true }).length,
            ),
            0,
          );
        }
        assert.deepEqual(await page.evaluate(() => window.motionStarts), []);
        checks += 1;
      }
      await page.goto(new URL(`/${app}/privacy`, baseURL).href);
      await page.locator("article").waitFor();
      assert.equal(
        await page.locator("[data-app-page], [data-app-motion]").count(),
        0,
      );
      const links = page.locator("[data-app-document] a");
      await links.last().hover();
      await links.first().focus();
      const moving = await page
        .locator("[data-app-document]")
        .evaluate((root) =>
          [root, ...root.querySelectorAll("*")]
            .flatMap((element) =>
              [null, "::before", "::after"].map((pseudo) => {
                const style = getComputedStyle(element, pseudo);
                return {
                  animation: style.animationName,
                  transition: style.transitionDuration,
                };
              }),
            )
            .filter(
              (style) =>
                style.animation !== "none" ||
                style.transition
                  .split(", ")
                  .some((duration) => parseFloat(duration) !== 0),
            ),
        );
      assert.deepEqual(moving, [], `${app}/privacy contains motion`);
      assert.equal(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollBehavior,
        ),
        "auto",
      );
      assert.equal(
        await page.evaluate(() => document.getAnimations().length),
        0,
      );
      checks += 1;
    }

    await openApp(page, "codable");
    const elements = page.getByRole("tab", { name: /Elements/ });
    await elements.focus();
    for (const [key, name, title] of [
      ["ArrowRight", "Console", "Run JavaScript in context"],
      ["End", "Scratchpad", "Write and run JavaScript"],
      ["Home", "Elements", "Inspect and edit the live page"],
    ]) {
      await page.keyboard.press(key);
      const tab = page.getByRole("tab", { name: new RegExp(name) });
      assert.equal(await tab.getAttribute("aria-selected"), "true");
      assert.ok(
        await tab.evaluate((element) => element === document.activeElement),
      );
      assert.equal(
        await page.getByRole("tabpanel").getByRole("heading").textContent(),
        title,
      );
    }
    if (preference === "reduce")
      assert.equal(
        await page
          .getByRole("tabpanel")
          .evaluate(
            (element) => element.getAnimations({ subtree: true }).length,
          ),
        0,
      );
    else {
      assert.ok(
        await page.evaluate(() =>
          window.motionStarts.some((event) =>
            event.name.includes("codable-tool"),
          ),
        ),
      );
      await page.waitForFunction(
        () => !document.querySelector('[data-tool-transition="true"]'),
      );
      await page.keyboard.press("ArrowRight");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(
        () => !document.querySelector('[data-tool-transition="true"]'),
      );
      await page.emulateMedia({ reducedMotion: "no-preference" });
      assert.equal(
        await page
          .getByRole("tabpanel")
          .evaluate(
            (element) => element.getAnimations({ subtree: true }).length,
          ),
        0,
        "Completed tool feedback replays after a preference change",
      );
      checks += 1;
    }
    checks += 1;
    await context.close();
  }

  const galleryContext = await browser.newContext({
    reducedMotion: "no-preference",
  });
  const galleryPage = await galleryContext.newPage();
  for (const app of ["tabforge", "paper-and-grain"]) {
    await galleryPage.emulateMedia({ reducedMotion: "no-preference" });
    await openApp(galleryPage, app);
    const gallery = galleryPage.locator('[data-app-gallery="duo"]');
    const rail = gallery.getByRole("region");
    await rail.evaluate((element) => {
      const original = element.scrollTo.bind(element);
      element.motionScrolls = [];
      element.scrollTo = (options) => {
        element.motionScrolls.push(options.behavior);
        original(options);
      };
    });
    await gallery
      .getByRole("button", { name: "Next screenshots", exact: true })
      .click();
    await galleryPage.emulateMedia({ reducedMotion: "reduce" });
    await galleryPage.waitForFunction(
      () =>
        document
          .querySelector('[data-app-gallery="duo"] [role="region"]')
          .motionScrolls.at(-1) === "instant",
    );
    assert.ok(
      await rail.evaluate((element) =>
        element.motionScrolls.includes("smooth"),
      ),
    );
    checks += 1;
  }
  await galleryContext.close();

  const staticContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  const staticPage = await staticContext.newPage();
  for (const app of apps) {
    assert.equal(
      (await staticPage.goto(new URL(`/${app}`, baseURL).href)).status(),
      200,
    );
    assert.ok(await staticPage.locator("h1").isVisible());
    for (const target of await staticPage.locator("[data-app-motion]").all())
      assert.ok(await target.isVisible());
    assert.equal(await staticPage.locator("[data-motion-active]").count(), 0);
    checks += 1;
  }
  await staticContext.close();
  console.log(`App motion browser checks passed: ${checks}`);
} finally {
  await browser.close();
}
