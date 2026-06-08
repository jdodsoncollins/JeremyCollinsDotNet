import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const resumeMarkdownPath = "src/content/resume/resume.md";
const resumePagePath = "app/resume/page.tsx";
const heroPath = "components/hero-section.tsx";
const exportScriptPath = "scripts/export-resume-pdf.js";
const syncScriptPath = "scripts/sync-resume-pdf.js";
const readmePath = "README.md";
const pdfPath = "public/resume/jeremy-collins-resume.pdf";
const packagePath = "package.json";

test("resume has a committed Markdown source of truth", () => {
  const markdown = fs.readFileSync(resumeMarkdownPath, "utf8");

  assert.match(markdown, /^# Jeremy Collins/m);
  assert.match(markdown, /Product Engineer & Builder/);
  assert.match(markdown, /^## Experience/m);
  assert.match(markdown, /^### Webflow/m);
  assert.match(markdown, /^## Technologies/m);
});

test("/resume page reads the Markdown source and exposes the PDF link", () => {
  const page = fs.readFileSync(resumePagePath, "utf8");

  assert.match(page, /readResumeMarkdown/);
  assert.match(page, /parseResume/);
  assert.match(page, /\/resume\/jeremy-collins-resume\.pdf/);
  assert.match(page, /className="resumePage"/);
});

test("home hero does not link to the online resume page", () => {
  const hero = fs.readFileSync(heroPath, "utf8");

  assert.doesNotMatch(hero, /href="\/resume"/);
  assert.doesNotMatch(hero, />\s*RESUME\s*</);
});

test("PDF export writes to the public resume asset path", () => {
  const script = fs.readFileSync(exportScriptPath, "utf8");

  assert.match(script, /public\/resume\/jeremy-collins-resume\.pdf/);
  assert.match(script, /printBackground:\s*true/);
  assert.match(script, /format:\s*"Letter"/);
});

test("build lifecycle automatically syncs PDF when resume Markdown changes", () => {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const syncScript = fs.readFileSync(syncScriptPath, "utf8");

  assert.equal(packageJson.scripts.postbuild, "node scripts/sync-resume-pdf.js");
  assert.match(syncScript, /git", \["status", "--porcelain", "--", sourcePath\]/);
  assert.match(syncScript, /pnpm", \["resume:pdf"\]/);
  assert.match(syncScript, /RESUME_SKIP_AUTO_PDF/);
});

test("generated resume PDF artifact is committed and non-empty", () => {
  const stats = fs.statSync(pdfPath);

  assert.ok(stats.size > 10000);
});

test("README documents stack and resume workflow", () => {
  const readme = fs.readFileSync(readmePath, "utf8");

  assert.match(readme, /Next\.js 15/);
  assert.match(readme, new RegExp(resumeMarkdownPath));
  assert.match(readme, /pnpm resume:pdf/);
  assert.match(readme, /public\/resume\/jeremy-collins-resume\.pdf/);
});
