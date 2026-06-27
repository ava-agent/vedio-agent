# Repository Guidelines

## Project Structure

- `README.md` is the public overview for the AI multimedia tools handbook.
- `docs/` is the VitePress documentation site.
- `docs/.vitepress/config.mts` owns navigation, sidebars, metadata, and site settings.
- `docs/tools/`, `docs/workflows/`, and `docs/guide/` contain published documentation pages.
- `research/` contains source research notes used to update the docs site.
- `output/` is for local generated media samples and is ignored.

## Commands

- `npm install` or `npm ci` installs dependencies.
- `npm run dev` starts VitePress locally.
- `npm run build` builds the static site into `docs/.vitepress/dist`.
- `npm run preview` previews the built site.
- `npm run lint` runs the documentation build as a structural/link smoke check.
- `npm run test` runs the same build smoke check; there are no unit tests in this docs-only project.

The original `docs:*` script names are kept as aliases for compatibility.

## Deployment

- Production URL: `https://video.rxcloud.group`.
- Primary hosting: Vercel.
- Build command: `npm run build`.
- Output directory: `docs/.vitepress/dist`.
- The GitHub Pages workflow is currently disabled as `.github/workflows/deploy.yml.disabled`.

## Content Maintenance

- Prefer HTTPS links for `video.rxcloud.group`.
- Keep README screenshots aligned with files under `docs/public/images/`.
- Research notes may include placeholder API key examples; do not add real credentials.
- Pricing, model names, API availability, and vendor docs change frequently. Treat research pages as dated snapshots and re-verify against primary sources before product decisions.
