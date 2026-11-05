#!/usr/bin/env node

/**
 * Archex Local Image Asset Verification Script
 *
 * Verifies local presence of image assets against the canonical asset manifest.
 * Does not download, generate, or fabricate image files.
 *
 * Usage:
 *   node scripts/verify-assets.mjs           # Informational report (exits 0 even if files missing)
 *   node scripts/verify-assets.mjs --strict  # Strict mode (exits 1 if any required asset is missing)
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicImagesRoot = path.join(root, "public", "resources", "images");

const isStrict = process.argv.includes("--strict");

// Canonical Manifest of Archex Assets
const MANIFEST = [
  // --- 1. Services (24 items, Required) ---
  {
    kind: "services",
    slug: "chatbot-development",
    title: "Chatbot Development",
    category: "AI & ML Development",
    filename: "chatbot-development.webp",
    required: true,
    route: "/services/chatbot-development"
  },
  {
    kind: "services",
    slug: "generative-ai-development",
    title: "Generative AI Development",
    category: "AI & ML Development",
    filename: "generative-ai-development.webp",
    required: true,
    route: "/services/generative-ai-development"
  },
  {
    kind: "services",
    slug: "ai-integrated-software",
    title: "AI-integrated Software",
    category: "AI & ML Development",
    filename: "ai-integrated-software.webp",
    required: true,
    route: "/services/ai-integrated-software"
  },
  {
    kind: "services",
    slug: "conversational-ai",
    title: "Conversational AI",
    category: "AI & ML Development",
    filename: "conversational-ai.webp",
    required: true,
    route: "/services/conversational-ai"
  },
  {
    kind: "services",
    slug: "ai-integration",
    title: "AI Integration",
    category: "AI & ML Development",
    filename: "ai-integration.webp",
    required: true,
    route: "/services/ai-integration"
  },
  {
    kind: "services",
    slug: "custom-website-development",
    title: "Custom Website Development",
    category: "Web & CMS Development",
    filename: "custom-website-development.webp",
    required: true,
    route: "/services/custom-website-development"
  },
  {
    kind: "services",
    slug: "web-application-development",
    title: "Web Application Development",
    category: "Web & CMS Development",
    filename: "web-application-development.webp",
    required: true,
    route: "/services/web-application-development"
  },
  {
    kind: "services",
    slug: "cms-development",
    title: "CMS Development",
    category: "Web & CMS Development",
    filename: "cms-development.webp",
    required: true,
    route: "/services/cms-development"
  },
  {
    kind: "services",
    slug: "ecommerce-design",
    title: "Ecommerce Design",
    category: "Ecommerce Development",
    filename: "ecommerce-design.webp",
    required: true,
    route: "/services/ecommerce-design"
  },
  {
    kind: "services",
    slug: "ecommerce-implementation",
    title: "Ecommerce Implementation",
    category: "Ecommerce Development",
    filename: "ecommerce-implementation.webp",
    required: true,
    route: "/services/ecommerce-implementation"
  },
  {
    kind: "services",
    slug: "woocommerce-development",
    title: "WooCommerce Development",
    category: "Ecommerce Development",
    filename: "woocommerce-development.webp",
    required: true,
    route: "/services/woocommerce-development"
  },
  {
    kind: "services",
    slug: "shopify-development",
    title: "Shopify Development",
    category: "Ecommerce Development",
    filename: "shopify-development.webp",
    required: true,
    route: "/services/shopify-development"
  },
  {
    kind: "services",
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    category: "Ecommerce Development",
    filename: "ecommerce-development.webp",
    required: true,
    route: "/services/ecommerce-development"
  },
  {
    kind: "services",
    slug: "android-app-development",
    title: "Android App Development",
    category: "Mobile App Development",
    filename: "android-app-development.webp",
    required: true,
    route: "/services/android-app-development"
  },
  {
    kind: "services",
    slug: "ios-app-development",
    title: "iOS App Development",
    category: "Mobile App Development",
    filename: "ios-app-development.webp",
    required: true,
    route: "/services/ios-app-development"
  },
  {
    kind: "services",
    slug: "cross-platform-mobile-development",
    title: "Cross-platform Mobile Development",
    category: "Mobile App Development",
    filename: "cross-platform-mobile-development.webp",
    required: true,
    route: "/services/cross-platform-mobile-development"
  },
  {
    kind: "services",
    slug: "react-native-development",
    title: "React Native Development",
    category: "Mobile App Development",
    filename: "react-native-development.webp",
    required: true,
    route: "/services/react-native-development"
  },
  {
    kind: "services",
    slug: "mvp-development",
    title: "MVP Development",
    category: "Software Development",
    filename: "mvp-development.webp",
    required: true,
    route: "/services/mvp-development"
  },
  {
    kind: "services",
    slug: "saas-development",
    title: "SaaS Development",
    category: "Software Development",
    filename: "saas-development.webp",
    required: true,
    route: "/services/saas-development"
  },
  {
    kind: "services",
    slug: "erp-software",
    title: "ERP Software",
    category: "Software Development",
    filename: "erp-software.webp",
    required: true,
    route: "/services/erp-software"
  },
  {
    kind: "services",
    slug: "crm-systems",
    title: "CRM Systems",
    category: "Software Development",
    filename: "crm-systems.webp",
    required: true,
    route: "/services/crm-systems"
  },
  {
    kind: "services",
    slug: "enterprise-software",
    title: "Enterprise Software",
    category: "Software Development",
    filename: "enterprise-software.webp",
    required: true,
    route: "/services/enterprise-software"
  },
  {
    kind: "services",
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "Core Engineering & Modernization",
    filename: "custom-software-development.webp",
    required: true,
    route: "/services/custom-software-development"
  },
  {
    kind: "services",
    slug: "application-modernization",
    title: "Application Modernization",
    category: "Core Engineering & Modernization",
    filename: "application-modernization.webp",
    required: true,
    route: "/services/application-modernization"
  },

  // --- 2. Industries (9 items, Required) ---
  {
    kind: "industries",
    slug: "software-saas-technology",
    title: "Software, SaaS, and technology products",
    filename: "software-saas-technology.webp",
    required: true,
    route: "/industries/software-saas-technology"
  },
  {
    kind: "industries",
    slug: "retail-ecommerce-consumer-services",
    title: "Retail, ecommerce, and consumer services",
    filename: "retail-ecommerce-consumer-services.webp",
    required: true,
    route: "/industries/retail-ecommerce-consumer-services"
  },
  {
    kind: "industries",
    slug: "professional-business-services",
    title: "Professional, financial, and business services",
    filename: "professional-business-services.webp",
    required: true,
    route: "/industries/professional-business-services"
  },
  {
    kind: "industries",
    slug: "logistics-distribution-operations",
    title: "Logistics, supply chain, and distribution",
    filename: "logistics-distribution-operations.webp",
    required: true,
    route: "/industries/logistics-distribution-operations"
  },
  {
    kind: "industries",
    slug: "education-training",
    title: "Education, training, and knowledge platforms",
    filename: "education-training.webp",
    required: true,
    route: "/industries/education-training"
  },
  {
    kind: "industries",
    slug: "healthcare-wellness-operations",
    title: "Healthcare and operational wellness systems",
    filename: "healthcare-wellness-operations.webp",
    required: true,
    route: "/industries/healthcare-wellness-operations"
  },
  {
    kind: "industries",
    slug: "manufacturing-distribution-operations",
    title: "Manufacturing, industrial, and supply operations",
    filename: "manufacturing-distribution-operations.webp",
    required: true,
    route: "/industries/manufacturing-distribution-operations"
  },
  {
    kind: "industries",
    slug: "operations-heavy-businesses",
    title: "Operations-heavy businesses",
    filename: "operations-heavy-businesses.webp",
    required: true,
    route: "/industries/operations-heavy-businesses"
  },
  {
    kind: "industries",
    slug: "software-product-teams",
    title: "Software product teams",
    filename: "software-product-teams.webp",
    required: true,
    route: "/industries/software-product-teams"
  },

  // --- 3. Modernization (2 items, Required) ---
  {
    kind: "modernization",
    slug: "incremental-migration",
    title: "Incremental platform migration",
    filename: "incremental-migration.webp",
    required: true,
    route: "/modernization/incremental-migration"
  },
  {
    kind: "modernization",
    slug: "legacy-application-assessment",
    title: "Legacy application technical assessment",
    filename: "legacy-application-assessment.webp",
    required: true,
    route: "/modernization/legacy-application-assessment"
  },

  // --- 4. Work (2 items, Required) ---
  {
    kind: "work",
    slug: "ai-assisted-intake-workflow",
    title: "AI-assisted intake workflow",
    filename: "ai-assisted-intake-workflow.webp",
    required: true,
    route: "/work/ai-assisted-intake-workflow"
  },
  {
    kind: "work",
    slug: "legacy-operations-platform",
    title: "Legacy operations platform modernization",
    filename: "legacy-operations-platform.webp",
    required: true,
    aliases: ["legacy-operations-platform-modernization.webp"],
    route: "/work/legacy-operations-platform"
  },

  // --- 5. Insights (2 items, Required) ---
  {
    kind: "insights",
    slug: "ai-integration-needs-evaluation",
    title: "AI integration needs evaluation before confidence",
    filename: "ai-integration-needs-evaluation.webp",
    required: true,
    route: "/insights/ai-integration-needs-evaluation"
  },
  {
    kind: "insights",
    slug: "modernization-without-rewrite-reflex",
    title: "Modernization without the rewrite reflex",
    filename: "modernization-without-rewrite-reflex.webp",
    required: true,
    route: "/insights/modernization-without-rewrite-reflex"
  },

  // --- 6. Engagement Models (3 items, Optional) ---
  {
    kind: "engagement-models",
    slug: "defined-scope-delivery",
    title: "Defined-scope project delivery",
    filename: "defined-scope-delivery.webp",
    required: false,
    route: "/engagement-models"
  },
  {
    kind: "engagement-models",
    slug: "extended-engineering-team",
    title: "Extended engineering capacity",
    filename: "extended-engineering-team.webp",
    required: false,
    route: "/engagement-models"
  },
  {
    kind: "engagement-models",
    slug: "ongoing-engineering-partnership",
    title: "Ongoing engineering partnership",
    filename: "ongoing-engineering-partnership.webp",
    required: false,
    route: "/engagement-models"
  },

  // --- 7. Service Categories (5 items, Optional) ---
  {
    kind: "service-categories",
    slug: "ai-ml-development",
    title: "AI & ML Development",
    filename: "ai-ml-development.webp",
    required: false,
    route: "/services#ai-ml-development"
  },
  {
    kind: "service-categories",
    slug: "web-cms-development",
    title: "Web & CMS Development",
    filename: "web-cms-development.webp",
    required: false,
    route: "/services#web-cms-development"
  },
  {
    kind: "service-categories",
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    filename: "ecommerce-development.webp",
    required: false,
    route: "/services#ecommerce-development"
  },
  {
    kind: "service-categories",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    filename: "mobile-app-development.webp",
    required: false,
    route: "/services#mobile-app-development"
  },
  {
    kind: "service-categories",
    slug: "software-development",
    title: "Software Development",
    filename: "software-development.webp",
    required: false,
    route: "/services#software-development"
  },

  // --- 8. AI Solutions Overview (1 item, Optional) ---
  {
    kind: "ai-solutions",
    slug: "overview",
    title: "AI Solutions Overview",
    filename: "overview.webp",
    required: false,
    route: "/ai-solutions"
  }
];

const ALT_EXTENSIONS = [".png", ".jpg", ".jpeg", ".avif", ".svg"];

function checkItem(item) {
  const dirPath = path.join(publicImagesRoot, item.kind);
  const exactPath = path.join(dirPath, item.filename);
  const relPath = path.join("public", "resources", "images", item.kind, item.filename).replace(/\\/g, "/");

  if (fs.existsSync(exactPath)) {
    return {
      ...item,
      relPath,
      status: "EXISTS",
      detail: "Exact file present"
    };
  }

  // Check aliases
  if (item.aliases) {
    for (const alias of item.aliases) {
      const aliasPath = path.join(dirPath, alias);
      if (fs.existsSync(aliasPath)) {
        return {
          ...item,
          relPath,
          status: "ALIAS_FOUND",
          detail: `Found alias file "${alias}" (rename to "${item.filename}" recommended)`
        };
      }
    }
  }

  // Check alternative extensions
  const stem = path.parse(item.filename).name;
  for (const ext of ALT_EXTENSIONS) {
    const altFile = `${stem}${ext}`;
    const altPath = path.join(dirPath, altFile);
    if (fs.existsSync(altPath)) {
      return {
        ...item,
        relPath,
        status: "FORMAT_MISMATCH",
        detail: `Found "${altFile}" with non-WebP extension. Please convert format to true WebP.`
      };
    }
  }

  return {
    ...item,
    relPath,
    status: "MISSING",
    detail: `File not yet supplied (${item.required ? "Required" : "Optional"})`
  };
}

console.log("================================================================================");
console.log("             ARCHEX LOCAL IMAGE ASSET INVENTORY & VERIFICATION                  ");
console.log("================================================================================");
console.log(`Execution mode: ${isStrict ? "STRICT (--strict flag enabled)" : "INFORMATIONAL (standard dev/build mode)"}`);
console.log(`Image assets root: ${publicImagesRoot.replace(/\\/g, "/")}`);
console.log("--------------------------------------------------------------------------------\n");

const results = MANIFEST.map(checkItem);

const requiredItems = results.filter((r) => r.required);
const optionalItems = results.filter((r) => !r.required);

const requiredFound = requiredItems.filter((r) => r.status === "EXISTS" || r.status === "ALIAS_FOUND").length;
const requiredMissing = requiredItems.length - requiredFound;

const optionalFound = optionalItems.filter((r) => r.status === "EXISTS" || r.status === "ALIAS_FOUND").length;
const optionalMissing = optionalItems.length - optionalFound;

// Group by kind for readable output
const byKind = {};
for (const r of results) {
  if (!byKind[r.kind]) byKind[r.kind] = [];
  byKind[r.kind].push(r);
}

for (const [kind, items] of Object.entries(byKind)) {
  const kindTitle = kind.toUpperCase();
  console.log(`[ ${kindTitle} ] (${items.length} items)`);
  for (const item of items) {
    const symbol =
      item.status === "EXISTS"
        ? "[OK]      "
        : item.status === "ALIAS_FOUND"
          ? "[ALIAS]   "
          : item.status === "FORMAT_MISMATCH"
            ? "[CONVERT] "
            : item.required
              ? "[MISSING] "
              : "[OPTIONAL]";
    console.log(`  ${symbol} ${item.relPath}`);
    if (item.status !== "EXISTS") {
      console.log(`             Title: ${item.title} | ${item.detail}`);
    }
  }
  console.log("");
}

console.log("--------------------------------------------------------------------------------");
console.log("SUMMARY REPORT:");
console.log(`  Required Assets: ${requiredFound} / ${requiredItems.length} present (${requiredMissing} missing)`);
console.log(`  Optional Assets: ${optionalFound} / ${optionalItems.length} present (${optionalMissing} missing)`);
console.log(`  Total Assets:    ${requiredFound + optionalFound} / ${results.length} present`);
console.log("--------------------------------------------------------------------------------");

if (requiredMissing > 0) {
  console.log(`\nNOTE: ${requiredMissing} required image assets have not yet been placed in the repository.`);
  console.log("The website will safely render the classy geometric fallback placeholder for these items.");
  console.log("Card dimensions, typography, layout, and build steps remain 100% operational.\n");

  if (isStrict) {
    console.error("STRICT CHECK FAILED: One or more required image assets are missing.");
    console.error("Please supply the required files or run without --strict for local development.\n");
    process.exit(1);
  }
} else {
  console.log("\nALL REQUIRED IMAGE ASSETS ARE PRESENT! Website visual assets verified successfully.\n");
}

process.exit(0);
