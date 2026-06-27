# AI Multimedia Tools Handbook Deployment

## Current Public Endpoint

- Production: `https://video.rxcloud.group` - HTTP 200 on 2026-06-27.
- Hosting: Vercel.
- GitHub: `ava-agent/vedio-agent`.

## Vercel

Use these project settings:

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `docs/.vitepress/dist`
- Framework preset: Other / VitePress
- Custom domain: `video.rxcloud.group`

`vercel.json` currently sets the same build command and output directory.

## Local Environment

The published docs site is static and does not need runtime secrets. `.env.example` lists optional API keys for local examples and MCP/tooling experiments referenced by the docs.

```bash
cp .env.example .env
```

Do not commit `.env` or generated media in `output/`.

## GitHub Pages

`.github/workflows/deploy.yml.disabled` is retained as a disabled GitHub Pages workflow. If Pages is re-enabled, confirm the VitePress `base` setting and published URL before turning it back on.

## Validation

```bash
npm run lint
npm run test
npm run build
curl -I -L https://video.rxcloud.group
```
