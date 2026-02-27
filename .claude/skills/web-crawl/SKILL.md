---
name: web-crawl
description: Navigates URLs and recursively follows links to gather comprehensive information up to 5 levels deep. Use when user says "research this", "deep dive on", "explore this URL", or asks to gather information from websites.
---

# Web Crawl

Navigates URLs and recursively follows links to gather comprehensive information up to 5 levels deep.

## Inputs

1. **Starting URL(s)** - One or more URLs to begin research from
2. **Output path** - `work/{team}/{space}/{project}/research/`
3. **Focus area** (optional) - Keywords or topics to prioritize when deciding which links to follow

If the starting URL or output path is missing, ask the user before proceeding.

## Process

### 1. Fetch Starting URLs

Visit each starting URL. Extract:
- Page title and main content
- All links (navigation, inline references, related pages, asset URLs)
- Images, screenshots, icons
- Design tokens, colors, fonts, spacing values
- Metadata (dates, authors, categories)

### 2. Recursive Link Traversal

Follow links up to **5 levels deep** from the starting URL.

```
Level 0: Starting URL
Level 1: Links found on starting page
Level 2: Links found on level 1 pages
Level 3: Links found on level 2 pages
Level 4: Links found on level 3 pages
```

At each level:
- Prioritize links matching the focus area
- Follow cross-domain links when relevant to the research
- Skip duplicate URLs already visited
- Track the link tree (parent -> child relationships)

### 3. Content Extraction

For each page visited, capture:
- **URL** and depth level
- **Title** and headings structure
- **Key content** (summarized, not raw HTML)
- **Images and screenshots** with descriptions and URLs
- **Design assets** (tokens, colors as hex/rgb, font families and sizes, spacing, border radii)
- **Code snippets** or configuration examples
- **Outbound links** with context on what they reference

### 4. Output

Write all findings to the output path:

**sources.md** - Link index with depth levels:
```markdown
## Sources

| URL | Depth | Title | Parent |
|-----|-------|-------|--------|
| ... | 0     | ...   | (root) |
| ... | 1     | ...   | ...    |
```

**findings.md** - Extracted content organized by topic:
```markdown
## {Topic Heading}

{Summarized content}

> Source: {URL} (depth {N})
```

**link-tree.md** - Visual map of traversal:
```markdown
- [Starting Page](url)
  - [Child Page](url)
    - [Grandchild Page](url)
```

## Rules

- Never exceed 5 levels of depth
- Track all visited URLs to avoid loops
- Prefer depth-first within the focus area, breadth-first otherwise
- Extract all visual and design assets (images, colors, fonts, tokens)
- If a page requires authentication, note it and skip
- Summarize content rather than copying entire pages verbatim
