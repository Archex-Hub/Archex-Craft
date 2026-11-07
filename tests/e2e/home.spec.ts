import { expect, test } from "@playwright/test";

test("homepage story, responsive layout, reduced motion, and mobile navigation work", async ({
  page
}) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && /hydration|server html|react error/i.test(message.text())) {
      runtimeErrors.push(message.text());
    }
  });
  await page.goto("/");
  const heroHeading = page.getByRole("heading", {
    name: /Start with the work/i
  });
  await expect(heroHeading).toBeVisible();

  await page.setViewportSize({ width: 1280, height: 900 });
  const themeToggle = page.getByRole("button", { name: "Switch to dark mode" });
  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  const stageTwo = page.getByRole("button", { name: /What is involved/ });
  await stageTwo.focus();
  await page.keyboard.press("Enter");
  await expect(stageTwo).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Stage 02 / 04")).toBeVisible();
  await page.getByRole("button", { name: "Next story stage" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Stage 03 / 04")).toBeVisible();
  await page.getByRole("button", { name: "Previous story stage" }).click();
  await expect(page.getByText("Stage 02 / 04")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/homepage-desktop.png" });

  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(heroHeading).toBeVisible();
    const pageWidth = await page.locator("html").evaluate((element) => element.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const overflowing = await page.locator("body").evaluate((body) =>
      [...body.querySelectorAll("*")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName,
            className: typeof element.className === "string" ? element.className : "",
            text: element.textContent?.trim().slice(0, 50),
            parent: (element.parentElement as HTMLElement | null)?.className,
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          };
        })
        .filter((element) => element.right > window.innerWidth + 1)
        .slice(0, 8)
    );
    expect(
      pageWidth,
      `horizontal overflow at ${width}px: ${JSON.stringify(overflowing)}`
    ).toBeLessThanOrEqual(viewportWidth);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/homepage-mobile.png" });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#needs").scrollIntoViewIfNeeded();
  const animationName = await page
    .locator(".need-map-dash")
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(animationName).toBe("none");

  await page.getByRole("button", { name: /open navigation/i }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Services", exact: true })
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /open navigation/i })).toBeFocused();

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/services");
  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Services", exact: true })
  ).toHaveAttribute("aria-current", "page");
  await page.goto("/work");
  await expect(page).toHaveURL("/");
  await expect(page.locator(".home-examples")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /illustrative work/i })).toHaveCount(0);
  expect(runtimeErrors).toEqual([]);
});
