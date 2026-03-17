---
name: research
description: Gather from what the user gives (chat, tickets, links, text, files, images). Follow links up to 5 levels; write findings into project README in four sections for document skill (document may add supplementary docs in references/ with kebab-case names per paths.md). Use when user says research, look at this, read, /research.
disable-model-invocation: true
argument-hint: "[ticket-id-or-url]"
---

# Research

Take what the user gives (ticket, links, pasted text, files, images), pull it into one place. Follow links up to 5 levels deep; write into the project README. Path from [work/paths.md](work/paths.md). Four sections so [document](.claude/skills/document/SKILL.md) can turn it into a clean doc (README and, when needed, supplementary docs in `references/` with kebab-case names per paths.md).

## Inputs

- **What the user gives** – One or more of: ticket ID, URL(s), pasted text, image file(s), or other file(s). Table below: how each is used.
- **Where to write** – Project README path from work/paths.md (document skill may later add supplementary docs in `references/` with kebab-case names).
- **Focus** (optional) – Words or topics to prioritize when choosing which links to follow.

| What they give you | What you use as starting links | What you keep as "level-0" (their raw input) |
|--------------------|--------------------------------|----------------------------------------------|
| Ticket ID (e.g. ICT-123) | Get the ticket via atlassian-rovo MCP; use the ticket text and any links in it. You need the atlassian-rovo MCP for this. | The ticket body |
| URL(s) | Those URLs | — |
| Pasted text | Any URLs you find in the text | The full pasted text |
| Image file(s) | Copy images into the project's `assets/` (give each a unique name). Describe the image or pull out any URLs; use those as links. Tell the documenter the path so they can embed it. | Your description or any text you extract |
| Other file(s) | Copy into `references/`. Read the file and pull out any URLs. Tell the documenter the path so they can link to it. | The file content |

## Output

One README with four parts (document may split or add supplementary docs in `references/` with kebab-case names). Output location: [document](.claude/skills/document/SKILL.md).

1. **Level-0 (input)** – The raw stuff the user gave you (ticket, paste, file, or image).
2. **Sources** – A table: URL, how deep you went (depth), title, parent. Every URL should be a clickable link: `[Title](url)`.
3. **Findings** – Content grouped by topic. Under each topic, say where it came from: `> Source: [title](url) (depth N)`.
4. **Link Tree** – A simple map of how pages connect (parent under child). Each item is a link `[title](url)`.

## Process

1. **Get starting point** – From what they gave, determine starting URL(s) and "level-0" content (raw input). If no URLs (e.g. only pasted text), write level-0 section and stop. No crawl.
2. **Open pages and pull content** – For each page: title, main text, links, images, design (colors, fonts, spacing if present), author/date, code bits, links out. If a page requires login or denies permission: ask the user to open the URL, log in, then say when done. Wait; then try again. Don't skip without asking.
3. **Follow links** – From starting URLs, follow up to 5 levels deep. Don't visit the same URL twice. Keep link tree (which page led to which).
4. **Write the README** – Fill four sections (Level-0 if present, Sources, Findings, Link Tree).

## Rules

- Track URLs already visited to avoid circles. With a focus area, go deep on those topics first; otherwise go wide.
- Every URL in the output must be a clickable link: `[title](url)`. Summarize when enough; copy verbatim when exact data matters.

## Reference

[work/paths.md](work/paths.md). [document](.claude/skills/document/SKILL.md).
