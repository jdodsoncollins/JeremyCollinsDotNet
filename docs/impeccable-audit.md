# Impeccable audit — 20 October 2026

Baseline: `083247b794ed6e2d5486e9747df646dbb86017c1`.
Impeccable 4.7.0 / engine 0.1.16. Audit completed before UI changes.

## Technical audit

| Dimension | Score | Finding |
| --- | ---: | --- |
| Accessibility | 2/4 | Continuous decorative animation has no pause control. |
| Performance | 2/4 | Modern animation loads about 4.5 MiB of sprite sheets. |
| Theming | 3/4 | Three working eras; extensive scoped color overrides. |
| Responsive design | 3/4 | App-title touch areas are small; an open theme tooltip adds desktop overflow. |
| Implementation integrity | 4/4 | Coherent identity and real, product-specific imagery. |
| **Total** | **14/20** | **Good; address motion control and loading first.** |

### Findings

- **P1, accessibility:** `components/sprite-hero-art.tsx` loops automatically for
  longer than five seconds without a pause control (WCAG 2.2.2). The user's
  chosen resolution is one finite cycle on load, followed by scroll/hover
  interaction, with no pause control. Preserve the reduced-motion poster.
- **P2, performance:** `components/modern-hero-art.tsx` loads two 2.2–2.3 MiB
  sheets. Defer their transfer until after the primary content has loaded;
  retain the static poster and honor data-saving preferences.
- **P2, responsive:** `components/projects-section.tsx` app-title links measure
  29–39px high at mobile widths. Increase their interactive area to 44px. Larger
  adjacent links already offer alternatives, so this is not a claimed WCAG
  2.5.8 failure.
- **P2, responsive:** `app/styles/layout.css` centers the rightmost theme tooltip
  beyond the page edge. Opening the panel at 1440px expands document width to
  1450px, even while the tooltip is transparent. Anchor it to the right.

### Detector results

Three findings were checked in context. Neither retro grid advisory establishes
a defect: `app/styles/ancient-retro.css:72` and `app/styles/base.css:233` belong to
the existing computer-era visual language. The missing-src warning at
`components/era-hero-image.tsx:31` is a false positive for the intentional
active-era loader, with a modern noscript fallback.

### Positive evidence and limits

The existing skip link, semantic page structure, keyboard theme radio group,
real product screenshots, hidden-page suspension, and reduced-motion poster
are worth preserving. Chromium checks covered desktop 1440px and emulated
mobile 320/390px, including the three homepage eras. The completed baseline
axe checks reported no WCAG A/AA violations; this does not certify accessibility.
No physical-device, screen-reader, or Safari/Firefox check was performed.
Screenshots open a native full-size image in a new tab, rather than a modal.

Recommended order: fix the motion and responsive findings, then apply
overdrive, delight, bolder, and a final polish/verification pass.

## Design critique

Method: dual-agent (A: `/root/critique_a`; B: `/root/critique_b`). Assessment A
reviewed the design independently of detector findings; B assessed technical
evidence. The root investigation separately reproduced the theme overflow.
Target: `app/page.tsx`; slug: `app-page-tsx`; no ignore list was present.

| Nielsen heuristic | Score | Assessment |
| --- | ---: | --- |
| Visibility of status | 3/4 | Era state is accessible after opening the panel. |
| Match to the real world | 2/4 | The first viewport omits Jeremy's profession. |
| User control | 3/4 | Keyboard theme controls work; animation needs a pause. |
| Consistency | 3/4 | Distinct app identities remain coherent. |
| Error prevention | 3/4 | Clear destinations and ordinary link behavior. |
| Recognition | 3/4 | Labels are clear; the era feature is hidden by “Theme.” |
| Efficiency | n/a | Portfolio rather than a repeated task interface. |
| Minimalist design | 3/4 | Repeated product detail slows the personal narrative. |
| Error recovery | n/a | No homepage input/error flow. |
| Help/documentation | n/a | Portfolio; product support lives on app pages. |
| **Total** | **20/28** | **Good, with positioning gaps.** |

