---
name: figma-analyze
description: Analyzes a Figma design link and produces a structured report. Use when user says "analyze Figma", "Figma audit", "analyze this Figma link", or /figma-analyze. In Claude Code and Cursor, /skills lists all.
---

# Figma Analyze

Analyzes a Figma design link and produces a structured report. Branch behavior on link type: general (whole file) vs specific (one node and its subtree).

## Inputs

**Figma link** (required): Any valid Figma design URL, e.g.:

- `https://www.figma.com/design/ABC123/MyFile`
- `https://www.figma.com/design/ABC123/MyFile?node-id=1%3A2`

If missing, ask the user before proceeding.

## URL Parsing

1. Extract **fileKey** from the path (segment after `/design/`).
2. If the URL has a **node-id** query parameter, decode it (e.g. `1%3A2` or `1-2` → `1:2` for the API). Presence of node-id = **specific** link. Absence = **general** link.

## Behavior

| Link type | Scope | What to do |
|-----------|--------|------------|
| **General** (no node-id) | Whole file | Call `get_metadata` for the file (whole file or all pages as the API allows). Enumerate **pages → sections → frames → groups → components**. Then aggregate **images, fonts, colors, tokens, content** using `get_variable_defs` and optionally `get_design_context` for key nodes or full page; use `get_screenshot` only where useful. Output one structured report (markdown) with full file overview and global design data. |
| **Specific** (node-id present) | From that node down | Call `get_metadata` for that node (subtree only). Do **not** list all pages or sections. From that root, go deep: **frames → groups → components → images, fonts, colors, tokens, content** via `get_design_context`, `get_variable_defs`, and optionally `get_screenshot` for the node and important children. Output one structured report focused on that subtree. |

## Figma MCP Tools

- **get_metadata**: Sparse XML of selection (layer IDs, names, types, position, sizes). Use for structure. Pass fileKey; for specific link also pass nodeId.
- **get_design_context**: Detailed design info (spacing, padding, components, colors, tokens, typography, layout) for a layer/selection.
- **get_variable_defs**: Variables and styles (colors, spacing, typography) used in selection.
- **get_screenshot**: Screenshot of selection; use only where useful for the report.

Remote Figma MCP requires the link (file key + optional node id) to provide context.

## Output

Write one structured report (e.g. markdown):

- **General link**: Sections for Pages, Sections, Frames, Groups, Components, Images, Fonts, Colors, Tokens, Content. Optionally include screenshots for key frames.
- **Specific link**: Same depth (Frames, Groups, Components, Images, Fonts, Colors, Tokens, Content) scoped to the linked node. No file-wide page or section list.

## Caveat

Figma MCP docs say `get_metadata` can run on "whole page if you don't select anything"; they do not clearly say "whole file (all pages)". If the API is page-scoped, iterate over pages if the MCP exposes that, or state in the report that "all pages" is best-effort per current API.
