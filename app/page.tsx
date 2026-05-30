"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CircuitBackground } from "@/components/circuit-background";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <CircuitBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
