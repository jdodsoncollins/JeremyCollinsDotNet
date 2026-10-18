import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppScreenshot } from "@/components/app-screenshot";
import { APP_PRODUCTS } from "@/lib/app-products";
import styles from "@/app/app-pages.module.css";

const app = APP_PRODUCTS.taktung;
export const metadata: Metadata = {
  title: "Taktung — Vercel deployment status, logs & widgets",
  description: app.description,
  alternates: { canonical: "/taktung" },
  openGraph: { title: "Taktung — Vercel deployment status, logs & widgets", description: app.description, url: "/taktung", type: "website", images: [{ url: app.screenshots[0].src, alt: app.screenshots[0].alt }] },
};

export default function TaktungPage() {
  return (
    <div className={`${styles.page} ${styles.taktung}`}>
      <nav className={styles.nav} aria-label="Taktung navigation"><Link href="/" className={styles.back}>← Jeremy Collins</Link><Link href="/codable">Also made here: Codable ↗</Link></nav>
      <main>
        <section className={styles.taktungHero} aria-labelledby="taktung-title">
          <div className={styles.heroCopy}>
            <div className={styles.appIdentity}><Image src={app.icon} width={56} height={56} alt="" /><span>Taktung<span className={styles.identityNote}>Vercel deployment status</span></span></div>
            <p className={styles.eyebrow}>VERCEL DEPLOYMENT TOOLS</p>
            <h1 id="taktung-title">Vercel deployments<br /><span>On iPhone and iPad</span></h1>
            <p className={styles.lead}>Check production status, read build logs, and compare deployments from your phone or tablet.</p>
            <div className={styles.actions}><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store ↗</a><a className={styles.textLink} href="#field-notes">Explore features ↓</a></div>
            <p className={styles.finePrint}>Free · iPhone & iPad · Your Vercel account</p>
          </div>
          <div className={styles.taktungHeroArt}><div className={styles.orbit} aria-hidden="true" /><AppScreenshot shot={app.screenshots[0]} priority /></div>
        </section>
        <section id="field-notes" className={`${styles.section} ${styles.fieldNotes}`} aria-labelledby="taktung-workflow">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>STATUS, LOGS, AND COMPARISONS</p><h2 id="taktung-workflow">Check and compare<br />your deployments.</h2></div>
          <div className={styles.notesGrid}>
            <article><span className={styles.noteNumber}>01 / CHECK IN</span><h3>Check production status.</h3><p>See production status and recent deployments. Read build logs and check loaded signals when something needs a closer look.</p></article>
            <article><span className={styles.noteNumber}>02 / COMPARE</span><h3>Compare deployments.</h3><p>Compare real page captures with a reveal slider or side-by-side view. Save a baseline for your next deployment.</p></article>
            <article><span className={styles.noteNumber}>03 / REMEMBER</span><h3>Save checks and notes.</h3><p>Save checks, comparisons, and your notes in a searchable local Field Log, with text export when you need it.</p></article>
          </div>
        </section>
        <section className={styles.widgetFeature} aria-labelledby="taktung-widgets">
          <div><p className={styles.eyebrow}>HOME SCREEN WIDGETS</p><h2 id="taktung-widgets">Deployment status.<br />On your Home Screen.</h2><p>Small, medium, and large Home Screen widgets keep deployment status and recent activity nearby. Follow all projects or choose one site.</p><p>Siri and Shortcuts bring another way to check in.</p></div>
          <AppScreenshot shot={app.screenshots[2]} /><AppScreenshot shot={app.screenshots[3]} />
        </section>
        <section className={styles.section} aria-labelledby="taktung-gallery"><div className={styles.galleryHeading}><div><p className={styles.eyebrow}>APP SCREENSHOTS</p><h2 id="taktung-gallery">Taktung screenshots.</h2></div><p>Open any image for a full-size view.</p></div><div className={styles.gallery}>{[app.screenshots[1], ...app.screenshots.slice(4)].map((shot) => <AppScreenshot key={shot.src} shot={shot} />)}</div></section>
        <section className={styles.trustSection}><p className={styles.eyebrow}>CONFIRMATION AND PRIVACY</p><div><h2>Review every<br />deployment action.</h2><div><p>Redeploy, promote, and rollback actions ask you to review and confirm. Your token stays in the device Keychain. Taktung talks directly to Vercel.</p><p>History and saved baselines stay on your device, separated by account and team. No ads or tracking.</p></div></div></section>
        <section className={styles.taktungClosing}><h2>Get Taktung.</h2><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">Get Taktung on the App Store ↗</a><p className={styles.finePrint}>Requires a Vercel account. Taktung is not affiliated with or endorsed by Vercel.</p></section>
      </main>
      <footer className={styles.footer}><span>Taktung · Made by <Link href="/">Jeremy Collins</Link></span><div><Link href="/taktung-privacy-policy">Privacy policy</Link><a href="mailto:jeremy@jeremycollins.net">Support</a></div></footer>
    </div>
  );
}
