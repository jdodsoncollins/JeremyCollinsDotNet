import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppArrow } from "@/components/app-icons";
import { APP_PRODUCTS } from "@/lib/app-products";
import shared from "@/app/app-pages.module.css";
import tabforge from "@/app/tabforge.module.css";
import paperAndGrain from "@/app/paper-and-grain.module.css";
import styles from "@/app/app-document.module.css";

type AppKey = keyof typeof APP_PRODUCTS;

const appearances = {
  codable: { page: shared.codable, brand: shared.brand },
  taktung: { page: shared.taktung, brand: shared.brand },
  tabforge: { page: tabforge.page, brand: tabforge.brand },
  paperAndGrain: { page: paperAndGrain.page, brand: paperAndGrain.brand },
};

export function AppDocument({
  app: appKey,
  title,
  effectiveDate,
  jsonLd,
  headerContent,
  children,
}: {
  app: AppKey;
  title: string;
  effectiveDate: string;
  jsonLd: Record<string, unknown>;
  headerContent?: ReactNode;
  children: ReactNode;
}) {
  const app = APP_PRODUCTS[appKey];
  const appearance = appearances[appKey];
  const privacyHref = `${app.detailHref}/privacy`;
  const supportHref = appKey === "paperAndGrain"
    ? "/paper-and-grain/support"
    : `mailto:jeremy@jeremycollins.net?subject=${encodeURIComponent(`${app.name} support`)}`;

  return (
    <div className={`${shared.page} ${appearance.page} ${styles.page} ${styles[appKey] ?? ""}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a className={shared.skipLink} href="#main-content">Skip to content</a>
      <nav className={`${shared.navigation} ${styles.navigation}`} aria-label={`${app.name} navigation`}>
        <Link href={app.detailHref} className={appearance.brand}>
          <Image src={app.icon} width={36} height={36} alt="" />
          <span>{app.name}</span>
        </Link>
        <Link href={app.detailHref} className={styles.backLink}>
          <AppArrow direction="left" />
          Back to {app.name}
        </Link>
      </nav>
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <header className={styles.documentHeader}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.effectiveDate}>Effective date: {effectiveDate}</p>
          {headerContent ? <div className={styles.headerContent}>{headerContent}</div> : null}
        </header>
        <article className={styles.content}>{children}</article>
      </main>
      <footer className={`${shared.footer} ${styles.footer}`}>
        <Link href="/">Made by Jeremy Collins</Link>
        <nav aria-label={`${app.name} information`}>
          <Link href={app.detailHref}>{app.name}</Link>
          <a href={supportHref}>Support</a>
          <Link href={privacyHref} aria-current="page">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}
