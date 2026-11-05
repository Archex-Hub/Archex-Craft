export type ImageAssetKind =
  | "services"
  | "industries"
  | "modernization"
  | "work"
  | "insights"
  | "engagement-models"
  | "service-categories"
  | "ai-solutions";

export type ImageAssetManifestEntry = {
  kind: ImageAssetKind;
  slug: string;
  title: string;
  category?: string;
  expectedFilename: string;
  localPath: string;
  publicUrl: string;
  required: boolean;
  alt: string;
  aliases?: string[];
  canonicalRoute: string;
};

export const IMAGE_ASSET_MANIFEST: ImageAssetManifestEntry[] = [
  // --- 1. SERVICES (24 items, Required) ---
  // AI & ML Development
  {
    kind: "services",
    slug: "chatbot-development",
    title: "Chatbot Development",
    category: "AI & ML Development",
    expectedFilename: "chatbot-development.webp",
    localPath: "public/resources/images/services/chatbot-development.webp",
    publicUrl: "/resources/images/services/chatbot-development.webp",
    required: true,
    alt: "Chatbot Development service illustration",
    canonicalRoute: "/services/chatbot-development"
  },
  {
    kind: "services",
    slug: "generative-ai-development",
    title: "Generative AI Development",
    category: "AI & ML Development",
    expectedFilename: "generative-ai-development.webp",
    localPath: "public/resources/images/services/generative-ai-development.webp",
    publicUrl: "/resources/images/services/generative-ai-development.webp",
    required: true,
    alt: "Generative AI Development service illustration",
    canonicalRoute: "/services/generative-ai-development"
  },
  {
    kind: "services",
    slug: "ai-integrated-software",
    title: "AI-integrated Software",
    category: "AI & ML Development",
    expectedFilename: "ai-integrated-software.webp",
    localPath: "public/resources/images/services/ai-integrated-software.webp",
    publicUrl: "/resources/images/services/ai-integrated-software.webp",
    required: true,
    alt: "AI-integrated Software service illustration",
    canonicalRoute: "/services/ai-integrated-software"
  },
  {
    kind: "services",
    slug: "conversational-ai",
    title: "Conversational AI",
    category: "AI & ML Development",
    expectedFilename: "conversational-ai.webp",
    localPath: "public/resources/images/services/conversational-ai.webp",
    publicUrl: "/resources/images/services/conversational-ai.webp",
    required: true,
    alt: "Conversational AI service illustration",
    canonicalRoute: "/services/conversational-ai"
  },
  {
    kind: "services",
    slug: "ai-integration",
    title: "AI Integration",
    category: "AI & ML Development",
    expectedFilename: "ai-integration.webp",
    localPath: "public/resources/images/services/ai-integration.webp",
    publicUrl: "/resources/images/services/ai-integration.webp",
    required: true,
    alt: "AI Integration service illustration",
    canonicalRoute: "/services/ai-integration"
  },

  // Web & CMS Development
  {
    kind: "services",
    slug: "custom-website-development",
    title: "Custom Website Development",
    category: "Web & CMS Development",
    expectedFilename: "custom-website-development.webp",
    localPath: "public/resources/images/services/custom-website-development.webp",
    publicUrl: "/resources/images/services/custom-website-development.webp",
    required: true,
    alt: "Custom Website Development service illustration",
    canonicalRoute: "/services/custom-website-development"
  },
  {
    kind: "services",
    slug: "web-application-development",
    title: "Web Application Development",
    category: "Web & CMS Development",
    expectedFilename: "web-application-development.webp",
    localPath: "public/resources/images/services/web-application-development.webp",
    publicUrl: "/resources/images/services/web-application-development.webp",
    required: true,
    alt: "Web Application Development service illustration",
    canonicalRoute: "/services/web-application-development"
  },
  {
    kind: "services",
    slug: "cms-development",
    title: "CMS Development",
    category: "Web & CMS Development",
    expectedFilename: "cms-development.webp",
    localPath: "public/resources/images/services/cms-development.webp",
    publicUrl: "/resources/images/services/cms-development.webp",
    required: true,
    alt: "CMS Development service illustration",
    canonicalRoute: "/services/cms-development"
  },

  // Ecommerce Development
  {
    kind: "services",
    slug: "ecommerce-design",
    title: "Ecommerce Design",
    category: "Ecommerce Development",
    expectedFilename: "ecommerce-design.webp",
    localPath: "public/resources/images/services/ecommerce-design.webp",
    publicUrl: "/resources/images/services/ecommerce-design.webp",
    required: true,
    alt: "Ecommerce Design service illustration",
    canonicalRoute: "/services/ecommerce-design"
  },
  {
    kind: "services",
    slug: "ecommerce-implementation",
    title: "Ecommerce Implementation",
    category: "Ecommerce Development",
    expectedFilename: "ecommerce-implementation.webp",
    localPath: "public/resources/images/services/ecommerce-implementation.webp",
    publicUrl: "/resources/images/services/ecommerce-implementation.webp",
    required: true,
    alt: "Ecommerce Implementation service illustration",
    canonicalRoute: "/services/ecommerce-implementation"
  },
  {
    kind: "services",
    slug: "woocommerce-development",
    title: "WooCommerce Development",
    category: "Ecommerce Development",
    expectedFilename: "woocommerce-development.webp",
    localPath: "public/resources/images/services/woocommerce-development.webp",
    publicUrl: "/resources/images/services/woocommerce-development.webp",
    required: true,
    alt: "WooCommerce Development service illustration",
    canonicalRoute: "/services/woocommerce-development"
  },
  {
    kind: "services",
    slug: "shopify-development",
    title: "Shopify Development",
    category: "Ecommerce Development",
    expectedFilename: "shopify-development.webp",
    localPath: "public/resources/images/services/shopify-development.webp",
    publicUrl: "/resources/images/services/shopify-development.webp",
    required: true,
    alt: "Shopify Development service illustration",
    canonicalRoute: "/services/shopify-development"
  },
  {
    kind: "services",
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    category: "Ecommerce Development",
    expectedFilename: "ecommerce-development.webp",
    localPath: "public/resources/images/services/ecommerce-development.webp",
    publicUrl: "/resources/images/services/ecommerce-development.webp",
    required: true,
    alt: "Ecommerce Development service illustration",
    canonicalRoute: "/services/ecommerce-development"
  },

  // Mobile App Development
  {
    kind: "services",
    slug: "android-app-development",
    title: "Android App Development",
    category: "Mobile App Development",
    expectedFilename: "android-app-development.webp",
    localPath: "public/resources/images/services/android-app-development.webp",
    publicUrl: "/resources/images/services/android-app-development.webp",
    required: true,
    alt: "Android App Development service illustration",
    canonicalRoute: "/services/android-app-development"
  },
  {
    kind: "services",
    slug: "ios-app-development",
    title: "iOS App Development",
    category: "Mobile App Development",
    expectedFilename: "ios-app-development.webp",
    localPath: "public/resources/images/services/ios-app-development.webp",
    publicUrl: "/resources/images/services/ios-app-development.webp",
    required: true,
    alt: "iOS App Development service illustration",
    canonicalRoute: "/services/ios-app-development"
  },
  {
    kind: "services",
    slug: "cross-platform-mobile-development",
    title: "Cross-platform Mobile Development",
    category: "Mobile App Development",
    expectedFilename: "cross-platform-mobile-development.webp",
    localPath: "public/resources/images/services/cross-platform-mobile-development.webp",
    publicUrl: "/resources/images/services/cross-platform-mobile-development.webp",
    required: true,
    alt: "Cross-platform Mobile Development service illustration",
    canonicalRoute: "/services/cross-platform-mobile-development"
  },
  {
    kind: "services",
    slug: "react-native-development",
    title: "React Native Development",
    category: "Mobile App Development",
    expectedFilename: "react-native-development.webp",
    localPath: "public/resources/images/services/react-native-development.webp",
    publicUrl: "/resources/images/services/react-native-development.webp",
    required: true,
    alt: "React Native Development service illustration",
    canonicalRoute: "/services/react-native-development"
  },

  // Software Development
  {
    kind: "services",
    slug: "mvp-development",
    title: "MVP Development",
    category: "Software Development",
    expectedFilename: "mvp-development.webp",
    localPath: "public/resources/images/services/mvp-development.webp",
    publicUrl: "/resources/images/services/mvp-development.webp",
    required: true,
    alt: "MVP Development service illustration",
    canonicalRoute: "/services/mvp-development"
  },
  {
    kind: "services",
    slug: "saas-development",
    title: "SaaS Development",
    category: "Software Development",
    expectedFilename: "saas-development.webp",
    localPath: "public/resources/images/services/saas-development.webp",
    publicUrl: "/resources/images/services/saas-development.webp",
    required: true,
    alt: "SaaS Development service illustration",
    canonicalRoute: "/services/saas-development"
  },
  {
    kind: "services",
    slug: "erp-software",
    title: "ERP Software",
    category: "Software Development",
    expectedFilename: "erp-software.webp",
    localPath: "public/resources/images/services/erp-software.webp",
    publicUrl: "/resources/images/services/erp-software.webp",
    required: true,
    alt: "ERP Software service illustration",
    canonicalRoute: "/services/erp-software"
  },
  {
    kind: "services",
    slug: "crm-systems",
    title: "CRM Systems",
    category: "Software Development",
    expectedFilename: "crm-systems.webp",
    localPath: "public/resources/images/services/crm-systems.webp",
    publicUrl: "/resources/images/services/crm-systems.webp",
    required: true,
    alt: "CRM Systems service illustration",
    canonicalRoute: "/services/crm-systems"
  },
  {
    kind: "services",
    slug: "enterprise-software",
    title: "Enterprise Software",
    category: "Software Development",
    expectedFilename: "enterprise-software.webp",
    localPath: "public/resources/images/services/enterprise-software.webp",
    publicUrl: "/resources/images/services/enterprise-software.webp",
    required: true,
    alt: "Enterprise Software service illustration",
    canonicalRoute: "/services/enterprise-software"
  },

  // Core Engineering & Modernization
  {
    kind: "services",
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "Core Engineering & Modernization",
    expectedFilename: "custom-software-development.webp",
    localPath: "public/resources/images/services/custom-software-development.webp",
    publicUrl: "/resources/images/services/custom-software-development.webp",
    required: true,
    alt: "Custom Software Development service illustration",
    canonicalRoute: "/services/custom-software-development"
  },
  {
    kind: "services",
    slug: "application-modernization",
    title: "Application Modernization",
    category: "Core Engineering & Modernization",
    expectedFilename: "application-modernization.webp",
    localPath: "public/resources/images/services/application-modernization.webp",
    publicUrl: "/resources/images/services/application-modernization.webp",
    required: true,
    alt: "Application Modernization service illustration",
    canonicalRoute: "/services/application-modernization"
  },

  // --- 2. INDUSTRIES (9 items, Required) ---
  {
    kind: "industries",
    slug: "software-saas-technology",
    title: "Software, SaaS, and technology products",
    expectedFilename: "software-saas-technology.webp",
    localPath: "public/resources/images/industries/software-saas-technology.webp",
    publicUrl: "/resources/images/industries/software-saas-technology.webp",
    required: true,
    alt: "Software, SaaS, and technology industry pattern visual",
    canonicalRoute: "/industries/software-saas-technology"
  },
  {
    kind: "industries",
    slug: "retail-ecommerce-consumer-services",
    title: "Retail, ecommerce, and consumer services",
    expectedFilename: "retail-ecommerce-consumer-services.webp",
    localPath: "public/resources/images/industries/retail-ecommerce-consumer-services.webp",
    publicUrl: "/resources/images/industries/retail-ecommerce-consumer-services.webp",
    required: true,
    alt: "Retail, ecommerce, and consumer services industry pattern visual",
    canonicalRoute: "/industries/retail-ecommerce-consumer-services"
  },
  {
    kind: "industries",
    slug: "professional-business-services",
    title: "Professional, financial, and business services",
    expectedFilename: "professional-business-services.webp",
    localPath: "public/resources/images/industries/professional-business-services.webp",
    publicUrl: "/resources/images/industries/professional-business-services.webp",
    required: true,
    alt: "Professional, financial, and business services industry pattern visual",
    canonicalRoute: "/industries/professional-business-services"
  },
  {
    kind: "industries",
    slug: "logistics-distribution-operations",
    title: "Logistics, supply chain, and distribution",
    expectedFilename: "logistics-distribution-operations.webp",
    localPath: "public/resources/images/industries/logistics-distribution-operations.webp",
    publicUrl: "/resources/images/industries/logistics-distribution-operations.webp",
    required: true,
    alt: "Logistics, supply chain, and distribution industry pattern visual",
    canonicalRoute: "/industries/logistics-distribution-operations"
  },
  {
    kind: "industries",
    slug: "education-training",
    title: "Education, training, and knowledge platforms",
    expectedFilename: "education-training.webp",
    localPath: "public/resources/images/industries/education-training.webp",
    publicUrl: "/resources/images/industries/education-training.webp",
    required: true,
    alt: "Education, training, and knowledge platforms industry pattern visual",
    canonicalRoute: "/industries/education-training"
  },
  {
    kind: "industries",
    slug: "healthcare-wellness-operations",
    title: "Healthcare and operational wellness systems",
    expectedFilename: "healthcare-wellness-operations.webp",
    localPath: "public/resources/images/industries/healthcare-wellness-operations.webp",
    publicUrl: "/resources/images/industries/healthcare-wellness-operations.webp",
    required: true,
    alt: "Healthcare and operational wellness systems industry pattern visual",
    canonicalRoute: "/industries/healthcare-wellness-operations"
  },
  {
    kind: "industries",
    slug: "manufacturing-distribution-operations",
    title: "Manufacturing, industrial, and supply operations",
    expectedFilename: "manufacturing-distribution-operations.webp",
    localPath: "public/resources/images/industries/manufacturing-distribution-operations.webp",
    publicUrl: "/resources/images/industries/manufacturing-distribution-operations.webp",
    required: true,
    alt: "Manufacturing, industrial, and supply operations industry pattern visual",
    canonicalRoute: "/industries/manufacturing-distribution-operations"
  },
  {
    kind: "industries",
    slug: "operations-heavy-businesses",
    title: "Operations-heavy businesses",
    expectedFilename: "operations-heavy-businesses.webp",
    localPath: "public/resources/images/industries/operations-heavy-businesses.webp",
    publicUrl: "/resources/images/industries/operations-heavy-businesses.webp",
    required: true,
    alt: "Operations-heavy businesses industry pattern visual",
    canonicalRoute: "/industries/operations-heavy-businesses"
  },
  {
    kind: "industries",
    slug: "software-product-teams",
    title: "Software product teams",
    expectedFilename: "software-product-teams.webp",
    localPath: "public/resources/images/industries/software-product-teams.webp",
    publicUrl: "/resources/images/industries/software-product-teams.webp",
    required: true,
    alt: "Software product teams industry pattern visual",
    canonicalRoute: "/industries/software-product-teams"
  },

  // --- 3. MODERNIZATION (2 items, Required) ---
  {
    kind: "modernization",
    slug: "incremental-migration",
    title: "Incremental platform migration",
    expectedFilename: "incremental-migration.webp",
    localPath: "public/resources/images/modernization/incremental-migration.webp",
    publicUrl: "/resources/images/modernization/incremental-migration.webp",
    required: true,
    alt: "Incremental platform migration pattern visual",
    canonicalRoute: "/modernization/incremental-migration"
  },
  {
    kind: "modernization",
    slug: "legacy-application-assessment",
    title: "Legacy application technical assessment",
    expectedFilename: "legacy-application-assessment.webp",
    localPath: "public/resources/images/modernization/legacy-application-assessment.webp",
    publicUrl: "/resources/images/modernization/legacy-application-assessment.webp",
    required: true,
    alt: "Legacy application technical assessment visual",
    canonicalRoute: "/modernization/legacy-application-assessment"
  },

  // --- 4. WORK (2 items, Required) ---
  // Note: Canonical repository slug for the second work item is "legacy-operations-platform"
  // (per content/work/legacy-operations-platform.mdx).
  // "legacy-operations-platform-modernization" is supported as an alias.
  {
    kind: "work",
    slug: "ai-assisted-intake-workflow",
    title: "AI-assisted intake workflow",
    expectedFilename: "ai-assisted-intake-workflow.webp",
    localPath: "public/resources/images/work/ai-assisted-intake-workflow.webp",
    publicUrl: "/resources/images/work/ai-assisted-intake-workflow.webp",
    required: true,
    alt: "AI-assisted intake workflow illustrative case visual",
    canonicalRoute: "/work/ai-assisted-intake-workflow"
  },
  {
    kind: "work",
    slug: "legacy-operations-platform",
    title: "Legacy operations platform modernization",
    expectedFilename: "legacy-operations-platform.webp",
    localPath: "public/resources/images/work/legacy-operations-platform.webp",
    publicUrl: "/resources/images/work/legacy-operations-platform.webp",
    required: true,
    alt: "Legacy operations platform modernization illustrative case visual",
    aliases: ["legacy-operations-platform-modernization"],
    canonicalRoute: "/work/legacy-operations-platform"
  },

  // --- 5. INSIGHTS (2 items, Required) ---
  {
    kind: "insights",
    slug: "ai-integration-needs-evaluation",
    title: "AI integration needs evaluation before confidence",
    expectedFilename: "ai-integration-needs-evaluation.webp",
    localPath: "public/resources/images/insights/ai-integration-needs-evaluation.webp",
    publicUrl: "/resources/images/insights/ai-integration-needs-evaluation.webp",
    required: true,
    alt: "AI integration needs evaluation before confidence editorial cover",
    canonicalRoute: "/insights/ai-integration-needs-evaluation"
  },
  {
    kind: "insights",
    slug: "modernization-without-rewrite-reflex",
    title: "Modernization without the rewrite reflex",
    expectedFilename: "modernization-without-rewrite-reflex.webp",
    localPath: "public/resources/images/insights/modernization-without-rewrite-reflex.webp",
    publicUrl: "/resources/images/insights/modernization-without-rewrite-reflex.webp",
    required: true,
    alt: "Modernization without the rewrite reflex editorial cover",
    canonicalRoute: "/insights/modernization-without-rewrite-reflex"
  },

  // --- 6. ENGAGEMENT MODELS (3 items, Optional) ---
  // The current interface renders textual comparison cards; visual assets are optional.
  {
    kind: "engagement-models",
    slug: "defined-scope-delivery",
    title: "Defined-scope project delivery",
    expectedFilename: "defined-scope-delivery.webp",
    localPath: "public/resources/images/engagement-models/defined-scope-delivery.webp",
    publicUrl: "/resources/images/engagement-models/defined-scope-delivery.webp",
    required: false,
    alt: "Defined-scope project delivery engagement model visual",
    canonicalRoute: "/engagement-models"
  },
  {
    kind: "engagement-models",
    slug: "extended-engineering-team",
    title: "Extended engineering capacity",
    expectedFilename: "extended-engineering-team.webp",
    localPath: "public/resources/images/engagement-models/extended-engineering-team.webp",
    publicUrl: "/resources/images/engagement-models/extended-engineering-team.webp",
    required: false,
    alt: "Extended engineering capacity engagement model visual",
    canonicalRoute: "/engagement-models"
  },
  {
    kind: "engagement-models",
    slug: "ongoing-engineering-partnership",
    title: "Ongoing engineering partnership",
    expectedFilename: "ongoing-engineering-partnership.webp",
    localPath: "public/resources/images/engagement-models/ongoing-engineering-partnership.webp",
    publicUrl: "/resources/images/engagement-models/ongoing-engineering-partnership.webp",
    required: false,
    alt: "Ongoing engineering partnership engagement model visual",
    canonicalRoute: "/engagement-models"
  },

  // --- 7. SERVICE CATEGORIES (5 items, Optional) ---
  // Used in the ServiceCategorySlideshow on /services
  {
    kind: "service-categories",
    slug: "ai-ml-development",
    title: "AI & ML Development",
    expectedFilename: "ai-ml-development.webp",
    localPath: "public/resources/images/service-categories/ai-ml-development.webp",
    publicUrl: "/resources/images/service-categories/ai-ml-development.webp",
    required: false,
    alt: "AI & ML Development category visual",
    canonicalRoute: "/services#ai-ml-development"
  },
  {
    kind: "service-categories",
    slug: "web-cms-development",
    title: "Web & CMS Development",
    expectedFilename: "web-cms-development.webp",
    localPath: "public/resources/images/service-categories/web-cms-development.webp",
    publicUrl: "/resources/images/service-categories/web-cms-development.webp",
    required: false,
    alt: "Web & CMS Development category visual",
    canonicalRoute: "/services#web-cms-development"
  },
  {
    kind: "service-categories",
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    expectedFilename: "ecommerce-development.webp",
    localPath: "public/resources/images/service-categories/ecommerce-development.webp",
    publicUrl: "/resources/images/service-categories/ecommerce-development.webp",
    required: false,
    alt: "Ecommerce Development category visual",
    canonicalRoute: "/services#ecommerce-development"
  },
  {
    kind: "service-categories",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    expectedFilename: "mobile-app-development.webp",
    localPath: "public/resources/images/service-categories/mobile-app-development.webp",
    publicUrl: "/resources/images/service-categories/mobile-app-development.webp",
    required: false,
    alt: "Mobile App Development category visual",
    canonicalRoute: "/services#mobile-app-development"
  },
  {
    kind: "service-categories",
    slug: "software-development",
    title: "Software Development",
    expectedFilename: "software-development.webp",
    localPath: "public/resources/images/service-categories/software-development.webp",
    publicUrl: "/resources/images/service-categories/software-development.webp",
    required: false,
    alt: "Software Development category visual",
    canonicalRoute: "/services#software-development"
  },

  // --- 8. AI SOLUTIONS OVERVIEW (1 item, Optional) ---
  {
    kind: "ai-solutions",
    slug: "overview",
    title: "AI Solutions Overview",
    expectedFilename: "overview.webp",
    localPath: "public/resources/images/ai-solutions/overview.webp",
    publicUrl: "/resources/images/ai-solutions/overview.webp",
    required: false,
    alt: "AI Solutions overview visual",
    canonicalRoute: "/ai-solutions"
  }
];

