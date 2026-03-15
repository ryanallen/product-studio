---
name: verify-docs
description: Check doc scope and skill description phrases vs coordinator; write report via document-verification. Part of Clean up studio. Use when user says clean up studio, verify docs, /clean-up-studio.
disable-model-invocation: true
---

# Verify Docs

Collect the doc set (from paths.md and system docs or user choice), compare each coordinator-referenced skill’s description (the "Use when user says …" phrases) to the coordinator flow lookup and to checklist.ts TRIGGERS, then run [document-verification](.claude/skills/document-verification/SKILL.md) to write `.tmp/verification-report.md`.

## Inputs

- **Scope** – If `work/paths.md` exists, collect all doc paths from the Tree in its Editable section (README and any `assets/docs/` files per project) plus system docs: `.claude/**/*.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, root markdown. If user chose specific paths, use those.
- **Coordinator** – [coordinator](.claude/agents/coordinator.md) (flow lookup table mirrors checklist.ts). Flow steps live in [coordinator-flows](.claude/agents/references/coordinator-flows.md).

## Output

List of files in scope and any phrase mismatches (skill description vs coordinator/checklist). Pass to document-verification in the same run; it writes `.tmp/verification-report.md`.

## Process

1. **Scope** – Build the file list from the Tree in paths.md Editable section (if present) and system docs, or from user-selected paths.
2. **Description phrases vs coordinator** – For each skill referenced in the coordinator flow steps, read the skill frontmatter **description** and extract the "Use when user says …" (or equivalent) phrases. Compare to the coordinator flow lookup table and to checklist.ts TRIGGERS. Record: in skill but not coordinator/script, or in coordinator/script but not skill.
3. **Report** – Run [document-verification](.claude/skills/document-verification/SKILL.md) with the files list and phrase mismatches (same run).

## Reference

[document-verification](.claude/skills/document-verification/SKILL.md) – Writes the report. [coordinator](.claude/agents/coordinator.md) and [coordinator-flows](.claude/agents/references/coordinator-flows.md) (Clean up studio workflow). [checklist script](.claude/skills/verify-task/scripts/checklist.ts) – Single source of truth for phrase → flow; compare skill description phrases to TRIGGERS.
