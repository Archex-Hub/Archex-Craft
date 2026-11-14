import { expect, test } from "@playwright/test";

test.describe("About Page", () => {
  test("renders the redesigned about page with all major sections", async ({ page, isMobile }) => {
    const response = await page.goto("/about");
    expect(response?.status()).toBe(200);

    const main = page.locator("main");

    // H1 check
    const h1 = main.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(
      "Engineering software that businesses can stake their operations on"
    );

    // Key proof points bar
    await expect(main.getByText("Dedicated Engineers")).toBeVisible();
    await expect(main.getByText("Client Code Ownership")).toBeVisible();
    await expect(main.getByText("Demonstrable Delivery")).toBeVisible();

    // Story section
    await expect(main.getByText("Built to be the antidote to agency bloat")).toBeVisible();

    // Comparison matrix
    await expect(main.getByText("How we compare to the traditional alternative")).toBeVisible();
    if (isMobile) {
      await expect(main.getByText("Typical Agency", { exact: true }).first()).toBeVisible();
      await expect(main.getByText("Archex Craft", { exact: true }).first()).toBeVisible();
    } else {
      await expect(main.getByText("Typical Agency / Freelance Shop").first()).toBeVisible();
      await expect(main.getByText("The Archex Craft Way").first()).toBeVisible();
    }

    // Engineering ethos
    await expect(main.getByText("Our non-negotiable engineering principles")).toBeVisible();
    await expect(main.getByText("Understand Before Building")).toBeVisible();

    // Interactive persona tabs
    const operationsTab = main.getByRole("button", { name: /Operations-Heavy Businesses/i });
    await expect(operationsTab).toBeVisible();
    await operationsTab.click();
    await expect(
      main.getByText("Replace disjointed spreadsheets and manual friction with unified software.")
    ).toBeVisible();

    const engineeringTab = main.getByRole("button", { name: /In-House Engineering Teams/i });
    await expect(engineeringTab).toBeVisible();
    await engineeringTab.click();
    await expect(
      main.getByText("Senior engineering horsepower to accelerate roadmaps")
    ).toBeVisible();

    // FAQ accordion
    const firstFaqQuestion = main.getByRole("button", {
      name: /What kind of company is Archex Craft\?/i
    });
    await expect(firstFaqQuestion).toBeVisible();
    // It is open by default
    await expect(
      main.getByText("Archex Craft is an independent solutions engineering practice")
    ).toBeVisible();

    // Click second FAQ
    const secondFaqQuestion = main.getByRole("button", {
      name: /Who will actually be engineering our software\?/i
    });
    await secondFaqQuestion.click();
    await expect(
      main.getByText(
        "Experienced solutions engineers. You work directly with the technical specialists"
      )
    ).toBeVisible();

    // CTA section in main
    const mainCta = main.locator("section").last();
    await expect(mainCta.getByRole("link", { name: /Start a Conversation/i })).toBeVisible();
    await expect(mainCta.getByRole("link", { name: /Project Enquiry/i })).toBeVisible();
  });
});
