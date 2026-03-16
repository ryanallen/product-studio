---
name: verify-task
description: Run before any Read, Write, Grep, or Shell. Appends a task section to .tmp/task-checklist.md with the flow steps; after each skill, strikethrough and add a note. Use when starting a task or when coordinator flows say "Verify task".
disable-model-invocation: true
---

# Verify Task

**AGENTS gate:** Run the checklist before any Read, Write, Grep, or Shell. The checklist script is the single source of truth for flow and steps: same request → same flow → same step list ([checklist script](.claude/skills/verify-task/scripts/checklist.ts)). Execute the steps in the order they appear in the appended section; do not skip or reorder. After each step, strikethrough that bullet and add a note in the current task section.

## Inputs

- **Task summary:** The user request or a short summary. Passed to the checklist script so it can pick the flow and steps.
- **Step list:** Defined only by the script. Section format: `## YYYY-MM-DD HH:MM — {summary}` then one bullet per step (`- step-name`), then `## Notes`. The script picks the flow (TRIGGERS) and returns that flow's step list (FLOWS). No steps are added or removed by the model. Execute bullets in order: step 1 = first bullet, step 2 = second, step N = Nth.

## Output

- **First run:** A new section appended to `.tmp/task-checklist.md` (create file and `.tmp/` if missing). Section = heading, then one bullet per step, then `## Notes`. Do not delete or overwrite earlier sections.
- **During the task:** After completing each step, strikethrough that bullet in the current task section and add a brief note. Only the current section is updated. Do not start the next step until the current step is done and the checklist is updated.

## Process

1. **Run the checklist:** `npm run checklist -- "<user request or summary>"` (or `/checklist`). The script appends a new section with the steps for the matched flow. Same message, same flow and steps (deterministic).
2. **Locate the step list:** Open `.tmp/task-checklist.md`. The current task section is the last `## YYYY-MM-DD HH:MM — …` block. The step list is the ordered bullet lines between that heading and the next `##`.
3. **Execute in order:** For each bullet (step 1, then step 2, … step N), run the action for that step name (see [coordinator-flows](.claude/agents/references/coordinator-flows.md)). When the step is complete, strikethrough the bullet and add a note. Then run the next step. Do not skip or reorder.
4. **Scope:** Only edit the current task section. Do not change earlier sections or remove content. Documenter may add a **Files in scope** block to the current section.

**When to run:** Before any Read, Write, Grep, or Shell. Coordinator runs the checklist first, then executes the appended steps in order ([deterministic-workflows](.claude/agents/references/deterministic-workflows.md)).

## Reference

**Command:** `npm run checklist -- "<summary>"` or `/checklist`. Step list comes from the script only; coordinator executes the appended bullets in order. [checklist script](.claude/skills/verify-task/scripts/checklist.ts) [coordinator-flows](.claude/agents/references/coordinator-flows.md) [deterministic-workflows](.claude/agents/references/deterministic-workflows.md)
