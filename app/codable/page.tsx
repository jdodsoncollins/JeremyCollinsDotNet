import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppToolExplorer } from "@/components/app-tool-explorer";
import { AppScreenshotGallery } from "@/components/app-screenshot-gallery";
import { APP_PRODUCTS } from "@/lib/app-products";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/app-pages.module.css";

const app = APP_PRODUCTS.codable;
const tools = [
  { name: "Elements", title: "Inspect and edit the live page", description: "Select an element in Safari, follow its DOM tree, and inspect its HTML and styles. Change the CSS and see your edits on the page.", ...app.screenshots[0] },
  { name: "Console", title: "Run JavaScript in context", description: "Capture console output and evaluate JavaScript in the page you’re inspecting. Check a value, test an expression, and see the result.", ...app.screenshots[1] },
  { name: "Network", title: "Follow the page’s requests", description: "Review network activity and request details. Explore the scripts, styles, images, and other resources behind the page.", ...app.screenshots[4] },
  { name: "Scratchpad", title: "Write it, run it, try again", description: "A JavaScript editor and runner with syntax coloring, document support, and code keyboard shortcuts. Optional Apple Intelligence assistance runs on supported devices.", ...app.screenshots[6] },
];

export const metadata: Metadata = {
  title: "Codable — Safari developer tools for iPhone & iPad",
  description: app.description,
  alternates: { canonical: "/codable" },
  openGraph: { title: "Codable — Safari developer tools for iOS", description: app.description, url: "/codable", type: "website", images: [{ url: app.screenshots[0].src, alt: app.screenshots[0].alt }] },
};

export default function CodablePage() {
  return (
    <div className={`${styles.page} ${styles.codable}`}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <nav className={styles.navigation} aria-label="Codable navigation">
        <Link href="/codable" className={styles.brand}><Image src={app.icon} width={34} height={34} alt="" /><span>Codable</span></Link>
        <div className={styles.navLinks}><a href="#tools">Tools</a><a href="#resize">Resize</a><a href="#screenshots">Screenshots</a></div>
        <Link href="/" className={styles.portfolioLink}>Jeremy Collins <span aria-hidden="true"><AppArrow /></span></Link>
      </nav>
      <main id="main-content">
        <section className={styles.codableHero} aria-labelledby="codable-title">
          <div className={styles.codableHeroCopy}>
            <h1 className={styles.codableTitle} id="codable-title">Safari<br />developer<br /><span>tools</span></h1>
            <p className={styles.lead}>Inspect HTML, edit CSS, and run JavaScript.<br className={styles.desktopBreak} /> Right in Safari, on iPhone and iPad.</p>
            <a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true"><AppArrow /></span></a>
            <p className={styles.requirements}>iOS &amp; iPadOS {app.minimumOS} or later</p>
            <p className={styles.monetizationNote}>Free to use. No ads, tracking, subscriptions, or in-app purchases.</p>
            <p className={styles.heroFootnote}>A Safari extension and a standalone app.<br />No desktop connection required.</p>
          </div>
          <div className={styles.blueprint}>
            <AppScreenshotGallery shots={[app.screenshots[0], app.screenshots[1]]} appName="Codable" variant="hero" priorityFirst />
            <p className={styles.blueprintCaption}>The page, its structure, and a live JavaScript console.</p>
          </div>
        </section>
        <div className={styles.capabilities} aria-label="Codable tools"><p>Inspect elements</p><p>Edit live styles</p><p>Run JavaScript</p><p>Test responsive layouts</p></div>
        <section id="tools" className={styles.section} aria-labelledby="codable-tools">
          <div className={styles.sectionHeading}><h2 id="codable-tools">Inspect, test,<br />and debug</h2><p>Open the tools on the page you’re working on. Follow an element, try a style, or find out why a request failed.</p></div>
          <AppToolExplorer tools={tools} />
        </section>
        <section id="resize" className={styles.resizeSection} aria-labelledby="resize-title">
          <div className={styles.resizeArtwork}><AppScreenshot shot={app.screenshots[2]} /></div>
          <div className={styles.resizeCopy}><h2 id="resize-title">Test your<br /><span>responsive layouts</span></h2><p>Open a page in Resize and change its width, height, or scale. Use a device preset, or drag the viewport to find where the layout needs attention.</p><dl className={styles.specList}><div><dt>Width &amp; height</dt><dd>Adjustable</dd></div><div><dt>Device presets</dt><dd>Built in</dd></div><div><dt>Scale controls</dt><dd>Included</dd></div></dl></div>
        </section>
        <section id="screenshots" className={styles.section} aria-labelledby="codable-screenshots"><div className={styles.sectionHeading}><h2 id="codable-screenshots">Explore Codable</h2><p>From inspecting a page’s source to trying an idea in Scratchpad. See every tool in the current app.</p></div><AppScreenshotGallery shots={app.screenshots} appName="Codable" /></section>
        <section id="download" className={styles.codableDownload} aria-labelledby="codable-download"><div><h2 id="codable-download">Get Codable</h2><p>Safari developer tools for iPhone and iPad.<br />Free to use. Ready on your device.</p></div><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true"><AppArrow /></span></a></section>
        <p className={styles.compatibility}>Apple Intelligence features are optional and require a supported device.</p>
      </main>
      <footer className={styles.footer}><div className={styles.footerIdentity}><Link href="/">Made by Jeremy Collins</Link><div><Link href="/codable-privacy-policy">Privacy</Link><a href="mailto:jeremy@jeremycollins.net?subject=Codable%20support">Support</a></div></div><nav aria-label="More apps"><Link href="/tabforge">TabForge</Link><Link href="/taktung">Taktung</Link><Link href="/paper-and-grain">Paper &amp; Grain</Link></nav></footer>
    </div>
  );
}
