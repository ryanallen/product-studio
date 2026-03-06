---
name: verify-docs
description: Check every document for heading hierarchy (h1 h2 h3), top navigation (horizontal, section links), and emojis at start of headlines. Scope is paths.md, system files, and project docs. Use when user says verify docs, clean up studio, or /verify-docs.
disable-model-invocation: true
---

# Verify Docs

Check each document for hierarchy, top nav, and emoji in headings. Collect issues and pass to document-verification for the report.

## Inputs

- **Scope** – If `work/paths.md` exists, read it and collect all doc paths from the tree (e.g. README.md per project). Also collect system docs: `.claude/**/*.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`, root markdown. If user chose "pick and choose", use only the paths they selected.

## Output

List of files processed and any issues (missing hierarchy, missing or non-horizontal nav, missing emoji). Then run [document-verification](../document-verification/SKILL.md) with this list and the full set of files (same agent run; writes `.tmp/verification-report.md`).

## Process

1. **Scope** – If `work/paths.md` exists, read it and collect all doc paths from the tree (e.g. README.md per project). Also collect system docs: `.claude/**/*.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`, root markdown. If user chose "pick and choose", use only the paths they selected.

2. **Heading hierarchy** – For each doc, ensure headings follow a proper hierarchy: at least one `#` (h1), then `##` (h2) under h1, then `###` (h3) under h2. No skipping levels (e.g. no h3 before an h2). Record any file that violates this.

3. **Top navigation** – Each doc with more than one section (multiple h2 or h3) must have a navigation block near the top (above the fold) that links to all those sections. The nav must be horizontal and compact, e.g. `[Section A](..#a) | [Section B](..#b) | [Section C](..#c)` so it takes minimal vertical space.

4. **Emojis in headlines** – Every heading line (`#`, `##`, `###`) must start with an emoji (at the very beginning of the heading text). Record any heading that does not.

5. **Report** – Output the list of files and issues. Then run [document-verification](../document-verification/SKILL.md) with this list and the full set of files processed (same agent run; write `.tmp/verification-report.md`).

## Reference

[document-verification](../document-verification/SKILL.md) – Writes the verification report. [document](../document/SKILL.md) – Nav and emoji standards. [Coordinator](../../agents/coordinator.md) – Clean up studio workflow.
