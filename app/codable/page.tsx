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
  { name: "Elements", title: "Inspect and edit the live page", description: "Select an element in Safari, navigate its DOM tree, and inspect its HTML and styles. Change CSS and see the result on the page.", ...app.screenshots[0] },
  { name: "Console", title: "Run JavaScript in context", description: "Capture console output and evaluate JavaScript in the page you’re inspecting. Check a value, test an expression, and see what happens.", ...app.screenshots[1] },
  { name: "Network", title: "Follow every request", description: "Review network activity, inspect request details, and explore the scripts, styles, and images a page loads.", ...app.screenshots[4] },
  { name: "Scratchpad", title: "Try an idea in JavaScript", description: "Write and run JavaScript with syntax coloring, document support, and code keyboard shortcuts. Optional Apple Intelligence assistance runs on supported devices.", ...app.screenshots[6] },
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
      <nav className={styles.navigation} aria-label="Codable navigation">
        <Link href="/codable" className={styles.brand}><Image src={app.icon} width={34} height={34} alt="" /><span>Codable</span></Link>
        <div className={styles.navLinks}><a href="#tools">The toolkit</a><a href="#screenshots">Screenshots</a></div>
        <Link href="/" className={styles.portfolioLink}>Jeremy Collins <span aria-hidden="true"><AppArrow /></span></Link>
      </nav>
      <main>
        <section className={styles.codableHero} aria-labelledby="codable-title">
          <div className={styles.codableHeroCopy}>
            <p className={styles.eyebrow}><span className={styles.statusDot} />SAFARI EXTENSION + IOS APP</p>
            <h1 className={styles.codableTitle} id="codable-title">Safari tools<br />for web<br /><span>developers</span></h1>
            <p className={styles.lead}>Inspect HTML. Edit CSS. Run JavaScript.<br />Your web toolkit, on iPhone and iPad.</p>
            <a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true"><AppArrow /></span></a>
            <p className={styles.downloadNote}>Free to use <span>·</span> No ads or tracking</p>
            <div className={styles.heroFootnote}><span aria-hidden="true">&lt;/&gt;</span><p>Works in Safari.<br />No desktop connection required.</p></div>
          </div>
          <div className={styles.blueprint}>
            <div className={styles.blueprintHeading}><span><span className={styles.crosshair} aria-hidden="true" />A CLOSER LOOK AT THE WEB</span><span>SAFARI</span></div>
            <div className={styles.blueprintScreens}><div className={styles.heroPrimaryShot}><AppScreenshot shot={app.screenshots[0]} priority /></div><div className={styles.heroSecondaryShot}><AppScreenshot shot={app.screenshots[1]} priority /></div></div>
            <div className={styles.blueprintFooter}><span>ELEMENTS</span><span>CONSOLE</span><span>NETWORK</span><span>RESIZE</span></div>
          </div>
        </section>
        <div className={styles.capabilities}><span>Built for the browser</span><p>Safari extension</p><span aria-hidden="true">/</span><p>Responsive testing</p><span aria-hidden="true">/</span><p>JavaScript scratchpad</p></div>
        <section id="tools" className={styles.section} aria-labelledby="codable-tools">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>THE TOOLKIT</p><h2 id="codable-tools">Inspect, test,<br />and debug</h2></div><p>The tools you reach for on a desktop,<br className={styles.desktopBreak} /> ready when you’re on your phone.</p></div>
          <AppToolExplorer tools={tools} />
        </section>
        <section className={styles.resizeSection} aria-labelledby="resize-title">
          <div className={styles.resizeArtwork}><div className={styles.viewportBrackets} aria-hidden="true" /><AppScreenshot shot={app.screenshots[2]} /></div>
          <div className={styles.resizeCopy}><p className={styles.eyebrow}>RESPONSIVE TESTING</p><h2 id="resize-title">Change the viewport<br /><span>Keep the context</span></h2><p>Test the page at a different width, height, or scale. Choose a device preset or use the drag handles to find exactly where your layout breaks.</p><div className={styles.specList}><div><span>Width & height</span><span>Adjustable</span></div><div><span>Device presets</span><span>Built in</span></div><div><span>Scale controls</span><span>Included</span></div></div></div>
        </section>
        <section id="screenshots" className={styles.section} aria-labelledby="codable-screenshots"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>INSIDE CODABLE</p><h2 id="codable-screenshots">See the tools in action</h2></div><p>Elements, console, source, network,<br className={styles.desktopBreak} /> resources, Resize, and Scratchpad.</p></div><AppScreenshotGallery shots={app.screenshots} appName="Codable" /></section>
        <section id="download" className={styles.codableDownload} aria-labelledby="codable-download"><div><p className={styles.eyebrow}>FOR IPHONE AND IPAD</p><h2 id="codable-download">Get Codable<br />for iPhone and iPad</h2><p>Free developer tools. Ready when you need them.</p></div><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true"><AppArrow /></span></a></section>
        <div className={styles.compatibility}>Apple Intelligence features are optional and require a supported device.</div>
      </main>
      <footer className={styles.footer}><Link href="/">Made by Jeremy Collins</Link><div><Link href="/taktung">Explore Taktung <span aria-hidden="true"><AppArrow /></span></Link><Link href="/codable-privacy-policy">Privacy</Link><a href="mailto:jeremy@jeremycollins.net">Support</a></div></footer>
    </div>
  );
}
