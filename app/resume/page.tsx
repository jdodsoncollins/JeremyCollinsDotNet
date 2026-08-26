import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { parseResume, readResumeMarkdown, type ResumeBlock } from "@/lib/resume";
import { resumeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Jeremy Collins, senior software engineer at Webflow in Los Angeles. Growth engineering, billing, experiments, and Codable for iOS Safari.",
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: "Jeremy Collins resume",
    description:
      "Senior software engineer at Webflow. Growth engineering, billing, and Codable.",
    url: "/resume",
    type: "profile",
  },
};

function renderInline(text: string) {
  const parts = text.split(/(jeremycollins\.net|jeremy@jeremycollins\.net)/g);
  return parts.map((part, index) => {
    if (part === "jeremycollins.net") {
      return (
        <a key={`${part}-${index}`} href="https://jeremycollins.net">
          {part}
        </a>
      );
    }

    if (part === "jeremy@jeremycollins.net") {
      return (
        <a key={`${part}-${index}`} href="mailto:jeremy@jeremycollins.net">
          {part}
        </a>
      );
    }

    return part;
  });
}

function BlockView({ block }: { block: ResumeBlock }) {
  if (block.type === "paragraph") {
    return (
      <p>
        {block.lines.map((line, index) => (
          <span key={`${line}-${index}`}>
            {renderInline(line)}
            {index < block.lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  return null;
}

export default function ResumePage() {
  const resume = parseResume(readResumeMarkdown());

  return (
    <div className="resumeShell min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <Header />
      <main className="resumePage" data-resume-pdf>
        <article className="resumeDocument" aria-labelledby="resume-title">
          <div className="resumeKicker">Resume</div>
          <header className="resumeHeader">
            <div>
              <h1 id="resume-title">{resume.title}</h1>
              {resume.intro.map((block, index) => (
                <BlockView key={`intro-${index}`} block={block} />
              ))}
            </div>
          </header>

          {resume.sections.map((section) => (
            <section key={section.title || "section"} className="resumeSection">
              {section.title && <h2>{section.title}</h2>}
              {section.blocks.map((block, index) => (
                <BlockView key={`${section.title}-block-${index}`} block={block} />
              ))}
              {section.entries.map((entry) => (
                <section key={`${section.title}-${entry.title}`} className="resumeEntry">
                  <h3>{entry.title}</h3>
                  {entry.blocks.map((block, index) => (
                    <BlockView key={`${entry.title}-${index}`} block={block} />
                  ))}
                </section>
              ))}
            </section>
          ))}

          <footer className="resumeDownload">
            <Link href="/resume/jeremy-collins-resume.pdf">Download PDF</Link>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}
