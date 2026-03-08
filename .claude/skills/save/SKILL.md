---
name: save
description: Stage all changes since last commit and create one or more commits with title and description. Does not push.
disable-model-invocation: true
---

# Save

Run Save workflow (verify-paths, document-paths if mismatch, then commit). Never stage/commit unless user asked this turn (save, stage, commit, /save). Coordinator Step 1 (verify task / checklist) already ran; do not run it again.

## Inputs

**Title and description:** You must derive these from the work done (files changed, what was added or fixed).
Don't ask the user for them. If needed, inspect the diff or changed files to write them.

**Scope:** By default stage all changes (`git add -A`).
If the user asks to commit only specific file(s) or path(s), stage only those then commit
("save just README" → `git add README.md` then commit).

## Output

One or more commits; result reported. No push.

## Process

1. Run Save workflow: verify-paths, document-paths if mismatch, then commit ([coordinator-flows](../../agents/ref/coordinator-flows.md)).
2. `git status`; stage per Inputs (all or specific paths).
3. For each commit: `git add` then `git commit -m "<title>" -m "<description>"` (derive from changes). Repeat until done.
4. Report result. No push.

**Single commit:** `git add -A && git commit -m "Title" -m "Description"`.

**Nothing to commit:** Tell the user. **Cannot infer message:** Only then ask for title and description.

## Reference

[coordinator-flows](../../agents/ref/coordinator-flows.md) – Save workflow.
