---
name: clean
description: Empty .tmp/. Use after verifying reports or to clear temp files. Use when user says clean, wipe .tmp, /clean.
---

# Clean

Delete all contents of `.tmp/`. Do not touch anything outside `.tmp/`.

**Real command:** `/clean` = `npm run clean`.

## Inputs

None.

## Output

`.tmp/` empty. If missing, do nothing.

## Process

1. Run `npm run clean` (or delete contents of `.tmp/` manually).
2. If `.tmp/` does not exist, do nothing.

## Reference

[document-verification](../document-verification/SKILL.md) writes to `.tmp/`. [coordinator-flows](../../agents/ref/coordinator-flows.md) – Clean flow runs `/clean`.
