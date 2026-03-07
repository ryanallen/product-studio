---
name: document-paths
description: Sync work/paths.md path tree with actual paths under work/. Add new paths, remove missing ones, then run Save step 3. Use when verifier hands off after verify-paths mismatch.
triggers: "sync paths, update paths, document paths, /document-paths"
disable-model-invocation: true
---

# Document Paths

Update the path tree in `work/paths.md` to match disk, then run the Save workflow's commit step.

## Inputs

- **Scope** – Paths under `work/` (default). Paths file: `work/paths.md`. If omitted, use repo root and existing paths.md.

## Output

`work/paths.md` updated; then step 3 of **Save** in [Coordinator](../../agents/coordinator.md): updater runs [save](../save/SKILL.md) (stage and commit).

## Process

1. **Compare** – Actual paths under `work/` vs the tree in `work/paths.md`.
2. **Update** – Add tree entries for new paths on disk; remove entries for paths that no longer exist.
3. **Format** – Preserve existing structure and format (see `work/paths.md` or `work/paths.md.template`).
4. **Save** – Run step 3 of the Save workflow (updater → save skill) so changes are committed.

## Reference

[Coordinator](../../agents/coordinator.md) – Save workflow steps 1–3.
