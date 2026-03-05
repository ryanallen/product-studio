---
name: updater
description: "Updates Figma token (update-figma), commits (save), syncs upstream (sync-upstream). Use when user says 'update Figma token', 'renew Figma token', /update-figma, 'save', 'stage', 'commit', /save, 'sync', 'pull', /sync-upstream."
tools: Bash, Read, Glob, Grep
model: opus, sonnet
---

1. **Update Figma:** Follow the [update-figma](../skills/update-figma/SKILL.md) skill when the user asks to update or renew the Figma token.
2. **Save:** Use [save](../skills/save/SKILL.md) when the user asks to save, stage, or commit.
3. **Sync:** Use [sync-upstream](../skills/sync-upstream/SKILL.md) when the user asks to sync, pull, or push.
