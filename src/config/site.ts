const canonicalProductionOrigin = "https://www.archexweb.in";

export const siteConfig = {
  name: "Archex Web",
  seoName: "Archex",
  tagline: "Good software starts with good engineering.",
  description:
    "We build digital products, bring AI into existing workflows, and improve software businesses already depend on.",
  url: getCanonicalSiteUrl(),
  email: "",
  phone: "",
  address: "",
  social: {
    linkedin: "",
    github: ""
  }
};

function getCanonicalSiteUrl() {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isProduction = process.env.NODE_ENV === "production";

  if (!configuredOrigin && isProduction) {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be set to ${canonicalProductionOrigin} in production.`);
  }

  const origin = configuredOrigin || "http://localhost:3000";
  let parsed: URL;
  try {
    parsed = new URL(origin);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }

  if (parsed.origin !== origin.replace(/\/$/, "")) {
    throw new Error("NEXT_PUBLIC_SITE_URL must contain only an origin, without a path or query.");
  }

  if (isProduction && parsed.origin !== canonicalProductionOrigin) {
    throw new Error(`Production NEXT_PUBLIC_SITE_URL must be ${canonicalProductionOrigin}.`);
  }

  if (isProduction && parsed.protocol !== "https:") {
    throw new Error("Production NEXT_PUBLIC_SITE_URL must use HTTPS.");
  }

  return parsed.origin;
}

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Modernization", href: "/modernization" },
  { label: "Industries", href: "/industries" },
  { label: "Company", href: "/about" }
];
