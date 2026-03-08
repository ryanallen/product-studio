---
name: verify-task
description: Create or update a .tmp task checklist (what needs done; mark done with strikethrough, notes).
triggers: []
disable-model-invocation: true
---

# Verify Task

Create or update a `.tmp` task checklist: list of what needs to be done. Completed items use **strikethrough** (e.g. `~~Item text~~`) followed by a brief note about what was done (e.g. ` — Skipped; no paths.md` or ` — Committed 3 files`). Not-done items are plain text with no note.

## Inputs

- **Task context** – User request and, when known, flow name (e.g. Learn, Save) or list of steps.
- **Optional steps** – If Main or coordinator provided explicit steps for the flow, use those; otherwise infer a minimal list from the request.

## Output

- A file under `.tmp/` (e.g. `.tmp/task-checklist.md`).
- Content: checklist with heading, date/time, list items (plain text = not done; `~~text~~ — what was done` = done with note).
- Instruction that agents performing the steps should update this file: apply strikethrough and add a note after each completed item describing what was done.

## Process

1. Ensure `.tmp/` exists (create if missing).
2. From context, build the list of items to do (from provided steps, or from flow name, or from the user request as a single/multi-step list).
3. Write the checklist to `.tmp/task-checklist.md`. Format:
   - Title (e.g. "Task checklist") and optional one-line task summary.
   - Date/time created or updated.
   - List: `- Item text` (not done) or `- ~~Item text~~ — note about what was done` (done). When agents complete an item, they add strikethrough and the note on the same line.
   - Optional: Notes section at the bottom for general notes.
4. Confirm to Main: checklist created; agents should update it (strikethrough + note after each completed item) as they complete steps.

## Reference

[Coordinator](../../agents/coordinator.md) – flows that invoke this skill at task start.
