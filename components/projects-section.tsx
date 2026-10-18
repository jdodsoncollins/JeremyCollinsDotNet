"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_PRODUCTS } from "@/lib/app-products";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Shot = {
  src: string;
  alt: string;
  label: string;
};

type SideProject = {
  name: string;
  subtitle: string;
  description: string;
  note?: string;
  icon: string;
  href: string;
  hrefLabel: string;
  detailHref?: string;
  features: string[];
  screenshotFrame: "phone" | "web";
  screenshots: Shot[];
};

const PROJECTS: SideProject[] = [
  { ...APP_PRODUCTS.codable, screenshotFrame: "phone" },
  { ...APP_PRODUCTS.taktung, screenshotFrame: "phone" },

];

function ProjectCard({
  project,
  onExpand,
}: {
  project: SideProject;
  onExpand: (src: string) => void;
}) {
  const phone = project.screenshotFrame === "phone";

  return (
    <article className="era-reveal border border-border/60 bg-card/20">
      <div className="p-6 md:p-8 border-b border-border/40">
        <div className="flex items-start gap-5 mb-6">
          <div className="codable-icon w-14 h-14 rounded-xl border border-primary/40 flex-shrink-0 overflow-hidden bg-black">
            <Image
              src={project.icon}
              alt=""
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight">
              {project.detailHref ? (
                <Link href={project.detailHref} className="hover:text-primary transition-colors">{project.name}</Link>
              ) : project.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-6">
          {project.description}
        </p>
        {project.note ? (
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xl mb-6 -mt-3">
            {project.note}
          </p>
        ) : null}

        <div className="mb-8">
          <p className="text-xs text-muted-foreground mb-3">Features</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-4">
            {project.features.map((feature) => (
              <li key={feature} className="text-sm text-muted-foreground">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {project.hrefLabel}
          </a>
          {project.detailHref ? (
            <Link href={project.detailHref} aria-label={`Read more about ${project.name}`} className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors">
              Read more <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <p className="text-xs text-muted-foreground mb-5">Screenshots</p>
        <div className="flex flex-wrap gap-3">
          {project.screenshots.map((shot) => (
            <button
              key={shot.src}
              onClick={() => onExpand(shot.src)}
              className={`group relative flex-shrink-0 no-scanlines ${
                phone ? "w-24 md:w-28" : "w-40 md:w-48"
              }`}
              aria-label={`Expand screenshot: ${shot.label}`}
            >
              <div
                className={`relative overflow-hidden border border-border/50 group-hover:border-foreground/40 transition-colors ${
                  phone ? "aspect-[9/19.5]" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover object-top"
                  sizes={phone ? "112px" : "192px"}
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
  );
}

export function ProjectsSection() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!expandedImage) {
      return;
    }

    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    root.setAttribute("data-lightbox", "");
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedImage(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      root.removeAttribute("data-lightbox");
      document.body.style.overflow = previousOverflow;
    };
  }, [expandedImage]);

  const expandedIsPhone = PROJECTS.some(
    (project) =>
      project.screenshotFrame === "phone" &&
      project.screenshots.some((shot) => shot.src === expandedImage),
  );

  const lightbox =
    expandedImage ? (
      <div
        className="fixed inset-0 z-[400] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setExpandedImage(null)}
      >
        <div
          className={`relative w-full ${
            expandedIsPhone ? "max-w-xs" : "max-w-3xl"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
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
              width={expandedIsPhone ? 400 : 1280}
              height={expandedIsPhone ? 867 : 720}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <section
      id="projects"
      className="py-20 border-t border-border/50 scroll-mt-32 md:scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Side projects
          </h2>
        </div>

        <div className="space-y-8">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              onExpand={setExpandedImage}
            />
          ))}
        </div>
      </div>

      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </section>
  );
}
