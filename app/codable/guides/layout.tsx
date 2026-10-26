import Image from "next/image";
import Link from "next/link";
import { APP_PRODUCTS } from "@/lib/app-products";
import base from "@/app/app-pages.module.css";
import styles from "./guides.module.css";

export default function CodableGuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${base.page} ${base.codable} ${styles.page}`}>
      <a className={base.skipLink} href="#main-content">Skip to content</a>
      <nav className={base.navigation} aria-label="Codable guides navigation">
        <Link href="/codable" className={base.brand}>
          <Image src={APP_PRODUCTS.codable.icon} width={34} height={34} alt="" />
          <span>Codable</span>
        </Link>
        <div className={base.navLinks}>
          <Link href="/codable/guides">Guides</Link>
          <Link href="/codable">The app</Link>
          <a href={APP_PRODUCTS.codable.href}>View in App Store ↗</a>
        </div>
      </nav>
      {children}
      <footer className={base.footer}>
        <div className={base.footerIdentity}>
          <Link href="/">Made by Jeremy Collins</Link>
          <div>
            <Link href="/codable/privacy">Privacy</Link>
            <a href="mailto:jeremy@jeremycollins.net?subject=Codable%20support">Support</a>
          </div>
        </div>
        <Link href="/codable/guides">All Codable guides</Link>
      </footer>
    </div>
  );
}
