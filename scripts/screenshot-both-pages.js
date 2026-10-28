const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { chromium } = require("playwright");

const PORT = 4176;
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
    
    // Create PDF first to get exact dimensions
    const pdfPage = await browser.newPage();
    await pdfPage.goto(`${BASE_URL}/resume`, { waitUntil: "networkidle" });
    await pdfPage.emulateMedia({ media: 'print' });
    
    const pdfPath = path.join(process.cwd(), 'public/resume/jeremy-collins-resume.pdf');
    await pdfPage.pdf({
      path: pdfPath,
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0.55in",
        right: "0.6in",
        bottom: "0.55in",
        left: "0.6in",
      },
    });
    
    // Now screenshot each page
    // US Letter at 96 DPI: 8.5" x 11" = 816 x 1056 pixels
    const pageHeight = 1056;
    const pageWidth = 816;
    
    // Full page screenshot
    await pdfPage.screenshot({
      path: path.join(outputDir, "resume-full-page.png"),
      fullPage: true,
    });
    
    // Page 1 screenshot (top portion)
    const page1 = await browser.newPage({ viewport: { width: 1200, height: pageHeight * 2 } });
    await page1.goto(`${BASE_URL}/resume`, { waitUntil: "networkidle" });
    await page1.emulateMedia({ media: 'print' });
    await page1.screenshot({
      path: path.join(outputDir, "resume-page-1.png"),
      clip: { x: 0, y: 0, width: pageWidth, height: pageHeight },
    });
    
    // Page 2 screenshot (scroll down one page)
    await page1.evaluate((height) => window.scrollTo(0, height), pageHeight);
    await page1.waitForTimeout(500);
    await page1.screenshot({
      path: path.join(outputDir, "resume-page-2.png"),
      clip: { x: 0, y: 0, width: pageWidth, height: pageHeight },
    });
    
    await browser.close();
    console.log(`Screenshots saved to ${outputDir}`);
    console.log('- resume-full-page.png (full view)');
    console.log('- resume-page-1.png (page 1 only)');
    console.log('- resume-page-2.png (page 2 only)');
  } finally {
    serverProcess.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
