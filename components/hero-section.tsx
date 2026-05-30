"use client";

import { useEffect, useState } from "react";

const TAGLINES = [
  "FULL-STACK SOFTWARE DEVELOPER",
  "PRODUCT ENGINEER",
  "FRONT-END SPECIALIST",
  "WEB PLATFORM ADVOCATE",
];

export function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = TAGLINES[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1));
        }, 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 2400);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 25);
      } else {
        setTaglineIndex((i) => (i + 1) % TAGLINES.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, taglineIndex]);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-4xl mx-auto px-6 py-20 w-full">

        {/* Name */}
        <h1 className="font-display font-black leading-none mb-6">
          <span className="block text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight hacf-flare">
            JEREMY
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight neon-glow-subtle hacf-flare"
          >
            COLLINS
          </span>
        </h1>

        {/* Typewriter tagline */}
        <div className="flex items-center gap-1 h-7 mb-10">
          <span className="font-mono text-sm text-neon-cyan tracking-[0.15em]">
            //&nbsp;
          </span>
          <span className="font-mono text-sm md:text-base text-neon-cyan tracking-[0.1em]">
            {displayed}
          </span>
          <span className="cursor-blink inline-block w-0.5 h-5 bg-neon-cyan ml-0.5" />
        </div>

        {/* Intro paragraph */}
        <p className="font-mono text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed mb-12">
          Building for the open web. I enjoy working at the intersection of
          design and engineering, applying real domain knowledge to shape
          what I help build.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-background font-display font-bold text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-neon-cyan transition-colors neon-btn-glow"
          >
            View Projects
            <span className="opacity-60">→</span>
          </a>
        </div>

        {/* Social / contact links */}
        <div className="flex flex-wrap items-center gap-3 mb-16">
          <a
            href="mailto:jeremy@jeremycollins.net"
            className="inline-flex items-center gap-2 px-4 py-2 border border-neon-green/30 text-neon-green font-mono text-xs tracking-[0.15em] uppercase rounded-lg hover:border-neon-green hover:bg-neon-green/5 transition-all neon-btn-glow-green"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            EMAIL
          </a>
          <a
            href="https://github.com/jdodsoncollins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-neon-cyan/30 text-neon-cyan font-mono text-xs tracking-[0.15em] uppercase rounded-lg hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all neon-btn-glow-cyan"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/jeremycollinsnet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-neon-magenta/30 text-neon-magenta font-mono text-xs tracking-[0.15em] uppercase rounded-lg hover:border-neon-magenta hover:bg-neon-magenta/5 transition-all neon-btn-glow-magenta"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LINKEDIN
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
