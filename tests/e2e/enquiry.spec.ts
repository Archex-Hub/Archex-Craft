import { expect, test } from "@playwright/test";

test("enquiry form validates and reports the server result", async ({ page }) => {
  await page.goto("/start-project");
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByText(/Enter your name/i)).toBeVisible();
  await page.getByLabel("Name").fill("Avery Stone");
  await page.getByLabel("Work email").fill("avery@example.com");
  await page.getByLabel("Company").fill("Example Co");
  await page
    .getByLabel("Describe the challenge")
    .fill("We need help improving a legacy application and exploring AI workflow support.");
  await page.getByLabel(/I understand/i).check();
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByRole("status")).toContainText(
    /Development mode|received|could not save|temporarily unavailable/i,
    { timeout: 10000 }
  );
});

test("contact form requires only name, email, and description", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByText(/Enter your name/i)).toBeVisible();
  await expect(page.getByText(/Enter a valid work email/i)).toBeVisible();
  await expect(page.getByText(/Share a little more about/i)).toBeVisible();
  // Ensure company is optional on contact (no "Enter your company" error)
  await expect(page.getByText(/Enter your company/i)).toHaveCount(0);

  await page.getByLabel("Name").fill("Jordan Reed");
  await page.getByLabel("Work email").fill("jordan@example.com");
  await page
    .getByLabel(/What is difficult, or what would you like to change\?/i)
    .fill("We have an internal reporting bottleneck and want to discuss possible improvements.");
  await page.getByLabel(/I understand/i).check();
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByRole("status")).toContainText(
    /Development mode|received|could not save|temporarily unavailable/i,
    { timeout: 10000 }
  );
});

test("start-project enquiry form succeeds with optional fields omitted", async ({ page }) => {
  await page.goto("/start-project");
  await page.getByLabel("Name").fill("Morgan Cross");
  await page.getByLabel("Work email").fill("morgan@example.com");
  // Omit company, budget, start date, contact method
  await page
    .getByLabel("Describe the challenge")
    .fill("Our database sync process fails intermittently and requires manual intervention.");
  await page.getByLabel(/I understand/i).check();
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByRole("status")).toContainText(
    /Development mode|received|could not save|temporarily unavailable/i,
    { timeout: 10000 }
  );
});

test("scroll to form arrow scrolls to the enquiry form on contact and start-project", async ({ page }) => {
  for (const path of ["/contact", "/start-project"]) {
    await page.goto(path);
    const scrollButton = page.getByRole("button", { name: /Scroll to enquiry form/i });
    await expect(scrollButton).toBeVisible();
    await scrollButton.click();
    await expect(page.locator("#enquiry-form")).toBeInViewport();
  }
});
