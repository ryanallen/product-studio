---
name: verify-task
description: Append a new task section to the running task checklist (.tmp/task-checklist.md); one heading per task with date timestamp; list each skill in the flow so the user can verify every skill was run.
disable-model-invocation: true
---

# Verify Task

Append a **new section** to `.tmp/task-checklist.md` per task. Running list: do not delete or overwrite. Section = heading (date + time + summary), then one line per skill. **First two steps are always** verify-task (Step 1) and document-voice (Step 2, Rule 2 in AGENTS); then flow-specific steps. Completed = strikethrough + note. Agents update only the **current task section** (last heading).

## Inputs

- **Task context** – User request and, when known, flow name (e.g. Learn, Save) or list of steps.
- **Steps/skills** – From Main or coordinator: first two steps are always verify-task, document-voice (Rule 2); then the flow's steps. Each step = one checklist item. Example: Save → `verify-task`, `document-voice`, `verify-paths`, `document-paths` (if mismatch), `save`.

## Output

`.tmp/task-checklist.md` (create if missing). Append only. Heading: `## YYYY-MM-DD HH:MM — {summary}`. One line per skill. Agents strikethrough + note in current section when they run a skill.

## Process

1. Ensure `.tmp/` exists.
2. **Skill list** from flow: Always start with `verify-task`, `document-voice` (Rule 2; emitted by [scripts/checklist.ts](scripts/checklist.ts)). Then append the flow's steps from coordinator-flows (one line per skill). Do not collapse to one line.
3. Read existing `.tmp/task-checklist.md` if present. Do not overwrite.
4. Append new section at bottom: if file empty, add title `# Task checklist (running list)` then section. Section = heading `## YYYY-MM-DD HH:MM — {summary}`, blank line, skill lines `- skill-name` or `- ~~skill-name~~ — note`. Optional `## Notes`. (The checklist file keeps this heading so the list is recognizable.)
5. Write existing content + new section.
6. Confirm to Main: checklist updated; agents update current section only.

**During the task:** After each skill you run, strikethrough that skill in the current task section and add a brief note. Do not run the next skill in the flow until the checklist is updated.

## Reference

[Coordinator](../../agents/coordinator.md) – Step 1 runs this. **Real command:** `/checklist` = `npm run checklist -- "<summary>"`. [scripts/checklist.ts](scripts/checklist.ts) implements this skill.
