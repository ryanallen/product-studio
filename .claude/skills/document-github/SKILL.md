---
name: document-github
description: GitHub README rules (GIFs, images, badges, anchors, alerts) and patterns for writing or enhancing a README. Ensures linkable things are linked.
triggers: "writing or enhancing a GitHub README, enhance, refine, /document-github"
argument-hint: "[path or paste]"
disable-model-invocation: false
user-invocable: true
---

# Document GitHub

Rules for READMEs and docs that render correctly on GitHub. Single source of truth for rendering and structure. When enhancing or refining a README, follow the link-everything rule and the patterns below.

## Inputs

- **Context** – Producing or enhancing a GitHub README, or user asks how to make something render on GitHub.
- **When enhancing** – Get project (what it is, who it's for), assets (logo, screenshots, GIFs), social share image, optional sections (contributors, roadmap, FAQ). Use `[BRACKETS]` for user-supplied content.

## Output

README or doc that follows these rules; assets render as intended. When enhancing, one complete `README.md` using the patterns below.

## Process

### 1. GIFs and images

- Use Markdown: `![Alt text](url)`. For the hero/primary image, do not wrap in `<div>` or use `<img>`; plain Markdown lets the GIF animate.
- In-repo GIFs: use raw URLs or they may render static. Format: `https://raw.githubusercontent.com/[OWNER]/[REPO]/[BRANCH]/[path]/[file].gif`. Same for other in-repo images if they fail to load. Source: [GitHub discussion 81359](https://github.com/orgs/community/discussions/81359).

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

### 5. When enhancing a README: link everything

**Rule:** If the text mentions something that has a URL or path, add a link.

**Link every mention of:** slash commands (e.g. `/install`, `/research-figma` → skill); trigger phrases/skill names → skill; directory paths (`.claude/agents/`, `.claude/skills/`); skill names in body text; agent names → agent file; repo file paths (`work/paths.md`, `.tmp/`); section names → in-page anchors. Use relative links for in-repo paths.

### 6. When enhancing: optional patterns

- **Hero:** `<p align="center"><strong>[Project Name]</strong><br/>[tagline]</p>` or `[Project Name] – [tagline]`.
- **Tagline:** `> [Catchphrase.]`
- **Feature list:** bold key + description per item.
- **Screenshot/GIF:** One strong visual early; use raw URL for in-repo GIFs (see Process 1).
- **Social share image:** Set one (hero or dedicated e.g. `assets/social.png`). Document where to set it (repo Settings → Social preview).
- **Code block:** Set language; keep minimal.
- **Collapsible:** `<details><summary>...</summary>...</details>`.
- **Section dividers:** `---` between major sections.
- **TOC:** `- [Section](#section)` (lowercase, spaces to hyphens).
- **Contributor grid:** `https://contrib.rocks/image?repo=[OWNER]/[REPO]` with link to repo graphs/contributors.

**README structure order:** Hero + social share, doc/source links, description + tagline, one strong visual, feature list, installation, quickstart, optional TOC and deeper sections, optional contributors/roadmap/FAQ, license + footer.

## Quality rules

- **Link everything linkable** when enhancing. Slash commands, skill names, paths, agent names: add the link.
- **Social share image:** Set one; document where (e.g. repo Settings → Social preview).
- Use real image URLs; user fills `[OWNER]`, `[REPO]`, `[BRANCH]`. Use `[BRACKETS]` for placeholders. Prefer relative links for in-repo paths.
- If the user gives existing markdown, keep the facts and upgrade structure and patterns to match this skill.

## Reference

[GitHub: Embedding animated GIF (discussion 81359)](https://github.com/orgs/community/discussions/81359). [document](../document/SKILL.md). [Extend Claude with skills](https://code.claude.com/docs/en/skills.md).
