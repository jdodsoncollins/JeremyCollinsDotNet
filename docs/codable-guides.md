# Codable Safari guides

The public guide index is `/codable/guides`. Its three articles cover element selection and live CSS editing, console/error investigation on iPad, and a mobile overflow-table investigation.

Content lives in `lib/codable-guides.ts`; `app/codable/guides/[slug]/page.tsx` renders each article as server-rendered HTML with canonical metadata and TechArticle JSON-LD. The guide index and Codable product page use ordinary links. `app/sitemap.ts` includes all four routes. The existing robots rules already allow public crawling, including OAI-SearchBot; no crawler-specific content or ranking promise is added.

## Content boundaries

- The screenshots reuse the existing, owned `public/apps/codable-1.webp`, `codable-2.webp`, and `codable-3.webp` App Store captures. All show the bundled Codable Demo Fixture. Captions identify them as app screenshots, and the iPad console guide explicitly identifies its image as the compact phone layout.
- The articles describe shipped controls: Elements → Select, HTML/Tree/Style/Frame, Style → Save/Reset, Console → Run/Clear, and Network → Refresh. They do not advertise the unreleased Debug report feature.
- The overflow snippet creates a temporary 900px-wide table on the bundled local demo. It does not contact a server, and re-running it replaces its earlier example. Reloading removes it. The guide then changes only that table’s inline width to `100%` and checks the result.
- Inspection happens in the current Safari session. Resize and Scratchpad have separate browser contexts. Do not imply that authenticated Safari state, page variables, or temporary edits transfer into the companion app.
- Console capture is bounded and cannot reconstruct missed history. Network instrumentation starts when initialized and is not a complete browser-level HTTP recorder. Source may re-fetch a response or fall back to the live DOM.
- Live edits are local experiments. The developer must make the final change in the site’s source and verify it with real content and supported browsers.

The setup wording was checked against [Apple’s Safari extensions guide](https://support.apple.com/guide/iphone/get-extensions-iphab0432bf6/ios). The articles link to [Apple’s remote inspection documentation](https://developer.apple.com/documentation/safari-developer-tools/inspecting-ios) for cases needing a full debugger on a Mac. App behavior was checked against Codable’s extension assets and Resize implementation, not inferred from desktop DevTools.

## Validation

Start a local production server, then run:

```sh
npx playwright install chromium
BASE_URL=http://127.0.0.1:3000 npm run test:codable-guides
```

The browser check visits the product page, guide index, and all articles at 320px, 768px, and 1440px. It checks HTTP status, unique H1s, crawlable guide/App Store links, canonical URLs, article schema and dates, Open Graph dates, the visible update date, per-guide sitemap dates, loaded screenshots, no page-level horizontal overflow, sitemap entries, unknown-slug 404, and client runtime errors.

On October 26, 2026, the published JavaScript examples were also exercised in headless Chrome against the actual `Codable/DemoSite` assets from the app repository. At a 390px viewport, the table example produced a 900px table and 937px document scroll width. Changing its width to `100%` produced a 316px table and restored the document scroll width to 390px. Re-running the creation snippet left exactly one example table. The console query returned `Fetch error` as documented. This is a fixture sanity check, not a claim of Safari UI validation.

Each guide owns a `publishedAt` date and an `updatedAt` date in `lib/codable-guides.ts`. Preserve `publishedAt` after publication; update only that article’s `updatedAt` when its content changes. The visible byline, Open Graph metadata, JSON-LD, and individual sitemap entry use those fields. The guide index’s sitemap date is derived from the latest article update.

When updating a guide, verify current extension labels and limitations, rerun the layout check, and review the actual rendered pages on a narrow screen. Avoid screenshots of public third-party websites or private authenticated content.
