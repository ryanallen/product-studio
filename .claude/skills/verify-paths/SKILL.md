---
name: verify-paths
description: Compare work/paths.md to actual paths under work/. If mismatch, hand off to documenter for document-paths; then Save step 3. If no paths.md and no work folders, skip.
triggers: []
disable-model-invocation: true
---

# Verify Paths

Compare `work/paths.md` to actual folders under `work/`. If mismatch: documenter runs [document-paths](../document-paths/SKILL.md); then Save step 3 (commit).

## Inputs

- **paths.md** – `work/paths.md` if it exists.
- **work/ folder** – Actual directory structure under `work/`.

## Output

Match; or documenter runs document-paths, then Save step 3.

## Process

1. If `work/paths.md` does not exist and `work/paths.md.template` exists and there are no team/space/ticket-id/project folders under `work/`: do not create paths.md; skip (coordinator proceeds to updater).

2. If `work/paths.md` exists: read it, list actual folders under `work/`, verify tree matches.

3. If mismatch: hand off to **documenter** for [document-paths](../document-paths/SKILL.md).
4. Then Save step 3: updater runs [save](../save/SKILL.md).

## Reference

[Coordinator](../../agents/coordinator.md). [document-paths](../document-paths/SKILL.md).
