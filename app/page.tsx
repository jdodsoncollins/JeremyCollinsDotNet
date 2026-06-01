"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CircuitBackground } from "@/components/circuit-background";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { useState } from "react";

export default function Home() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CircuitBackground />
      <div className="relative">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection
            expandedImage={expandedImage}
            setExpandedImage={setExpandedImage}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}
