# JeremyCollins.net

Personal site for Jeremy Collins, focused on product engineering, independent software, and builder-oriented work. The site is intentionally small: a one-page portfolio, era-based visual themes, Codable project details, a privacy policy route, and an online resume that can also be exported to PDF.

## Stack

- Next.js 15 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- Vercel Analytics and Speed Insights
- Playwright for resume PDF export

## Functionality

- Home page with hero, about, project, and footer sections.
- Theme switcher for `1980s` (green-phosphor CRT), `Retro` (1990s), and `Modern` visual treatments.
- Codable project screenshots with expandable lightbox behavior.
- Codable privacy policy page.
- Taktung privacy policy page.
- Source-controlled Markdown resume rendered at `/resume`.
- Generated static PDF resume available at `/resume/jeremy-collins-resume.pdf`.
- OAuth helpers:
  - `GET /oauth` — no-store callback page for X OAuth 2.0 PKCE headless flows; displays the one-time callback URL for the waiting local CLI without exchanging or persisting tokens.
  - `/mobileflow-callback` and `/mobileflow-token` — retired, return `410 Gone`. Update Webflume to use its Webflow Cloud authentication service.

### X OAuth callback

Register this exact callback URL in the X Developer app:

`https://jeremycollins.net/oauth`

For local xurl setup, configure the app with that redirect URI and run:

```bash
xurl auth apps add JollinsOnline --client-id YOUR_CLIENT_ID --client-secret YOUR_CLIENT_SECRET --redirect-uri https://jeremycollins.net/oauth
xurl auth oauth2 --app JollinsOnline --headless
```

After approving X authorization, copy the callback URL shown at `/oauth` and paste it into the waiting xurl command. The site does not log, exchange, or store the authorization code or tokens.

### Retired Webflume authentication

Webflume authentication moved to `https://webflume-auth.webflow.io`. This site no longer redirects app authorization responses or exchanges Webflow tokens. Remove the obsolete `WEBFLOW_CLIENT_ID`, `WEBFLOW_CLIENT_SECRET`, and `WEBFLOW_REDIRECT_URI` variables from this Vercel project; future deployments must not restore the old handlers. The unrelated `/oauth` CLI callback remains available.

## Resume

The resume source of truth lives at:

`src/content/resume/resume.md`

Edit that Markdown file to update the online resume. The generated PDF is a committed static artifact, so it must be regenerated after Markdown changes before committing.

The Markdown file is intentionally distinct from the React page code so the resume copy can be reviewed, edited, and versioned directly.

The web resume route is:

`/resume`

The generated PDF is written to:

`public/resume/jeremy-collins-resume.pdf`

The PDF should be committed so `/resume/jeremy-collins-resume.pdf` is available as a static asset in production.

## Development

### Design tooling

TabForge and Paper & Grain feature genuine iPhone Duo captures on their product
pages and the homepage. `lib/duo-media.json` records their source revisions,
dimensions, and asset hashes separately from the conventional iPhone App Store
media in `lib/app-store-media.json`.

Impeccable 4.7.0 is installed for Codex in `.agents/skills/impeccable`.
Its engine is downloaded on first use and is excluded from Git. To refresh the
project installation, run `npx impeccable@4.7.0 install -y --providers=codex --scope=project --no-hooks`.

Use `/impeccable audit` and `/impeccable critique` before making design changes.
`/impeccable delight` is the command for a joy pass. The source detector can also
be run directly:

```bash
.agents/skills/impeccable/scripts/impeccable detect --json app components
```

Install dependencies:

```bash
pnpm install
```

Run the local dev server:

```bash
pnpm dev
```

Build the site:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

With a production server running (`pnpm build && pnpm start`), check responsive
themes, finite hero animation, reduced motion, data saving, and key routes:

```bash
pnpm test:browser
```

Set `BASE_URL` to test a deployment and `CHROMIUM_PATH` if Chromium is installed
outside the usual Linux path. Otherwise Playwright uses its installed Chromium.

Force-export the resume PDF from an existing production build:

```bash
pnpm resume:pdf
```

Build the site and export the resume PDF:

```bash
pnpm resume:build
```

`resume:pdf` starts the production Next server locally unless `RESUME_BASE_URL` is provided.

`pnpm build` runs `postbuild`, which checks for a staged, unstaged, or untracked diff in `src/content/resume/resume.md`. If the Markdown source changed, or if the PDF is missing, it automatically regenerates `public/resume/jeremy-collins-resume.pdf`.

If resume styles or rendering code changed but the Markdown did not, run `pnpm resume:pdf` to force a fresh PDF. Inspect the generated PDF and commit it with the source change.

Set `RESUME_SKIP_AUTO_PDF=1` to skip the automatic postbuild PDF sync in constrained environments.

## Optional Google Analytics (GA4)

Set the public build-time variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the GA4
web stream's `G-…` measurement ID. Without a valid ID, no Google tag or consent
prompt is mounted. This is a public identifier, not an API secret.

Before enabling it in production, disable **Enhanced measurement** on the GA4
web stream (including browser-history page views, form interactions, outbound
clicks, and site search). The site deliberately sends only manual sanitized
page views; automatic collection could otherwise duplicate events or collect
URL parameters. Keep Google Signals, user-provided data collection, and
advertising features off. Do not put credentials or identifying information in
measurement configuration.

The implementation uses basic opt-in consent: Google's script is not requested
until a visitor accepts. Declining sends nothing to Google Analytics. The
preference control is available on reviewed public pages, and withdrawal clears
GA cookies and reloads the document only after verifying the declined choice was
saved. If storage fails, collection stays disabled in the current tab without a
reload, and a visible warning explains the persistence limitation. Vercel Analytics and Speed Insights remain
separate and unchanged. `/privacy` explains website measurement without changing
native-app privacy claims.

`lib/website-analytics.mjs` contains the explicit public path allowlist. Unknown,
OAuth, and token routes are excluded. Page locations use only a fixed canonical
origin and reviewed path; no raw query strings, fragments, referrer paths, or dynamic
page titles are sent. `analyticsAcquisition` maps known referring services to fixed
public origins, and accepts only exact UTM source/medium/campaign enums. All three
UTM fields must match; unsupported campaigns are not campaign-attributed. Unknown
referrers are omitted. No UTM term/content/ID is collected. This trades complete
attribution for protection against identifiers in URLs. Review and extend the
explicit lists when creating new campaigns; do not enable automatic collection.

Before release, verify in a browser that there are zero Google requests before
consent or after decline, one page_view on each allowed navigation after accept,
no automatic duplicates, and no tracking on callback routes. Use a test property
or intercept Google requests in browser tests; don't pollute production reports.
