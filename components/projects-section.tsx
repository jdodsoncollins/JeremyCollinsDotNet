"use client";

import { useState } from "react";
import Image from "next/image";

const screenshots = [
  { src: "/codable/screenshot-1.png", alt: "Codable - Viewport resizing feature" },
  { src: "/codable/screenshot-2.png", alt: "Codable - Website source view" },
  { src: "/codable/screenshot-3.png", alt: "Codable - Node inspector" },
];

export function ProjectsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-neon-cyan font-mono text-sm tracking-wider">
            {"// PROJECTS"}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
            <span className="text-foreground">Featured</span>{" "}
            <span className="text-neon-magenta">Work</span>
          </h2>
        </div>

        {/* Codable Project */}
        <article className="border border-border bg-card/30 backdrop-blur-sm">
          {/* Project header */}
          <div className="p-6 md:p-8 border-b border-border/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-border flex-shrink-0">
                <Image
                  src="/codable/codable-icon.png"
                  alt="Codable App Icon"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Codable
                </h3>
                <p className="text-neon-green font-mono text-sm mt-1">
                  iOS App • Web Developer Tools
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Front-end web developer tools, optimized for the smaller screen.
              Codable provides elements of the full-featured developer toolkit
              offered on a desktop browser, allowing you to do basic debugging
              or rendering testing from your phone for any web URL.
            </p>

            {/* Features list */}
            <div className="mt-6">
              <h4 className="font-mono text-sm text-neon-cyan mb-3">
                {">"} features:
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">+</span>
                  <span>
                    Resizable viewport for testing different device sizes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">+</span>
                  <span>View pre-rendered website source</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">+</span>
                  <span>
                    Structured listing of rendered nodes and node contents
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">+</span>
                  <span>Edit CSS of any listed node</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">+</span>
                  <span>
                    Console output with command execution capability
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://apps.apple.com/us/app/codable/id1324741659"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green/10 border border-neon-green text-neon-green hover:bg-neon-green/20 transition-all font-mono text-sm tracking-wide"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <span className="inline-flex items-center px-4 py-3 text-sm text-muted-foreground border border-border/50">
                <span className="text-neon-cyan">4.1</span>
                <span className="mx-2">•</span>
                <span>Free</span>
                <span className="mx-2">•</span>
                <span>iOS 14.2+</span>
              </span>
            </div>
          </div>

          {/* Screenshots gallery */}
          <div className="p-6 md:p-8">
            <h4 className="font-mono text-sm text-neon-magenta mb-4">
              {">"} screenshots:
            </h4>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(screenshot.src)}
                  className="aspect-[9/19.5] overflow-hidden border border-border/50 hover:border-neon-cyan transition-all hover:scale-105"
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={200}
                    height={433}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* Lightbox modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-sm w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-muted-foreground hover:text-neon-green transition-colors font-mono text-sm"
            >
              [ESC] close
            </button>
            <div className="neon-border-cyan rounded overflow-hidden">
              <Image
                src={selectedImage}
                alt="Screenshot preview"
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
