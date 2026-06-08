import fs from "node:fs";
import path from "node:path";

export const RESUME_SOURCE_PATH = "src/content/resume/resume.md";

export type ResumeBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "list"; items: string[] };

export type ResumeEntry = {
  title: string;
  blocks: ResumeBlock[];
};

export type ResumeSection = {
  title: string;
  blocks: ResumeBlock[];
  entries: ResumeEntry[];
};

export type ParsedResume = {
  title: string;
  intro: ResumeBlock[];
  sections: ResumeSection[];
};

export function readResumeMarkdown() {
  return fs.readFileSync(path.join(process.cwd(), RESUME_SOURCE_PATH), "utf8");
}

export function parseResumeBlocks(markdown: string): ResumeBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ResumeBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index].trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length as 1 | 2 | 3,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index];
      const currentTrimmed = current.trim();
      if (!currentTrimmed || /^#{1,3}\s+/.test(currentTrimmed) || currentTrimmed.startsWith("- ")) {
        break;
      }
      paragraphLines.push(current.replace(/\s+$/, ""));
      index += 1;
    }
    blocks.push({ type: "paragraph", lines: paragraphLines });
  }

  return blocks;
}

export function parseResume(markdown: string): ParsedResume {
  const blocks = parseResumeBlocks(markdown);
  const first = blocks[0];
  const title = first?.type === "heading" && first.level === 1 ? first.text : "Resume";
  const intro: ResumeBlock[] = [];
  const sections: ResumeSection[] = [];
  let currentSection: ResumeSection | null = null;
  let currentEntry: ResumeEntry | null = null;

  for (const block of blocks.slice(1)) {
    if (block.type === "heading" && block.level === 2) {
      currentSection = { title: block.text, blocks: [], entries: [] };
      sections.push(currentSection);
      currentEntry = null;
      continue;
    }

    if (block.type === "heading" && block.level === 3) {
      if (!currentSection) {
        currentSection = { title: "", blocks: [], entries: [] };
        sections.push(currentSection);
      }
      currentEntry = { title: block.text, blocks: [] };
      currentSection.entries.push(currentEntry);
      continue;
    }

    if (!currentSection) {
      intro.push(block);
    } else if (currentEntry) {
      currentEntry.blocks.push(block);
    } else {
      currentSection.blocks.push(block);
    }
  }

  return { title, intro, sections };
}
