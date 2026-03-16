---
name: clean
description: Empty .tmp/. Use after verifying reports or to clear temp files. Use when user says clean, wipe .tmp, /clean.
disable-model-invocation: true
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

[document-verification](.claude/skills/document-verification/SKILL.md) writes to `.tmp/`. Clean flow runs `/clean`; flow from [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts).
