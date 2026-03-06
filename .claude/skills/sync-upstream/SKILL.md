---
name: sync-upstream
description: Sync from upstream remote main branch and push to origin main. Use when user says sync, pull, or /sync-upstream. In Claude Code and Cursor, /skills lists all.
disable-model-invocation: true
---

# Sync Upstream

Sync from the upstream remote's main branch, then push to origin's main branch.

## Inputs

None. Assumes upstream remote is configured (e.g. `git remote add upstream <url>`).

## Output

Local main merged from upstream; origin main updated. Result reported.

## Process

1. Run `git pull --no-rebase upstream main` to fetch and merge from upstream.
2. If pull succeeds, run `git push origin main` to push the merged state to origin.
3. Report the result.

**Command (reference):**
```bash
git pull --no-rebase upstream main && git push origin main
```

## Error Handling

- **Merge conflicts:** Alert the user and list conflicting files. Do not auto-resolve.
- **Authentication failures:** Remind user to check SSH keys or credentials for both remotes.
- **Upstream not configured:** Run `git remote -v` and show current remotes so the user can fix it.

## Reference

[Coordinator](../../agents/coordinator.md) – Updater runs this. See README for adding upstream to a working repo.
