import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "playwright";

// Run against a separately started production server, or set BASE_URL to a deployment.
const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const executablePath = process.env.CHROMIUM_PATH ?? (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
let checks = 0;

try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    assert.equal((await page.goto(baseURL)).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    for (const era of ["modern", "1980s", "1990s"]) {
      await page.getByRole("button", { name: "Theme", exact: true }).click();
      await page.getByRole("radio", { name: `${era === "modern" ? "Modern" : era} theme`, exact: true }).click();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, `Theme panel overflow: ${era}/${width}`);
      await page.keyboard.press("Escape");
      assert.equal(await page.getByRole("button", { name: "Theme", exact: true }).getAttribute("aria-expanded"), "false");
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, `Page overflow: ${era}/${width}`);
      const linkHeights = await page.locator('#projects article h3 a').evaluateAll(links => links.map(link => link.getBoundingClientRect().height));
      assert.ok(linkHeights.every(height => height >= 44), `Small app title target: ${era}/${width}`);
      if (era === "modern" && width <= 390) {
        const heroBottom = await page.locator(".hero-section").evaluate(node => node.getBoundingClientRect().bottom);
        assert.ok(heroBottom < 820, `Mobile hero is too tall: ${width}/${heroBottom}`);
      }
      checks += 1;
    }
    for (const id of ["app-tabforge", "app-paper"]) {
      const project = page.locator(`#${id}`);
      await project.scrollIntoViewIfNeeded();
      assert.equal(await project.getByText("Best on iPhone Duo.", { exact: true }).count(), 1);
      const image = project.locator('figure[data-device="iPhone Duo"] img');
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode());
      assert.ok(await image.evaluate(image => image.naturalWidth > 0));
      checks += 1;
    }
    assert.deepEqual(errors, []);
    await context.close();
  }

  for (const era of ["modern", "1990s"]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.addInitScript(era => localStorage.setItem("jeremycollins-theme-era", era), era);
    const page = await context.newPage();
    await page.goto(baseURL);
    const art = page.locator(`.hero-art-${era}`);
    await page.waitForFunction(era => document.querySelector(`.hero-art-${era}`)?.dataset.playback === "held", era, { timeout: 20000 });
    const initial = await art.getAttribute("data-frame");
    await page.waitForTimeout(500);
    assert.equal(await art.getAttribute("data-frame"), initial, `${era} repeats while idle`);
    assert.equal(await page.getByRole("button", { name: /pause/i }).count(), 0);
    await page.mouse.move(4, 4);
    await art.hover();
    await page.waitForFunction(era => document.querySelector(`.hero-art-${era}`)?.dataset.playback === "hover", era);
    await page.waitForFunction(era => document.querySelector(`.hero-art-${era}`)?.dataset.playback === "held", era);
    const hovered = await art.getAttribute("data-frame");
    await page.waitForTimeout(500);
    assert.equal(await art.getAttribute("data-frame"), hovered, `${era} repeats while hovered`);
    await page.mouse.move(4, 4);
    await page.evaluate(() => window.scrollBy({ top: 72, behavior: "instant" }));
    await page.waitForFunction(({ era, previous }) => document.querySelector(`.hero-art-${era}`)?.dataset.frame !== previous, { era, previous: hovered });
    const scrolled = await art.getAttribute("data-frame");
    await page.waitForTimeout(500);
    assert.equal(await art.getAttribute("data-frame"), scrolled, `${era} repeats after scrolling stops`);
    checks += 1;
    await context.close();
  }

  for (const saveData of [false, true]) {
    const context = await browser.newContext({ reducedMotion: saveData ? "no-preference" : "reduce" });
    if (saveData) await context.addInitScript(() => Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true, addEventListener() {}, removeEventListener() {} } }));
    const page = await context.newPage();
    const sheets = [];
    page.on("request", request => { if (/hero-modern-v3-(idle|petting)\.webp/.test(request.url())) sheets.push(request.url()); });
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    assert.deepEqual(sheets, [], `${saveData ? "Save-Data" : "Reduced motion"} downloaded animation sheets`);
    assert.equal(await page.locator(".hero-art-modern").getAttribute("data-ready"), null);
    checks += 1;
    await context.close();
  }

  const page = await browser.newPage();
  for (const route of ["/tabforge", "/paper-and-grain", "/codable", "/taktung", "/resume", "/tabforge-privacy-policy", "/paper-and-grain/support"]) {
    assert.equal((await page.goto(new URL(route, baseURL).href)).status(), 200, route);
    assert.equal(await page.locator("h1").count(), 1, route);
    checks += 1;
  }
  for (const width of [320, 390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    for (const route of ["/tabforge", "/paper-and-grain"]) {
      await page.goto(new URL(route, baseURL).href);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, `${route} overflows at ${width}`);
      await page.locator('[data-duo-hero] img').evaluate(image => image.decode());
      assert.equal(await page.getByText("Best on iPhone Duo.", { exact: true }).count(), 1);
      const gallery = page.locator('[data-app-gallery="duo"]');
      assert.equal(await gallery.locator('figure[data-device="iPhone Duo"]').count(), 3);
      await gallery.getByRole("button", { name: "Next screenshots", exact: true }).click();
      await page.waitForFunction(() => document.querySelector('[data-app-gallery="duo"]')?.textContent.includes("2 of 3"));
      const rail = gallery.getByRole("region");
      await rail.focus();
      await page.keyboard.press("ArrowRight");
      await page.waitForFunction(() => document.querySelector('[data-app-gallery="duo"]')?.textContent.includes("3 of 3"));
      await gallery.locator('figure[data-device="iPhone Duo"] img').nth(2).evaluate(image => image.decode());
      assert.equal(await page.locator('[data-app-gallery="gallery"] figure').count(), route === "/tabforge" ? 6 : 4);
      checks += 1;
    }
    await context.close();
  }
  console.log(`Portfolio browser checks passed: ${checks}`);
} finally {
  await browser.close();
}
