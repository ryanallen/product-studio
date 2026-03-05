---
name: save
description: Stage all changes since last commit and create one or more commits with title and description. Use when user says "save", "stage", "commit", or /save. Does not push. In Claude Code and Cursor, /skills lists all.
---

# Save

Stage everything since the last commit and create one or more commits, each with a title and description. Push later with sync.

## Inputs

**Title and description:** You must derive these from the work done (files changed, what was added or fixed).
Don't ask the user for them. If needed, inspect the diff or changed files to write them.

**Scope:** By default stage all changes (`git add -A`).
If the user asks to commit only specific file(s) or path(s), stage only those then commit
("save just README" → `git add README.md` then commit).

## Command

One commit: `git add -A && git commit -m "Title" -m "Description"`.

For multiple commits, repeat with different staging and messages
(e.g. `git add path1 && git commit -m "Title1" -m "Desc1"` then `git add path2 && git commit -m "Title2" -m "Desc2"`).

## Steps

1. Run `git status` and inspect what changed. Decide one commit or multiple (e.g. one per logical change). Stage per Inputs (all or specific paths).
2. For each commit: stage the relevant changes, run `git commit -m "<title>" -m "<description>"` (derive from staged changes).
   Repeat until all changes are committed.
3. Report the result. Do not run `git push`.

## Error Handling

- **Nothing to commit (working tree clean):** Tell the user there are no changes to commit.
- **Cannot infer message:** Only then ask the user for a title and description.
