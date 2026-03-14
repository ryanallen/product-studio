# Coordinator Flows

Fixed sequences. Each step is "run /command" or "delegate to agent".

**Real commands:** `/checklist` = `npm run checklist -- "<request or summary>"`; `/clean` = `npm run clean` (empties `.tmp/`).

## Contents

- [Analyst](#analyst)
- [Clean](#clean)
- [Clean up studio](#clean-up-studio)
- [Design / Figma](#design--figma)
- [Dev / TypeScript](#dev--typescript)
- [Discover](#discover)
- [Electron](#electron)
- [Electrobun](#electrobun)
- [Install](#install)
- [Learn](#learn)
- [Propose solutions](#propose-solutions)
- [Refine / document](#refine--document)
- [Research](#research)
- [Research Figma](#research-figma)
- [Save](#save)
- [Sync upstream](#sync-upstream)
- [Uninstall](#uninstall)
- [Update Figma token](#update-figma-token)
- [Update gitignore](#update-gitignore)
- [Reference](#reference)

---

## Analyst

1. verifier → verify-task.
2. analyst → analyst-diagnostics. Update checklist.

---

## Clean

1. verifier → verify-task.
2. Run `/clean` (or delegate cleaner → clean skill).

---

## Clean up studio

1. verifier → verify-task.
2. Ask user: clean everything or pick paths to verify.
3. verifier → verify-task.
4. verifier → verify-docs then document-verification (report to `.tmp/verification-report.md`).
5. verifier → verify-task.
6. Optionally cleaner → clean (delete `.tmp/` contents).

---

## Design / Figma

1. verifier → verify-task.
2. designer → designer-figma. Update checklist.

---

## Dev / TypeScript

1. verifier → verify-task.
2. developer → developer-typescript (and developer-check-types when the user wants type checking run). Developer may use developer-electrobun for Electrobun apps, developer-virtualization when it needs VM context (e.g. document flow). Update checklist after each skill.

---

## Discover

1. verifier → verify-task.
2. researcher → research.
3. verifier → verify-task.
4. documenter → document.
5. verifier → verify-task.
6. analyst → analyst-diagnostics.
7. verifier → verify-task.
8. documenter → document (add problems).
9. verifier → verify-task.
10. researcher → research (audit).
11. verifier → verify-task.
12. documenter → document (current state).
13. verifier → verify-task.
14. analyst → analyst-diagnostics (propose solutions).
15. verifier → verify-task.
16. documenter → document (final pass).
17. verifier → verify-task.
18. documenter → document-ticket (comment on ticket).

---

## Electron

1. verifier → verify-task.
2. developer → developer-electron. Update checklist.

---

## Electrobun

1. verifier → verify-task.
2. developer → developer-electrobun. Update checklist.

---

## Install

1. verifier → verify-task.
2. installer → full install (config, choices, MCP, handoff, customizer if present).

---

## Learn

1. verifier → verify-task.
2. researcher → research.
3. verifier → verify-task.
4. documenter → document (structure findings).

---

## Propose solutions

1. verifier → verify-task.
2. analyst → analyst-diagnostics.
3. verifier → verify-task.
4. documenter → document (add problems to README).

---

## Refine / document

1. verifier → verify-task.
2. **When the user shared links or context that needs learning:** researcher → research (learn those links/context). Update checklist. Otherwise skip to step 3.
3. verifier → verify-task.
4. documenter → document. Follows [document-agents](.claude/skills/document-agents/SKILL.md); uses [document](.claude/skills/document/SKILL.md), [document-github](.claude/skills/document-github/SKILL.md) for README, [document-voice](.claude/skills/document-voice/SKILL.md). Update checklist after each skill. End-of-job: research files in scope, add **Files in scope** to checklist, review each file, check off with notes.

---

## Research

1. verifier → verify-task.
2. researcher → research. Update checklist.

---

## Research Figma

1. verifier → verify-task.
2. researcher → research-figma. Update checklist.

---

## Save

1. verifier → verify-paths (compare work/paths.md Editable section Tree to disk; flag both directions).
2. If disk has paths not in tree: documenter → document-paths (add to tree only).
3. updater → save (stage and commit). No push.

---

## Sync upstream

1. verifier → verify-task.
2. updater → sync-upstream. Update checklist.

---

## Uninstall

1. verifier → verify-task.
2. uninstaller → uninstall. Update checklist.

---

## Update Figma token

1. verifier → verify-task.
2. updater → update-figma. Update checklist.

---

## Update gitignore

1. verifier → verify-task.
2. updater → update-gitignore (explain in plain language what's ignored, or update .gitignore / .git/info/exclude). Update checklist.

---

## Reference

[Coordinator](.claude/agents/coordinator.md) – Step 1 match request to flow above, Step 2 execute that flow's steps in order.
