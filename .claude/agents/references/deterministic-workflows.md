# Deterministic workflows

**Canonical reference.** Skills that use these scripts (verify-task, document, document-agents) link here; do not duplicate in skills.

TypeScript scripts are the source of truth: same input → same output. Workflow and structure fixed; content flexible. Scripts in repo, logic reviewable.

## Principles

1. **Same in, same out:** Flow, step list, doc outline, subagent choice come from scripts, not the model.
2. **Run via npm:** `npm run checklist -- "<request>"` or `npm run doc:structure -- project-overview`. Pass input on the command line.
3. **Scripts in repo:** Change logic in code; no prompt-only behavior.
4. **Fixed choices:** Flow/steps (checklist), doc sections (doc-structure), subagent (pick-subagent). Workflow stable regardless of model output.
5. **Content flexible:** Structure fixed; text and content from the model.
6. **Iterate scripts:** When outcomes drift, update script and commit.

## Coordinator execution (deterministic)

- **Flow and steps from script only.** Same request string → same flow (TRIGGERS) → same step list (FLOWS). No step is added or removed by the model.
- **Locate the step list.** After running the checklist, open `.tmp/task-checklist.md`. The section just appended is the last `## YYYY-MM-DD HH:MM — {summary}` block. The step list is the ordered sequence of bullet lines (`- step-name`) between that heading and the next `##` (or end of file).
- **Execute in order.** Step 1 = first bullet, step 2 = second bullet, … step N = Nth bullet. For each step name, map to the action in [coordinator-flows](.claude/agents/references/coordinator-flows.md). Run step i; complete it (and strikethrough + note in the checklist); then run step i+1. Do not skip, reorder, or merge steps.

## Scripts

| Script | npm command | Fixes |
|--------|-------------|-------|
| Checklist | `npm run checklist -- "<request or summary>"` | Flow and step list |
| Doc structure | `npm run doc:structure -- <document-type>` | Section outline (README/supplementary) |
| Pick subagent | `npm run doc:pick-subagent -- "<task message>"` | Doc subagent (explore, plan, general-purpose, main) |

Same request or doc type → same flow, outline, subagent. Model fills content.

## Where the logic lives

- [checklist script](.claude/skills/verify-task/scripts/checklist.ts): **Single source of truth** for phrase to flow. FLOWS and TRIGGERS; flow and steps per request. Coordinator flow lookup table mirrors TRIGGERS; update script first, then the table.
- [doc-structure script](.claude/skills/document/scripts/doc-structure.ts): Section outlines per document type.
- [pick-subagent script](.claude/skills/document-agents/scripts/pick-subagent.ts): Subagent and designer-playbook flag per message.

## Reference

[Coordinator](.claude/agents/coordinator.md) [verify-task](.claude/skills/verify-task/SKILL.md) [document](.claude/skills/document/SKILL.md) [document-agents](.claude/skills/document-agents/SKILL.md)
