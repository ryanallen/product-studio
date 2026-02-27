---
name: sync-upstream
description: Syncs from upstream remote's main branch and pushes to origin's main branch. Use when user says "sync upstream", "pull from upstream", or "update from upstream".
---

# Sync Upstream

Pull from the upstream remote's main branch, then push to origin's main branch.

## Command

```bash
git pull --no-rebase upstream main && git push origin main
```

## Steps

1. Run `git pull --no-rebase upstream main` to fetch and merge from upstream.
2. If pull succeeds, run `git push origin main` to push the merged state to origin.
3. Report the result.

## Error Handling

- **Merge conflicts:** Alert the user and list conflicting files. Do not auto-resolve.
- **Authentication failures:** Remind user to check SSH keys or credentials for both remotes.
- **Upstream not configured:** Run `git remote -v` and show current remotes so the user can fix it.
