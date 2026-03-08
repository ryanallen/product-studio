---
name: research
description: Gather from anything the user gives you (chat, tickets, links, text, files, images). Follow links up to 5 levels and write findings into the project README in four sections for the document skill.
triggers: "research, learn, look at this, read, /research"
disable-model-invocation: true
argument-hint: "[ticket-id-or-url]"
---

# Research

You take whatever the user gives you (a ticket, some links, pasted text, files, images) and pull it into one place. Follow links up to 5 levels deep, grab the useful content, and write into the project README. Path from [work/paths.md](../../work/paths.md). Four sections so [document](../document/SKILL.md) can turn it into a clean doc.

## Inputs

- **What the user gives you** – One or more of: a ticket ID, URL(s), pasted text, image file(s), or other file(s). The table below says how each type is used.
- **Where to write** – The project README path from work/paths.md.
- **Focus** (optional) – Words or topics to care about most when you choose which links to follow.

| What they give you | What you use as starting links | What you keep as "level-0" (their raw input) |
|--------------------|--------------------------------|----------------------------------------------|
| Ticket ID (e.g. ICT-123) | Get the ticket via atlassian-rovo MCP; use the ticket text and any links in it. You need the atlassian-rovo MCP for this. | The ticket body |
| URL(s) | Those URLs | — |
| Pasted text | Any URLs you find in the text | The full pasted text |
| Image file(s) | Copy images into the project's `assets/images/` (give each a unique name). Describe the image or pull out any URLs; use those as links. Tell the documenter the path so they can embed it. | Your description or any text you extract |
| Other file(s) | Copy into `assets/docs/`. Read the file and pull out any URLs. Tell the documenter the path so they can link to it. | The file content |

## Output

One README with four parts. Output location: [document](../document/SKILL.md).

1. **Level-0 (input)** – The raw stuff the user gave you (ticket, paste, file, or image).
2. **Sources** – A table: URL, how deep you went (depth), title, parent. Every URL should be a clickable link: `[Title](url)`.
3. **Findings** – Content grouped by topic. Under each topic, say where it came from: `> Source: [title](url) (depth N)`.
4. **Link Tree** – A simple map of how pages connect (parent under child). Each item is a link `[title](url)`.

## Process

1. **Get your starting point** – From what they gave you, figure out your starting URL(s) and the "level-0" content (the raw input). If there are no URLs (e.g. they only pasted text with no links), just write the level-0 section and stop. No crawl.
2. **Open pages and pull out content** – For each page you open: get the title, main text, links, images, design stuff (colors, fonts, spacing if present), who wrote it and when, code bits, and any links out. If a page asks you to log in or says you don't have permission: ask the user to open that URL in their browser, log in, then tell you when they're done. Wait for them. Then try again. Don't skip the page without asking.
3. **Follow links** – From your starting URLs, follow links up to 5 levels deep. Don't visit the same URL twice. Keep track of the link tree (which page led to which).
4. **Write the README** – Fill in the four sections (Level-0 if you have it, then Sources, Findings, Link Tree).

## Rules

- Keep a list of URLs you've already visited so you don't go in circles. When you have a focus area, go deep on those topics first; otherwise go wide.
- Every URL you put in the output must be a clickable link: `[title](url)`. No plain URLs. Summarize when that's enough; copy word-for-word when the exact data matters.

## Reference

[work/paths.md](../../work/paths.md). [document](../document/SKILL.md).
