---
name: standup
description: Produce a brief standup or status summary that links to work documents. Use when user says standup, status, daily standup, what's in progress, /standup.
disable-model-invocation: true
---

# Standup

Produce a short, skimmable status summary. When you mention work (projects, READMEs, runbooks, deliverables), link to them so the reader can jump straight to the doc.

## Inputs

1. **Scope** – Optional. One project, one flow, or all current work. Default: current work from [work/paths.md](work/paths.md).
2. **Audience** – Optional. Who the standup is for (e.g. self, team, ticket).

## Output

A few bullets or a short paragraph: what’s done, in progress, and next. Every reference to a work document is a link.

## Process

1. **Paths** – Use the Tree in the Editable section of [work/paths.md](work/paths.md) for project paths and structure. Do not invent paths.
2. **Content** – State what was done, what’s in progress, what’s next. No padding. Apply [document-voice](.claude/skills/document-voice/SKILL.md) for tone and brevity.
3. **Links to work documents** – Use **canonical paths from repo root**. Examples:
   - `[agent-teams README](work/studio/agent-teams/README.md)`
   - `[research runbook](work/studio/agent-teams/references/research-runbook.md)`
   Do **not** use relative hrefs like `../work/...` or `./work/...`. Same rule as in [document-voice](.claude/skills/document-voice/SKILL.md): links are canonical from repo root; paths and structure come from work/paths.md.

## Examples

**User:** "Standup for agent-teams."

**Output (pattern):** Short bullets. Each mention of a doc is a link, e.g. "Refined [research runbook](work/studio/agent-teams/references/research-runbook.md). Next: update [README](work/studio/agent-teams/README.md) roadmap table."

**User:** "What's in progress?"

**Output (pattern):** One or two sentences. Link any referenced project or doc using canonical path from repo root.

## Reference

[document-voice](.claude/skills/document-voice/SKILL.md) for tone and the linking rule (canonical path from repo root; no relative `../` or `./` hrefs). [work/paths.md](work/paths.md) for project paths and structure.
