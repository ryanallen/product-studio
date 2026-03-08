---
name: document-paths
description: Sync work/paths.md with actual paths under work/. Add or remove entries; then run Save step 3.
disable-model-invocation: true
---

# Document Paths

Sync `work/paths.md` to match disk under `work/`, then Save step 3 (updater runs [save](../save/SKILL.md)).

## Inputs

- **Scope** – Paths under `work/`. Paths file: `work/paths.md`.

## Output

`work/paths.md` updated; then Save step 3 (stage and commit).

## Process

1. **Compare** – Paths under `work/` on disk vs the tree in `work/paths.md`.
2. **Update** – Add entries for new paths; remove entries for paths that no longer exist.
3. **Format** – Match existing structure (see `work/paths.md` or `work/paths.md.template`).
4. **Save** – Run Save step 3 so changes are committed.

## Reference

[Coordinator](../../agents/coordinator.md).
