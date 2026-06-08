const fs = require("node:fs");
const { execFileSync, spawnSync } = require("node:child_process");

const sourcePath = "src/content/resume/resume.md";
const pdfPath = "public/resume/jeremy-collins-resume.pdf";

function hasResumeSourceDiff() {
  try {
    const status = execFileSync("git", ["status", "--porcelain", "--", sourcePath], {
      encoding: "utf8",
    });
    return status.trim().length > 0;
  } catch {
    return false;
  }
}

if (process.env.RESUME_SKIP_AUTO_PDF === "1") {
  console.log("Skipping resume PDF sync because RESUME_SKIP_AUTO_PDF=1.");
  process.exit(0);
}

const pdfMissing = !fs.existsSync(pdfPath);
const sourceChanged = hasResumeSourceDiff();

if (!pdfMissing && !sourceChanged) {
  console.log("Resume PDF is current. No resume Markdown diff detected.");
  process.exit(0);
}

console.log(
  pdfMissing
    ? "Resume PDF is missing. Regenerating."
    : "Resume Markdown diff detected. Regenerating resume PDF."
);

const result = spawnSync("pnpm", ["resume:pdf"], {
  cwd: process.cwd(),
  stdio: "inherit",
  env: process.env,
});

process.exit(result.status ?? 1);
