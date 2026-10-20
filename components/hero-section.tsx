import { HeroArt } from "@/components/hero-art";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { RetroHeroArt } from "@/components/retro-hero-art";
import { ModernHeroArt } from "@/components/modern-hero-art";
import { EraHeroImage } from "@/components/era-hero-image";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/home.module.css";

export function HeroSection() {
  return (
    <section className={"hero-section " + styles.hero} aria-labelledby="home-title">
      <HeroBackdrop />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1 id="home-title" className={styles.heroTitle}>Jeremy<br />Collins</h1>
          <div className={styles.heroActions}>
            <a className={styles.heroButton} href="#projects">View projects <AppArrow direction="right" /></a>
            <div className={styles.heroSecondary}>
              <a className={styles.heroTextLink} href="mailto:jeremy@jeremycollins.net">Email</a>
              <a className={styles.heroTextLink} href="https://github.com/jdodsoncollins" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className={styles.heroTextLink} href="https://linkedin.com/in/jeremycollinsnet" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className={styles.artwork}>
          <HeroArt>
            <div className="hero-art-shot hero-art-1980s">
              <EraHeroImage era="1980s" className="hero-art-still" src="/hero/hero-1980s.svg?v=px2" width={340} height={268} alt="" decoding="async" />
              <EraHeroImage era="1980s" className="hero-art-cat" src="/hero/hero-1980s-cat.svg?v=px2" width={340} height={268} alt="" decoding="async" />
            </div>
            <RetroHeroArt />
            <ModernHeroArt />
          </HeroArt>
        </div>
      </div>
    </section>
  );
}
