---
name: verify-paths
description: Compare work/paths.md to actual paths under work/ and verify they match. If not, hand off to documenter for document-paths. If no paths.md and no work folders, skip. Part of Save workflow.
triggers: []
disable-model-invocation: true
---

# Verify Paths

Compare the path tree in `work/paths.md` to actual folders under `work/`. If mismatch, hand off to documenter (document-paths); then run Save step 3.

## Inputs

- **paths.md** – `work/paths.md` if it exists.
- **work/ folder** – Actual directory structure under `work/`.

## Output

Match confirmed, or documenter handed off to run document-paths (sync tree), then Save step 3 (commit) runs.

## Process

1. If `work/paths.md` does not exist and `work/paths.md.template` exists and there are no team/space/ticket-id/project folders under `work/`: do not create paths.md; skip (coordinator proceeds to updater).

2. If `work/paths.md` exists: read it, list actual folders under `work/`, verify tree matches.

3. If mismatch: hand off to **documenter** (step 2 of **Save** workflow in [Coordinator](../../agents/coordinator.md)) to run [document-paths](../document-paths/SKILL.md).

4. Then run step 3 of the **Save** workflow in [Coordinator](../../agents/coordinator.md) (updater runs save).

## Reference

[Coordinator](../../agents/coordinator.md) – Save workflow. [document-paths](../document-paths/SKILL.md) – Syncs paths.md to disk.
