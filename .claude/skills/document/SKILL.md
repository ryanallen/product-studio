---
name: document
description: Turn research into a clear README per project; supplementary docs in assets/docs/ with kebab-case names. Uses a TypeScript script for deterministic section outline (same pattern as AGENTS beginning rules with verify-task checklist). Use markdown, mermaid diagrams, tables, and links. Plain language. Use when user says refine, write, write up, document, update, make, /document.
---

# Document

One README per project (path from [work/paths.md](../../work/paths.md)) as the main doc. Supplementary docs go in the project's `assets/docs/` folder with kebab-case filenames (e.g. `architecture-notes.md`). Clear headings, diagrams when they help, link to sources. **Deterministic behavior:** Run the TypeScript script for the chosen document type to get the section outline (same pattern as [AGENTS.md](../../AGENTS.md) Rules 1–2 with [verify-task checklist](../verify-task/scripts/checklist.ts)); same document type → same section order.

## Inputs

- **Project path** – [work/paths.md](../../work/paths.md).
- **Source material** – Research, notes, or findings.
- **Document type** – `research`, `analysis`, `solutions`, or `project-overview`.

## Output

One README (main doc). When needed, supplementary docs in the project's `assets/docs/` folder with kebab-case filenames; link from README. Scratch in .tmp is allowed; move into README or into a doc in `assets/docs/` before done.

## Process

1. **Section outline (deterministic):** Run `npm run doc:structure -- <document-type>` (or `npx tsx .claude/skills/document/scripts/doc-structure.ts <document-type>`). Use the printed markdown outline as the section order when writing the README. Only add a section if you have real content; skip if the source doesn't have it.
2. **Read the source** – Scope and main topics.
3. **Group by sections** – By document type above, following the script output.
4. **Write the README** – Clear title and one-line summary. Short paragraphs. Diagrams for flows or relationships. Tables for comparisons. Link to sources inline. When a topic deserves its own doc, add it in `assets/docs/` with a kebab-case filename and link from the README.
5. **project-overview** – Script output matches the full template below; use it for headings and hints. For images and evidence paths see work/paths.md. Supplementary docs live in `assets/docs/` with kebab-case names.

### How to write it

**Diagrams (mermaid)** – Process, flow, or cause chain. Flowcharts, sequence, mind maps (e.g. problem → why → root cause), Gantt-style timelines. Use for 3+ steps or clear hierarchy.

**Tables** – Comparisons, source lists, feature lists. Real data only; no filler, TBD, or invented names/dates.

**Callouts** – `> **Note:** ...` and `> **Warning:** ...`

**Links** – Link every URL or in-doc target. Sections, sources, people (anchor in Team), tickets, artifacts. Relative links only.

### README structure (project-overview)

Section order and headings come from [scripts/doc-structure.ts](scripts/doc-structure.ts) for document type `project-overview`. Only add a section if you have real content. If the source doesn't have it, skip it. Link back to the source where it makes sense.

```markdown
# {Project Name}

## Research and context

### Team and roadmap
- **Team:** One row per person. Full name. Role: **Driver**, **Approver**, **Contributor**, or **Informed** (DACI).
- **Roadmap:** Project + ticket | Due date.
- **Measurements:** Name | Current state | Desired state.

### Reviews and sources
Notes, current-state review, competitor review. If research has a link tree or sources list, keep it here as a subsection and table.

### Users and needs
User | Time/date | Verbatim | Encoded needs. Sorted needs. Refined problem: *In which way might we enable {user} to solve {mainNeed1} & {mainNeed2}, to {userGoal} & {businessGoal}?*

## Ideas and testing

### Ideas and hypotheses
Hypotheses (If | then | due to).

### What we made
Date | Creator | What was made. Drawings, surveys, flows, prototypes, UI, code repos.

### Testing and results
Test plan (what you're testing, who, goals). Results (Version | KPI 1 | KPI 2).

## Launch and follow-up

### What we're shipping
Designs for engineers (Date | Creator | Artifact). Production roadmap (Project | Due date | Status | Person).

### Results and QA
QA. Production testing (Version | KPI 1 | KPI 2).

### What's next
Learnings. Recommendations. Links to new docs.
```

## Rules

- Relative links only. No full filesystem paths.
- Real content only. No invented rows, TBD, or fake names/dates. Skip a section if no data.
- Supplementary docs in the project's `assets/docs/` use kebab-case filenames; link from README.
- Team table: full name per person. Role: Driver, Approver, Contributor, or Informed.
- Link tree or Sources from research go under Research and context > Reviews and sources.
- Attribute content to the source.

## Reference

[work/paths.md](../../work/paths.md). [Coordinator](../../agents/coordinator.md). [verify-task checklist](../verify-task/scripts/checklist.ts) – same deterministic pattern. [document-github](../document-github/SKILL.md). [document-skills](../document-skills/SKILL.md).