The forest, character, cat, actual app screenshots, and individual app palettes
make this authored work rather than a category template. The opening is warm
and memorable; task-specific product copy and truthful free-use promises support
trust. The main opportunity is connecting that work to its maker sooner.

- **P1:** The hero gives a name and atmosphere, but no profession. Add a concise
  introduction using the existing Webflow role and independent app work.
- **P2:** The 830px mobile hero beneath a separate header delays the work. Size
  it around its content while retaining the illustration.
- **P2:** Four long app presentations precede About/Experience. Surface the
  professional context earlier and offer a direct About destination instead of
  deleting supplied product facts.
- **P2, declined by the user:** “Theme” hides the era concept. The user clarified
  that this is an intentionally minor, fun detail. Keep the existing label and
  behavior and make its appearance marginally smaller, preserving touch area.

Cognitive load is moderate: repeated project/contact/social destinations compete
in the opening, while the four-app index helps browsing. The emotional valley
is the delay between the welcoming illustration and professional context.
First-time visitors need a role statement; distracted phone visitors need work
sooner; evaluators need a clearer connection between Jeremy and the apps.

Questions skipped: the user specified the improvement sequence and authorized
fixes. Subsequent direction: a single animation cycle on load, then scroll and
mouse-over animation; no pause control; keep the era switcher understated.

Browser evidence uses isolated headless Chromium contexts. Temporary overlay
injection into a test browser is not a user-visible browser overlay. The
Impeccable live server was stopped with `stop --keep-inject` after inspection.

## Implementation and enhancement passes

The user's motion direction supersedes the initial pause-control recommendation:
there is no pause control. Each era plays once on first active load. Modern and
1990s sprites then hold, scrub with actual scroll position, and play one finite
pass on mouse-over. The 1980s cat uses its existing short keyframe animation for
the same greeting. Hidden/offscreen and reduced-motion views do not animate.
Save-Data and reduced motion avoid the heavy modern/1990s sprite downloads;
normal loading defers them until document load and browser idle.

- **Overdrive:** a single focal scene with registered original artwork,
  scroll-controlled frames, finite hover playback, and no idle animation loop.
- **Delight / joy:** curiosity is rewarded by the cat greeting; the interaction
  belongs to the existing forest/computer-era world and adds no competing effect.
- **Bolder:** the modern hero pairs the established sans face with the serif
  already used elsewhere in the portfolio, preserving its content and palette.
  The two retro type systems remain intact.
- **Polish:** concise role context, an About shortcut, 44px app-title targets,
  a smaller secondary theme disclosure, and right-anchored tooltip. Mobile hero
  spacing removes inherited 16vh artwork padding and the fixed retro height.

The original app descriptions, artwork, resume/PDF, privacy pages, and OAuth
behavior remain intact. The installed design skill is vendored for future work;
its platform engine binary and temporary live-server state are excluded from Git.

## Verification

- Production Next.js build, TypeScript, existing tests, and diff checks passed.
- `pnpm test:browser`: 23 checks passed against the production build, covering
  320/390/768/1440px, all three eras, open-panel overflow, 44px app-title targets,
  finite load/hover/scroll animation, reduced motion, Save-Data, and key routes.
- Separate 1980s checks recorded one intro and hover animation, no idle loop,
  and no animation under reduced motion.
- The modern mobile hero now ends around 688px at 320px width and 763px at 390px
  width, bringing the start of the work into view sooner.
- The final source detector returned the same three reviewed intentional/false
  positive findings, with no new rule findings.
- Final axe checks found no WCAG A/AA violations at 390/1440px in all eras.
  Image-backed text contrast still requires visual review; those axe checks
  remain marked incomplete rather than being counted as passes.
- The resume PDF stayed current; no regeneration was necessary.
