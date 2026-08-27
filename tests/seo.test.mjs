import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("llms.txt exists for answer engines", () => {
  const text = fs.readFileSync("public/llms.txt", "utf8");

  assert.match(text, /^# Jeremy Collins/m);
  assert.match(text, /https:\/\/jeremycollins\.net\/resume/);
  assert.match(text, /Codable/);
});

test("home JSON-LD describes the person, site, and Codable", () => {
  const schema = fs.readFileSync("lib/json-ld.ts", "utf8");
  const home = fs.readFileSync("app/page.tsx", "utf8");

  assert.match(schema, /"@type": "Person"/);
  assert.match(schema, /"@id": personId/);
  assert.match(schema, /SoftwareApplication/);
  assert.match(schema, /WebSite/);
  assert.match(home, /homeJsonLd/);
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
