---
name: install-figma-bridge
description: Run setup:figma-bridge and give Figma Desktop plugin instructions. Part of Install workflow. Only if they chose figma-console.
---

# Install Figma Desktop bridge

From repo root:

```bash
npm run setup:figma-bridge
```

In Figma Desktop:

1. In a project: Plugins → Development → Import plugin from manifest.
2. Select `.claude/skills/generate-figma/scripts/figma-desktop-bridge/manifest.json`.
3. Plugins → Development → Figma Desktop Bridge. Keep it running for Prompt to Figma.

When it's time to renew (about every 90 days), you can run [update-figma](.claude/skills/update-figma/SKILL.md) to set a new token, then restart the app.
