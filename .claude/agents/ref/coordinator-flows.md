# Coordinator Flows

Fixed sequences. Each step is "run /command" or "delegate to agent". Coordinator Step 1 is verify task (run `/checklist`) before picking a flow.

**Real commands (run in shell):**
- `/checklist` = `npm run checklist -- "<request or summary>"`
- `/clean` = `npm run clean` (empties `.tmp/`)

---

## Clean

1. Run `/clean` (or delegate cleaner → clean skill).

---

## Clean up studio

1. Ask user: clean everything or pick paths to verify.
2. verifier → verify-docs then document-verification (report to `.tmp/verification-report.md`).
3. Optionally cleaner → clean (delete `.tmp/` contents).

---

## Design / Figma

1. designer → designer-figma. Update checklist.

---

## Dev / TypeScript

1. developer → developer-typescript (and developer-check-types when the user wants type checking run). Update checklist after each skill.

---

## Electron

1. developer → developer-electron. Update checklist.

---

## Discover

1. researcher → research.
2. documenter → document.
3. strategist → strategize.
4. documenter → document (add problems).
5. researcher → research (audit).
6. documenter → document (current state).
7. strategist → strategize (propose solutions).
8. documenter → document (final pass).
9. documenter → document-ticket (comment on ticket).

---

## Install

1. installer → full install (config, choices, MCP, handoff, customizer if present).

---

## Learn

1. researcher → research.
2. documenter → document (structure findings).

---

## Propose solutions

1. strategist → strategize.
2. documenter → document (add problems to README).

---

## Refine / document

1. documenter → document, document-github (if README), document-voice. Update checklist after each skill.

---

## Research

1. researcher → research. Update checklist.

---

## Research Figma

1. researcher → research-figma. Update checklist.

---

## Save

1. verifier → verify-paths (compare paths.md to disk).
2. If mismatch: documenter → document-paths (sync tree).
3. updater → save (stage and commit). No push.

---

## Strategize

1. strategist → strategize. Update checklist.

---

## Sync upstream

1. updater → sync-upstream. Update checklist.

---

## Uninstall

1. uninstaller → uninstall. Update checklist.

---

## Update Figma token

1. updater → update-figma. Update checklist.

---

## Reference

[Coordinator](../coordinator.md) – Step 1 verify task (run `/checklist`), Step 2 match request to flow above, Step 3 execute that flow's steps in order.
