---
name: document-paths
description: Add paths under work/ to the Tree in the Editable section of work/paths.md; then run Save step 3. Only adds entries for paths on disk that are missing from the Tree; does not remove entries.
disable-model-invocation: true
---

# Document Paths

Add new paths under `work/` to the **Tree in the Editable section** of `work/paths.md` (the block under "### Tree" after the horizontal rule). Do not edit the example under "Path pattern"; that is reference only. Then Save step 3 (updater runs [save](.claude/skills/save/SKILL.md)).

## Inputs

- **Scope** – Paths under `work/`. Paths file: `work/paths.md`. Only the Tree in the **Editable section** is updated.

## Output

`work/paths.md` Editable section Tree updated (additions only); then Save step 3 (stage and commit).

## Process

1. **Compare** – Paths under `work/` on disk (excluding `paths.md`, `paths.md.template`, `.git`) vs the Tree in the Editable section of `work/paths.md`.
2. **Update** – Add entries for paths that exist on disk but are not in the Tree. Do not remove entries for paths that are in the Tree but no longer on disk; the user can edit paths.md manually to remove those.
3. **Format** – Use box-drawing style (├ │ └). Match the structure of the existing Editable section Tree (see `work/paths.md`).
4. **Save** – Run Save step 3 so changes are committed.

## Reference

paths.md: Path pattern = reference; Editable section Tree = compared and updated.
