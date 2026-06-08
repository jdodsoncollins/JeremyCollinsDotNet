import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { parseResume, readResumeMarkdown, type ResumeBlock } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Jeremy Collins resume: product engineer and builder focused on customer-facing product engineering, growth, experimentation, analytics, and agentic coding workflows.",
  alternates: {
    canonical: "/resume",
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
