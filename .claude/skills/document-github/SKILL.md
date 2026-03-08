---
name: document-github
description: GitHub README rules: GIFs, images, badges, anchors, alerts; link everything when enhancing. Use when user is writing or enhancing a GitHub README, or says enhance, refine, make, /document-github.
argument-hint: "[path or paste]"
disable-model-invocation: false
user-invocable: true
---

# Document GitHub

Rules for READMEs that render on GitHub. When enhancing a README, link everything linkable and use the patterns below.

## Inputs

- **Context** – Producing or enhancing a GitHub README, or user asks how to make something render on GitHub.
- **When enhancing** – Get project (what it is, who it's for), assets (logo, screenshots, GIFs), social share image, optional sections. Use `[BRACKETS]` for user-supplied content.

## Output

README or doc following these rules. When enhancing, one complete `README.md`.

## Process

### 1. GIFs and images

- Markdown: `![Alt text](url)`. Hero/primary image: plain Markdown (no `<div>` or `<img>` so GIFs animate).
- In-repo GIFs: use raw URLs or they may render static. `https://raw.githubusercontent.com/[OWNER]/[REPO]/[BRANCH]/[path]/[file].gif`. [GitHub discussion 81359](https://github.com/orgs/community/discussions/81359).

### 2. Badges

- Markdown: `![alt](url)` or `[![alt](url)](link)`. No `<p>`/`<div>` around badges in normal flow; Markdown images do not render inside block HTML.
- Base: `https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>?style=flat&labelColor=4b5563`. Spaces as `%20`; hyphens in labels as `-`.
- Subagent badge (name + "subagents"), purple: `7D70DB`. Skill badge (name + "skills"), blue: `0ea5e9`. Kebab-case: hyphen in label (e.g. `document--paths`). Linked: `[![alt](url)](dest)`.
- Badges inside `<div align="center">`: use HTML `<img>` (Markdown images do not render inside divs).

### 3. Subagent/skill cards

One table, one column. Row 1: subagent badge centered (`<div align="center">` inside the cell). Row 2: skill badge(s). Row 3: body. Separator: `|:--|`. No extra columns.

### 4. Anchors and alerts

- TOC: GitHub anchors lowercase, spaces to hyphens (`#features`, `#installation`).
- Alerts: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`.

### 5. When enhancing: link everything

If the text mentions something with a URL or path, add the link. Link: slash commands → skill; skill/agent names → skill/agent file; paths (`.claude/agents/`, `work/paths.md`, `.tmp/`); section names → in-page anchors. Relative links in-repo.

### 6. When enhancing: optional patterns

- Hero: `<p align="center"><strong>[Project Name]</strong><br/>[tagline]</p>` or `[Project Name] – [tagline]`.
- Tagline: `> [Catchphrase.]`
- Feature list: bold key + description per item.
- One strong visual early; raw URL for in-repo GIFs.
- Social share image: set one; document where (repo Settings → Social preview).
- Code block: set language; keep minimal.
- Collapsible: `<details><summary>...</summary>...</details>`.
- Section dividers: `---`. TOC: `- [Section](#section)` (lowercase, hyphens).
- Contributor grid: `https://contrib.rocks/image?repo=[OWNER]/[REPO]` with link to repo.

**Order:** Hero + social share, doc/source links, description + tagline, one strong visual, feature list, installation, quickstart, optional TOC and sections, optional contributors/roadmap/FAQ, license + footer.

## Reference

[GitHub: Embedding animated GIF (81359)](https://github.com/orgs/community/discussions/81359). [document](../document/SKILL.md). [Extend Claude with skills](https://code.claude.com/docs/en/skills.md).
