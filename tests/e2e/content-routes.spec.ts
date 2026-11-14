import { expect, test } from "@playwright/test";

test("insights and wildcard routes render the custom 404 not found page", async ({ page }) => {
  const notFoundRoutes = [
    "/insights",
    "/insights/ai-integration-needs-evaluation",
    "/industries",
    "/modernization",
    "/ai-solutions",
    "/services/custom-software-development",
    "/unknown-path-wildcard"
  ];

  for (const route of notFoundRoutes) {
    await page.goto(route);
    await expect(page.getByText("404 · PAGE NOT FOUND")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "This page does not exist or has been removed." })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Return to homepage/i })).toBeVisible();
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
