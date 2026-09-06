import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("llms.txt exists for answer engines", () => {
  const text = fs.readFileSync("public/llms.txt", "utf8");

  assert.match(text, /^# Jeremy Collins/m);
  assert.match(text, /https:\/\/jeremycollins\.net\/resume/);
  assert.match(text, /Codable/);
  assert.match(text, /llms-full\.txt/);
});

test("llms-full.txt exists for answer engines", () => {
  const text = fs.readFileSync("public/llms-full.txt", "utf8");

  assert.match(text, /^# Jeremy Collins/m);
  assert.match(text, /Webflow/);
  assert.match(text, /Codable/);
  assert.match(text, /Taktung/);
  assert.match(text, /jeremy@jeremycollins\.net/);
});

test("home JSON-LD describes the person, site, and Codable", () => {
  const schema = fs.readFileSync("lib/json-ld.ts", "utf8");
  const home = fs.readFileSync("app/page.tsx", "utf8");

  assert.match(schema, /"@type": "Person"/);
  assert.match(schema, /"@id": personId/);
  assert.match(schema, /givenName: "Jeremy"/);
  assert.match(schema, /SoftwareApplication/);
  assert.match(schema, /WebSite/);
  assert.match(schema, /FAQPage/);
  assert.match(schema, /Who is Jeremy Collins/);
  assert.match(schema, /Codeatrophy/);
  assert.match(home, /homeJsonLd/);
});

test("root layout reports Vercel Analytics and Speed Insights", () => {
  const layout = fs.readFileSync("app/layout.tsx", "utf8");
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

  assert.match(layout, /@vercel\/analytics\/next/);
  assert.match(layout, /@vercel\/speed-insights\/next/);
  assert.match(layout, /<SpeedInsights/);
  assert.ok(pkg.dependencies["@vercel/speed-insights"]);
  assert.ok(pkg.dependencies["@vercel/analytics"]);
});

test("answer engines can read a FAQ in llms.txt", () => {
  const text = fs.readFileSync("public/llms.txt", "utf8");

  assert.match(text, /^## FAQ/m);
  assert.match(text, /Who is Jeremy Collins/);
  assert.match(text, /What is Codable/);
  assert.match(text, /What is Taktung/);
});

test("robots.txt allows answer-engine crawlers and hides oauth helpers", () => {
  const robots = fs.readFileSync("app/robots.ts", "utf8");

  assert.match(robots, /OAI-SearchBot/);
  assert.match(robots, /ChatGPT-User/);
  assert.match(robots, /Claude-SearchBot/);
  assert.match(robots, /PerplexityBot/);
  assert.match(robots, /\/oauth/);
  assert.match(robots, /\/mobileflow-callback/);
  assert.match(robots, /\/mobileflow-token/);
});

test("Taktung privacy policy exists as a sibling of the Codable policy", () => {
  const page = fs.readFileSync("app/taktung-privacy-policy/page.tsx", "utf8");
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
  const schema = fs.readFileSync("lib/json-ld.ts", "utf8");
  const llms = fs.readFileSync("public/llms.txt", "utf8");
  const redirects = fs.readFileSync("next.config.ts", "utf8");

  assert.match(page, /Taktung Privacy Policy/);
  assert.match(page, /taktungPrivacyJsonLd/);
  assert.match(page, /canonical: "\/taktung-privacy-policy"/);
  assert.match(sitemap, /taktung-privacy-policy/);
  assert.doesNotMatch(sitemap, /takt-privacy-policy/);
  assert.match(schema, /taktungPrivacyJsonLd/);
  assert.match(llms, /https:\/\/jeremycollins\.net\/taktung-privacy-policy/);
  assert.match(redirects, /\/takt-privacy-policy/);
  assert.match(redirects, /\/taktung-privacy-policy/);
});

test("old Gatsby service worker is replaced with an unregistering stub", () => {
  const sw = fs.readFileSync("public/sw.js", "utf8");

  assert.match(sw, /unregister/);
  assert.doesNotMatch(sw, /gatsby-plugin-offline/);
  assert.doesNotMatch(sw, /workbox/);
});
