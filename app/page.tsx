import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CircuitBackground } from "@/components/circuit-background";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { homeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <CircuitBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