// Keyed map for fast O(1) lookups: `${kind}:${slug}`
const manifestMap = new Map<string, ImageAssetManifestEntry>();
for (const entry of IMAGE_ASSET_MANIFEST) {
  manifestMap.set(`${entry.kind}:${entry.slug}`, entry);
  if (entry.aliases) {
    for (const alias of entry.aliases) {
      manifestMap.set(`${entry.kind}:${alias}`, entry);
    }
  }
}

/**
 * Returns the manifest entry for a given content kind and canonical slug.
 */
export function getImageAsset(
  kind: ImageAssetKind | string,
  slug: string
): ImageAssetManifestEntry | undefined {
  return manifestMap.get(`${kind}:${slug}`);
}

/**
 * Resolves the canonical public URL for an image asset.
 * If the item is recognized in the manifest, returns its mapped publicUrl.
 * Falls back to standard slug pattern `/resources/images/${kind}/${slug}.webp`.
 */
export function resolveImageUrl(
  kind: ImageAssetKind | string,
  slug: string
): string | undefined {
  const asset = getImageAsset(kind, slug);
  if (asset) return asset.publicUrl;
  return `/resources/images/${kind}/${slug}.webp`;
}

/**
 * Resolves a descriptive alt text for an image asset.
 */
export function resolveImageAlt(
  kind: ImageAssetKind | string,
  slug: string,
  fallbackTitle?: string
): string {
  const asset = getImageAsset(kind, slug);
  if (asset?.alt) return asset.alt;
  if (fallbackTitle) return `${fallbackTitle} visual`;
  return `${slug.replace(/-/g, " ")} visual`;
}

/**
 * Returns all asset manifest entries.
 */
export function getAllImageAssets(): ImageAssetManifestEntry[] {
  return IMAGE_ASSET_MANIFEST;
}
