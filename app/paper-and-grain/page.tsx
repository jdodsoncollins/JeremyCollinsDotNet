import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppArrow } from "@/components/app-icons";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppScreenshotGallery } from "@/components/app-screenshot-gallery";
import { APP_PRODUCTS } from "@/lib/app-products";
import { paperAndGrainJsonLd } from "@/lib/json-ld";
import shared from "@/app/app-pages.module.css";
import styles from "@/app/paper-and-grain.module.css";

const app = APP_PRODUCTS.paperAndGrain;

export const metadata: Metadata = {
  title: "Paper & Grain — Fold, cut, and draw on iPhone & iPad",
  description: app.description,
  alternates: { canonical: "/paper-and-grain" },
  openGraph: {
    title: "Paper & Grain — Fold, cut, and draw",
    description: app.description,
    url: "/paper-and-grain",
    type: "website",
    images: [{ url: app.screenshots[0].src, alt: app.screenshots[0].alt }],
  },
};

function DownloadLink() {
  return <a className={styles.download} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <AppArrow /></a>;
}

export default function PaperAndGrainPage() {
  return (
    <div className={`${shared.page} ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...paperAndGrainJsonLd }).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <div className={styles.header} role="banner">
        <Link href="/paper-and-grain" className={styles.brand}><Image src={app.icon} width={36} height={36} alt="" />Paper &amp; Grain</Link>
        <nav className={styles.navigation} aria-label="Paper & Grain navigation"><a href="#workshop">The workshop</a><a href="#lessons">Lessons</a><Link href="/paper-and-grain/support">Help</Link></nav>
        <Link href="/" className={styles.maker}>Jeremy Collins <AppArrow /></Link>
      </div>
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="paper-title">
          <div>
            <h1 id="paper-title">Fold, cut,<br /><em>and draw</em></h1>
            <p className={styles.lead}>A quiet paper workshop<br />for iPhone and iPad.</p>
            <p className={styles.intro}>Begin with a sheet. Try a crease, follow a lesson, or make a shape of your own. There’s no timer and no losing.</p>
            <DownloadLink />
            <p className={styles.note}>Free to use. No ads, tracking, subscriptions, or in-app purchases.</p>
          </div>
          <div className={styles.heroArt}><AppScreenshot shot={app.screenshots[0]} priority /></div>
        </section>

        <dl className={styles.facts}><div><dt>Eight lessons</dt><dd>A fold at a time</dd></div><div><dt>Free Fold</dt><dd>Your own blank sheet</dd></div><div><dt>No timer</dt><dd>Work at your pace</dd></div></dl>

        <section id="workshop" className={styles.workshop} aria-labelledby="workshop-title">
          <div className={styles.sectionHeading}><h2 id="workshop-title">A sheet of paper<br />Three ways to play</h2><p>Warm wood, softly textured paper, and simple tools. Turn the sheet in 3D to see what’s happening beneath a fold.</p></div>
          <ol className={styles.process}>
            <li><h3>Fold</h3><p>Pinch a crease or pull a corner. Watch the paper curl as you move, then let the fold settle flat.</p></li>
            <li><h3>Cut</h3><p>Try a paper-cut shape. Fold the sheet, make a cut, and unfold it to see the result.</p></li>
            <li><h3>Draw</h3><p>Add light pencil lines to your paper. Undo and Redo give you room to try another idea.</p></li>
          </ol>
        </section>

        <section id="lessons" className={styles.lessons} aria-labelledby="lessons-title">
          <div className={styles.lessonCopy}><h2 id="lessons-title">Begin with<br />a single crease</h2><p>Eight guided lessons move from a first fold to simple kites, folded letters, paper-cut shapes, and square-base studies.</p><p>Follow each step and its diagram. Bring the controls card up when you want to read, or move it down to give your paper more room.</p><h3>A guide beside your work</h3><p>Open the Guidebook whenever you need a reminder. Clear diagrams explain the next movement while your paper stays close at hand.</p><div className={styles.supportLink}><Link className={styles.textLink} href="/paper-and-grain/support">Gesture help and getting started <AppArrow /></Link></div></div>
          <div className={styles.lessonImages}><AppScreenshot shot={app.screenshots[1]} /><AppScreenshot shot={app.screenshots[2]} /></div>
        </section>

        <section className={styles.freeFold} aria-labelledby="free-fold-title"><div className={styles.freeFoldInner}><h2 id="free-fold-title">Or start with<br />a blank sheet</h2><div><p>Free Fold leaves the next move to you. Fold and unfold, turn the paper over, cut a new shape, or add a few pencil lines.</p><p>Save editable sheets in your gallery and come back to them later. Undo a crease, try a different direction, and keep exploring.</p></div></div></section>

        <section id="screenshots" className={styles.screenshots} aria-labelledby="screenshots-title"><div className={styles.sectionHeading}><h2 id="screenshots-title">Inside the<br />paper workshop</h2><p>Explore the workspace, follow a guided lesson, and keep the Guidebook close at hand.</p></div><AppScreenshotGallery shots={app.screenshots} appName="Paper & Grain" /></section>

        <section className={styles.downloadSection} aria-labelledby="download-title"><div className={styles.downloadInner}><div><div className={styles.downloadTitle}><Image src={app.icon} width={60} height={60} alt="" /><h2 id="download-title">Paper &amp; Grain<br />for iPhone and iPad</h2></div><p>All eight lessons and Free Fold are included.<br />Pick a sheet and see what you can make.</p></div><div className={styles.downloadActions}><DownloadLink /><p>Free · iOS &amp; iPadOS 26 or later</p></div></div><p className={styles.compatibility}>Touch controls work without a folding device. Optional folding along the device seam on a supported iPhone Duo requires iOS 27.1 or later.</p></section>
      </main>
      <footer className={styles.footer}><Link href="/">Made by Jeremy Collins</Link><nav aria-label="Other apps"><Link href="/codable">Codable</Link><Link href="/taktung">Taktung</Link><Link href="/tabforge">TabForge</Link></nav><div><Link href="/paper-and-grain/support">Support</Link><Link href="/paper-and-grain-privacy-policy">Privacy</Link></div></footer>
    </div>
  );
}
