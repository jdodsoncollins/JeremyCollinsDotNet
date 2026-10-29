import type { Metadata } from "next";
import Link from "next/link";
import { CODABLE_GUIDES, CODABLE_GUIDES_BASE } from "@/lib/codable-guides";
import { APP_PRODUCTS } from "@/lib/app-products";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Safari debugging guides for iPhone and iPad | Codable",
  description: "Inspect elements, console errors, network requests, page source and mobile layouts in Safari on iPhone and iPad. Practical walkthroughs with Codable’s local demo.",
  alternates: { canonical: CODABLE_GUIDES_BASE },
  openGraph: {
    title: "Safari debugging guides | Codable",
    description: "Start with the page. Find the evidence. Test a fix on your iPhone or iPad.",
    url: CODABLE_GUIDES_BASE,
    type: "website",
    images: [{ url: APP_PRODUCTS.codable.screenshots[0].src, alt: "Codable inspecting its local demo in Safari" }],
  },
  twitter: { card: "summary_large_image", title: "Safari debugging guides | Codable", images: [APP_PRODUCTS.codable.screenshots[0].src] },
};

export default function CodableGuidesPage() {
  return (
    <main id="main-content" className={styles.container}>
      <header className={styles.indexHeader}>
        <p className={styles.eyebrow}>Codable field guide</p>
        <h1>Safari debugging guides for iPhone and iPad</h1>
        <p className={styles.lead}>Inspect an element, trace a request, compare page source, or investigate a table that spills off-screen. Follow the evidence in your current Safari tab.</p>
        <p>These walkthroughs use Codable’s bundled local demo, so you can practice on a page made for inspection.</p>
      </header>
      <div className={styles.guideList}>
        {CODABLE_GUIDES.map((guide) => (
          <Link href={`${CODABLE_GUIDES_BASE}/${guide.slug}`} className={styles.guideLink} key={guide.slug}>
            <div>
              <p className={styles.eyebrow}>{guide.tool} · {guide.duration}</p>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
            </div>
            <span className={styles.guideArrow} aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      <section className={styles.startNote} aria-labelledby="guide-setup">
        <h2 id="guide-setup">One setup. Your current Safari tab.</h2>
        <p>Install Codable, then enable it in Settings → Apps → Safari → Extensions. Open the app’s local demo in Safari and allow the extension on that page. For a real bug, open Codable in the Safari tab where it happens.</p>
        <p>The Safari extension works in that page’s session. Resize and Scratchpad live in the companion app and have separate browser contexts.</p>
        <a className={styles.textLink} href={APP_PRODUCTS.codable.href}>Get Codable for iPhone and iPad ↗</a>
      </section>
    </main>
  );
}
