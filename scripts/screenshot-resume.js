const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { chromium } = require("playwright");

const PORT = 4175;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const outputDir = "/opt/cursor/artifacts/screenshots";

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
  fs.mkdirSync(outputDir, { recursive: true });

  const serverProcess = spawn("pnpm", ["exec", "next", "start", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  try {
    await waitForServer(`${BASE_URL}/resume`);

    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 1200, height: 1600 },
    });
    
    await page.goto(`${BASE_URL}/resume`, { waitUntil: "networkidle" });
    
    // Take a full page screenshot with print media emulation
    await page.emulateMedia({ media: 'print' });
    
    await page.screenshot({
      path: path.join(outputDir, "resume-full-page.png"),
      fullPage: true,
    });
    
    await browser.close();
    console.log(`Screenshot saved to ${outputDir}/resume-full-page.png`);
  } finally {
    serverProcess.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
