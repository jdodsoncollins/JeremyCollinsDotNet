import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppToolExplorer } from "@/components/app-tool-explorer";
import { AppScreenshotGallery } from "@/components/app-screenshot-gallery";
import { AppMotion } from "@/components/app-motion";
import { AppOverview } from "@/components/app-overview";
import { APP_PRODUCTS } from "@/lib/app-products";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/app-pages.module.css";
import design from "@/app/codable.module.css";

const app = APP_PRODUCTS.codable;
const tools = [
  {
    name: "Elements",
    title: "Inspect and edit the live page",
    description:
      "Select an element in Safari, follow its DOM tree, and inspect its HTML and styles. Change the CSS and see your edits on the page.",
    ...app.screenshots[0],
  },
  {
    name: "Console",
    title: "Run JavaScript in context",
    description:
      "Capture console output and evaluate JavaScript in the page you’re inspecting. Check a value, test an expression, and see the result.",
    ...app.screenshots[1],
  },
  {
    name: "Network",
    title: "Follow the page’s requests",
    description:
      "Review network activity and request details. Explore the scripts, styles, images, and other resources behind the page.",
    ...app.screenshots[4],
  },
  {
    name: "Scratchpad",
    title: "Write and run JavaScript",
    description:
      "A JavaScript editor and runner with syntax coloring, document support, and code keyboard shortcuts. Optional Apple Intelligence assistance runs on supported devices.",
    ...app.screenshots[6],
  },
];

export const metadata: Metadata = {
  title: "Codable — Safari developer tools for iPhone & iPad",
  description: app.description,
  alternates: { canonical: "/codable" },
  openGraph: {
    title: "Codable — Safari developer tools for iOS",
    description: app.description,
    url: "/codable",
    type: "website",
    images: [{ url: app.screenshots[0].src, alt: app.screenshots[0].alt }],
  },
};

export default function CodablePage() {
  return (
    <div
      className={`${styles.page} ${styles.codable} ${design.page}`}
      data-app-page="codable"
    >
      <AppMotion app="codable" />
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <nav className={styles.navigation} aria-label="Codable navigation">
        <Link href="/codable" className={styles.brand}>
          <Image src={app.icon} width={34} height={34} alt="" />
          <span>Codable</span>
        </Link>
        <div className={styles.navLinks}>
          <a href="#overview">Overview</a>
          <a href="#tools">Tools</a>
          <a href="#resize">Resize</a>
          <a href="#screenshots">Screenshots</a>
        </div>
        <Link href="/" className={styles.portfolioLink}>
          Jeremy Collins{" "}
          <span aria-hidden="true">
            <AppArrow />
          </span>
        </Link>
      </nav>
      <main id="main-content">
        <header className={design.intro}>
          <div>
            <h1 id="codable-title">Safari developer tools</h1>
            <p className={design.lead}>
              Inspect HTML, edit CSS, and run JavaScript. Right in Safari, on
              iPhone and iPad.
            </p>
          </div>
          <div className={design.install}>
            <a
              className={styles.primaryButton}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              View in App Store{" "}
              <span aria-hidden="true">
                <AppArrow />
              </span>
            </a>
            <p className={design.requirements}>
              iOS &amp; iPadOS {app.minimumOS} or later
            </p>
            <p className={design.terms}>
              Free to use. Optional tips support the app. No ads, tracking, or
              subscriptions.
            </p>
          </div>
        </header>
        <section
          id="tools"
          className={design.toolsSection}
          aria-labelledby="codable-tools"
        >
          <div className={design.toolsIntro}>
            <h2 id="codable-tools">Inspect, test, and debug</h2>
          </div>
          <div
            className={`${styles.blueprint} ${design.workbench}`}
            data-app-motion="inspect"
            data-motion-replay
          >
            <AppToolExplorer tools={tools} />
            <p className={design.inspectionCaption}>
              The page, its structure, and a live JavaScript console.
            </p>
          </div>
          <div className={design.toolNotes}>
            <div>
              <p>
                Open the tools on the page you’re working on. Follow an element,
                try a style, or find out why a request failed.
              </p>
              <p>
                A Safari extension and a standalone app. No desktop connection
                required.
              </p>
            </div>
            <ul aria-label="Codable capabilities">
              <li>Inspect elements</li>
              <li>Edit live styles</li>
              <li>Run JavaScript</li>
              <li>Test responsive layouts</li>
            </ul>
          </div>
        </section>
        <div className={design.fieldStudies}>
          <section
            id="overview"
            className={design.overview}
            aria-labelledby="codable-overview-title"
          >
            <h2 id="codable-overview-title">See the tools in action</h2>
            <AppOverview app="codable" />
          </section>
          <section
            id="resize"
            className={design.resize}
            aria-labelledby="resize-title"
          >
            <div className={design.resizeCopy}>
              <h2 id="resize-title">Test your responsive layouts</h2>
              <p>
                Open a page in Resize and change its width, height, or scale.
                Use a device preset, or drag the viewport to find where the
                layout needs attention.
              </p>
            </div>
            <div className={design.resizeArtwork}>
              <AppScreenshot shot={app.screenshots[2]} />
            </div>
          </section>
        </div>
        <section
          id="screenshots"
          className={design.screenshots}
          aria-labelledby="codable-screenshots"
        >
          <div className={design.galleryHeading}>
            <h2 id="codable-screenshots">Explore Codable</h2>
            <p>
              See every tool in the current app, including the source inspector
              and JavaScript Scratchpad.
            </p>
          </div>
          <AppScreenshotGallery shots={app.screenshots} appName="Codable" />
        </section>
        <section
          id="download"
          className={design.download}
          aria-labelledby="codable-download"
        >
          <div>
            <h2 id="codable-download">Get Codable</h2>
            <p>Free for iPhone and iPad.</p>
          </div>
          <a
            className={styles.primaryButton}
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in App Store{" "}
            <span aria-hidden="true">
              <AppArrow />
            </span>
          </a>
        </section>
        <p className={styles.compatibility}>
          Apple Intelligence features are optional and require a supported
          device.
        </p>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerIdentity}>
          <Link href="/">Made by Jeremy Collins</Link>
          <div>
            <Link href="/codable/privacy">Privacy</Link>
            <a href="mailto:jeremy@jeremycollins.net?subject=Codable%20support">
              Support
            </a>
          </div>
        </div>
        <nav aria-label="More apps">
          <Link href="/tabforge">TabForge</Link>
          <Link href="/taktung">Taktung</Link>
          <Link href="/paper-and-grain">Paper &amp; Grain</Link>
        </nav>
      </footer>
    </div>
  );
}
