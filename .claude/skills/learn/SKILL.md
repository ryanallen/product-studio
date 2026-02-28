---
name: learn
description: Gather from any source (ticket, URL(s), text, file(s), image(s)) and follow links up to 5 levels deep. Use when user says "learn about this", "look at this", or /learn. In Claude Code and Cursor, /skills lists all.
---

# Learn

Accepts flexible input, derives starting URLs and optional level-0 content, then navigates recursively up to 5 levels deep. Writes findings to the project README so the Documentor can read and structure them.

## Inputs

1. **Input** (one or more of):
   - **Ticket ID** (e.g. PROJ-123) – Fetch via atlassian-rovo MCP; use ticket body and all linked URLs as starting URLs; ticket body is level-0 content. Requires atlassian-rovo MCP.
   - **URL(s)** – Use as starting URLs.
   - **Pasted text** – Extract URLs and use as starting URLs; full text is level-0 content.
   - **File path(s)** – Read file(s), extract URLs and use as starting URLs; file content is level-0 content.
   - **Image path(s)** – Describe or extract text/URLs from image; use any URLs as starting URLs; description or extracted text is level-0 content.
2. **Output path** – `work/{team}/{space}/{project}/README.md` (single file for all findings; do not create other note or output files). Documentor reads from this same path. **One folder, one README:** never create a new folder or new README. If you discover a new problem or topic, add it into this same README (e.g. another subsection, problem entry, or finding). Multiple problems and findings all live in this one file.
3. **Focus area** (optional) – Keywords or topics to prioritize when deciding which links to follow.

If input or output path is missing, ask the user before proceeding.

Valid team and space values are defined in `work/config.md`.

## Process

### 1. Normalize Input

From the given input, produce:
- **Starting URL(s)** – Zero or more URLs to crawl. If none (e.g. only pasted text with no links), write level-0 content only to output and skip crawl.
- **Level-0 content** (optional) – Raw or summarized content from the input (ticket body, pasted text, file content, image description). Include this in the output so the Documentor can structure it.

### 2. Fetch Starting URLs

**Auth-gated or permission-restricted links (e.g. Slack, GitHub, internal tools):** Open them in Playwright using Chrome. A browser launched by Playwright uses the user's existing Chrome session (cookies, login state), so it can bypass permission walls and access the same content the user would see when logged in. **If a page cannot be accessed (login wall, permission denied, etc.):** Ask the user to log in. Tell them to open the URL in their browser (or use the session Playwright will use), complete login, then tell you when they are done. Wait for the user to confirm before retrying. Do not give up and skip without asking. Extract:
- Page title and main content
- All links (navigation, inline references, related pages, asset URLs)
- Images, screenshots, icons
- Design tokens, colors, fonts, spacing values
- Metadata (dates, authors, categories)

### 3. Recursive Link Traversal

Follow links up to **5 levels deep** from each starting URL.

```
Level 0: Starting URL
Level 1: Links found on starting page
Level 2: Links found on level 1 pages
Level 3: Links found on level 2 pages
Level 4: Links found on level 3 pages
```

At each level:
- Skip duplicate URLs already visited
- Track the link tree (parent -> child relationships)

### 4. Content Extraction

For each page visited, capture:
- **URL** and depth level
- **Title** and headings structure
- **Key content** (summarized, not raw HTML)
- **Images and screenshots** with descriptions and URLs
- **Design assets** (tokens, colors as hex/rgb, font families and sizes, spacing, border radii)
- **Code snippets** or configuration examples
- **Outbound links** with context on what they reference

### 5. Output

Write to the project README.md. This file is the handoff to the Documentor (Documentor reads from this path and restructures it).

If level-0 content exists, include it first:

**## Level-0 (input)** – Content from ticket, paste, file, or image:
```markdown
## Level-0 (input)

{Content or summary of user-provided input}
```

**## Sources** – Link index with depth levels. Use markdown links so URLs are clickable (e.g. put `[Title](URL)` in the Title column):
```markdown
## Sources

| URL | Depth | Title | Parent |
|-----|-------|-------|--------|
| ... | 0     | ...   | (root) |
| ... | 1     | ...   | ...    |
```

**## Findings** – Extracted content organized by topic:
```markdown
## Findings

### {Topic Heading}

{Summarized content}

> Source: [page title or URL](url) (depth {N})
```

**## Link Tree** – Visual map of traversal (every item must be a markdown link so it is clickable):
```markdown
## Link Tree

- [Starting Page](url)
  - [Child Page](url)
    - [Grandchild Page](url)
```

## Rules

- Track all visited URLs to avoid loops
- Prefer depth-first within the focus area, breadth-first otherwise
- Extract all visual and design assets (images, colors, fonts, tokens)
- For pages that require authentication or permissions (Slack, GitHub, etc.), use Playwright in Chrome to open the link; it will use the user's session and bypass permission checks
- If a page still cannot be accessed (login required, permission denied): ask the user to log in. Tell them which URL to open, to complete login in their browser, and to tell you when done. Wait for the user to confirm before retrying. Do not note it and skip without asking
- Summarize content when appropriate and if data is important copy it verbatim
- **Clickable links:** Every URL in the output (Sources table, Link Tree, Findings source lines) must be written as a markdown link `[title](url)`. Never output a bare URL or title-only line; always use `[title](url)` so links are clickable in the README.
- **One folder, one README:** Never create a new project path, new folder, or new README. All findings and new problems go into the same project README. Append or update sections in that file only.
