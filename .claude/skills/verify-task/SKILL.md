---
name: verify-task
description: When a flow includes verify-task, run the checklist script to append a section to .tmp/verify-task-checklist.md, then execute the steps from that section; after each step, strikethrough and add a note. Use when the flow's step list includes verify-task.
disable-model-invocation: true
---

# Verify Task

Run the checklist script to get the flow and steps; when the flow includes a `verify-task` step, the script appends a section to `.tmp/verify-task-checklist.md`. Execute the steps in the order they appear in that section; do not skip or reorder. After each step, strikethrough that bullet and add a note in the current task section. Step list comes only from the [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts).

## Inputs

- **Task summary:** The user request or a short summary. Passed to the checklist script so it can pick the flow and steps.
- **Step list:** Defined only by the script. Section format: `## YYYY-MM-DD HH:MM — {summary}` then one bullet per step (`- step-name`), then `## Notes`. The script picks the flow (TRIGGERS) and returns that flow's step list (FLOWS). Execute bullets in order: step 1 = first bullet, step 2 = second, step N = Nth.

## Output

- **First run:** A new section appended to `.tmp/verify-task-checklist.md` (create file and `.tmp/` if missing). Section = heading, then one bullet per step, then `## Notes`. Do not delete or overwrite earlier sections.
- **During the task:** After completing each step, strikethrough that bullet in the current task section and add a brief note. Only the current section is updated. Do not start the next step until the current step is done and the checklist is updated.

## Process

1. **Run the checklist:** `npm run checklist -- "<user request or summary>"` (or `/checklist`). The script appends a new section with the steps for the matched flow. Same message, same flow and steps (deterministic).
2. **Locate the step list:** Open `.tmp/verify-task-checklist.md`. The current task section is the last `## YYYY-MM-DD HH:MM — …` block. The step list is the ordered bullet lines between that heading and the next `##`.
3. **Execute in order:** For each bullet (step 1, then step 2, … step N), run the action for that step name. Step names correspond to skills in `.claude/skills/` or agents in `.claude/agents/` (e.g. research → research skill, document → document skill, save → save skill). When the step is complete, strikethrough the bullet and add a note. Then run the next step. Do not skip or reorder.
4. **Scope:** Only edit the current task section. Do not change earlier sections or remove content. Documenter may add a **Files in scope** block to the current section.

**When to run:** When the flow's step list includes `verify-task`. Get the step list from the checklist script; flows that do not include verify-task (e.g. Save) do not append a section and do not use this skill.

## Reference

**Command:** `npm run checklist -- "<summary>"` or `/checklist`. [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts)
