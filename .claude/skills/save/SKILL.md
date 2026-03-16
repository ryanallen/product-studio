---
name: save
description: Stage all changes since last commit and create one or more commits with title and description. Does not push. Use when user says save, stage, commit, /save.
disable-model-invocation: true
---

# Save

**Rule:** Never stage or commit unless the user asked to save (save, stage, commit, /save). When they do, use the Save flow from the checklist script: verify-paths, then document-paths only when needed, then this skill. This skill runs as the last step of the Save flow after verify-paths (and document-paths if needed).

## Inputs

**Title and description:** You must derive these from the work done (files changed, what was added or fixed).
Don't ask the user for them. If needed, inspect the diff or changed files to write them.

**Scope:** By default stage all changes (`git add -A`).
If the user asks to commit only specific file(s) or path(s), stage only those then commit
("save just README" → `git add README.md` then commit).

## Output

One or more commits; result reported. No push.

## Process

1. Run Save workflow: verify-paths, then document-paths only when disk has paths not in tree, then commit. Flow and steps from [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts).
2. `git status`; stage per Inputs (all or specific paths).
3. For each commit: `git add` then `git commit -m "<title>" -m "<description>"` (derive from changes). Repeat until done.
4. Report result. No push.

**Single commit:** `git add -A && git commit -m "Title" -m "Description"`.

**Nothing to commit:** Tell the user. **Cannot infer message:** Only then ask for title and description.

## Reference

[checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts) (Save flow steps).
