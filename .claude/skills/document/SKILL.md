---
name: document
description: Turn research into one clear README per project. Use markdown, mermaid diagrams, tables, and links. Plain language.
triggers: "refine, write, write up, document, update, make, /document"
---

# Document

One README per project (path from [work/paths.md](../../work/paths.md)). Clear headings, diagrams when they help, link to sources.

## Inputs

- **Project path** – [work/paths.md](../../work/paths.md).
- **Source material** – Research, notes, or findings.
- **Document type** – `research`, `analysis`, `solutions`, or `project-overview`.

## Output

One README. No separate doc files. Scratch in .tmp is allowed; move into README before done.

## Process

1. **Read the source** – Scope and main topics.
2. **Group by sections** – By document type above.
3. **Write the README** – Clear title and one-line summary. Short paragraphs. Diagrams for flows or relationships. Tables for comparisons. Link to sources inline.
4. **project-overview** – Use the section outline below. For images and evidence paths see work/paths.md.

### How to write it

**Diagrams (mermaid)** – Process, flow, or cause chain. Flowcharts, sequence, mind maps (e.g. problem → why → root cause), Gantt-style timelines. Use for 3+ steps or clear hierarchy.

**Tables** – Comparisons, source lists, feature lists. Real data only; no filler, TBD, or invented names/dates.

**Callouts** – `> **Note:** ...` and `> **Warning:** ...`

**Links** – Link every URL or in-doc target. Sections, sources, people (anchor in Team), tickets, artifacts. Relative links only.

### README structure (project-overview)

Only add a section if you have real content for it. If the source doesn't have it, skip it. Link back to the source where it makes sense.

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
- Team table: full name per person. Role: Driver, Approver, Contributor, or Informed.
- Link tree or Sources from research go under Research and context > Reviews and sources.
- Attribute content to the source.

## Reference

[work/paths.md](../../work/paths.md). [Coordinator](../../agents/coordinator.md). [document-github](../document-github/SKILL.md). [document-skills](../document-skills/SKILL.md).
