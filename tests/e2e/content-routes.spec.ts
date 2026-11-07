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

test("work index route (/work) redirects to homepage and renders no work content", async ({ page }) => {
  const response = await page.goto("/work");
  expect(page.url()).toMatch(/\/$/);
  expect(page.url()).not.toContain("/work");
  const redirectedFrom = response?.request().redirectedFrom();
  if (redirectedFrom) {
    const prevResponse = await redirectedFrom.response();
    expect(prevResponse?.status()).toBe(307);
  }
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Illustrative engineering examples");
  await expect(page.locator("body")).not.toContainText("AI-assisted intake");
  await expect(page.locator("body")).not.toContainText("Legacy operations");
});

test("work ai-assisted-intake-workflow route redirects to homepage and renders no work content", async ({ page }) => {
  const response = await page.goto("/work/ai-assisted-intake-workflow");
  expect(page.url()).toMatch(/\/$/);
  expect(page.url()).not.toContain("/work");
  const redirectedFrom = response?.request().redirectedFrom();
  if (redirectedFrom) {
    const prevResponse = await redirectedFrom.response();
    expect(prevResponse?.status()).toBe(307);
  }
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Illustrative engineering examples");
  await expect(page.locator("body")).not.toContainText("AI-assisted intake");
  await expect(page.locator("body")).not.toContainText("Legacy operations");
});

test("work legacy-operations-platform route redirects to homepage and renders no work content", async ({ page }) => {
  const response = await page.goto("/work/legacy-operations-platform");
  expect(page.url()).toMatch(/\/$/);
  expect(page.url()).not.toContain("/work");
  const redirectedFrom = response?.request().redirectedFrom();
  if (redirectedFrom) {
    const prevResponse = await redirectedFrom.response();
    expect(prevResponse?.status()).toBe(307);
  }
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Illustrative engineering examples");
  await expect(page.locator("body")).not.toContainText("AI-assisted intake");
  await expect(page.locator("body")).not.toContainText("Legacy operations");
});

test("unknown work path (/work/example) redirects to homepage and renders no work content", async ({ page }) => {
  const response = await page.goto("/work/example");
  expect(page.url()).toMatch(/\/$/);
  expect(page.url()).not.toContain("/work");
  const redirectedFrom = response?.request().redirectedFrom();
  if (redirectedFrom) {
    const prevResponse = await redirectedFrom.response();
    expect(prevResponse?.status()).toBe(307);
  }
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Illustrative engineering examples");
  await expect(page.locator("body")).not.toContainText("AI-assisted intake");
  await expect(page.locator("body")).not.toContainText("Legacy operations");
});

test("engagement models temporarily redirects to contact", async ({ page }) => {
  await page.goto("/engagement-models");
  expect(page.url()).toMatch(/\/contact$/);
});

test("services page renders category slideshow without 404 image requests", async ({ page }) => {
  const failedUrls: string[] = [];
  page.on("response", (res) => {
    if (res.status() === 404) {
      failedUrls.push(res.url());
    }
  });

  const response = await page.goto("/services");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI & ML Development" })).toBeVisible();

  // Verify no 404s occurred for category images
  const categoryImage404s = failedUrls.filter((url) => url.includes("/service-categories/"));
  expect(categoryImage404s).toEqual([]);
});

test("cleaned footer is consistent and contains no Work or Engagement Models across all primary pages", async ({
  page
}) => {
  const pagesToCheck = [
    "/",
    "/services",
    "/about",
    "/how-we-work",
    "/insights",
    "/contact",
    "/start-project"
  ];

  for (const path of pagesToCheck) {
    await page.goto(path);
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.locator("a[href^='/work']")).toHaveCount(0);
    await expect(footer.locator("a[href^='/engagement-models']")).toHaveCount(0);
    await expect(footer.locator("a", { hasText: /illustrative work/i })).toHaveCount(0);
  }
});
