import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APP_PRODUCTS } from "@/lib/app-products";
import { CODABLE_GUIDES, CODABLE_GUIDES_BASE, getCodableGuide } from "@/lib/codable-guides";
import styles from "../guides.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CODABLE_GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getCodableGuide((await params).slug);
  if (!guide) notFound();
  const image = APP_PRODUCTS.codable.screenshots[guide.screenshot];
  return {
    title: `${guide.title} | Codable`,
    description: guide.description,
    alternates: { canonical: `${CODABLE_GUIDES_BASE}/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | Codable`, description: guide.description,
      url: `${CODABLE_GUIDES_BASE}/${guide.slug}`, type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: ["Jeremy Collins"], images: [{ url: image.src, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: [image.src] },
  };
}

export default async function CodableGuidePage({ params }: PageProps) {
  const guide = getCodableGuide((await params).slug);
  if (!guide) notFound();
  const image = APP_PRODUCTS.codable.screenshots[guide.screenshot];
  const path = `${CODABLE_GUIDES_BASE}/${guide.slug}`;
  const article = {
    "@context": "https://schema.org", "@type": "TechArticle",
    headline: guide.title, description: guide.description,
    url: `https://jeremycollins.net${path}`,
    mainEntityOfPage: `https://jeremycollins.net${path}`,
    datePublished: guide.publishedAt, dateModified: guide.updatedAt,
    author: { "@type": "Person", name: "Jeremy Collins", url: "https://jeremycollins.net" },
    image: `https://jeremycollins.net${image.src}`,
    inLanguage: "en-US",
  };
  return (
    <main id="main-content" className={styles.container}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/codable">Codable</Link><span aria-hidden="true">/</span>
        <Link href={CODABLE_GUIDES_BASE}>Guides</Link>
      </nav>
      <article>
        <header className={styles.articleHeader}>
          <p className={styles.eyebrow}>{guide.tool} · {guide.duration}</p>
          <h1>{guide.title}</h1>
          <p className={styles.lead}>{guide.introduction}</p>
          <p className={styles.byline}>By Jeremy Collins · Updated <time dateTime={guide.updatedAt}>{new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(guide.updatedAt))}</time></p>
        </header>
        <div className={styles.articleGrid}>
          <div className={styles.prose}>
            <section className={styles.setup} aria-labelledby="before-you-start">
              <h2 id="before-you-start">Before you start</h2>
              <p>{guide.beforeYouStart}</p>
              <a className={styles.textLink} href={APP_PRODUCTS.codable.href}>Codable on the App Store ↗</a>
            </section>
            <ol className={styles.steps}>
              {guide.steps.map((step, index) => (
                <li key={step.title}>
                  <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                  <h2>{step.title}</h2>
                  {step.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {step.code && <pre tabIndex={0} aria-label={`JavaScript example: ${step.title}`}><code>{step.code}</code></pre>}
                  {step.expected && <p className={styles.expected}><strong>Check:</strong> {step.expected}</p>}
                </li>
              ))}
            </ol>
            <section className={styles.checks} aria-labelledby="if-you-get-stuck">
              <h2 id="if-you-get-stuck">If you get stuck</h2>
              {guide.checks.map((check) => <div key={check.title}><h3>{check.title}</h3><p>{check.text}</p></div>)}
            </section>
            <section className={styles.limits} aria-labelledby="what-this-can-tell-you">
              <h2 id="what-this-can-tell-you">What this can tell you</h2>
              <ul>{guide.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul>
              <p>For a full debugger connected to a Mac, Apple documents <a href="https://developer.apple.com/documentation/safari-developer-tools/inspecting-ios">remote inspection of iOS and iPadOS</a>. For extension setup, see Apple’s <a href="https://support.apple.com/guide/iphone/get-extensions-iphab0432bf6/ios">Safari extensions guide</a>.</p>
            </section>
          </div>
          <aside className={styles.evidence} aria-label="App screenshot">
            <figure>
              <a href={image.src} aria-label="Open full-size app screenshot">
                <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 280px, 300px" />
              </a>
              <figcaption>{guide.screenshotCaption}</figcaption>
            </figure>
            <p className={styles.evidenceNote}>Practice on the local demo. Inspect real problems in the Safari tab where they happen.</p>
          </aside>
        </div>
      </article>
      <section className={styles.related} aria-labelledby="keep-investigating">
        <h2 id="keep-investigating">Keep investigating</h2>
        {CODABLE_GUIDES.filter((other) => other.slug !== guide.slug).map((other) => (
          <Link href={`${CODABLE_GUIDES_BASE}/${other.slug}`} key={other.slug}>{other.title}<span aria-hidden="true">↗</span></Link>
        ))}
      </section>
    </main>
  );
}
