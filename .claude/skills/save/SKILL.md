---
name: save
description: Stage all changes since last commit and create one or more commits with title and description. Does not push.
triggers: "save, stage, commit, /save"
disable-model-invocation: true
---

# Save

**Never run `git add` (stage) or `git commit` unless the user has explicitly asked to save** (e.g. save, stage, commit, /save). That applies in every context: do not run this skill at the end of a task, do not assume they want a commit, do not run it because they asked in a previous turn, and do not run `git add` or `git commit` in a terminal or elsewhere (e.g. "I'll commit that for you") unless they explicitly said save, stage, commit, or /save in this turn. When they do ask, use this skill.

When this skill is invoked, run the **Save** workflow in [Coordinator](../../agents/coordinator.md) (steps 1–3). Then perform the commit steps below.

## Inputs

**Title and description:** You must derive these from the work done (files changed, what was added or fixed).
Don't ask the user for them. If needed, inspect the diff or changed files to write them.

**Scope:** By default stage all changes (`git add -A`).
If the user asks to commit only specific file(s) or path(s), stage only those then commit
("save just README" → `git add README.md` then commit).

## Output

One or more commits; result reported. No push.

## Process

### Command

One commit: `git add -A && git commit -m "Title" -m "Description"`.

For multiple commits, repeat with different staging and messages
(e.g. `git add path1 && git commit -m "Title1" -m "Desc1"` then `git add path2 && git commit -m "Title2" -m "Desc2"`).

### Steps

1. Run `git status` and inspect what changed. Decide one commit or multiple (e.g. one per logical change). Stage per Inputs (all or specific paths).
2. For each commit: stage the relevant changes, run `git commit -m "<title>" -m "<description>"` (derive from staged changes).
   Repeat until all changes are committed.
3. Report the result. Do not run `git push`.

## Error Handling

- **Nothing to commit (working tree clean):** Tell the user there are no changes to commit.
- **Cannot infer message:** Only then ask the user for a title and description.

## Reference

[Coordinator](../../agents/coordinator.md) – Save workflow steps 1–3 (verifier, documenter if mismatch, updater runs this skill).
