"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
  features: string[];
  screenshotFrame: "phone" | "web";
  screenshots: Shot[];
};

const PROJECTS: SideProject[] = [
  {
    name: "Codable",
    subtitle: "iOS app / Safari web developer tools",
    description:
      "Safari-native web developer tools for iOS. Inspect HTML, styles, network requests, and console output. Run a JavaScript scratchpad, test responsive viewports, and generate code with Apple Intelligence. No monetization or tracking.",
    icon: "/codable/codable-icon.png",
    href: "https://apps.apple.com/us/app/codable/id1324741659",
    hrefLabel: "View on the App Store",
    features: [
      "Element inspector with DOM tree",
      "Console with JS execution",
      "Network request monitor",
      "Resizable viewport tester",
      "JavaScript scratchpad",
      "AI code generation (Apple Intelligence)",
      "View pre-rendered page source",
      "Edit CSS live on any node",
    ],
    screenshotFrame: "phone",
    screenshots: [
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
    ],
  },
  {
    name: "Taktung",
    subtitle: "iOS app / Vercel deploy and incident ops",
    description:
      "Taktung (German: putting work on a beat) puts Vercel production on your phone. Pick a site and see health, the latest deploy, and whether something failed. Redeploy, promote, or roll back only after you confirm. A Vercel personal access token stays in iOS Secure Store; the phone calls api.vercel.com directly. No ads or tracking. Not affiliated with Vercel.",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ac/8a/b0/ac8ab0fb-d82b-656f-7021-c015b1e872db/AppIcon-pulse-0-0-1x_U007epad-0-1-sRGB-85-220.png/512x512bb.jpg",
    href: "https://apps.apple.com/us/app/taktung/id6805738660",
    hrefLabel: "View on the App Store",
    features: [
      "Site briefing and Check for issues",
      "Deploys, build logs, and compare",
      "Confirmed redeploy, promote, or rollback",
      "Env drift by name and target",
      "Domain, DNS, and SSL signals",
      "Firewall and flag metadata",
      "Filter production logs",
      "Apple Intelligence search",
    ],
    screenshotFrame: "phone",
    screenshots: [
      {
        src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/d0/4e/09/d04e096a-9492-4b5e-47ef-9a843c0bf3b5/01-home.png/1290x2796bb.jpg",
        alt: "Taktung: site briefing with health, latest production deploy, and Check for issues",
        label: "Home",
      },
      {
        src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/e3/92/3b/e3923b27-639a-de65-e16b-d0fc68341561/02-deploys.png/1290x2796bb.jpg",
        alt: "Taktung: production deploys list with READY status and activity age",
        label: "Deploys",
      },
      {
        src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/0a/78/7d/0a787ded-2a21-4b6f-a002-ccb931eee600/06-sites.png/1290x2796bb.jpg",
        alt: "Taktung: site picker with production health for each Vercel project",
        label: "Sites",
      },
      {
        src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/7e/97/7f/7e977f71-0c78-cb60-3926-301a3403c30f/04-search.png/1290x2796bb.jpg",
        alt: "Taktung: search with Apple Intelligence suggestions across deploys and domains",
        label: "Search",
      },
      {
        src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/17/cb/1c/17cb1ca1-59f3-2381-503c-6ddf734ff032/05-settings.png/1290x2796bb.jpg",
        alt: "Taktung: settings with Vercel personal access token stored on device",
        label: "Settings",
      },
    ],
  },
  {
    name: "Codeatrophy",
    subtitle: "React Native / iOS, Android, and web",
    description:
      "Codeatrophy is a reference to coding atrophy, our shared concern that using AI will lead us to refreshing less on the basics. This app is designed to be an interactive tutorial on web dev fundamentals.",
    note: "Built with React Native for iOS, Android, and web. iOS and Android apps coming soon.",
    icon: "/codeatrophy/codeatrophy-icon.png",
    href: "https://codeatrophy.vercel.app/",
    hrefLabel: "Open Codeatrophy",
    features: [
      "Guided path from basics toward interview-shaped problems",
      "Algorithms, system design, AI, and CS tracks",
      "Searchable lesson library",
      "Nested tags",
      "Private notes on device",
      "Runnable examples in lessons",
    ],
    screenshotFrame: "web",
    screenshots: [
      {
        src: "/codeatrophy/screenshot-home.jpg",
        alt: "Codeatrophy: library path of lessons from Kernel through Graph",
        label: "Path",
      },
      {
        src: "/codeatrophy/screenshot-lesson.jpg",
        alt: "Codeatrophy: Big-O lesson with snapshot, interview notes, and a runnable example",
        label: "Lesson",
      },
      {
        src: "/codeatrophy/screenshot-tags.jpg",
        alt: "Codeatrophy: nested tag tree for algorithms, CS, interviews, and system design",
        label: "Tags",
      },
      {
        src: "/codeatrophy/screenshot-search.jpg",
        alt: "Codeatrophy: search results for hash across lessons and tags",
        label: "Find",
      },
    ],
  },
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
              {project.name}
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

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          {project.hrefLabel}
        </a>
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

  const expandedIsPhone = PROJECTS.some(
    (project) =>
      project.screenshotFrame === "phone" &&
      project.screenshots.some((shot) => shot.src === expandedImage),
  );

  return (
    <section
      id="projects"
      className="py-20 border-t border-border/50 scroll-mt-32 md:scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            On the side
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

      {expandedImage ? (
        <div
          className="fixed inset-0 z-[300] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div
            className={`relative w-full no-scanlines ${
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
      ) : null}
    </section>
  );
}
