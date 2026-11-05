import { describe, expect, it } from "vitest";
import {
  getAllImageAssets,
  getImageAsset,
  resolveImageUrl,
  resolveImageAlt
} from "@/lib/assets/images";
import { getEntries } from "@/lib/content/loader";
import { serviceCategories } from "@/lib/services/catalog";

describe("Image Asset Resolution System", () => {
  it("manifest contains all canonical assets across required and optional groups", () => {
    const assets = getAllImageAssets();
    expect(assets.length).toBe(48);

    const required = assets.filter((a) => a.required);
    expect(required.length).toBe(39);

    const optional = assets.filter((a) => !a.required);
    expect(optional.length).toBe(9);
  });

  it("every manifest asset has valid paths and webp filenames", () => {
    for (const asset of getAllImageAssets()) {
      expect(asset.slug).toBeTruthy();
      expect(asset.title).toBeTruthy();
      expect(asset.expectedFilename.endsWith(".webp")).toBe(true);
      expect(asset.localPath).toBe(`public/resources/images/${asset.kind}/${asset.expectedFilename}`);
      expect(asset.publicUrl).toBe(`/resources/images/${asset.kind}/${asset.expectedFilename}`);
      expect(asset.alt).toBeTruthy();

      const retrieved = getImageAsset(asset.kind, asset.slug);
      expect(retrieved).toBeDefined();
      expect(retrieved?.slug).toBe(asset.slug);
      expect(resolveImageAlt(asset.kind, asset.slug)).toBe(asset.alt);
    }
  });

  it("resolves canonical service images", () => {
    expect(resolveImageUrl("services", "chatbot-development")).toBe(
      "/resources/images/services/chatbot-development.webp"
    );
    expect(resolveImageUrl("services", "custom-software-development")).toBe(
      "/resources/images/services/custom-software-development.webp"
    );
    expect(resolveImageUrl("services", "application-modernization")).toBe(
      "/resources/images/services/application-modernization.webp"
    );
  });

  it("resolves canonical industry images", () => {
    expect(resolveImageUrl("industries", "software-saas-technology")).toBe(
      "/resources/images/industries/software-saas-technology.webp"
    );
    expect(resolveImageUrl("industries", "operations-heavy-businesses")).toBe(
      "/resources/images/industries/operations-heavy-businesses.webp"
    );
  });

  it("resolves canonical work images including alias", () => {
    expect(resolveImageUrl("work", "ai-assisted-intake-workflow")).toBe(
      "/resources/images/work/ai-assisted-intake-workflow.webp"
    );
    expect(resolveImageUrl("work", "legacy-operations-platform")).toBe(
      "/resources/images/work/legacy-operations-platform.webp"
    );
    // Alias check
    expect(resolveImageUrl("work", "legacy-operations-platform-modernization")).toBe(
      "/resources/images/work/legacy-operations-platform.webp"
    );
  });

  it("resolves canonical insights images", () => {
    expect(resolveImageUrl("insights", "ai-integration-needs-evaluation")).toBe(
      "/resources/images/insights/ai-integration-needs-evaluation.webp"
    );
    expect(resolveImageUrl("insights", "modernization-without-rewrite-reflex")).toBe(
      "/resources/images/insights/modernization-without-rewrite-reflex.webp"
    );
  });

  it("resolves canonical modernization images", () => {
    expect(resolveImageUrl("modernization", "incremental-migration")).toBe(
      "/resources/images/modernization/incremental-migration.webp"
    );
    expect(resolveImageUrl("modernization", "legacy-application-assessment")).toBe(
      "/resources/images/modernization/legacy-application-assessment.webp"
    );
  });

  it("attaches resolved images to loader entries", () => {
    const services = getEntries("services");
    for (const service of services) {
      expect(service.image).toBe(`/resources/images/services/${service.slug}.webp`);
      expect(service.imageAlt).toBeTruthy();
    }

    const industries = getEntries("industries");
    for (const industry of industries) {
      expect(industry.image).toBe(`/resources/images/industries/${industry.slug}.webp`);
      expect(industry.imageAlt).toBeTruthy();
    }

    const work = getEntries("work");
    for (const item of work) {
      expect(item.image).toBe(`/resources/images/work/${item.slug}.webp`);
      expect(item.imageAlt).toBeTruthy();
    }

    const insights = getEntries("insights");
    for (const insight of insights) {
      expect(insight.image).toBe(`/resources/images/insights/${insight.slug}.webp`);
      expect(insight.imageAlt).toBeTruthy();
    }
  });

  it("attaches resolved images to catalog services", () => {
    const allServices = serviceCategories.flatMap((c) => c.services);
    expect(allServices.length).toBeGreaterThan(20);
    for (const s of allServices) {
      expect(s.image).toBe(`/resources/images/services/${s.slug}.webp`);
      expect(s.imageAlt).toBeTruthy();
    }
  });
});
