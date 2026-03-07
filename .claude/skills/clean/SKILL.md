---
name: clean
description: Delete everything in the .tmp folder. Use after verifying reports or to clear subsubagent-created temp files.
---

# Clean

Delete all contents of `.tmp/`. Use after verifying the verification report or to clear subagent-created temp files.

## Inputs

None. User invokes with clean, wipe .tmp, or /clean.

## Output

`.tmp/` empty or unchanged (if it did not exist). Repo root and everything outside `.tmp/` are untouched.

## Process

1. If `.tmp/` exists, delete all contents (files and subdirectories) inside `.tmp/`. Do not delete the repo root or anything outside `.tmp/`.
2. If `.tmp/` does not exist, do nothing.

## Reference

[document-verification](../document-verification/SKILL.md) writes to `.tmp/`. README documents .tmp and cleanup.
