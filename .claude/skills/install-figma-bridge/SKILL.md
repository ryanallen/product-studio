---
name: install-figma-bridge
description: Run setup:figma-bridge and give Figma Desktop plugin instructions. Part of Install workflow. Only if they chose figma-console.
disable-model-invocation: true
---

# Install Figma Desktop bridge

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

When it's time to renew (about every 90 days), you can run update-figma to set a new token, then restart the app.

**Tell me when you're ready to proceed.**
