import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppScreenshotGallery } from "@/components/app-screenshot-gallery";
import { APP_PRODUCTS } from "@/lib/app-products";
import { AppArrow, AppIcon } from "@/components/app-icons";
import styles from "@/app/app-pages.module.css";

const app = APP_PRODUCTS.taktung;
export const metadata: Metadata = {
  title: "Taktung — Vercel deployment status, logs & widgets",
  description: app.description,
  alternates: { canonical: "/taktung" },
  openGraph: { title: "Taktung — Vercel deployments on iPhone and iPad", description: app.description, url: "/taktung", type: "website", images: [{ url: app.screenshots[0].src, alt: app.screenshots[0].alt }] },
};

export default function TaktungPage() {
  return (
    <div className={`${styles.page} ${styles.taktung}`}>
      <nav className={styles.navigation} aria-label="Taktung navigation"><Link href="/taktung" className={styles.brand}><Image src={app.icon} width={34} height={34} alt="" /><span>Taktung</span></Link><div className={styles.navLinks}><a href="#compare">Compare</a><a href="#widgets">Widgets</a><a href="#screenshots">Screenshots</a></div><Link href="/" className={styles.portfolioLink}>Jeremy Collins <span aria-hidden="true"><AppArrow /></span></Link></nav>
      <main>
        <section className={styles.taktungHero} aria-labelledby="taktung-title">
          <p className={styles.eyebrow}><span className={styles.statusDot} />YOUR VERCEL PROJECTS, ON IOS</p>
          <h1 className={styles.taktungTitle} id="taktung-title">Vercel deployments<br /><em>on iPhone and iPad</em></h1>
          <p className={styles.taktungLead}>Check what’s live. See what changed.<br />Keep production status, logs, and comparisons close.</p>
          <div className={styles.centerActions}><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true"><AppArrow /></span></a><span>Free · Your Vercel account</span></div>
          <div className={styles.instrumentLine} aria-hidden="true"><i /><i /><i /><i /></div>
          <div className={styles.triptych}>
            <div className={styles.triptychSide}><div className={styles.shotLabel}><span>VISUAL COMPARISON</span><span aria-hidden="true"><AppArrow /></span></div><AppScreenshot shot={app.screenshots[1]} priority /></div>
            <div className={styles.triptychCenter}><div className={styles.shotLabel}><span className={styles.statusDot} /><span>PRODUCTION STATUS</span></div><AppScreenshot shot={app.screenshots[0]} priority /></div>
            <div className={styles.triptychSide}><div className={styles.shotLabel}><span>HOME SCREEN WIDGETS</span><span aria-hidden="true"><AppArrow /></span></div><AppScreenshot shot={app.screenshots[2]} priority /></div>
          </div>
          <div className={styles.taktungFeatureStrip}><span>Production status</span><span>Build logs</span><span>Visual comparisons</span><span>Local Field Log</span></div>
        </section>
        <section id="compare" className={styles.section} aria-labelledby="taktung-compare"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>REVIEW THE DEPLOYMENT</p><h2 id="taktung-compare">Deployment status<br />and visual comparisons</h2></div><p>Start with the latest deploy.<br />Follow the details when you need them.</p></div>
          <div className={styles.evidenceGrid}>
            <div className={styles.compareCard}><div className={styles.cardCopy}><span className={styles.tinyLabel}>COMPARE</span><h3>See what changed</h3><p>Compare real page captures with a reveal slider or side-by-side view. Save a baseline for the next deployment.</p></div><div className={styles.comparePreview}><AppScreenshot shot={app.screenshots[1]} /></div></div>
            <div className={styles.fieldCard}><div className={styles.cardCopy}><span className={styles.tinyLabel}>FIELD LOG</span><h3>Save checks and notes</h3><p>Checks, comparisons, and personal notes in a searchable local log. Export them as text when you need to.</p></div><div className={styles.fieldPreview}><AppScreenshot shot={app.screenshots[4]} /></div></div>
          </div>
          <div className={styles.workflowNotes}><div><span className={styles.noteMark} aria-hidden="true"><AppIcon name="logs" /></span><h3>Read the build logs</h3><p>Investigate failed builds and review the deployment details.</p></div><div><span className={styles.noteMark} aria-hidden="true"><AppIcon name="environment" /></span><h3>Check your environment</h3><p>Review variable names and targets without exposing their values.</p></div><div><span className={styles.noteMark} aria-hidden="true"><AppIcon name="shortcut" /></span><h3>Use Siri and Shortcuts</h3><p>Ask for deployment status or check a project’s loaded signals.</p></div></div>
        </section>
        <section id="widgets" className={styles.widgetSection} aria-labelledby="taktung-widgets"><div className={styles.widgetCopy}><p className={styles.eyebrow}>HOME SCREEN WIDGETS</p><h2 id="taktung-widgets">Deployment status<br /><em>without opening<br />the app</em></h2><p>Small, medium, and large widgets show recent deployment status and activity. Follow all your projects or focus on one site.</p><div className={styles.widgetSizes} aria-label="Widget sizes"><span>Small</span><span>Medium</span><span>Large</span></div></div><div className={styles.widgetArtwork}><AppScreenshot shot={app.screenshots[2]} /><AppScreenshot shot={app.screenshots[3]} /></div></section>
        <section id="screenshots" className={styles.section} aria-labelledby="taktung-screenshots"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>INSIDE TAKTUNG</p><h2 id="taktung-screenshots">A closer look at the app</h2></div><p>Production, comparisons, widgets,<br />Field Log, and appearance settings.</p></div><AppScreenshotGallery shots={app.screenshots} appName="Taktung" /></section>
        <section className={styles.privacySection} aria-labelledby="taktung-privacy"><div><p className={styles.eyebrow}>CONFIRMATION & PRIVACY</p><h2 id="taktung-privacy">Review before<br />you take action</h2></div><div className={styles.privacyDetails}><div><span aria-hidden="true"><AppIcon name="check" /></span><h3>Confirm each deployment action</h3><p>Review and confirm redeploy, promote, and rollback actions.</p></div><div><span aria-hidden="true"><AppIcon name="key" /></span><h3>Your credentials stay on device</h3><p>Your token stays in the Keychain. Taktung connects directly to Vercel.</p></div><div><span aria-hidden="true"><AppIcon name="note" /></span><h3>Your history stays local</h3><p>Notes and saved baselines stay on your device, separated by account and team. No ads or tracking.</p></div></div></section>
        <section id="download" className={styles.taktungDownload} aria-labelledby="taktung-download"><Image src={app.icon} width={64} height={64} alt="" /><p className={styles.eyebrow}>FOR IPHONE AND IPAD</p><h2 id="taktung-download">Get Taktung</h2><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true"><AppArrow /></span></a><p className={styles.downloadNote}>Requires a Vercel account. Taktung is not affiliated with or endorsed by Vercel.</p></section>
      </main>
      <footer className={styles.footer}><Link href="/">Made by Jeremy Collins</Link><div><Link href="/codable">Explore Codable <span aria-hidden="true"><AppArrow /></span></Link><Link href="/taktung-privacy-policy">Privacy</Link><a href="mailto:jeremy@jeremycollins.net">Support</a></div></footer>
    </div>
  );
}
