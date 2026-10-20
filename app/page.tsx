import type { Metadata } from "next";
import { HomeHeader, HomeFooter } from "@/components/home-navigation";
import styles from "@/app/home.module.css";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { EraScroll } from "@/components/era-scroll";
import { homeJsonLd } from "@/lib/json-ld";
import { HomeMotion } from "@/components/home-motion";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className={styles.page} data-home-page>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <EraScroll />
      <HomeMotion />
      <div className={styles.content}>
        <HomeHeader />
        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
        </main>
        <HomeFooter />
      </div>
      <div className="hacf-scanlines" aria-hidden="true" />
      <div className="hacf-grain" aria-hidden="true" />
    </div>
  );
}
