import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppArrow } from "@/components/app-icons";
import { APP_PRODUCTS } from "@/lib/app-products";
import shared from "@/app/app-pages.module.css";
import styles from "@/app/paper-and-grain.module.css";

const app = APP_PRODUCTS.paperAndGrain;

export const metadata: Metadata = {
  title: "Paper & Grain Support",
  description:
    "Get started with Paper & Grain. Gesture help, saved-paper recovery, compatibility, and support for the paper-folding game on iPhone and iPad.",
  alternates: { canonical: "/paper-and-grain/support" },
  openGraph: {
    title: "Paper & Grain Support",
    description: "Gesture help, saved papers, and support for Paper & Grain.",
    url: "/paper-and-grain/support",
    type: "website",
  },
};

export default function PaperAndGrainSupport() {
  return (
    <div className={`${shared.page} ${styles.page}`}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.header} role="banner">
        <Link href="/paper-and-grain" className={styles.brand}>
          <Image src={app.icon} width={36} height={36} alt="" />
          Paper &amp; Grain
        </Link>
        <Link href="/paper-and-grain" className={styles.maker}>
          Back to the app <AppArrow direction="left" />
        </Link>
      </div>
      <main id="main-content" className={styles.support}>
        <div className={styles.supportIntro}>
          <h1>
            Paper &amp; Grain
            <br />
            support
          </h1>
          <p>Help with lessons, folding gestures, saved papers, and sharing.</p>
          <p>
            Paper &amp; Grain is free for iPhone and iPad running iOS or iPadOS
            26 or later. Its layouts and folding interactions are designed for
            iPhone Duo. Every lesson and Free Fold are free. The optional Tip
            Jar supports the app without unlocking features. There are no
            accounts, ads, or subscriptions.
          </p>
        </div>
        <div className={styles.supportSections}>
          <section aria-labelledby="begin">
            <h2 id="begin">Where to begin</h2>
            <p>
              Start with First Fold, the suggested lesson on the main menu. The
              lesson pages and Guidebook take you through one movement at a
              time. You can revisit any of the eight included lessons or choose
              Free Fold to work on your own paper.
            </p>
            <p>
              Drag the controls card up to read more of a lesson, or down to
              give the paper more room. You can open the Guidebook while you
              work.
            </p>
          </section>
          <section aria-labelledby="gestures">
            <h2 id="gestures">Move the view and fold the paper</h2>
            <ul>
              <li>
                Place two fingers on the wood. Pinch to zoom, slide both fingers
                in the same direction to change the perspective, or twist to
                rotate. You can rotate all the way around to see the underside.
              </li>
              <li>
                Drag one finger on the wood to position the paper across the
                fold guide.
              </li>
              <li>
                Pinch on the paper to fold or unfold. Let the fold settle before
                starting the next crease.
              </li>
              <li>
                In Position, pull one of the original sheet corners inward to
                curl it, then release to settle a fold. To cancel the curl, move
                back toward the corner where you started.
              </li>
              <li>
                On a supported Duo, line up the paper with the center guide
                before folding the device. Device folding requires iOS 27.1 or
                later. Touch gestures are also available.
              </li>
            </ul>
          </section>
          <section aria-labelledby="recover-view">
            <h2 id="recover-view">Bring the paper back into view</h2>
            <p>
              Choose Center &amp; top view if the paper moves off screen or
              becomes difficult to see. It centers the paper and restores a view
              from above without undoing your folds. Use Undo and Redo to change
              the paper itself.
            </p>
          </section>
          <section aria-labelledby="saved">
            <h2 id="saved">Saved papers and sharing</h2>
            <p>
              The app saves completed edits on your device. Open Gallery to
              return to a saved paper. If a save fails, keep the current paper
              open and retry the save. If an earlier save can be recovered, the
              app offers Open earlier save.
            </p>
            <p>
              Sharing starts with an image preview. Choose Share image to open
              the system share sheet and select a destination. Cancelling leaves
              your paper unchanged.
            </p>
            <p>
              The workshop and bundled lessons work offline. The app does not
              provide cloud sync. Exported images and system backups are
              separate from your local gallery.
            </p>
          </section>
          <section aria-labelledby="contact">
            <h2 id="contact">Contact Jeremy</h2>
            <p>
              <a href="mailto:jeremy@jeremycollins.net?subject=Paper%20%26%20Grain%20support">
                Email jeremy@jeremycollins.net
              </a>{" "}
              with your app version, device model, iOS or iPadOS version, and
              the steps that led to the issue. A screenshot or short recording
              can help explain a gesture problem.
            </p>
            <p>
              <Link href="/paper-and-grain/privacy">
                Read the Paper &amp; Grain privacy policy
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link href="/">Made by Jeremy Collins</Link>
        <div>
          <Link href="/paper-and-grain">Paper &amp; Grain</Link>
          <Link href="/paper-and-grain/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
