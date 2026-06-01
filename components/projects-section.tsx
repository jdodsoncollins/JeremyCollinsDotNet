"use client";

import Image from "next/image";

const SCREENSHOTS = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vwBoDeA6eaVZaQMV31VdaJpyxSLUbD.png",
    alt: "Codable: Extension intro screen showing Safari-native web developer tools",
    label: "Extension",
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

interface ProjectsSectionProps {
  expandedImage: string | null;
  setExpandedImage: (src: string | null) => void;
}

export function ProjectsSection({ expandedImage, setExpandedImage }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section label */}
        <div className="mb-10 hacf-streak">
          <span className="font-mono text-xs text-neon-magenta tracking-[0.25em] uppercase">
            Projects
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
            <span
              className="hacf-flare"
              style={{
                WebkitTextStroke: "1px #ff0066",
                color: "transparent",
              }}
            >
              Featured Work
            </span>
          </h2>
        </div>

        {/* Codable card */}
        <article className="border border-border/60 bg-card/20">

          {/* Card header */}
          <div className="p-6 md:p-8 border-b border-border/40">
            <div className="flex items-start gap-5 mb-6">
              <div
                className="w-14 h-14 rounded-xl border border-primary/40 flex-shrink-0 flex items-center justify-center bg-background"
                style={{ boxShadow: "0 0 16px rgba(255,34,68,0.2)" }}
                aria-hidden="true"
              >
                <span className="font-display font-black text-xl text-primary leading-none">C</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground tracking-wide">
                  Codable
                </h3>
                <p className="font-mono text-xs text-primary mt-1 tracking-wide">
                  iOS App / Safari Web Developer Tools
                </p>
              </div>
            </div>

            <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-xl mb-6">
              Safari-native web developer tools and element inspector for iOS.
              Inspect HTML, styles, network requests, and console output. Run
              a JavaScript scratchpad, test responsive viewports, and generate
              code with Apple Intelligence. Codable has no monetization or
              tracking.
            </p>

            {/* Feature list */}
            <div className="mb-8">
              <p className="font-mono text-xs text-neon-cyan tracking-[0.2em] mb-3 uppercase">
                Features
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Element inspector with DOM tree",
                  "Console with JS execution",
                  "Network request monitor",
                  "Resizable viewport tester",
                  "JavaScript scratchpad",
                  "AI Code generation (Apple Intelligence)",
                  "View pre-rendered page source",
                  "Edit CSS live on any node",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 font-mono text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5 flex-shrink-0">+</span>
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
              className="inline-flex items-center gap-3 px-5 py-2.5 border border-primary text-primary font-mono text-xs tracking-[0.15em] uppercase hover:bg-primary/10 transition-all neon-btn-glow-green derez-btn-outline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              View on App Store
            </a>
          </div>

          {/* Screenshots */}
          <div className="p-6 md:p-8">
            <p className="font-mono text-xs text-neon-magenta tracking-[0.2em] uppercase mb-5">
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
                  <div className="relative aspect-[9/19.5] overflow-hidden border border-border/50 group-hover:border-neon-cyan transition-all duration-200 group-hover:scale-105">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      className="object-cover object-top"
                      sizes="112px"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/10 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs text-neon-cyan tracking-wider">
                        [+]
                      </span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-center font-mono text-[10px] text-muted-foreground/60 tracking-wide group-hover:text-neon-cyan transition-colors">
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
              className="absolute -top-10 right-0 font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider"
            >
              [ESC] CLOSE
            </button>
            <div className="border border-primary/40 overflow-hidden box-glow">
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
