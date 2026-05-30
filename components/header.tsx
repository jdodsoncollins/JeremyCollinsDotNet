"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg tracking-wider text-neon-green hover:neon-glow transition-all glitch"
        >
          JC://
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={scrollToProjects}
            className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors tracking-wide"
          >
            Projects
          </button>
          <a
            href="https://github.com/jdodsoncollins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-neon-magenta transition-colors tracking-wide"
          >
            GitHub
          </a>
          <a
            href="mailto:jeremy@jeremycollins.net"
            className="text-sm text-muted-foreground hover:text-neon-green transition-colors tracking-wide"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
