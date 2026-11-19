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
  it("conforms to strict ARD root envelope without additional properties at root", () => {
    expect(aiCatalogManifest.specVersion).toBe("1.0");
    expect(aiCatalogManifest.host.displayName).toBe("Archex Craft");
    expect(aiCatalogManifest.host.identifier).toBe("https://craft.archexweb.in");
    expect(Array.isArray(aiCatalogManifest.entries)).toBe(true);
    expect(aiCatalogManifest.entries.length).toBeGreaterThan(0);

    // Schema forbids additional properties at path 'root' (e.g. $schema)
    const rootKeys = Object.keys(aiCatalogManifest);
    expect(rootKeys.sort()).toEqual(["entries", "host", "specVersion"].sort());
  });

  it("uses standard ARD discovery media types (not text/html)", () => {
    const standardDiscoveryTypes = [
      "application/ai-catalog+json",
      "application/agent-card+json",
      "application/a2a-agent-card+json",
      "application/mcp-server-card+json",
      "application/agent-skills+zip",
      "application/agent-skills+gzip",
      'text/markdown; profile="urn:air:agent-skills"',
      "application/ai-registry",
      "application/ai-registry+json"
    ];

    for (const entry of aiCatalogManifest.entries) {
      expect(standardDiscoveryTypes).toContain(entry.type);
      // Domain-anchored URN identifier
      expect(entry.identifier).toMatch(/^urn:air:craft\.archexweb\.in:[a-z-]+:[a-z-]+$/);
      // Must define url pointing to markdown resource
      expect(entry.url.endsWith(".txt") || entry.url.endsWith(".md")).toBe(true);
      // Must have representativeQueries (2-5)
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

    expect(Object.keys(parsedRoot).sort()).toEqual(["entries", "host", "specVersion"].sort());
    expect(Object.keys(parsedWellKnown).sort()).toEqual(["entries", "host", "specVersion"].sort());
    expect(Object.keys(parsedArd).sort()).toEqual(["entries", "host", "specVersion"].sort());
  });
});
