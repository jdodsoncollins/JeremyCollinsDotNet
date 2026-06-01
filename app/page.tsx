import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CircuitBackground } from "@/components/circuit-background";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jeremy Collins",
  url: "https://jeremycollins.net",
  email: "mailto:jeremy@jeremycollins.net",
  jobTitle: "Product Engineer",
  sameAs: [
    "https://github.com/jdodsoncollins",
    "https://linkedin.com/in/jeremycollinsnet",
  ],
  knowsAbout: [
    "Product engineering",
    "Web development",
    "Agentic tooling",
    "Automation",
    "iOS developer tools",
  ],
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <CircuitBackground />
      <div className="relative">
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
