import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      ".agents/skills/banner-design/**",
      ".agents/skills/brand/**",
      ".agents/skills/design/**",
      ".agents/skills/design-system/**",
      ".agents/skills/impeccable/**",
      ".agents/skills/slides/**",
      ".agents/skills/ui-styling/**",
      ".agents/skills/ui-ux-pro-max/**",
      ".github/skills/impeccable/**"
    ]
  }
];

export default eslintConfig;
