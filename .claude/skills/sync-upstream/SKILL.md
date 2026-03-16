---
name: sync-upstream
description: Sync from upstream remote main branch and push to origin main. Use when user says sync, sync upstream, /sync-upstream.
disable-model-invocation: true
---

# Sync Upstream

Sync from the upstream remote's main branch, then push to origin's main branch.

## Inputs

None. Assumes upstream remote is configured.

## Output

Local main merged from upstream; origin main updated. Result reported.

## Process

1. Run `git pull --no-rebase upstream main`.
2. If pull succeeds, run `git push origin main`.
3. Report the result.

**Merge conflicts:** Alert the user and list conflicting files. Do not auto-resolve. **Upstream not configured:** Run `git remote -v` and show remotes. **Auth failures:** Remind user to check SSH/credentials.

## Reference

Updater runs this when the flow is sync-upstream. See README for adding upstream to a working repo.
