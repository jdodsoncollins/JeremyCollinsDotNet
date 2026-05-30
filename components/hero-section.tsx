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

        {/* System status line */}
        <div className="flex items-center gap-3 mb-10">
          <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="font-mono text-xs text-neon-green tracking-[0.25em] uppercase">
            sys://jeremycollins.net &mdash; online
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display font-black leading-none mb-6">
          <span className="block text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight">
            JEREMY
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl tracking-tight"
            style={{
              WebkitTextStroke: "1.5px #00ff88",
              color: "transparent",
              textShadow: "0 0 40px rgba(0,255,136,0.25), 0 0 80px rgba(0,255,136,0.1)",
            }}
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
          design and engineering — applying real domain knowledge to shape
          what I help build.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-background font-display font-bold text-xs tracking-[0.2em] uppercase hover:bg-neon-cyan transition-colors"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          >
            VIEW_PROJECTS
            <span className="opacity-60">→</span>
          </a>
          <a
            href="mailto:jeremy@jeremycollins.net"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neon-green/50 text-neon-green font-mono text-xs tracking-[0.2em] uppercase hover:border-neon-green hover:bg-neon-green/5 transition-all"
          >
            CONTACT
          </a>
          <a
            href="https://github.com/jdodsoncollins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground font-mono text-xs tracking-[0.2em] uppercase hover:border-neon-cyan/50 hover:text-neon-cyan transition-all"
          >
            GITHUB
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
          <span className="font-mono text-xs text-muted-foreground/30 tracking-[0.2em]">
            EOF_INIT
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
