---
name: save
description: Stage and commit at the repo root (skills, README, etc.). If work/.git exists, also commit inside work/ and push only that repo to its origin (never push the parent). Use when user says save, stage, commit, /save.
disable-model-invocation: true
---

# Save

**Rules**

- Never stage, commit, or push unless the user explicitly asked to save (save, stage, commit, /save, or the same intent in a short phrase). If they say **not** to commit or push, skip every git write (including when the checklist lists this step).
- Never run `git push` at the parent repo root. Pushes only happen inside `work/` when `work/.git` exists: `git -C work push origin HEAD` (after committing there).

When the user does ask to save, use the Save flow from the checklist script: verify-paths, then document-paths only when needed, then this skill.

## Inputs

**Title and description:** Derive from the work done (files changed, what was added or fixed). Do not ask the user for them unless there is nothing to commit and you cannot infer a message.

**Scope:** By default stage all changes at the repo root (`git add -A`). If `work/.git` exists, also stage all changes inside `work/` for that nested repo (`git -C work add -A`). If the user asks to commit only specific file(s) or path(s), stage only those at the root (and only under `work/` if their paths are inside `work/`).

## Output

**Parent repo:** One or more commits at the repository root.

**Nested `work/` repo:** If `work/.git` exists, one or more commits inside `work/`, then `git -C work push origin HEAD`. Report push result.

**Never** `git push` at the parent root.

## Process

1. Run Save workflow: verify-paths, then document-paths only when disk has paths not in tree, then this skill. Flow and steps from [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts).
2. `git status` at repo root. If `work/.git` exists, also `git -C work status`.
3. Stage per Inputs (root: `git add` as needed; nested: `git -C work add` as needed).
4. Commit at root: `git commit -m "<title>" -m "<description>"` (repeat if multiple commits). If `work/.git` has staged changes, commit inside work: `git -C work commit -m "<title>" -m "<description>"` (derive from changes under `work/`; may match root message or differ if only one side changed).
5. If `work/.git` exists and `work/` has a new commit to push: `git -C work push origin HEAD`. Do not push the parent.
6. Report commits and push status. **Nothing to commit:** say so. **Cannot infer message:** only then ask for title and description.

**Single commit at root:** `git add -A && git commit -m "Title" -m "Description"`.

**Single commit in both:** After staging both sides, commit root then `git -C work` commit, then push work only.

## Reference

[checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts) (Save flow steps).
