---
name: install-mcp-setup
description: After MCP install, run Playwright browser download and/or Figma Desktop bridge. Part of Install workflow. Run the parts that match what they chose (playwright, figma-console).
disable-model-invocation: true
---

# Install MCP setup (Playwright browsers and Figma bridge)

Run only the sections below for the options they chose in install-choices.

## Playwright browsers (if they chose playwright)

From repo root (or project root):

```bash
npx -y playwright install
```

Downloads browser binaries for the Playwright MCP server and capture-webpage.

## Figma Desktop bridge (if they chose figma-console)

Pause here. Show the user the following. When they have finished, they say they are ready to proceed.

From repo root:

```bash
npm run setup:figma-bridge
```

In Figma Desktop:

1. In a project: Plugins → Development → Import plugin from manifest.
2. Select `.claude/skills/generate-figma/scripts/figma-desktop-bridge/manifest.json`.
3. Plugins → Development → Figma Desktop Bridge. Keep it running for Prompt to Figma.

Whenever you want to use Figma with this system in the future, you need this plugin running in the file you are working in.

When it's time to renew (about every 90 days), run update-figma to set a new token, then restart the app.

**Tell me when you're ready to proceed.**
