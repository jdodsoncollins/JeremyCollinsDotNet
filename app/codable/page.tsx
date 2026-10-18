import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppScreenshot } from "@/components/app-screenshot";
import { APP_PRODUCTS } from "@/lib/app-products";
import styles from "@/app/app-pages.module.css";

const app = APP_PRODUCTS.codable;
export const metadata: Metadata = {
  title: "Codable — Web developer tools for iPhone & iPad",
  description: app.description,
  alternates: { canonical: "/codable" },
  openGraph: { title: "Codable — Inspect the web. Right in Safari.", description: app.description, url: "/codable", type: "website", images: [{ url: app.screenshots[0].src, alt: app.screenshots[0].alt }] },
};

export default function CodablePage() {
  return (
    <div className={`${styles.page} ${styles.codable}`}>
      <nav className={styles.nav} aria-label="Codable navigation">
        <Link href="/" className={styles.back}>← Jeremy Collins</Link>
        <Link href="/taktung">Also made here: Taktung ↗</Link>
      </nav>
      <main>
        <section className={styles.codableHero} aria-labelledby="codable-title">
          <div className={styles.heroCopy}>
            <div className={styles.appIdentity}><Image src={app.icon} width={56} height={56} alt="" /><span>Codable<span className={styles.identityNote}>Web developer tools for mobile</span></span></div>
            <p className={styles.eyebrow}>SAFARI DEVELOPER TOOLS</p>
            <h1 id="codable-title">Inspect the web.<br /><span>Right in Safari.</span></h1>
            <p className={styles.lead}>A proper set of web developer tools, right where the web runs. Made for your iPhone and iPad.</p>
            <div className={styles.actions}><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="#tools">Explore the tools ↓</a></div>
            <p className={styles.finePrint}>Free · No ads · No tracking</p>
          </div>
          <div className={styles.heroArt}><AppScreenshot shot={app.screenshots[0]} priority /><AppScreenshot shot={app.screenshots[1]} priority /></div>
        </section>
        <div className={styles.toolStrip} aria-label="Codable tools"><span>Elements</span><span>Console</span><span>Source</span><span>Network</span><span>Resources</span><span>Resize</span><span>Scratchpad</span></div>
        <section id="tools" className={styles.section} aria-labelledby="codable-tools">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>INSPECT. EDIT. TEST.</p><h2 id="codable-tools">Web development tools for iOS.</h2><p>Find the element. Follow the request. Try the fix. Stay in the page you’re working on.</p></div>
          <div className={styles.featureGrid}>
            <article><span className={styles.codeMark} aria-hidden="true">&lt;/&gt;</span><h3>Inspect HTML and CSS.</h3><p>Select elements inline, navigate the DOM, inspect styles and metadata, and edit CSS on the live page.</p></article>
            <article><span className={styles.codeMark} aria-hidden="true">&gt;_</span><h3>Run JavaScript.</h3><p>Evaluate JavaScript in the page, capture console output, and work through an idea in the standalone Scratchpad.</p></article>
            <article><span className={styles.codeMark} aria-hidden="true">↔</span><h3>Test layouts and requests.</h3><p>Test viewport sizes with Resize. Inspect network traffic and resources. Use optional Apple Intelligence assistance on supported devices.</p></article>
          </div>
        </section>
        <section className={`${styles.section} ${styles.gallerySection}`} aria-labelledby="codable-gallery">
          <div className={styles.galleryHeading}><div><p className={styles.eyebrow}>APP SCREENSHOTS</p><h2 id="codable-gallery">Codable screenshots.</h2></div><p>Open any image for a full-size view.</p></div>
          <div className={styles.gallery}>{app.screenshots.slice(2).map((shot) => <AppScreenshot key={shot.src} shot={shot} />)}</div>
        </section>
        <section className={styles.codableClosing}><p className={styles.eyebrow}>FOR IPHONE AND IPAD</p><h2>Get Codable.</h2><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">Get Codable on the App Store ↗</a><p className={styles.finePrint}>For iPhone and iPad. Apple Intelligence features require a supported device.</p></section>
      </main>
      <footer className={styles.footer}><span>Codable · Made by <Link href="/">Jeremy Collins</Link></span><div><Link href="/codable-privacy-policy">Privacy policy</Link><a href="mailto:jeremy@jeremycollins.net">Support</a></div></footer>
    </div>
  );
}
