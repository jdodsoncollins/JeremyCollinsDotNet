# JeremyCollins.net

Personal site for Jeremy Collins, focused on product engineering, independent software, and builder-oriented work. The site is intentionally small: a one-page portfolio, era-based visual themes, Codable project details, a privacy policy route, and an online resume that can also be exported to PDF.

## Stack

- Next.js 15 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- Vercel Analytics
- Playwright for resume PDF export

## Functionality

- Home page with hero, about, project, and footer sections.
- Theme switcher for `1980s`, `1990s`, `2000s`, and `modern` visual treatments.
- Codable project screenshots with expandable lightbox behavior.
- Codable privacy policy page.
- Source-controlled Markdown resume rendered at `/resume`.
- Generated static PDF resume available at `/resume/jeremy-collins-resume.pdf`.

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
