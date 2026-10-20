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
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <nav className={styles.navigation} aria-label="Taktung navigation">
        <Link href="/taktung" className={styles.brand}><Image src={app.icon} width={34} height={34} alt="" /><span>Taktung</span></Link>
        <div className={styles.navLinks}><a href="#compare">Comparisons</a><a href="#widgets">Widgets</a><a href="#screenshots">Screenshots</a></div>
        <Link href="/" className={styles.portfolioLink}>Jeremy Collins <span aria-hidden="true"><AppArrow /></span></Link>
      </nav>
      <main id="main-content">
        <section className={styles.taktungHero} aria-labelledby="taktung-title">
          <div className={styles.taktungHeroCopy}>
            <h1 className={styles.taktungTitle} id="taktung-title">Vercel<br />deployments<em>on iPhone<br />and iPad</em></h1>
            <p className={styles.taktungLead}>Check what’s live, compare page captures, and read your build logs. Follow a deployment from its latest commit to the details that need your attention.</p>
            <a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true"><AppArrow /></span></a>
            <p className={styles.requirements}>iOS &amp; iPadOS {app.minimumOS} or later</p>
            <p className={styles.monetizationNote}>Free to use. No ads, tracking, subscriptions, or in-app purchases.</p>
            <p className={styles.downloadNote}>Requires a Vercel account.</p>
          </div>
          <div className={styles.taktungHeroArtwork}><AppScreenshot shot={app.screenshots[0]} priority /><p>Production status, the latest commit,<br />and your next check in one view.</p></div>
        </section>
        <div className={styles.taktungFeatureStrip} aria-label="Taktung features"><span>Production status</span><span>Build &amp; runtime logs</span><span>Visual comparisons</span><span>Local Field Log</span></div>
        <section id="compare" className={styles.section} aria-labelledby="taktung-compare">
          <div className={styles.sectionHeading}><h2 id="taktung-compare">Review the deployment</h2><p>See what changed on the page.<br />Keep the evidence for your next check.</p></div>
          <div className={styles.evidenceGrid}>
            <article className={styles.compareCard}><div className={styles.cardCopy}><h3>Compare before and after</h3><p>Inspect real page captures with a reveal slider or side-by-side view. Save a baseline to compare against the next deployment.</p></div><div className={styles.comparePreview}><AppScreenshot shot={app.screenshots[1]} /></div></article>
            <article className={styles.fieldCard}><div className={styles.cardCopy}><h3>Keep a local Field Log</h3><p>Find your checks, saved comparisons, and personal notes in a searchable record. Export them as text when you need to.</p></div><div className={styles.fieldPreview}><AppScreenshot shot={app.screenshots[4]} /></div></article>
          </div>
          <div className={styles.workflowNotes}>
            <div><span className={styles.noteMark} aria-hidden="true"><AppIcon name="logs" /></span><h3>Read the logs</h3><p>Search build output and inspect a bounded set of runtime logs for a selected deployment.</p></div>
            <div><span className={styles.noteMark} aria-hidden="true"><AppIcon name="environment" /></span><h3>Inspect the project</h3><p>Review domains, checks, cron jobs, and feature flag names. Check environment names and targets without exposing values.</p></div>
            <div><span className={styles.noteMark} aria-hidden="true"><AppIcon name="shortcut" /></span><h3>Use Siri and Shortcuts</h3><p>Ask for deployment status or check a project’s loaded signals without navigating through the app.</p></div>
          </div>
        </section>
        <section id="widgets" className={styles.widgetSection} aria-labelledby="taktung-widgets">
          <div className={styles.widgetCopy}><h2 id="taktung-widgets">Deployment widgets<br /><em>for your<br />Home Screen</em></h2><p>Keep recent deployment status and activity in view. Follow all your projects or focus on a single site, in small, medium, and large widgets.</p><a href="#screenshots" className={styles.textLink}>See the app screenshots <span aria-hidden="true"><AppArrow /></span></a></div>
          <div className={styles.widgetArtwork}><AppScreenshotGallery shots={[app.screenshots[2], app.screenshots[3]]} appName="Taktung" variant="hero" label="Taktung Home Screen widgets" /></div>
        </section>
        <section id="screenshots" className={styles.section} aria-labelledby="taktung-screenshots"><div className={styles.sectionHeading}><h2 id="taktung-screenshots">Explore Taktung</h2><p>Production, page comparisons, widgets,<br />Field Log, and project tools.</p></div><AppScreenshotGallery shots={app.screenshots} appName="Taktung" /></section>
        <section className={styles.privacySection} aria-labelledby="taktung-privacy">
          <div><h2 id="taktung-privacy">Deployment actions<br /><em>with confirmation</em></h2><p className={styles.privacyIntro}>Your account, your projects, and a clear step before making a change.</p></div>
          <div className={styles.privacyDetails}>
            <div><span aria-hidden="true"><AppIcon name="check" /></span><h3>Review before you act</h3><p>Redeploy, promote, and rollback actions each require your confirmation.</p></div>
            <div><span aria-hidden="true"><AppIcon name="key" /></span><h3>Your token stays in the Keychain</h3><p>Taktung connects directly to Vercel. Your credentials stay on your device.</p></div>
            <div><span aria-hidden="true"><AppIcon name="note" /></span><h3>Your history stays local</h3><p>Notes and saved baselines stay on your device, separated by account and team. No ads or tracking.</p></div>
          </div>
        </section>
        <section id="support" className={styles.supportSection} aria-labelledby="taktung-support"><h2 id="taktung-support">Taktung support</h2><div><p>Need help with a connection, deployment, or widget? <a href="mailto:jeremy@jeremycollins.net?subject=Taktung%20support">Email Jeremy</a> with your app version, device, and the steps that led to the issue. Please leave access tokens and other credentials out of your message.</p><p><Link href="/taktung-privacy-policy">Read the privacy policy</Link> for details about credentials, local storage, and connections to Vercel.</p></div></section>
        <section id="download" className={styles.taktungDownload} aria-labelledby="taktung-download"><Image src={app.icon} width={64} height={64} alt="" /><h2 id="taktung-download">Get Taktung</h2><p>Vercel deployment tools for iPhone and iPad.</p><a className={styles.primaryButton} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <span aria-hidden="true"><AppArrow /></span></a><p className={styles.downloadNote}>Requires a Vercel account. Taktung is not affiliated with or endorsed by Vercel.</p></section>
      </main>
      <footer className={styles.footer}><div className={styles.footerIdentity}><Link href="/">Made by Jeremy Collins</Link><div><Link href="/taktung-privacy-policy">Privacy</Link><a href="mailto:jeremy@jeremycollins.net?subject=Taktung%20support">Support</a></div></div><nav aria-label="More apps"><Link href="/codable">Codable</Link><Link href="/tabforge">TabForge</Link><Link href="/paper-and-grain">Paper &amp; Grain</Link></nav></footer>
    </div>
  );
}
