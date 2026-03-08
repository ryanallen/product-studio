---
name: document
description: Turn research into one clear README per project. Use markdown, mermaid diagrams, tables, and links. Plain language.
triggers: "refine, write, write up, document, update, make, /document"
---

# Document

Turn research into one README per project (path from [work/paths.md](../../work/paths.md)). Use clear headings, diagrams when they help, and link to your sources.

## Inputs

- **Project path** – Where the README lives. See [work/paths.md](../../work/paths.md).
- **Source material** – The research, notes, or findings you're turning into the README.
- **Document type** – What kind of doc: `research`, `analysis`, `solutions`, or `project-overview`.

## Output

One README. Everything goes in it. No separate doc files. You may use .tmp as scratch or placeholder; anything written there must be moved into the README before you're done.

## Process

1. **Read the source** – Go through all the material. Get the scope and main topics.
2. **Group by sections** – Decide which bits go in which part of the README (by document type above).
3. **Write the README** – Clear title and one-line summary. Short paragraphs (a few sentences). Add diagrams where they explain flows or relationships. Use tables for comparisons. Link to sources right where you mention them.
4. **Use the structure below** – When the type is `project-overview`, follow the section outline. For images and other evidence, see work/paths.md.

### How to write it

**Diagrams (mermaid)** – Use when you have a process, a flow, or a chain of causes. Good for: flowcharts, sequence diagrams, mind maps (e.g. problem → why → why → root cause), Gantt-style timelines. Use when there are 3+ steps or a clear hierarchy.

**Tables** – Use for comparisons, lists of sources, or feature lists. Only include real data from your source. No filler rows, "TBD", or made-up names or dates.

**Callouts** – For notes or warnings use: `> **Note:** ...` and `> **Warning:** ...`

**Links** – Link anything that has a URL or another place in the doc. Sections, sources, people (give each person an anchor in Team and link to it), tickets, artifacts. Use relative links (no full filesystem paths).

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

- Use relative links only. No full filesystem paths.
- Only real content from the source. No invented rows, TBD, or fake names/dates. Skip a section if there's no data.
- Team table: full name per person. Role must be one of Driver, Approver, Contributor, Informed.
- If the research has a Link tree or Sources section, put it under Research and context > Reviews and sources.
- Always say where content came from (attribute to the source).

## Reference

[work/paths.md](../../work/paths.md). [Coordinator](../../agents/coordinator.md). [document-github](../document-github/SKILL.md) for GitHub READMEs. [document-skills](../document-skills/SKILL.md).
