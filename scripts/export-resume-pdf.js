const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { chromium } = require("playwright");

const PORT = Number(process.env.RESUME_PDF_PORT || 4173);
const BASE_URL = process.env.RESUME_BASE_URL || `http://127.0.0.1:${PORT}`;
const outputPath = path.join(process.cwd(), "public/resume/jeremy-collins-resume.pdf");

function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      const request = http.get(url, (response) => {
        response.resume();
        if (response.statusCode && response.statusCode < 500) {
          resolve();
          return;
        }
        retry();
      });

      request.on("error", retry);
      request.setTimeout(1000, () => {
        request.destroy();
        retry();
      });
    };

    const retry = () => {
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }
      setTimeout(attempt, 500);
    };

    attempt();
  });
}

async function main() {
  let serverProcess;

  if (!process.env.RESUME_BASE_URL) {
    if (!fs.existsSync(path.join(process.cwd(), ".next/BUILD_ID"))) {
      throw new Error("No Next.js production build found. Run `pnpm build` before exporting the resume PDF.");
    }

    serverProcess = spawn("pnpm", ["exec", "next", "start", "-p", String(PORT)], {
      cwd: process.cwd(),
      stdio: "inherit",
      env: { ...process.env, PORT: String(PORT) },
    });
  }

  try {
    await waitForServer(`${BASE_URL}/resume`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/resume`, { waitUntil: "networkidle" });
    await page.pdf({
      path: outputPath,
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0.55in",
        right: "0.6in",
        bottom: "0.55in",
        left: "0.6in",
      },
    });
    await browser.close();

    console.log(`Resume PDF written to ${outputPath}`);
  } finally {
    if (serverProcess) {
      serverProcess.kill();
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
