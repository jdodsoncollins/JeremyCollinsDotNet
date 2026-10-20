import Link from "next/link";
import { EraLogo } from "@/components/era-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import homeStyles from "@/app/home.module.css";
import siteStyles from "@/app/site-pages.module.css";

export function Header({ home = false }: { home?: boolean }) {
  const styles = home ? homeStyles : siteStyles;

  return (
    <header className={styles.header}>
      <nav aria-label="Primary navigation">
        <Link
          href="/"
          className={styles.brand}
          aria-label="Jeremy Collins home"
        >
          <EraLogo />
        </Link>
        <div className={styles.navLinks}>
          <a href={home ? "#projects" : "/#projects"}>Projects</a>
          <a href={home ? "#about" : "/#about"}>About</a>
          <Link href="/resume">Resume</Link>
          <a href="mailto:jeremy@jeremycollins.net">Contact</a>
        </div>
        {home && <ThemeSwitcher />}
      </nav>
    </header>
  );
}
