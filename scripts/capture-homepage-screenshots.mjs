import { chromium } from "@playwright/test";
import { spawn } from "child_process";
import http from "http";
import fs from "fs";

async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, () => {
          resolve();
        });
        req.on("error", reject);
        req.setTimeout(2000, () => {
          req.destroy();
          reject(new Error("Timeout"));
        });
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error("Server did not start in time");
}

async function main() {
  const outDir = "C:/Users/kaifa/.gemini/antigravity/brain/b0690aca-d0ff-49f2-b0bc-34c6b8a82923/screenshots";
  fs.mkdirSync(outDir, { recursive: true });
  console.log("Starting Next.js production server for visual inspection...");
  const server = spawn("npx", ["next", "start", "-p", "3005"], {
    env: {
      ...process.env,
      PORT: "3005",
      NEXT_PUBLIC_SITE_URL: "https://www.archexcraft.in"
    },
    shell: true,
    stdio: "inherit"
  });

  try {
    await waitForServer("http://localhost:3005");
    console.log("Server is running on http://localhost:3005");

    const browser = await chromium.launch({ headless: true });
    const viewports = [
      { name: "desktop-1440", width: 1440, height: 900 },
      { name: "tablet-1024", width: 1024, height: 800 },
      { name: "mobile-390", width: 390, height: 844 }
    ];

    for (const vp of viewports) {
      for (const theme of ["light", "dark"]) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: 2
        });
        const page = await context.newPage();

        await page.addInitScript((t) => {
          localStorage.setItem("archex-theme", t);
        }, theme);

        await page.goto("http://localhost:3005/", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1500);

        // Ensure theme applied
        await page.evaluate((t) => {
          document.documentElement.dataset.theme = t;
          document.documentElement.style.colorScheme = t;
        }, theme);

        await page.waitForTimeout(500);

        // Capture Hero Viewport
        const heroPath = `${outDir}/hero-${vp.name}-${theme}.png`;
        await page.screenshot({ path: heroPath, fullPage: false });
        console.log(`Captured: ${heroPath}`);

        // Capture Full Page
        const fullPath = `${outDir}/fullpage-${vp.name}-${theme}.png`;
        await page.screenshot({ path: fullPath, fullPage: true });
        console.log(`Captured: ${fullPath}`);

        await context.close();
      }
    }

    await browser.close();
    console.log("All visual inspection screenshots captured successfully!");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
