import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/site-pages.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteShell>
      <main id="main-content" tabIndex={-1} className={styles.message}>
        <h1>Nothing here</h1>
        <p>This page moved, or it never shipped. Everything else is still up.</p>
        <Link href="/" className={styles.homeLink}>Back home <AppArrow direction="right" /></Link>
      </main>
    </SiteShell>
  );
}
