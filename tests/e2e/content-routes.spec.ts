import { expect, test } from "@playwright/test";

const contentRoutes = [
  "/services/custom-software-development",
  "/services/ai-integration",
  "/services/mvp-development",
  "/modernization/incremental-migration",
  "/industries/operations-heavy-businesses",
  "/industries/software-saas-technology",
  "/insights/ai-integration-needs-evaluation"
];

test("published content detail routes render", async ({ page }) => {
  for (const route of contentRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
  }
});

test("work routes temporarily redirect to homepage", async ({ page }) => {
  for (const route of ["/work", "/work/ai-assisted-intake-workflow", "/work/legacy-operations-platform"]) {
    await page.goto(route);
    expect(page.url()).toMatch(/\/$/);
  }
});

test("engagement models temporarily redirects to contact", async ({ page }) => {
  await page.goto("/engagement-models");
  expect(page.url()).toMatch(/\/contact$/);
});
