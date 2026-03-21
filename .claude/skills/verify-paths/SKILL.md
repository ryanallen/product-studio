---
name: verify-paths
description: Compare the Tree in the Editable section of work/paths.md to actual paths under work/. Flag both directions (disk not in tree, tree not on disk). Only hand off to document-paths when disk has paths not in tree (additions). If no paths.md, skip.
disable-model-invocation: true
---

# Verify Paths

Compare the **Tree in the Editable section** of `work/paths.md` (the block under "### Tree" after the horizontal rule) to actual folders under `work/`. Do not use the example tree under "Path pattern"; that is reference only.

## Inputs

- **paths.md** – `work/paths.md` if it exists. Only the Tree inside the **Editable section** is compared.
- **work/ folder** – Actual directory structure under `work/` (excluding `paths.md`, `paths.md.template`, and `.git` from a nested repo).

## Output

Match; or report mismatch and, when disk has paths not in tree, hand off to documenter for document-paths; then Save step 3.

## Process

1. If `work/paths.md` does not exist: skip (proceed to next step in the flow).

2. If `work/paths.md` exists: read the **Editable section** Tree only (under "### Tree"). List actual folders under `work/` (omit `.git`). Compare:
   - **Disk has paths not in tree** – New folders on disk that are not in the Tree. Flag and hand off to **documenter** for [document-paths](.claude/skills/document-paths/SKILL.md) to add them; then Save step 3.
   - **Tree has paths not on disk** – Tree lists folders that do not exist on disk. Flag only; do not run document-paths (so the tree is not auto-stripped). Report something like "paths.md Tree lists … but those folders are not on disk; update paths.md manually if you removed them."
   - If both: flag both; hand off to document-paths only for the "disk not in tree" part.

3. If no mismatch: proceed to Save step 3 (updater runs [save](.claude/skills/save/SKILL.md)).

## Reference

[document-paths](.claude/skills/document-paths/SKILL.md). paths.md: Path pattern = reference; Editable section Tree = compared and updated.
