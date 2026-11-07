import { describe, expect, it } from "vitest";
// @ts-expect-error next.config.mjs is untyped ES module
import nextConfig from "../../next.config.mjs";

describe("next.config.mjs redirects", () => {
  it("defines temporary 307 redirects for all work routes", async () => {
    if (!nextConfig.redirects) {
      throw new Error("nextConfig.redirects is not defined");
    }
    const redirects = await nextConfig.redirects();

    const expectedWorkRedirects = [
      { source: "/work", destination: "/", permanent: false },
      { source: "/work/ai-assisted-intake-workflow", destination: "/", permanent: false },
      { source: "/work/legacy-operations-platform", destination: "/", permanent: false },
      { source: "/work/:path*", destination: "/", permanent: false }
    ];

    for (const expected of expectedWorkRedirects) {
      const match = redirects.find(
        (r: { source: string; destination: string; permanent: boolean }) =>
          r.source === expected.source &&
          r.destination === expected.destination &&
          r.permanent === expected.permanent
      );
      expect(match, `Redirect for ${expected.source}`).toBeDefined();
    }
  });

  it("defines temporary 307 redirects for engagement models routes", async () => {
    if (!nextConfig.redirects) {
      throw new Error("nextConfig.redirects is not defined");
    }
    const redirects = await nextConfig.redirects();

    const expectedEngagementRedirects = [
      { source: "/engagement-models", destination: "/contact", permanent: false },
      { source: "/engagement-models/:path*", destination: "/contact", permanent: false }
    ];

    for (const expected of expectedEngagementRedirects) {
      const match = redirects.find(
        (r: { source: string; destination: string; permanent: boolean }) =>
          r.source === expected.source &&
          r.destination === expected.destination &&
          r.permanent === expected.permanent
      );
      expect(match, `Redirect for ${expected.source}`).toBeDefined();
    }
  });
});
