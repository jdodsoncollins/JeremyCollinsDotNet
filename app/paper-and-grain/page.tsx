import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppArrow } from "@/components/app-icons";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppScreenshotGallery } from "@/components/app-screenshot-gallery";
import { AppMotion } from "@/components/app-motion";
import { AppOverview } from "@/components/app-overview";
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
    images: [
      {
        url: app.duoScreenshots[0].src,
        width: app.duoScreenshots[0].width,
        height: app.duoScreenshots[0].height,
        alt: app.duoScreenshots[0].alt,
      },
    ],
  },
};

function DownloadLink() {
  return (
    <a
      className={styles.download}
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      View in App Store <AppArrow />
    </a>
  );
}

export default function PaperAndGrainPage() {
  return (
    <div
      className={`${shared.page} ${styles.page}`}
      data-app-page="paper-and-grain"
    >
      <AppMotion app="paper-and-grain" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...paperAndGrainJsonLd,
          }).replace(/</g, "\\u003c"),
        }}
      />
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.header} role="banner">
        <Link href="/paper-and-grain" className={styles.brand}>
          <Image src={app.icon} width={36} height={36} alt="" />
          Paper &amp; Grain
        </Link>
        <nav
          className={styles.navigation}
          aria-label="Paper & Grain navigation"
        >
          <a href="#workshop">The workshop</a>
          <a href="#lessons">Lessons</a>
          <Link href="/paper-and-grain/support">Help</Link>
        </nav>
        <Link href="/" className={styles.maker}>
          Jeremy Collins <AppArrow />
        </Link>
      </div>
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="paper-title">
          <div>
            <h1 id="paper-title">
              Fold, cut,
              <br />
              <em>and draw</em>
            </h1>
            <p className={styles.lead}>
              Close your iPhone Duo
              <br />
              to fold the paper.
            </p>
            <p className={styles.intro}>
              The device itself is your folding control. Follow a lesson or
              explore Free Fold, with cutting, drawing, and touch controls for
              iPhone and iPad. There’s no timer and no losing.
            </p>
            <p className={styles.duoNote}>Best on iPhone Duo.</p>
            <DownloadLink />
            <p className={styles.requirements}>
              iOS &amp; iPadOS {app.minimumOS} or later.
              <br />
              Duo folding requires iOS 27.1 or later.
            </p>
            <p className={styles.note}>
              Every lesson and Free Fold are free. Optional tips support the app.
              No ads, tracking, or subscriptions.
            </p>
          </div>
          <div
            className={styles.heroArt}
            data-duo-hero
            data-app-motion="paper-settle"
            data-motion-replay
          >
            <AppScreenshot
              shot={app.duoScreenshots[0]}
              priority
              sizes="(max-width:760px) calc(100vw - 48px), (max-width:1100px) 45vw, 600px"
            />
          </div>
        </section>

        <section
          id="overview"
          className={styles.overview}
          aria-labelledby="overview-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="overview-title">See the paper come to life</h2>
          </div>
          <AppOverview app="paper-and-grain" />
        </section>

        <dl className={styles.facts}>
          <div>
            <dt>Eight lessons</dt>
            <dd>A fold at a time</dd>
          </div>
          <div>
            <dt>Free Fold</dt>
            <dd>Your own blank sheet</dd>
          </div>
          <div>
            <dt>No timer</dt>
            <dd>Work at your pace</dd>
          </div>
        </dl>

        <section
          id="workshop"
          className={styles.workshop}
          aria-labelledby="workshop-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="workshop-title">
              A sheet of paper
              <br />
              Three ways to play
            </h2>
            <p>
              Warm wood, softly textured paper, and simple tools. Turn the sheet
              in 3D to see what’s happening beneath a fold.
            </p>
          </div>
          <ul
            className={styles.process}
            data-app-motion="paper-tools"
            data-motion-replay
          >
            <li>
              <h3>Fold</h3>
              <p>
                Line up the paper with the center guide, then close your iPhone
                Duo to make a crease. You can also pinch a crease or pull a
                corner with touch controls.
              </p>
            </li>
            <li>
              <h3>Cut</h3>
              <p>
                Try a paper-cut shape. Fold the sheet, make a cut, and unfold it
                to see the result.
              </p>
            </li>
            <li>
              <h3>Draw</h3>
              <p>
                Add light pencil lines to your paper. Use Undo and Redo to
                revise your drawing.
              </p>
            </li>
          </ul>
        </section>

        <section
          id="lessons"
          className={styles.lessons}
          aria-labelledby="lessons-title"
        >
          <div className={styles.lessonCopy}>
            <h2 id="lessons-title">
              Begin with
              <br />a single crease
            </h2>
            <p>
              Eight guided lessons move from a first fold to simple kites,
              folded letters, paper-cut shapes, and square-base studies.
            </p>
            <p>
              Follow each step and its diagram. Bring the controls card up when
              you want to read, or move it down to give your paper more room.
            </p>
            <h3>A guide beside your work</h3>
            <p>
              Open the Guidebook whenever you need a reminder. Its diagrams
              explain the next movement alongside your paper.
            </p>
            <div className={styles.supportLink}>
              <Link className={styles.textLink} href="/paper-and-grain/support">
                Gesture help and getting started <AppArrow />
              </Link>
            </div>
          </div>
          <div className={styles.lessonImages}>
            <AppScreenshotGallery
              shots={[app.screenshots[1], app.screenshots[2]]}
              appName="Paper & Grain"
              variant="hero"
              label="Paper & Grain guided lessons and Guidebook"
            />
          </div>
        </section>

        <section className={styles.freeFold} aria-labelledby="free-fold-title">
          <div className={styles.freeFoldInner}>
            <h2 id="free-fold-title">
              Or start with
              <br />a blank sheet
            </h2>
            <div>
              <p>
                Free Fold leaves the next move to you. Fold and unfold, turn the
                paper over, cut a new shape, or add a few pencil lines.
              </p>
              <p>
                Save editable sheets in your gallery and come back to them
                later. Undo a crease, try a different direction, and keep
                exploring.
              </p>
            </div>
          </div>
        </section>

        <section
          id="screenshots"
          className={styles.screenshots}
          aria-labelledby="screenshots-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="screenshots-title">
              Inside the
              <br />
              paper workshop
            </h2>
            <p>See the workspace, guided lessons, and Guidebook.</p>
          </div>
          <div className={shared.duoGalleryBlock}>
            <h3 className={shared.galleryDeviceHeading}>iPhone Duo</h3>
            <AppScreenshotGallery
              shots={app.duoScreenshots}
              appName="Paper & Grain"
              variant="duo"
              label="Paper & Grain iPhone Duo screenshots"
            />
          </div>
          <h3 className={shared.galleryDeviceHeading}>iPhone</h3>
          <AppScreenshotGallery
            shots={app.screenshots}
            appName="Paper & Grain"
            label="Paper & Grain iPhone screenshots"
          />
        </section>

        <section
          className={styles.downloadSection}
          aria-labelledby="download-title"
        >
          <div className={styles.downloadInner}>
            <div>
              <div className={styles.downloadTitle}>
                <Image src={app.icon} width={60} height={60} alt="" />
                <h2 id="download-title">
                  Paper &amp; Grain
                  <br />
                  for iPhone and iPad
                </h2>
              </div>
              <p>
                All eight lessons and Free Fold are included.
                <br />
                Pick a sheet and see what you can make.
              </p>
            </div>
            <div className={styles.downloadActions}>
              <DownloadLink />
              <p>Free · iOS &amp; iPadOS {app.minimumOS} or later</p>
            </div>
          </div>
          <p className={styles.compatibility}>
            Touch controls work without a folding device. Optional folding along
            the device seam on a supported iPhone Duo requires iOS 27.1 or
            later.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <Link href="/">Made by Jeremy Collins</Link>
        <nav aria-label="Other apps">
          <Link href="/codable">Codable</Link>
          <Link href="/taktung">Taktung</Link>
          <Link href="/tabforge">TabForge</Link>
        </nav>
        <div>
          <Link href="/paper-and-grain/support">Support</Link>
          <Link href="/paper-and-grain/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
