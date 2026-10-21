import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium, webkit } from "playwright";

// Run against a separately started server, or set BASE_URL to a deployment.
const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const browserName = process.env.BROWSER ?? "chromium";
assert.ok(["chromium", "webkit"].includes(browserName));
const browser =
  browserName === "webkit"
    ? await webkit.launch({ executablePath: process.env.WEBKIT_PATH })
    : await chromium.launch({
        executablePath:
          process.env.CHROMIUM_PATH ??
          (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
      });
const apps = ["tabforge", "paper-and-grain", "codable", "taktung"];
let checks = 0;

async function pageIn({
  width = 1440,
  reducedMotion = "no-preference",
  saveData = false,
} = {}) {
  const context = await browser.newContext({
    viewport: { width, height: 1000 },
    reducedMotion,
    isMobile: width === 390,
    hasTouch: width === 390,
  });
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

async function openHome(page) {
  assert.equal((await page.goto(baseURL)).status(), 200);
  await page.locator("[data-home-motion]").waitFor();
  assert.equal(
    await page.locator("[data-home-project] [data-app-overview] video").count(),
    4,
  );
}

function overview(page, app) {
  return page.locator(`[data-app-overview="${app}"] video`);
}

async function enter(video) {
  await video.evaluate(
    (element) =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          observer.disconnect();
          reject(
            new Error(
              `${element.getAttribute("aria-label")} did not enter view`,
            ),
          );
        }, 3000);
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return;
            observer.disconnect();
            clearTimeout(timeout);
            // The app's existing observer receives this visibility update first.
            requestAnimationFrame(() => requestAnimationFrame(resolve));
          },
          { threshold: [0, 0.35] },
        );
        observer.observe(element);
        element.scrollIntoView({ block: "center", behavior: "instant" });
      }),
  );
}

async function offscreen(video) {
  const page = video.page();
  await page.mouse.move(0, 0);
  await video.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const after = window.scrollY + bounds.bottom + 32;
    const before = window.scrollY + bounds.top - window.innerHeight - 32;
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: after <= maximum ? after : Math.max(0, before),
      behavior: "instant",
    });
  });
  await page.waitForFunction(
    (video) => {
      const bounds = video.getBoundingClientRect();
      return bounds.bottom <= 0 || bounds.top >= window.innerHeight;
    },
    await video.elementHandle(),
    { timeout: 3000 },
  );
}

async function diagnostic(video, action, cause) {
  const state = await video.evaluate((video) => ({
    app: video.getAttribute("aria-label"),
    currentTime: video.currentTime,
    duration: video.duration,
    paused: video.paused,
    ended: video.ended,
    readyState: video.readyState,
    networkState: video.networkState,
    error: video.error && {
      code: video.error.code,
      message: video.error.message,
    },
    autoplay: video.autoplay,
    muted: video.muted,
    source: video.currentSrc,
    hidden: document.hidden,
    bounds: video.getBoundingClientRect().toJSON(),
    viewport: { width: innerWidth, height: innerHeight, scrollY },
  }));
  return new Error(`${browserName} ${action}: ${JSON.stringify(state)}`, {
    cause,
  });
}

async function advances(video, action = "playback") {
  const page = video.page();
  try {
    await page.waitForFunction(
      (video) => !video.paused && !video.ended && video.readyState >= 2,
      await video.elementHandle(),
      { timeout: 3000 },
    );
    const before = await video.evaluate((video) => video.currentTime);
    await page.waitForFunction(
      ({ video, before }) => video.currentTime > before + 0.12,
      { video: await video.elementHandle(), before },
      { timeout: 3000 },
    );
    assert.equal(
      await video.evaluate((video) => video.error?.message ?? null),
      null,
    );
  } catch (error) {
    throw await diagnostic(video, action, error);
  }
}

async function frozen(video, reason) {
  try {
    await video
      .page()
      .waitForFunction((video) => video.paused, await video.elementHandle(), {
        timeout: 3000,
      });
    const before = await video.evaluate((video) => video.currentTime);
    await video.page().waitForTimeout(150);
    assert.equal(await video.evaluate((video) => video.paused), true, reason);
    assert.ok(
      Math.abs((await video.evaluate((video) => video.currentTime)) - before) <
        0.03,
      reason,
    );
  } catch (error) {
    throw await diagnostic(video, reason, error);
  }
}

async function finish(video) {
  await video.evaluate((video) => {
    video.currentTime = Math.max(0, video.duration - 0.12);
  });
  await video
    .page()
    .waitForFunction((video) => video.ended, await video.elementHandle(), {
      timeout: 3000,
    });
  await frozen(video, "Completed overview loops while idle");
}

