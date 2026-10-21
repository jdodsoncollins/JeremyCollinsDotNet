import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "playwright";

// Run against a separately started production server, or set BASE_URL to a deployment.
const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const executablePath =
  process.env.CHROMIUM_PATH ??
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox"],
});
let checks = 0;

try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    assert.equal((await page.goto(baseURL)).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const eraFonts = new Set();
    for (const era of ["modern", "1980s", "1990s"]) {
      await page.getByRole("button", { name: "Theme", exact: true }).click();
      await page
        .getByRole("radio", {
          name: `${era === "modern" ? "Modern" : era} theme`,
          exact: true,
        })
        .click();
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
        `Theme panel overflow: ${era}/${width}`,
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page
          .getByRole("button", { name: "Theme", exact: true })
          .getAttribute("aria-expanded"),
        "false",
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
        `Page overflow: ${era}/${width}`,
      );
      eraFonts.add(
        await page
          .locator("h1")
          .evaluate((node) => getComputedStyle(node).fontFamily),
      );
      const linkHeights = await page
        .locator("#projects article h3 a")
        .evaluateAll((links) =>
          links.map((link) => link.getBoundingClientRect().height),
        );
      assert.ok(
        linkHeights.every((height) => height >= 44),
        `Small app title target: ${era}/${width}`,
      );
      if (era === "modern" && width <= 390) {
        const heroBottom = await page
          .locator(".hero-section")
          .evaluate((node) => node.getBoundingClientRect().bottom);
        assert.ok(
          heroBottom < 820,
          `Mobile hero is too tall: ${width}/${heroBottom}`,
        );
      }
      checks += 1;
    }
    assert.equal(
      eraFonts.size,
      3,
      "Homepage eras should retain distinct typography",
    );
    for (const id of ["app-tabforge", "app-paper"]) {
      const project = page.locator(`#${id}`);
      await project.scrollIntoViewIfNeeded();
      assert.equal(
        await project.getByText("Best on iPhone Duo.", { exact: true }).count(),
        1,
      );
      if (id === "app-tabforge") {
        const video = project.getByLabel("TabForge app overview", { exact: true });
        await video.scrollIntoViewIfNeeded();
        assert.ok(await video.evaluate((video) => video.paused), "Reduced motion must not autoplay the overview");
        await video.evaluate((video) => video.play());
        assert.equal(await video.evaluate((video) => video.duration), 15);
        await video.evaluate((video) => video.pause());
      } else {
        const image = project.locator('figure[data-device="iPhone Duo"] img');
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((image) => image.decode());
        assert.ok(await image.evaluate((image) => image.naturalWidth > 0));
      }
      checks += 1;
    }
    assert.deepEqual(errors, []);
    await context.close();
  }

  for (const era of ["modern", "1990s"]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    await context.addInitScript(
      (era) => localStorage.setItem("jeremycollins-theme-era", era),
      era,
    );
    const page = await context.newPage();
    const sheets = [];
    page.on("request", (request) => {
      if (/hero-.*-(idle|petting|interaction)\.webp/.test(request.url()))
        sheets.push(request.url());
    });
    await page.goto(baseURL);
    const art = page.locator(`.hero-art-${era}`);
    await page.waitForFunction(
      (era) =>
        document.querySelector(`.hero-art-${era}`)?.dataset.playback === "held",
      era,
      { timeout: 20000 },
    );
    const initial = await art.getAttribute("data-frame");
    await page.waitForTimeout(500);
    assert.equal(
      await art.getAttribute("data-frame"),
      initial,
      `${era} repeats while idle`,
    );
    assert.equal(await page.getByRole("button", { name: /pause/i }).count(), 0);
    await page.mouse.move(4, 4);
    await art.hover();
    await page.waitForFunction(
      (era) =>
        document.querySelector(`.hero-art-${era}`)?.dataset.playback ===
        "hover",
      era,
    );
    await page.waitForFunction(
      (era) =>
        document.querySelector(`.hero-art-${era}`)?.dataset.playback === "held",
      era,
    );
    const hovered = await art.getAttribute("data-frame");
    await page.waitForTimeout(500);
    assert.equal(
      await art.getAttribute("data-frame"),
      hovered,
      `${era} repeats while hovered`,
    );
    await page.mouse.move(4, 4);
    await page.evaluate(() =>
      window.scrollBy({ top: 72, behavior: "instant" }),
    );
    await page.waitForFunction(
      ({ era, previous }) =>
        document.querySelector(`.hero-art-${era}`)?.dataset.frame !== previous,
      { era, previous: hovered },
    );
    const scrolled = await art.getAttribute("data-frame");
    await page.waitForTimeout(500);
    assert.equal(
      await art.getAttribute("data-frame"),
      scrolled,
      `${era} repeats after scrolling stops`,
    );
    if (era === "1990s") {
      const retroSheet = sheets.find((url) =>
        /hero-1990s-v\d+-interaction\.webp/.test(url),
      );
      assert.ok(retroSheet, "Retro animation sheet never loaded");
      const artwork = await page.evaluate(async (source) => {
        const image = new Image();
        image.src = source;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = 320;
        canvas.height = 280;
        const context = canvas.getContext("2d");
        const fragments = [];
        for (let frame = 0; frame < 6; frame++) {
          context.clearRect(0, 0, 320, 280);
          context.drawImage(
            image,
            (frame % 3) * 320,
            Math.floor(frame / 3) * 280,
            320,
            280,
            0,
            0,
            320,
            280,
          );
          const pixels = context.getImageData(0, 0, 320, 280).data;
          const visited = new Uint8Array(320 * 280);
          for (let start = 0; start < visited.length; start++) {
            if (visited[start] || pixels[start * 4 + 3] < 16) continue;
            const component = [start];
            visited[start] = 1;
            let left = start % 320;
            for (let head = 0; head < component.length; head++) {
              const index = component[head];
              const x = index % 320;
              const y = Math.floor(index / 320);
              left = Math.min(left, x);
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const nx = x + dx;
                  const ny = y + dy;
                  if (nx < 0 || nx >= 320 || ny < 0 || ny >= 280) continue;
                  const neighbor = ny * 320 + nx;
                  if (!visited[neighbor] && pixels[neighbor * 4 + 3] >= 16) {
                    visited[neighbor] = 1;
                    component.push(neighbor);
                  }
                }
              }
            }
            if (
              left >= 210 &&
              component.length >= 24 &&
              component.length <= 128
            ) {
              fragments.push({ frame, pixels: component.length });
            }
          }
        }
        return {
          dimensions: [image.naturalWidth, image.naturalHeight],
          fragments,
        };
      }, retroSheet);
      assert.deepEqual(
        artwork.dimensions,
        [960, 560],
        "Retro sheet no longer matches its six native cells",
      );
      assert.deepEqual(
        artwork.fragments,
        [],
        "Retro cat has detached artwork fragments",
      );
      checks += 6;
      assert.ok(
        sheets.every((url) => !/idle\.webp/.test(url)),
        "Retro downloaded an unused idle sheet",
      );
    } else {
      assert.ok(
        sheets.some((url) => /idle\.webp/.test(url)),
        "Modern stable body reference never loaded",
      );
    }
    checks += 1;
    await context.close();
  }

  for (const saveData of [false, true]) {
    const context = await browser.newContext({
      reducedMotion: saveData ? "no-preference" : "reduce",
    });
    if (saveData)
      await context.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          configurable: true,
          value: {
            saveData: true,
            addEventListener() {},
            removeEventListener() {},
          },
        }),
      );
    const page = await context.newPage();
    const sheets = [];
    page.on("request", (request) => {
      if (/hero-modern-v3-(idle|petting)\.webp/.test(request.url()))
        sheets.push(request.url());
    });
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    assert.deepEqual(
      sheets,
      [],
      `${saveData ? "Save-Data" : "Reduced motion"} downloaded animation sheets`,
    );
    assert.equal(
      await page.locator(".hero-art-modern").getAttribute("data-ready"),
      null,
    );
    checks += 1;
    await context.close();
  }

  const page = await browser.newPage();
  for (const route of [
    "/tabforge",
    "/paper-and-grain",
    "/codable",
    "/taktung",
    "/resume",
    "/paper-and-grain/support",
  ]) {
    assert.equal(
      (await page.goto(new URL(route, baseURL).href)).status(),
      200,
      route,
    );
    assert.equal(await page.locator("h1").count(), 1, route);
    checks += 1;
  }
  const appAppearances = new Map();
  for (const [app, title] of [
    ["codable", "Codable"],
    ["taktung", "Taktung"],
    ["tabforge", "TabForge"],
    ["paper-and-grain", "Paper & Grain"],
  ]) {
    const path = `/${app}/privacy`;
    await page.goto(new URL(`/${app}`, baseURL).href);
    appAppearances.set(
      app,
      await page.locator("main").evaluate((main) => ({
        background: getComputedStyle(main.parentElement).backgroundColor,
        font: getComputedStyle(main.querySelector("p")).fontFamily,
        headingFont: getComputedStyle(main.querySelector("h1")).fontFamily,
      })),
    );
    await page.locator(`footer a[href="${path}"]`).click();
    await page.waitForURL(new URL(path, baseURL).href);
    assert.equal(new URL(page.url()).pathname, path);
    assert.equal(
      (await page.locator("h1").textContent()).trim(),
      `${title} Privacy Policy`,
    );
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      `https://jeremycollins.net${path}`,
    );
    assert.equal(
      await page.locator('meta[property="og:url"]').getAttribute("content"),
      `https://jeremycollins.net${path}`,
    );
    const schema = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    assert.ok(
      schema.some(
        (json) => JSON.parse(json).url === `https://jeremycollins.net${path}`,
      ),
      `${app} privacy schema URL`,
    );
    const legacyPaths = [
      `/${app}-privacy-policy`,
      ...(app === "taktung" ? ["/takt-privacy-policy"] : []),
    ];
    for (const legacyPath of legacyPaths) {
      for (const method of ["GET", "HEAD"]) {
        const response = await page.request.fetch(
          new URL(`${legacyPath}?from=legacy`, baseURL).href,
          { method, maxRedirects: 0 },
        );
        assert.equal(response.status(), 308, `${method} ${legacyPath}`);
        const destination = new URL(response.headers().location, baseURL);
        assert.equal(
          destination.pathname,
          path,
          `${legacyPath} should redirect directly`,
        );
        assert.equal(destination.search, "?from=legacy");
      }
    }
    assert.equal(
      (
        await page.request.get(new URL(path, baseURL).href, { maxRedirects: 0 })
      ).status(),
      200,
    );
    checks += 1;
  }
  const sitemap = await (
    await page.request.get(new URL("/sitemap.xml", baseURL).href)
  ).text();
  assert.doesNotMatch(sitemap, /-privacy-policy/);
  for (const app of ["codable", "taktung", "tabforge", "paper-and-grain"]) {
    assert.ok(sitemap.includes(`https://jeremycollins.net/${app}/privacy`));
  }
  for (const { width, era } of [
    { width: 320, era: "1980s" },
    { width: 390, era: "modern" },
    { width: 1440, era: "1990s" },
  ]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    await context.addInitScript(
      (era) => localStorage.setItem("jeremycollins-theme-era", era),
      era,
    );
    const page = await context.newPage();
    for (const [app, expected] of appAppearances) {
      await page.goto(new URL(`/${app}/privacy`, baseURL).href);
      const appearance = await page.locator("article").evaluate((article) => ({
        background: getComputedStyle(article.closest("main").parentElement)
          .backgroundColor,
        font: getComputedStyle(article.querySelector("p")).fontFamily,
        headingFont: getComputedStyle(document.querySelector("h1")).fontFamily,
        articleBackground: getComputedStyle(article).backgroundColor,
        backdrop: getComputedStyle(article).backdropFilter,
        shadow: getComputedStyle(article).boxShadow,
        bodySize: parseFloat(
          getComputedStyle(article.querySelector("p")).fontSize,
        ),
      }));
      assert.equal(
        appearance.background,
        expected.background,
        `${app}: privacy palette differs from its app`,
      );
      assert.equal(
        appearance.font,
        expected.font,
        `${app}: body typography differs from its app`,
      );
      assert.equal(
        appearance.headingFont,
        expected.headingFont,
        `${app}: heading typography differs from its app`,
      );
      assert.equal(
        appearance.articleBackground,
        "rgba(0, 0, 0, 0)",
        `${app}: legacy panel remains`,
      );
      assert.equal(appearance.backdrop, "none");
      assert.equal(appearance.shadow, "none");
      assert.ok(appearance.bodySize >= 16, `${app}: policy text too small`);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
        `${app}/privacy overflow: ${era}/${width}`,
      );
      assert.equal(
        await page.locator(".hacf-scanlines, .hacf-grain").count(),
        0,
      );
      await page
        .getByRole("link", {
          name: `Back to ${app === "paper-and-grain" ? "Paper & Grain" : app === "tabforge" ? "TabForge" : app === "taktung" ? "Taktung" : "Codable"}`,
          exact: true,
        })
        .click();
      await page.waitForURL(new URL(`/${app}`, baseURL).href);
      checks += 1;
    }
    for (const route of ["/resume", "/this-page-does-not-exist"]) {
      assert.equal(
        (await page.goto(new URL(route, baseURL).href)).status(),
        route === "/resume" ? 200 : 404,
      );
      const shell = page.locator("[data-site-page]");
      assert.equal(
        await shell.evaluate((node) => getComputedStyle(node).backgroundColor),
        "rgb(32, 54, 44)",
      );
      assert.equal(
        await shell
          .locator("header")
          .first()
          .evaluate((node) => getComputedStyle(node).position),
        "static",
      );
      assert.equal(
        await page
          .getByRole("link", { name: "Projects", exact: true })
          .getAttribute("href"),
        "/#projects",
      );
      assert.equal(
        await page
          .getByRole("link", { name: "About", exact: true })
          .getAttribute("href"),
        "/#about",
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
        `${route} overflow: ${era}/${width}`,
      );
      assert.equal(
        await page.locator(".hacf-scanlines, .hacf-grain").count(),
        0,
      );
      if (route === "/resume") {
        await page.emulateMedia({ media: "print" });
        assert.equal(await shell.locator("header").first().isVisible(), false);
        assert.equal(await page.locator("[data-resume-pdf]").isVisible(), true);
        await page.emulateMedia({ media: "screen" });
      }
      checks += 1;
    }
    await context.close();
  }
  for (const width of [320, 390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const route of ["/tabforge", "/paper-and-grain"]) {
      await page.goto(new URL(route, baseURL).href);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
        `${route} overflows at ${width}`,
      );
      await page
        .locator("[data-duo-hero] img")
        .evaluate((image) => image.decode());
      assert.equal(
        await page.getByText("Best on iPhone Duo.", { exact: true }).count(),
        1,
      );
      const gallery = page.locator('[data-app-gallery="duo"]');
      assert.equal(
        await gallery.locator('figure[data-device="iPhone Duo"]').count(),
        3,
      );
      await gallery
        .getByRole("button", { name: "Next screenshots", exact: true })
        .click();
      await page.waitForFunction(() =>
        document
          .querySelector('[data-app-gallery="duo"]')
          ?.textContent.includes("2 of 3"),
      );
      const rail = gallery.getByRole("region");
      await rail.focus();
      await page.keyboard.press("ArrowRight");
      await page.waitForFunction(() =>
        document
          .querySelector('[data-app-gallery="duo"]')
          ?.textContent.includes("3 of 3"),
      );
      await gallery
        .locator('figure[data-device="iPhone Duo"] img')
        .nth(2)
        .evaluate((image) => image.decode());
      assert.equal(
        await page.locator('[data-app-gallery="gallery"] figure').count(),
        route === "/tabforge" ? 6 : 4,
      );
      checks += 1;
    }
    await context.close();
  }
  console.log(`Portfolio browser checks passed: ${checks}`);
} finally {
  await browser.close();
}
