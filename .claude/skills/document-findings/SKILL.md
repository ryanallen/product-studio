---
name: document-findings
description: Takes research output and produces structured, enhanced markdown documentation with mermaid diagrams. Use when user says "write up", "document", or /document-findings. In Claude Code and Cursor, /skills lists all.
---

# Document Findings

Takes research output and produces structured, enhanced markdown documentation.

## Inputs

1. **Project path** - `work/{team}/{space}/{project}/`
2. **Source material** - Research output to structure
3. **Document type** - One of: `research`, `analysis`, `solutions`, `project-overview`

If the project path or source material is missing, ask the user before proceeding.

Valid team and space values are defined in `work/config.md`.

## Output

All project documentation lives in a single file: `work/{team}/{space}/{project}/README.md`. Do not create other files (notes, drafts, separate docs) for the project; write everything into this README.

## Markdown Standards

### Headings
Use H2 (`##`) as top-level within documents. Reserve H1 (`#`) for the document title only.

### Mermaid Diagrams

Use mermaid for:
- **Flowcharts** - Processes, workflows, decision trees
- **Sequence diagrams** - Multi-step interactions
- **Mind maps** - Problem breakdowns, topic relationships
- **Gantt charts** - Timelines, phases

Example for a workflow:
````markdown
```mermaid
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative]
```
````

Example for root cause:
````markdown
```mermaid
mindmap
  root((Problem))
    Why 1
      Why 2
        Why 3
          Root Cause
```
````

### Tables
Use tables for structured comparisons, source indexes, and feature matrices.

### Callouts
Use blockquotes with bold labels for callouts:
```markdown
> **Note:** Additional context here.

> **Warning:** Risk or caveat here.
```

### Links and Sources
Always cite sources inline with markdown links. Group full source lists in tables.

## Process

### 1. Read Source Material
Read all files from the source path. Understand the scope and topics covered.

### 2. Organize by Sections
Map content into the README sections based on document type.

### 3. Write README
- Start with a clear title and one-line summary
- Use mermaid diagrams where relationships or flows exist
- Use tables where comparisons or indexes exist
- Keep paragraphs short (3-4 sentences max)
- Cite sources inline

### 4. README Structure

Use a single README with three phases. Link between them at the top. Notes, current-state review, competitor audit, and similar material go in **Audits** (under Discovery).

```markdown
# {Project Name}
[Discovery](#discovery) | [Exploration](#exploration) | [Go to market](#go-to-market)

---
## Discovery

### Project tracking
Team (Name | Responsibility), Roadmap (Project + ticket | Due date), Measurements (Name | Current state | Desired state).

### Audits
Notes, current-state review, competitor review. Track artifacts in Exploration > Artifacts.

### Users + Needs
Users raw & encoded needs (User | Time/date | Verbatim | Encoded needs). Sorted needs. Refined problem statement (In which way might we enable ${user} to solve ${mainNeed1} & ${mainNeed2}, to ${userGoal} & ${businessGoal}?).

---
## Exploration

### Ideation
Hypotheses (If | then | due to).

### Collaboration
Artifacts table (Date | Creator | Artifact).

### Validation
Test plan (general, users, goals). User testing results (Version | KPI 1 | KPI 2).

---
## Go to market

### Deliverables
Designs for engineers (Date | Creator | Artifact). Production roadmap (Project name | Due date | Status | Person assigned).

### Performance
Quality assurance. Production testing (Version | KPI 1 | KPI 2).

### Next version
Learnings. Recommendations. Links to new docs.
```

## Rules

- Never use absolute filesystem paths in links. All links must be relative to the document they appear in
- Never invent information not present in source material
- Always attribute content to its source
- Use mermaid diagrams for any process with 3+ steps or any hierarchy with 2+ levels
- Always include a table of contents after the H1 title linking to all H2 sections
