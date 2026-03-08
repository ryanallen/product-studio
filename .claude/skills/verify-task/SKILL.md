---
name: verify-task
description: Append a new task section to the running .tmp task checklist (one heading per task with date timestamp); list each skill in the flow so the user can verify every skill was run.
triggers: []
disable-model-invocation: true
---

# Verify Task

Append a **new section** to `.tmp/task-checklist.md` for each new task the user starts. Do not delete or overwrite existing content; the file is a running list. Each section: a heading with date and timestamp and a one-line task summary, then one line per skill in the flow. Completed items: **strikethrough** plus a brief note (e.g. ` — Skipped; no paths.md`). Not-done items are plain text. When an agent runs a skill, it updates only the **current task's section** (the most recent heading): strikethrough that line and add the note.

## Inputs

- **Task context** – User request and, when known, flow name (e.g. Learn, Save) or list of steps.
- **Steps/skills** – From Main or coordinator: the ordered list of skills (or subagent→skill steps) for this flow. Each step in the flow must become one checklist item so the user can confirm it ran. Example: Save → `verify-paths`, `document-paths` (if mismatch), `save`. Learn → `research`, `document`.

## Output

- File: `.tmp/task-checklist.md` (create if missing).
- **Append only:** New task = new section at the bottom. Heading format: `## YYYY-MM-DD HH:MM — {task summary}`. Then the skill list for this task. Do not remove or overwrite earlier sections.
- Whoever runs a skill updates the **current task section** (last section in the file): strikethrough that skill line and add the note.

## Process

1. Ensure `.tmp/` exists (create if missing).
2. **Build the skill list for this task** from the flow (same as before: one line per skill; use coordinator skill names).
3. **Read existing file** if `.tmp/task-checklist.md` exists. Do not delete or overwrite its content.
4. **Append a new section** at the bottom:
   - If the file was empty or new: start with a top-level title (e.g. `# Task checklist (running list)`), then add the new section.
   - New section format:
     - Heading: `## YYYY-MM-DD HH:MM — {one-line task summary}` (use current date and time; summary = flow name or brief request).
     - Blank line, then the skill list: one line per skill. `- skill-name` (not run) or `- ~~skill-name~~ — note` (run).
     - Optional: `## Notes` and a line or two for this task.
   - If the file already had content, append only this new section (heading + skill list + optional Notes). Do not remove any previous sections.
5. Write the result: existing content + new section. So the file grows; each new task adds a new dated heading and list at the bottom.
6. Confirm to Main: checklist updated; agents update only the **current task section** (the last `## ...` block) when they run a skill.

## Reference

[Coordinator](../../agents/coordinator.md) – Workflows list skills per step; use those names so the checklist matches what the user asked for.
