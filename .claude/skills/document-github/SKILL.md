---
name: document-github
description: GitHub README rules so GIFs, images, badges, and tables render correctly.
triggers: "writing or enhancing a GitHub README, /document-github"
---

# Document GitHub

Rules for READMEs and docs that render correctly on GitHub. Single source of truth; other document skills reference this, do not duplicate.

## Inputs

- **Context** – Producing or enhancing a GitHub README, or user asks how to make something render on GitHub.

## Output

README or doc that follows these rules; assets (GIFs, images, badges, cards) render as intended on GitHub.

## Process

### 1. GIFs and images

- Use Markdown: `![Alt text](url)`. For the hero/primary image, do not wrap in `<div>` or use `<img>`; plain Markdown lets the GIF animate.
- In-repo GIFs: use raw URLs or they may render static. Format: `https://raw.githubusercontent.com/[OWNER]/[REPO]/[BRANCH]/[path]/[file].gif`. Same idea for other in-repo images if they fail to load. Source: [GitHub discussion 81359](https://github.com/orgs/community/discussions/81359).

### 2. Badges

- Use Markdown: `![alt](url)` or `[![alt](url)](link)`. Do not wrap badges in `<p>`, `<div>`, or other block HTML in normal flow; Markdown images do not render inside block HTML.
- Base: `https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>?style=flat&labelColor=4b5563`. URL-encode spaces as `%20`; hyphens in labels as `-` (e.g. `install--custom`).
- Subagent badge (lowercase name + "subagents"), purple right: `7D70DB`. Example: `[![coordinator](https://img.shields.io/badge/coordinator-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/coordinator.md)`.
- Skill badge (name + "skills"), blue right: `0ea5e9`. Kebab-case names use hyphen in label (e.g. `document--paths`). Linked: `[![alt](url)](dest)`. Unlinked: `![alt](url)`.
- If hero badges are inside a `<div align="center">`, use HTML `<img>` there because Markdown images do not render inside divs.

### 3. Subagent/skill cards (one table per card)

One table, one column. Subagent badge centered in row 1; skill badges and body left-aligned.

- Separator: `|:--|` (left-align column).
- Center only the subagent badge: wrap it in `<div align="center">` **inside that cell**. Row 1 content: `<div align="center">[![name](...)](link)</div>`. Do not wrap the whole table or other rows.
- Rows: (1) subagent badge in centered div, (2) skill badge(s), (3) body. No extra columns, no split tables.

Example:

```markdown
| <div align="center">[![coordinator](https://img.shields.io/badge/coordinator-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/coordinator.md)</div> |
|:--|
| ![skills](...) |
| Orchestrates... |
```

### 4. Anchors and alerts

- TOC links: GitHub anchors are lowercase, spaces to hyphens (e.g. `#features`, `#installation`).
- Alerts: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`.

### 5. Optional

- Contributor grid: `https://contrib.rocks/image?repo=[OWNER]/[REPO]` with link to repo graphs/contributors.
- Doc/source: link to `https://github.com/[OWNER]/[REPO]` and optional docs URL.

## Reference

[GitHub: Embedding animated GIF (discussion 81359)](https://github.com/orgs/community/discussions/81359). [document-enhance](../document-enhance/SKILL.md), [document](../document/SKILL.md).
