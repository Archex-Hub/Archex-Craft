import { describe, expect, it } from "vitest";
import { llmsText } from "@/lib/agentic/llms";
import { aiCatalogManifest } from "@/lib/agentic/catalog";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

describe("Agent Discoverability — llms.txt", () => {
  it("contains a required H1 header as the first heading", () => {
    expect(llmsText.trimStart().startsWith("# ")).toBe(true);
    expect(llmsText).toMatch(/^# [^\n]+/m);
  });

  it("exceeds the 50-character minimum length recommendation", () => {
    expect(llmsText.length).toBeGreaterThan(50);
  });

  it("contains valid markdown links", () => {
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const matches = [...llmsText.matchAll(markdownLinkRegex)];
    expect(matches.length).toBeGreaterThan(0);
    for (const match of matches) {
      expect(match[1].trim().length).toBeGreaterThan(0);
      expect(match[2].startsWith("https://craft.archexweb.in")).toBe(true);
    }
  });

  it("exists as a static file in public/llms.txt", () => {
    const publicPath = join(process.cwd(), "public", "llms.txt");
    expect(existsSync(publicPath)).toBe(true);
    const content = readFileSync(publicPath, "utf-8");
    expect(content.startsWith("# Archex Craft")).toBe(true);
  });
});

describe("Agent Discoverability — ai-catalog.json (ARD Spec)", () => {
  it("conforms to the ARD specification root envelope", () => {
    expect(aiCatalogManifest.specVersion).toBe("1.0");
    expect(aiCatalogManifest.host.displayName).toBe("Archex Craft");
    expect(aiCatalogManifest.host.publisherDomain).toBe("craft.archexweb.in");
    expect(Array.isArray(aiCatalogManifest.entries)).toBe(true);
    expect(aiCatalogManifest.entries.length).toBeGreaterThan(0);
  });

  it("conforms to ARD entry rules (domain URN, representativeQueries, url or data)", () => {
    for (const entry of aiCatalogManifest.entries) {
      // Must have domain-anchored URN
      expect(entry.identifier).toMatch(/^urn:air:craft\.archexweb\.in:[a-z-]+:[a-z-]+$/);
      // Must have displayName and description
      expect(entry.displayName.length).toBeGreaterThan(0);
      expect(entry.description.length).toBeGreaterThan(0);
      // Must have type
      expect(entry.type.length).toBeGreaterThan(0);
      // Must define either url or data, never both, never neither
      const hasUrl = "url" in entry && Boolean(entry.url);
      const hasData = "data" in entry && Boolean(entry.data);
      expect(hasUrl !== hasData).toBe(true);
      // Must have representativeQueries (2-5 recommended)
      expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2);
      expect(entry.representativeQueries.length).toBeLessThanOrEqual(5);
    }
  });

  it("exists as valid JSON in public/ai-catalog.json and public/.well-known/ai-catalog.json", () => {
    const rootPath = join(process.cwd(), "public", "ai-catalog.json");
    const wellKnownPath = join(process.cwd(), "public", ".well-known", "ai-catalog.json");
    const ardPath = join(process.cwd(), "public", ".well-known", "ard.json");

    expect(existsSync(rootPath)).toBe(true);
    expect(existsSync(wellKnownPath)).toBe(true);
    expect(existsSync(ardPath)).toBe(true);

    const parsedRoot = JSON.parse(readFileSync(rootPath, "utf-8"));
    const parsedWellKnown = JSON.parse(readFileSync(wellKnownPath, "utf-8"));
    const parsedArd = JSON.parse(readFileSync(ardPath, "utf-8"));

    expect(parsedRoot.specVersion).toBe("1.0");
    expect(parsedWellKnown.specVersion).toBe("1.0");
    expect(parsedArd.specVersion).toBe("1.0");
  });
});
