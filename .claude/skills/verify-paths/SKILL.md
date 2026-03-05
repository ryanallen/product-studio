---
name: verify-paths
description: Compare work/paths.md to actual paths under work/ and verify they match. If not, hand off to documenter agent for document-paths.
---

# Verify Paths

1. Read `work/paths.md`.
2. List actual folders under `work/`.
3. Verify actual paths match paths.md.
4. If mismatch: hand off to **documenter** with [document-paths](.claude/skills/document-paths/SKILL.md).
5. Then **updater** runs [save](../skills/save/SKILL.md).
