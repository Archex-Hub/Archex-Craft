import { expect, test } from "@playwright/test";

test("text selection stays legible on light and dark sections", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("archex-theme", "light"));
  await page.goto("/");

  const heading = page.locator("h1");
  await expect(heading).toBeVisible();
  const headingBox = await heading.boundingBox();
  if (!headingBox) throw new Error("The homepage heading has no visible bounds.");
  await page.mouse.move(headingBox!.x + 2, headingBox!.y + headingBox!.height / 3);
  await page.mouse.down();
  await page.mouse.move(headingBox!.x + headingBox!.width / 2, headingBox!.y + headingBox!.height / 3);
  await page.mouse.up();
  expect(await page.evaluate(() => window.getSelection()?.toString())).not.toBe("");

  const selectionStyle = await page.locator("h1").evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    const style = getComputedStyle(element, "::selection");
    return { background: style.backgroundColor, color: style.color };
  });
  expect(selectionStyle).toEqual({
    background: "rgb(209, 164, 119)",
    color: "rgb(17, 28, 46)"
  });

  await page.keyboard.press("Control+A");
  expect(await page.evaluate(() => window.getSelection()?.toString())).not.toBe("");
  await page.goto("/how-we-work");
  const darkSectionSelection = await page
    .locator("section.bg-deep-navy h1")
    .evaluate((element) => {
      const style = getComputedStyle(element, "::selection");
      return { background: style.backgroundColor, color: style.color };
    });
  expect(darkSectionSelection).toEqual(selectionStyle);
});

test("How We Work returns to its light sections after scrolling", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("archex-theme", "light"));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/how-we-work");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  const heroBackground = await page
    .locator("section.bg-deep-navy")
    .first()
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  const contentBackground = await page
    .locator("#stages")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(heroBackground).not.toBe(contentBackground);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("service cards do not render or request their broken images", async ({ page }) => {
  const serviceImageRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (request.resourceType() === "image" && url.pathname.includes("/resources/images/services/")) {
      serviceImageRequests.push(url.pathname);
    }
  });

  for (const route of ["/", "/services"]) {
    await page.goto(route);
    const serviceRail = page.locator(".content-rail").first();
    await expect(serviceRail.locator("[data-rail-card]").first()).toBeVisible();
    await expect(serviceRail.locator("[data-rail-card] img")).toHaveCount(0);
    await expect(serviceRail.getByText(/service illustration/i)).toHaveCount(0);
  }
  expect(serviceImageRequests).toEqual([]);
});
