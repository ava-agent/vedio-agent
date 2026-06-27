# Vedio Agent Docs Triage - 2026-06-27

## Repository

- GitHub: `ava-agent/vedio-agent`
- Production site: `https://video.rxcloud.group`
- App shape: VitePress documentation site under `docs/`
- Hosting: Vercel

## Public Route Check

- `https://video.rxcloud.group`: HTTP 200 in global domain probe

## Local State

- Local `main` was fast-forwarded to remote commit `1c0629b`, which syncs the current video guide to Ark Seedance and documents legacy video-tool research as non-runtime material.
- `output/` contains generated sample videos and is now ignored.
- `research/google-cloud-api-contracts.md` and `research/google-cloud-vertex-ai-services-2026.md` are untracked research notes and remain visible for review.
- Ignored local artifacts include `.vercel/`, `docs/.vitepress/dist/`, `docs/.vitepress/cache/`, `node_modules/`, `.DS_Store`, and `output/`.

## Actions Taken

- Added root `AGENTS.md` documenting the docs-site structure, commands, deployment, and content freshness rules.
- Added root `DEPLOYMENT.md` with Vercel settings, environment handling, disabled GitHub Pages note, and validation commands.
- Added `.env.example` for optional API keys referenced by local examples and MCP/tooling notes.
- Added standard `dev`, `build`, `preview`, `lint`, and `test` scripts while keeping the existing `docs:*` aliases.
- Updated README links from HTTP to HTTPS and documented deployment entry.
- Updated `.gitignore` to keep generated video outputs out of git.
- Confirmed current docs pages no longer recommend the expired video provider path; remaining old-provider mentions are dated research entries in long-form tool surveys, not runtime configuration.

## Follow-Up

- Decide whether the two Google Cloud research notes should be committed, summarized into docs, or moved to an archive.
- Re-verify 2026 model names, API availability, and pricing from primary vendor docs before using the research notes for product decisions.
- Consider replacing `vedio-agent` naming with `video-agent` only if repository/remote naming can be changed safely.

## Validation

- `npm run lint`: passed
- `npm run test`: passed
- `npm run build`: passed
- Common secret pattern scan: matched only `credentials.token` in Google auth sample code; no hardcoded credential identified
- `python3 tools/project_workspace_inventory.py`: passed, readiness 100
