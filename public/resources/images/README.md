# Archex Craft — Local Image Asset Directory

This directory stores all local image assets for the Archex Craft site.

## Directory Structure

```text
public/resources/images/
├── services/               # Individual service illustration assets (24 required)
├── industries/             # Industry patterns visual assets (9 required)
├── modernization/          # Modernization pattern visual assets (2 required)
├── work/                   # Illustrative work pattern visual assets (2 required)
├── insights/               # Insight editorial cover visuals (2 required)
├── service-categories/     # Service category visuals for homepage/services (5 optional)
├── engagement-models/      # Engagement model card visuals (3 optional)
└── ai-solutions/           # AI solutions overview visual (1 optional)
```

## How to Add Images

1. **Format**:
   - The preferred format is **WebP** (`.webp`).
   - If you provide JPEG (`.jpg`/`.jpeg`) or PNG (`.png`), convert them to genuine WebP before placing them here, or preserve the real extension and configure the manifest accordingly. Do not simply change the file extension without converting the actual image encoding.

2. **File Naming**:
   - All filenames follow lowercase canonical slugs with hyphens: `<slug>.webp`.
   - Examples:
     - `public/resources/images/services/chatbot-development.webp`
     - `public/resources/images/industries/software-saas-technology.webp`
     - `public/resources/images/work/legacy-operations-platform.webp`

3. **Placement**:
   - Copy or move your `.webp` files directly into the corresponding subfolder.
   - Do not create subdirectories inside these folders.

4. **Verifying Your Assets**:
   - Run the asset verification script from the project root:
     ```bash
     npm run check:assets
     ```
   - For strict CI/review validation ensuring all 39 required assets are present:
     ```bash
     npm run check:assets:strict
     ```

## Fallback Behavior

When an image file has not yet been placed in these folders (or if an image fails to load), the application automatically renders Archex Craft's geometric fallback placeholder in the same frame. Card dimensions, borders, and layouts remain preserved without visual shifts or broken icons.

See [`IMAGE_ASSET_MANIFEST.md`](../../../IMAGE_ASSET_MANIFEST.md) in the project root for the complete checklist of items, canonical slugs, routes, and expected filenames.
