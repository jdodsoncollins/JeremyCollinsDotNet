import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import styles from "@/app/site-pages.module.css";

export function SiteShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.page} ${className}`} data-site-page>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
