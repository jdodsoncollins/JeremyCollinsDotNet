import assert from "node:assert/strict";
import { chromium } from "playwright";
import { CODABLE_GUIDES, CODABLE_GUIDES_INDEX_UPDATED } from "../lib/codable-guides.ts";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const slugs = CODABLE_GUIDES.map((guide) => guide.slug);
const browser = await chromium.launch();
const errors = [];
try {
  for (const width of [320, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of ["/codable", "/codable/guides", ...slugs.map((slug) => `/codable/guides/${slug}`)]) {
      const response = await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, `${route}: HTTP status`);
      assert.equal(await page.locator("h1").count(), 1, `${route}: one H1`);
      assert.ok(await page.locator('a[href="/codable/guides"]').count(), `${route}: linked guide index`);
      assert.ok(await page.locator('a[href*="1324741659"]').count(), `${route}: app link`);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `https://jeremycollins.net${route}`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true, `${route}: horizontal overflow at ${width}px`);
      if (slugs.some((slug) => route.endsWith(slug))) {
        const article = await page.locator('script[type="application/ld+json"]').evaluate((node) => JSON.parse(node.textContent));
        assert.equal(article["@type"], "TechArticle");
        assert.equal(article.url, `https://jeremycollins.net${route}`);
        assert.equal(article.headline, await page.locator("h1").textContent());
        const guide = CODABLE_GUIDES.find((entry) => route.endsWith(entry.slug));
        assert.equal(article.datePublished, guide.publishedAt, `${route}: publication date`);
        assert.equal(article.dateModified, guide.updatedAt, `${route}: update date`);
        assert.equal(await page.locator('meta[property="article:published_time"]').getAttribute("content"), guide.publishedAt);
        assert.equal(await page.locator('meta[property="article:modified_time"]').getAttribute("content"), guide.updatedAt);
        const updatedTime = page.locator("article header time");
        assert.equal(await updatedTime.getAttribute("datetime"), guide.updatedAt);
        assert.equal(await updatedTime.textContent(), new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(guide.updatedAt)));
        assert.equal(await page.locator('aside img').evaluate((image) => image.complete && image.naturalWidth > 0), true, `${route}: screenshot loaded`);
      }
    }
    await page.close();
  }
  const page = await browser.newPage();
  const response = await page.request.get(`${baseURL}/sitemap.xml`);
  const sitemap = await response.text();
  const sitemapDates = await page.evaluate((xml) => Object.fromEntries(
    Array.from(new DOMParser().parseFromString(xml, "application/xml").querySelectorAll("url"))
      .map((entry) => [entry.querySelector("loc")?.textContent, entry.querySelector("lastmod")?.textContent])
  ), sitemap);
  for (const guide of CODABLE_GUIDES) {
    assert.equal(sitemapDates[`https://jeremycollins.net/codable/guides/${guide.slug}`], new Date(guide.updatedAt).toISOString(), `${guide.slug}: sitemap update date`);
  }
  assert.equal(sitemapDates["https://jeremycollins.net/codable/guides"], new Date(CODABLE_GUIDES_INDEX_UPDATED).toISOString(), "Guide index uses latest article update");
  const missingGuide = await page.goto(`${baseURL}/codable/guides/not-a-real-guide`);
  assert.equal(missingGuide.status(), 404, "Unknown guide returns HTTP 404");
  assert.deepEqual(errors, [], "No client runtime errors");
  console.log("Codable guides: crawlable routes, metadata, images, and 320/768/1440px layouts passed.");
} finally {
  await browser.close();
}