async function scrollReplay(page, video) {
  await page.evaluate(() => window.scrollBy({ top: 32, behavior: "instant" }));
  await advances(video, "scroll replay");
  assert.ok(
    await video.evaluate((video) => video.currentTime < 2),
    "Scroll replay does not restart the clip",
  );
}

async function hover(page, video) {
  await page.mouse.move(0, 0);
  const box = await video.boundingBox();
  assert.ok(box);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
}

try {
  for (const width of [390, 1440]) {
    const { context, page } = await pageIn({ width });
    await openHome(page);
    for (const app of apps) {
      const video = overview(page, app);
      assert.deepEqual(
        await video.evaluate((video) => ({
          controls: video.controls,
          muted: video.muted,
          inline: video.playsInline,
          loop: video.loop,
        })),
        { controls: true, muted: true, inline: true, loop: false },
      );
      await enter(video);
      await advances(video, "first entry");
      await offscreen(video);
      await frozen(video, `${app}/${width} keeps playing offscreen`);
      await enter(video);
      await advances(video, "return from offscreen");
      await finish(video);
      await scrollReplay(page, video);
      if (width === 1440) {
        await finish(video);
        await hover(page, video);
        await advances(video, "hover replay");
        assert.ok(
          await video.evaluate((video) => video.currentTime < 2),
          "Hover replay does not restart the clip",
        );
      }
      await video.evaluate((video) => video.pause());
      await frozen(video, "Manual pause does not hold");
      await offscreen(video);
      await enter(video);
      await frozen(video, "Returning to the overview overrides manual pause");
      await page.evaluate(() =>
        window.scrollBy({ top: 32, behavior: "instant" }),
      );
      if (width === 1440) await hover(page, video);
      await frozen(video, "Scroll or hover overrides manual pause");
      checks += 6;
    }
    await context.close();
  }

  const visible = await pageIn();
  await openHome(visible.page);
  const first = overview(visible.page, apps[0]);
  await enter(first);
  await advances(first);
  await visible.page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await frozen(first, "Hidden tab keeps playing");
  await visible.page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await advances(first);
  await first.evaluate((video) => video.pause());
  await visible.page.evaluate(() =>
    document.dispatchEvent(new Event("visibilitychange")),
  );
  await frozen(first, "Visibility changes override manual pause");
  await visible.context.close();
  checks += 2;

  for (const preference of [{ reducedMotion: "reduce" }, { saveData: true }]) {
    const { context, page } = await pageIn(preference);
    await openHome(page);
    for (const app of apps) {
      const video = overview(page, app);
      await enter(video);
      await frozen(video, "Motion or data preference still autoplays");
      await video.evaluate((video) => video.play());
      await advances(video);
      await video.evaluate((video) => video.pause());
      await offscreen(video);
      await enter(video);
      await frozen(video, "Motion or data preference resumes a paused clip");
      checks += 2;
    }
    await context.close();
  }

  const retry = await pageIn();
  await openHome(retry.page);
  const blocked = overview(retry.page, apps[0]);
  await blocked.evaluate((video) => {
    const play = video.play.bind(video);
    const autoplay = Object.getOwnPropertyDescriptor(
      HTMLMediaElement.prototype,
      "autoplay",
    );
    let rejected = false;
    // Simulate a browser policy blocking both play() and native autoplay.
    Object.defineProperty(video, "autoplay", {
      configurable: true,
      get: () => autoplay.get.call(video),
      set: (value) => autoplay.set.call(video, rejected ? value : false),
    });
    video.play = () => {
      if (!rejected) {
        rejected = true;
        return Promise.reject(
          new DOMException("Test blocked autoplay", "NotAllowedError"),
        );
      }
      return play();
    };
  });
  await enter(blocked);
  await retry.page.waitForTimeout(150);
  await frozen(blocked, "Blocked autoplay unexpectedly played");
  await offscreen(blocked);
  await enter(blocked);
  await advances(blocked);
  await retry.context.close();
  checks += 1;

  const detail = await pageIn();
  for (const app of apps) {
    assert.equal(
      (await detail.page.goto(new URL(`/${app}`, baseURL).href)).status(),
      200,
    );
    const video = overview(detail.page, app);
    await video.waitFor();
    assert.equal(
      await video.evaluate(
        (video) => video.loop && video.controls && video.playsInline,
      ),
      true,
      `${app} detail player changed`,
    );
    await enter(video);
    await advances(video);
    await offscreen(video);
    await frozen(video, "Detail player keeps playing offscreen");
    checks += 1;
  }
  await detail.context.close();
  console.log(
    `Homepage videos (${browserName}): ${checks} browser checks passed.`,
  );
} finally {
  await browser.close();
}
