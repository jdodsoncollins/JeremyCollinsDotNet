import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppArrow } from "@/components/app-icons";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppScreenshotGallery } from "@/components/app-screenshot-gallery";
import { APP_PRODUCTS } from "@/lib/app-products";
import { tabforgeJsonLd } from "@/lib/json-ld";
import shared from "@/app/app-pages.module.css";
import styles from "@/app/tabforge.module.css";

const app = APP_PRODUCTS.tabforge;

export const metadata: Metadata = {
  title: "TabForge — Code keyboard for iPhone & iPad",
  description: app.description,
  alternates: { canonical: "/tabforge" },
  openGraph: {
    title: "TabForge — Code keyboard for iPhone & iPad",
    description: app.description,
    url: "/tabforge",
    type: "website",
    images: [{ url: app.duoScreenshots[0].src, width: app.duoScreenshots[0].width, height: app.duoScreenshots[0].height, alt: app.duoScreenshots[0].alt }],
  },
};

function DownloadLink() {
  return <a className={styles.download} href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <AppArrow /></a>;
}

export default function TabForgePage() {
  return (
    <div className={`${shared.page} ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...tabforgeJsonLd }).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <div className={styles.header} role="banner">
        <Link href="/tabforge" className={styles.brand}><Image src={app.icon} width={36} height={36} alt="" />TabForge</Link>
        <nav className={styles.navigation} aria-label="TabForge navigation"><a href="#editing">Editing</a><a href="#layouts">Layouts</a><a href="#screenshots">Screenshots</a></nav>
        <Link href="/" className={styles.maker}>Jeremy Collins <AppArrow /></Link>
      </div>
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="tabforge-title">
          <div className={styles.heroCopy}>
            <h1 id="tabforge-title">A code keyboard<br />for iPhone<br />and iPad</h1>
            <p className={styles.lead}>Braces, brackets, and Tab. Right beside the letter keys.</p>
            <p className={styles.intro}>Write code, scripts, and terminal commands with punctuation and editing controls close at hand.</p>
            <p className={styles.duoNote}>Best on iPhone Duo.</p>
            <DownloadLink />
            <p className={styles.requirements}>Open source · iOS &amp; iPadOS {app.minimumOS} or later</p>
            <p className={styles.freeNote}>Free to use. No ads, tracking, subscriptions, or in-app purchases.</p>
          </div>
          <div className={styles.heroImages} data-duo-hero>
            <AppScreenshot shot={app.duoScreenshots[0]} priority sizes="(max-width:760px) calc(100vw - 48px), (max-width:1100px) 45vw, 600px" />
          </div>
        </section>

        <dl className={styles.quickFacts}>
          <div><dt>Programming keys</dt><dd>Full ASCII punctuation</dd></div>
          <div><dt>Indentation</dt><dd>Tab, two spaces, or four</dd></div>
          <div><dt>Privacy</dt><dd>No Full Access requested</dd></div>
        </dl>

        <section id="editing" className={styles.editing} aria-labelledby="editing-title">
          <div className={styles.sectionIntro}><h2 id="editing-title">Indentation<br />and editing</h2><p>Indent a line, move the cursor, or insert a saved snippet. The gear menu opens settings and code tools in the app you’re typing in.</p></div>
          <div className={styles.editingGrid}>
            <div className={styles.editingImage}><AppScreenshot shot={app.screenshots[1]} /></div>
            <div className={styles.tools}>
              <div><div className={styles.keyGroup} aria-hidden="true"><kbd>{"{"}</kbd><kbd>{"}"}</kbd><kbd>[</kbd><kbd>]</kbd><kbd>&lt;</kbd><kbd>&gt;</kbd></div><h3>Punctuation within reach</h3><p>Type brackets, braces, parentheses, and the full set of ASCII punctuation without switching away from the letter keys.</p></div>
              <div><div className={styles.keyGroup} aria-hidden="true"><kbd>⇥</kbd><kbd>⇤</kbd><kbd>←</kbd><kbd>→</kbd></div><h3>Indent and navigate</h3><p>Choose your indentation style. Use indent, outdent, automatic newline indentation, and arrows to keep the next edit close.</p></div>
              <div><div className={styles.snippet} aria-hidden="true"><span>{"git status"}</span><span>{"=>"}</span><span>{"console.log()"}</span></div><h3>Save the things you repeat</h3><p>Keep commands, operators, and repeated text as custom snippets. Language suggestions cover Swift, Python, JavaScript, TypeScript, Shell, and JSON.</p></div>
            </div>
          </div>
        </section>

        <section id="layouts" className={styles.layouts} aria-labelledby="layouts-title">
          <div className={styles.layoutCopy}><h2 id="layouts-title">Keyboard<br />layouts</h2><p>Phone layouts keep familiar letter keys. Compact landscape layouts leave more room for the app above. Larger iPad layouts bring more controls into view.</p><p>Choose key size and keyboard height, follow the system’s light or dark appearance, or pick a code palette.</p><a className={styles.textLink} href="#screenshots">See the layouts and themes <AppArrow /></a></div>
          <div className={styles.layoutImages}><AppScreenshotGallery shots={[app.screenshots[4], app.screenshots[3]]} appName="TabForge" variant="hero" label="TabForge keyboard layouts and themes" /></div>
        </section>

        <section className={styles.profiles} aria-labelledby="profiles-title">
          <div><h2 id="profiles-title">Input profiles</h2><p>Input profiles adapt the keyboard to your task. The host app still determines which text and controls it accepts.</p></div>
          <div className={styles.profileList}>
            <details open><summary>Code editor</summary><p>Pair brackets and use indentation controls while you write. Line edits need enough context from the app to verify the change.</p></details>
            <details><summary>Terminal · ANSI</summary><p>Keep Escape, arrows, and modifier controls close. Terminal behavior depends on your client and the control text it supports.</p></details>
            <details><summary>Remote desktop</summary><p>Use literal input for a remote session. A keyboard extension inserts text; it cannot send arbitrary hardware key events.</p></details>
          </div>
        </section>

        <section id="screenshots" className={styles.screenshots} aria-labelledby="screenshots-title">
          <div className={styles.sectionIntro}><h2 id="screenshots-title">A closer look<br />at TabForge</h2><p>Programming keys, editing controls, keyboard themes, and layouts for your screen.</p></div>
          <div className={shared.duoGalleryBlock}>
            <h3 className={shared.galleryDeviceHeading}>iPhone Duo</h3>
            <AppScreenshotGallery shots={app.duoScreenshots} appName="TabForge" variant="duo" label="TabForge iPhone Duo screenshots" />
          </div>
          <h3 className={shared.galleryDeviceHeading}>iPhone</h3>
          <AppScreenshotGallery shots={app.screenshots} appName="TabForge" label="TabForge iPhone screenshots" />
        </section>

        <section className={styles.openSource} aria-labelledby="source-title">
          <div><h2 id="source-title">Your keystrokes<br />stay yours</h2><p>The keyboard does not log or transmit what you type. No Full Access is requested. No ads, analytics, or accounts.</p><Link href="/tabforge-privacy-policy" className={styles.textLink}>Read the privacy policy <AppArrow /></Link></div>
          <div className={styles.sourceNotes}><h3>Open source, under the MIT license</h3><p>Find the source, licensing, and privacy details in the companion app.</p><a className={styles.textLink} href="https://github.com/jdodsoncollins/TabForge" target="_blank" rel="noopener noreferrer">Browse the source on GitHub <AppArrow /></a><h3>A place to work on a draft</h3><p>The companion playground includes syntax highlighting, line numbers, undo, and sharing. It edits text; it does not run code. Its settings and draft are separate from the installed keyboard.</p></div>
        </section>

        <section className={styles.finalDownload} aria-labelledby="download-title"><Image src={app.icon} width={64} height={64} alt="" /><div><h2 id="download-title">Get TabForge</h2><p>For iPhone and iPad · iOS &amp; iPadOS {app.minimumOS} or later</p></div><DownloadLink /></section>
        <p className={styles.compatibility}>iOS uses its system keyboard in secure and phone fields. Some apps decline third-party keyboards. Duo-specific layouts require iOS 27.1 or later.</p>
      </main>
      <footer className={styles.footer}><Link href="/">Made by Jeremy Collins</Link><nav aria-label="Other apps"><Link href="/codable">Codable</Link><Link href="/taktung">Taktung</Link><Link href="/paper-and-grain">Paper &amp; Grain</Link></nav><div><Link href="/tabforge-privacy-policy">Privacy</Link><a href="mailto:jeremy@jeremycollins.net?subject=TabForge%20support">Support</a></div></footer>
    </div>
  );
}
