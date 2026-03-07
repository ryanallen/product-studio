---
name: document-github
description: GitHub README rules: animated GIFs (raw URLs), images, badges (use Markdown not HTML), anchors, alerts. Use when writing or enhancing GitHub READMEs so assets render correctly. In Claude Code and Cursor, /skills lists all.
---

# Document GitHub

Rules for content that renders correctly on GitHub (READMEs, docs). Single source of truth for GitHub-specific behavior.

## Inputs

- **Context** – When producing or enhancing a GitHub README, or when the user asks how to make something work on GitHub (e.g. animated GIFs, badges, links).

## Output

Apply these rules whenever output is a GitHub-hosted README or the user asks about GitHub rendering. Other document skills reference this skill; do not duplicate these rules elsewhere.

## Process

### Animated GIFs and images

- **Use Markdown image syntax** – `![Alt text](url)`. Do not wrap in `<div align="center">` or use `<img>` for the hero/primary image; plain Markdown ensures the GIF can animate.
- **Use raw file URLs, not relative paths** – Relative paths (e.g. `assets/hero.gif`) often cause GIFs to render as static images on GitHub. Link to the raw file instead:
  - **Format:** `https://raw.githubusercontent.com/[OWNER]/[REPO]/[BRANCH]/[path]/[file].gif`
  - Example: `![Product Studio](https://raw.githubusercontent.com/ryanallen/product-studio/main/assets/hero.gif)`
- **Same for other in-repo images** if they fail to load or animate: use `https://raw.githubusercontent.com/[OWNER]/[REPO]/[BRANCH]/path/to/file.png` (or `.gif`, `.svg`).
- **Source:** [GitHub community discussion 81359](https://github.com/orgs/community/discussions/81359) – embedding animated GIF in README; raw URL recommended.

### Badges

- **Use Markdown for badges** – Put badges in plain Markdown (e.g. `[![Alt](https://img.shields.io/...)](link)`), not inside `<p align="center">` or any other HTML block. Badges inside HTML often do not render on GitHub; keep them outside HTML so they display reliably.

### Section anchors (TOC links)

- GitHub auto-generates anchors from headings: lowercase, spaces to hyphens, punctuation removed. Use that format for table-of-contents links (e.g. `#features`, `#installation`).

### Alerts (blockquotes)

- GitHub supports `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]` for rendered alert blocks.

### Optional GitHub-specific patterns

- **Contributor grid:** `https://contrib.rocks/image?repo=[OWNER]/[REPO]` with link to `https://github.com/[OWNER]/[REPO]/graphs/contributors`.
- **Doc/source strip:** Links to `https://github.com/[OWNER]/[REPO]` and optional docs URL.

## Reference

[GitHub: Embedding animated GIF in README (discussion 81359)](https://github.com/orgs/community/discussions/81359). [document-enhance](../document-enhance/SKILL.md) uses this skill for README patterns. [document](../document/SKILL.md) for project READMEs that may be GitHub-hosted.
