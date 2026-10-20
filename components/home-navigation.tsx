import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { EraLogo } from "@/components/era-logo";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/home.module.css";

export function HomeHeader() {
  return <header className={styles.header}><nav aria-label="Primary navigation"><Link href="/" className={styles.brand} aria-label="Jeremy Collins home"><EraLogo /></Link><div className={styles.navLinks}><a href="#projects">Projects</a><a href="#about">About</a><Link href="/resume">Resume</Link><a href="mailto:jeremy@jeremycollins.net">Contact</a></div><ThemeSwitcher /></nav></header>;
}

export function HomeFooter() {
  return <footer className={styles.footer}><div className={styles.footerBottom}><span>© {new Date().getFullYear()} Jeremy Collins</span><a href="mailto:jeremy@jeremycollins.net">jeremy@jeremycollins.net</a><div><a href="https://github.com/jdodsoncollins" target="_blank" rel="noopener noreferrer">GitHub <AppArrow /></a><a href="https://linkedin.com/in/jeremycollinsnet" target="_blank" rel="noopener noreferrer">LinkedIn <AppArrow /></a></div></div></footer>;
}
