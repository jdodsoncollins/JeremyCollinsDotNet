"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SCREENSHOTS = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vwBoDeA6eaVZaQMV31VdaJpyxSLUbD.png",
    alt: "Codable: Extension intro screen showing Safari-native web developer tools",
    label: "Extension",
  },
  {
    src: "/codable/IMG_0187.PNG",
    alt: "Codable: Elements panel inspecting a selected Safari page paragraph",
    label: "Elements",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IT5OAZP3SDmVkAMRytVlHJnA2xYyoz.png",
    alt: "Codable: Console panel showing JavaScript log output from a live page",
    label: "Console",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eQvswFWMeXE7PuAi41Pqzw9osBqBki.png",
    alt: "Codable: Resize mode showing responsive viewport at iPhone Pro dimensions",
    label: "Resize",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IjtKYzN3A0zPrLA4Ovqmrwr501TTB7.png",
    alt: "Codable: AI Code generation panel with prompt input and generated JavaScript",
    label: "AI Code",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C6qUg0GcQ7PtGVKfyDnsZyA8raicBy.png",
    alt: "Codable: Scratchpad with syntax-highlighted JavaScript and live output",
    label: "Scratchpad",
  },
];

export function ProjectsSection() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedImage) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedImage(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [expandedImage]);

  return (
    <section id="projects" className="py-20 border-t border-border/50 scroll-mt-32 md:scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">

        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            On the side
          </h2>
        </div>

        {/* Codable card */}
        <article className="border border-border/60 bg-card/20">

          {/* Card header */}
          <div className="p-6 md:p-8 border-b border-border/40">
            <div className="flex items-start gap-5 mb-6">
              <div className="codable-icon w-14 h-14 rounded-xl border border-primary/40 flex-shrink-0 overflow-hidden bg-black">
                <Image
                  src="/codable/codable-icon.png"
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">
                  Codable
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  iOS app / Safari web developer tools
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-6">
              Safari-native web developer tools for iOS. Inspect HTML, styles,
              network requests, and console output. Run a JavaScript scratchpad,
              test responsive viewports, and generate code with Apple
              Intelligence. No monetization or tracking.
            </p>

            {/* Feature list */}
            <div className="mb-8">
              <p className="text-xs text-muted-foreground mb-3">
                Features
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-4">
                {[
                  "Element inspector with DOM tree",
                  "Console with JS execution",
                  "Network request monitor",
                  "Resizable viewport tester",
                  "JavaScript scratchpad",
                  "AI code generation (Apple Intelligence)",
                  "View pre-rendered page source",
                  "Edit CSS live on any node",
                ].map((f) => (
                  <li key={f} className="text-sm text-muted-foreground">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* App Store link */}
            <a
              href="https://apps.apple.com/us/app/codable/id1324741659"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              View on the App Store
            </a>
          </div>

          {/* Screenshots */}
          <div className="p-6 md:p-8">
            <p className="text-xs text-muted-foreground mb-5">
              Screenshots
            </p>
            <div className="flex flex-wrap gap-3">
              {SCREENSHOTS.map((shot) => (
                <button
                  key={shot.src}
                  onClick={() => setExpandedImage(shot.src)}
                  className="group relative flex-shrink-0 w-24 md:w-28 no-scanlines"
                  aria-label={`Expand screenshot: ${shot.label}`}
                >
                  {/* Phone frame ratio ~9:19.5 */}
                  <div className="relative aspect-[9/19.5] overflow-hidden border border-border/50 group-hover:border-foreground/40 transition-colors">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      className="object-cover object-top"
                      sizes="112px"
                    />
                  </div>
                  <p className="mt-1.5 text-center text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">
                    {shot.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </article>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>

      {/* Lightbox */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[300] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-xs w-full no-scanlines" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-10 right-0 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
            <div className="border border-border overflow-hidden">
              <Image
                src={expandedImage}
                alt="Expanded screenshot"
                width={400}
                height={867}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
