# Codable Safari guides

The public guide index is `/codable/guides`. Its five articles cover:

- Element selection and live CSS editing on iPhone.
- Console/error investigation on iPad.
- A mobile overflow-table investigation.
- Network request inspection on iPhone and iPad.
- Page source, live DOM comparison, and website assets.

Content lives in `lib/codable-guides.ts`; `app/codable/guides/[slug]/page.tsx` renders each article as server-rendered HTML with canonical metadata and TechArticle JSON-LD. The guide index and Codable product page use ordinary links. `app/sitemap.ts` includes the index and every article. The existing robots rules already allow public crawling, including OAI-SearchBot; no crawler-specific content or ranking promise is added.

The product page also answers three practical discovery questions: whether a Mac is needed, how the extension uses the current Safari session, and where desktop Web Inspector is still needed. Each answer links to a relevant walkthrough. `llms.txt` and `llms-full.txt` mirror the same public guide inventory and limits; these files are a consistency aid, not a Google ranking technique. [Google’s guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) favors useful first-hand content and ordinary search foundations, and says Google ignores `llms.txt`.

## Content boundaries

- The screenshots reuse existing, owned App Store captures through `APP_PRODUCTS.codable.screenshots`: Elements `[0]`, Console `[1]`, Resize `[2]`, Network `[4]`, and Source `[3]`. All show the bundled Codable Demo Fixture. Captions identify them as app screenshots, and the iPad console guide explicitly identifies its image as the compact phone layout.
- The articles describe shipped controls: Elements → Select, HTML/Tree/Style/Frame, Style → Save/Reset, Console → Run/Clear, and Network → Refresh. They do not advertise the unreleased Debug report feature.
- The overflow snippet creates a temporary 900px-wide table on the bundled local demo. It does not contact a server, and re-running it replaces its earlier example. Reloading removes it. The guide then changes only that table’s inline width to `100%` and checks the result.
- Inspection happens in the current Safari session. Resize and Scratchpad have separate browser contexts. Do not imply that authenticated Safari state, page variables, or temporary edits transfer into the companion app.
- Console capture is bounded and cannot reconstruct missed history. Network instrumentation starts when initialized and is not a complete browser-level HTTP recorder. Source may re-fetch a response or fall back to the live DOM.
- The Network walkthrough uses the fixture’s **Fetch products** (`/api/products`, HTTP 200) and **Fetch error** (`/api/error`, intentional HTTP 500). It distinguishes an HTTP error response from a rejected fetch and treats missing fields as unknown. The Source/assets walkthrough uses `/styles.css`, `/app.js`, `/sample.json` and `/image.svg`; it does not promise a source-code debugger or complete storage access.
- Live edits are local experiments. If an override has no visible or measured effect, reset it and investigate another constraint. The developer must make the final change in the site’s source and verify it with real content and supported browsers. The copy does not advertise the new app’s unreleased uncertainty policy or CSS experiment controls.

The setup wording was checked against [Apple’s Safari extensions guide](https://support.apple.com/guide/iphone/get-extensions-iphab0432bf6/ios). The articles link to [Apple’s remote inspection documentation](https://developer.apple.com/documentation/safari-developer-tools/inspecting-ios) for cases needing a full debugger on a Mac. App behavior was checked against Codable’s extension assets and Resize implementation, not inferred from desktop DevTools.

## Validation

Start a local production server, then run:

```sh
npx playwright install chromium
BASE_URL=http://127.0.0.1:3000 npm run test:codable-guides
```

The browser check visits the product page, guide index, and all articles at 320px, 768px, and 1440px. It checks HTTP status, unique H1s, crawlable guide/App Store links, the visible product answers and their guide destinations, canonical URLs, article schema and dates, Open Graph dates, the visible update date, per-guide sitemap dates, loaded screenshots, no page-level horizontal overflow, sitemap entries, unknown-slug 404, and client runtime errors. The focused SEO unit check keeps both plain-text summaries linked to the entire guide inventory.

On October 26, 2026, the published JavaScript examples were also exercised in headless Chrome against the actual `Codable/DemoSite` assets from the app repository. At a 390px viewport, the table example produced a 900px table and 937px document scroll width. Changing its width to `100%` produced a 316px table and restored the document scroll width to 390px. Re-running the creation snippet left exactly one example table. The console query returned `Fetch error` as documented. This is a fixture sanity check, not a claim of Safari UI validation.

Each guide owns a `publishedAt` date and an `updatedAt` date in `lib/codable-guides.ts`. Preserve `publishedAt` after publication; update only that article’s `updatedAt` when its content changes. The visible byline, Open Graph metadata, JSON-LD, and individual sitemap entry use those fields. The guide index’s sitemap date is derived from the latest article update.

When updating a guide, verify current extension labels and limitations, rerun the layout check, and review the actual rendered pages on a narrow screen. Avoid screenshots of public third-party websites or private authenticated content.
