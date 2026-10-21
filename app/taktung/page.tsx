import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppScreenshot } from "@/components/app-screenshot";
import { AppScreenshotGallery } from "@/components/app-screenshot-gallery";
import { AppMotion } from "@/components/app-motion";
import { AppOverview } from "@/components/app-overview";
import { APP_PRODUCTS } from "@/lib/app-products";
import { AppArrow } from "@/components/app-icons";
import base from "@/app/app-pages.module.css";
import styles from "@/app/taktung.module.css";

const app = APP_PRODUCTS.taktung;
export const metadata: Metadata = {
  title: "Taktung — Vercel deployment status, logs & widgets",
  description: app.description,
  alternates: { canonical: "/taktung" },
  openGraph: {
    title: "Taktung — Vercel deployments on iPhone and iPad",
    description: app.description,
    url: "/taktung",
    type: "website",
    images: [{ url: app.screenshots[0].src, alt: app.screenshots[0].alt }],
  },
};

export default function TaktungPage() {
  return (
    <div
      className={`${base.page} ${base.taktung} ${styles.page}`}
      data-app-page="taktung"
    >
      <AppMotion app="taktung" />
      <a className={base.skipLink} href="#main-content">
        Skip to content
      </a>
      <nav
        className={`${base.navigation} ${styles.navigation}`}
        aria-label="Taktung navigation"
      >
        <Link href="/taktung" className={base.brand}>
          <Image src={app.icon} width={34} height={34} alt="" />
          <span>Taktung</span>
        </Link>
        <div className={base.navLinks}>
          <a href="#overview">Overview</a>
          <a href="#compare">Comparisons</a>
          <a href="#widgets">Widgets</a>
          <a href="#screenshots">Screenshots</a>
        </div>
        <Link href="/" className={base.portfolioLink}>
          Jeremy Collins <AppArrow />
        </Link>
      </nav>
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="taktung-title">
          <h1 id="taktung-title">
            Vercel deployments <span>on iPhone and iPad</span>
          </h1>
          <div className={styles.introduction}>
            <p className={styles.lead}>
              Check what’s live, compare page captures, and read your build
              logs. Follow a deployment from its latest commit to the details
              that need your attention.
            </p>
            <div className={styles.install}>
              <a
                className={`${base.primaryButton} ${styles.download}`}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                View in App Store <AppArrow />
              </a>
              <p>iOS &amp; iPadOS {app.minimumOS} or later</p>
              <p>Requires a Vercel account.</p>
            </div>
          </div>
          <p className={styles.freeNote}>
            Free to use. Optional tips support the app. No ads, tracking, or
            subscriptions.
          </p>
          <nav className={styles.index} aria-label="Taktung features">
            <a href="#status">Production status</a>
            <a href="#logs">Build &amp; runtime logs</a>
            <a href="#compare">Visual comparisons</a>
            <a href="#field-log">Local Field Log</a>
          </nav>
        </section>
        <section
          id="overview"
          className={styles.report}
          aria-labelledby="taktung-overview-title"
        >
          <div className={styles.overview}>
            <h2 id="taktung-overview-title">Follow the deployment</h2>
            <AppOverview app="taktung" />
          </div>
          <div
            id="status"
            className={styles.status}
            data-app-motion="status"
            data-motion-replay
          >
            <AppScreenshot
              shot={app.screenshots[0]}
              priority
              sizes="(max-width: 700px) 55vw, 230px"
            />
            <p>
              Production status, the latest commit, and your next check in one
              view.
            </p>
          </div>
        </section>
        <section
          id="compare"
          className={styles.review}
          aria-labelledby="taktung-compare"
        >
          <header className={styles.reviewHeading}>
            <h2 id="taktung-compare">Review the deployment</h2>
            <p>
              See what changed on the page. Keep the evidence for your next
              check.
            </p>
          </header>
          <div
            className={styles.evidence}
            data-app-motion="evidence"
            data-motion-replay
          >
            <article className={styles.comparison}>
              <div className={styles.evidenceCopy}>
                <h3>Compare before and after</h3>
                <p>
                  Inspect real page captures with a reveal slider or
                  side-by-side view. Save a baseline to compare against the next
                  deployment.
                </p>
              </div>
              <div className={styles.comparisonImage}>
                <AppScreenshot shot={app.screenshots[1]} />
              </div>
            </article>
            <article id="field-log" className={styles.fieldLog}>
              <div className={styles.fieldImage}>
                <AppScreenshot shot={app.screenshots[4]} />
              </div>
              <div className={styles.evidenceCopy}>
                <h3>Keep a local Field Log</h3>
                <p>
                  Find your checks, saved comparisons, and personal notes in a
                  searchable record. Export them as text when you need to.
                </p>
              </div>
            </article>
          </div>
          <div id="logs" className={styles.tools}>
            <article>
              <h3>Read the logs</h3>
              <p>
                Search build output and review the runtime logs available for a
                deployment.
              </p>
            </article>
            <article>
              <h3>Inspect the project</h3>
              <p>
                Review domains, checks, cron jobs, and feature flag names. Check
                environment names and targets without exposing values.
              </p>
            </article>
            <article>
              <h3>Use Siri and Shortcuts</h3>
              <p>
                Use Siri or Shortcuts to check deployment status or project
                details already loaded in the app.
              </p>
            </article>
          </div>
        </section>
        <section
          id="widgets"
          className={styles.widgets}
          aria-labelledby="taktung-widgets"
        >
          <div className={styles.widgetCopy}>
            <h2 id="taktung-widgets">
              Deployment widgets for your Home Screen
            </h2>
            <p>
              Keep recent deployment status and activity in view. Follow all
              your projects or focus on a single site, in small, medium, and
              large widgets.
            </p>
            <a href="#screenshots" className={styles.textLink}>
              See the app screenshots <AppArrow />
            </a>
          </div>
          <div className={styles.widgetSheet}>
            <AppScreenshot shot={app.screenshots[2]} />
            <AppScreenshot shot={app.screenshots[3]} />
          </div>
        </section>
        <section
          id="screenshots"
          className={styles.screenshots}
          aria-labelledby="taktung-screenshots"
        >
          <header className={styles.galleryHeading}>
            <h2 id="taktung-screenshots">Explore Taktung</h2>
            <p>
              Production, page comparisons, widgets, Field Log, and project
              tools.
            </p>
          </header>
          <AppScreenshotGallery shots={app.screenshots} appName="Taktung" />
        </section>
        <section className={styles.privacy} aria-labelledby="taktung-privacy">
          <h2 id="taktung-privacy">Deployment actions with confirmation</h2>
          <div className={styles.privacyDetails}>
            <div>
              <h3>Review before you act</h3>
              <p>
                Redeploy, promote, and rollback actions each require your
                confirmation.
              </p>
            </div>
            <div>
              <h3>Your token stays in the Keychain</h3>
              <p>
                Taktung connects directly to Vercel. Your credentials stay on
                your device.
              </p>
            </div>
            <div>
              <h3>Your history stays local</h3>
              <p>
                Notes and saved baselines stay on your device, separated by
                account and team. No ads or tracking.
              </p>
            </div>
          </div>
        </section>
        <section
          id="support"
          className={styles.support}
          aria-labelledby="taktung-support"
        >
          <h2 id="taktung-support">Taktung support</h2>
          <div>
            <p>
              Need help with a connection, deployment, or widget?{" "}
              <a href="mailto:jeremy@jeremycollins.net?subject=Taktung%20support">
                Email Jeremy
              </a>{" "}
              with your app version, device, and the steps that led to the
              issue. Please leave access tokens and other credentials out of
              your message.
            </p>
            <p>
              <Link href="/taktung/privacy">Read the privacy policy</Link> for
              details about credentials, local storage, and connections to
              Vercel.
            </p>
          </div>
        </section>
        <section
          id="download"
          className={styles.closing}
          aria-labelledby="taktung-download"
        >
          <Image src={app.icon} width={64} height={64} alt="" />
          <div>
            <h2 id="taktung-download">Get Taktung</h2>
            <p>Vercel deployment tools for iPhone and iPad.</p>
          </div>
          <a
            className={`${base.primaryButton} ${styles.download}`}
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in App Store <AppArrow />
          </a>
          <p className={styles.affiliation}>
            Requires a Vercel account. Taktung is not affiliated with or
            endorsed by Vercel.
          </p>
        </section>
      </main>
      <footer className={`${base.footer} ${styles.footer}`}>
        <div className={base.footerIdentity}>
          <Link href="/">Made by Jeremy Collins</Link>
          <div>
            <Link href="/taktung/privacy">Privacy</Link>
            <a href="mailto:jeremy@jeremycollins.net?subject=Taktung%20support">
              Support
            </a>
          </div>
        </div>
        <nav aria-label="More apps">
          <Link href="/codable">Codable</Link>
          <Link href="/tabforge">TabForge</Link>
          <Link href="/paper-and-grain">Paper &amp; Grain</Link>
        </nav>
      </footer>
    </div>
  );
}
