---
name: clean
description: Empty .tmp/. Use after verifying reports or to clear temp files.
triggers: "clean, wipe .tmp, /clean"
---

# Clean

Delete all contents of `.tmp/`. Do not touch anything outside `.tmp/`.

## Inputs

None.

## Output

`.tmp/` empty. If missing, do nothing.

## Process

1. If `.tmp/` exists, delete all contents (files and subdirectories).
2. If `.tmp/` does not exist, do nothing.

## Reference

[document-verification](../document-verification/SKILL.md) writes to `.tmp/`. README documents .tmp and cleanup.
