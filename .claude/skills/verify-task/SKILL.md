---
name: verify-task
description: Append a new task section to the running .tmp task checklist (one heading per task with date timestamp); list each skill in the flow so the user can verify every skill was run.
triggers: []
disable-model-invocation: true
---

# Verify Task

Append a **new section** to `.tmp/task-checklist.md` per task. Running list: do not delete or overwrite. Section = heading (date + time + summary), then one line per skill. Completed = strikethrough + note. Agents update only the **current task section** (last heading).

## Inputs

- **Task context** – User request and, when known, flow name (e.g. Learn, Save) or list of steps.
- **Steps/skills** – From Main or coordinator: the ordered list of skills (or subagent→skill steps) for this flow. Each step in the flow must become one checklist item so the user can confirm it ran. Example: Save → `verify-paths`, `document-paths` (if mismatch), `save`. Learn → `research`, `document`.

## Output

`.tmp/task-checklist.md` (create if missing). Append only. Heading: `## YYYY-MM-DD HH:MM — {summary}`. One line per skill. Agents strikethrough + note in current section when they run a skill.

## Process

1. Ensure `.tmp/` exists.
2. **Skill list** from flow: Workflows = coordinator step list (one line per skill). Single flows = every skill the subagent uses (e.g. refine/README → document, document-github, document-voice). Do not collapse to one line.
3. Read existing `.tmp/task-checklist.md` if present. Do not overwrite.
4. Append new section at bottom: if file empty, add title `# Task checklist (running list)` then section. Section = heading `## YYYY-MM-DD HH:MM — {summary}`, blank line, skill lines `- skill-name` or `- ~~skill-name~~ — note`. Optional `## Notes`.
5. Write existing content + new section.
6. Confirm to Main: checklist updated; agents update current section only.

## Reference

[Coordinator](../../agents/coordinator.md) – workflows list steps; single flows use Output column and subagent scope for full skill list. **Deterministic script:** [scripts/checklist.ts](scripts/checklist.ts) – step 0 always verify-task; `npm run checklist -- "<summary>"` appends section; `--steps "<message>"` prints ordered steps.
