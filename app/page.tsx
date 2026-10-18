import type { Metadata } from "next";
import { HomeHeader, HomeFooter } from "@/components/home-navigation";
import styles from "@/app/home.module.css";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { EraScroll } from "@/components/era-scroll";
import { homeJsonLd } from "@/lib/json-ld";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <EraScroll />
      <div className={styles.content}>
        <HomeHeader />
        <main>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
        </main>
        <HomeFooter />
      </div>
    </div>
  );
}
