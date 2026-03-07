---
name: document-github
description: GitHub README rules: animated GIFs (raw URLs), images, shields.io badges, anchors, alerts. Use when writing or enhancing GitHub READMEs so assets render correctly. In Claude Code and Cursor, /skills lists all.
---

# Document GitHub

Rules for content that renders correctly on GitHub (READMEs, docs). Single source of truth for GitHub-specific behavior.

## Inputs

- **Context** – When producing or enhancing a GitHub README, or when the user asks how to make something work on GitHub (e.g. animated GIFs, images, badges, links).

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

### Shields.io badges

Use plain Markdown image syntax so badges render on GitHub. Keep badges outside HTML blocks (e.g. not inside `<p align="center">`).

- **Base:** `https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>?style=flat&labelColor=4b5563`
  - `labelColor=4b5563` = grey left side. Second color = right side. URL-encode spaces as `%20`, hyphens in labels as `-` (e.g. `Agent%20workflow`, `install--custom`).
- **Agent workflow badge** (agent name + "Agent workflow"): grey left, purple right.
  - Example: `[![Coordinator](https://img.shields.io/badge/Coordinator-Agent%20workflow-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/coordinator.md)`
  - Right-side color: `7D70DB`.
- **Skill badge** (skill name + "SKILL"): grey left, blue right.
  - Example: `[![install](https://img.shields.io/badge/install-SKILL-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install/SKILL.md)`
  - Right-side color: `0ea5e9`. For kebab-case skill names use a hyphen in the label (e.g. `document--paths` for "document-paths").
- **Linked badge:** wrap in `[![alt](url)](destination)`. Unlinked: `![alt](url)`.

### Section anchors (TOC links)

- GitHub auto-generates anchors from headings: lowercase, spaces to hyphens, punctuation removed. Use that format for table-of-contents links (e.g. `#features`, `#installation`).

### Alerts (blockquotes)

- GitHub supports `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]` for rendered alert blocks.

### Optional GitHub-specific patterns

- **Contributor grid:** `https://contrib.rocks/image?repo=[OWNER]/[REPO]` with link to `https://github.com/[OWNER]/[REPO]/graphs/contributors`.
- **Doc/source strip:** Links to `https://github.com/[OWNER]/[REPO]` and optional docs URL.

## Reference

[GitHub: Embedding animated GIF in README (discussion 81359)](https://github.com/orgs/community/discussions/81359). [document-enhance](../document-enhance/SKILL.md) uses this skill for README patterns. [document](../document/SKILL.md) for project READMEs that may be GitHub-hosted.
