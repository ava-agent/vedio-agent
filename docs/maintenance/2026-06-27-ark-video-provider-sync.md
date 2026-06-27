# Ark Video Provider Sync - 2026-06-27

## Scope

- Repository: `ava-agent/vedio-agent`
- Type: VitePress multimedia tooling guide
- Runtime LLM/API use: none in this repository

## Changes

- Updated the current video-tool guide to prefer Seedance 2.0 and the Ark-backed `mcp-video-gen` path for video API/MCP integration.
- Removed the legacy cloud CogVideo option from the current recommendation table so new projects do not copy the expired provider stack.
- Updated the MCP capability matrix from `cogvideo / kling / minimax` to `ark-seedance / kling / minimax`.

## Validation

- `npm run docs:build`
- `git diff --check`
- `scan_project.sh .`
- Staged additions old-provider/secret scan

## Notes

- The long-form research reports still mention legacy video tools as historical research entries. They are not runtime dependencies and should not be treated as active provider configuration.
