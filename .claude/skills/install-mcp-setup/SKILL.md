---
name: install-mcp-setup
description: After MCP install, run Figma Desktop bridge setup. Part of Install workflow. Only if they chose figma-console.
triggers: []
disable-model-invocation: true
---

# Install MCP setup (Figma Desktop bridge)

Run when they chose figma-console. The subagent must run the extract step; then show the user the Figma Desktop steps and wait for confirmation.

## Inputs

They chose figma-console in install-choices.

## Output

Bridge extracted; user has imported the plugin in Figma Desktop and can keep it running. Flow continues after they say ready.

## Process

1. **Extract bridge** – From repo root the subagent runs: `npm run setup:figma-bridge`. Do not skip this step.

2. **Figma Desktop** – Show the user:
   - In a project: Plugins → Development → Import plugin from manifest.
   - Select `.claude/skills/generate-figma/scripts/figma-desktop-bridge/manifest.json`.
   - Plugins → Development → Figma Desktop Bridge. Keep it running for Prompt to Figma.
   Whenever you use Figma with this system, this plugin must be running in the file you are working in.
   When it's time to renew (about every 90 days), run update-figma to set a new token, then restart the app.

3. **Wait** – Say **Tell me when you're ready to proceed.** Continue only after they confirm.

## Reference

[generate-figma](../generate-figma/SKILL.md) – Bridge path. [update-figma](../update-figma/SKILL.md) – Token renewal.
