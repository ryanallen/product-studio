---
name: verify-docs
description: Check doc scope and skill description phrases vs the checklist script; write report via document-verification. Part of Clean up studio. Use when user says clean up studio, verify docs, /clean-up-studio.
disable-model-invocation: true
---

# Verify Docs

Collect the doc set (from paths.md and system docs or user choice), compare each flow-referenced skill’s description (the "Use when user says …" phrases) to the [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts) TRIGGERS, then run [document-verification](.claude/skills/document-verification/SKILL.md) to write `.tmp/verification-report.md`.

## Inputs

- **Scope:** If `work/paths.md` exists, collect all doc paths from the Tree in its Editable section (README and any `assets/docs/` files per project) plus system docs: `.claude/**/*.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, root markdown. If user chose specific paths, use those.
- **Flows:** [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts) (TRIGGERS and FLOWS).

## Output

List of files in scope and any phrase mismatches (skill description vs checklist script TRIGGERS). Pass to document-verification in the same run; it writes `.tmp/verification-report.md`.

## Process

1. **Scope:** Build the file list from the Tree in paths.md Editable section (if present) and system docs, or from user-selected paths.
2. **Description phrases vs checklist:** For each skill referenced in the checklist script FLOWS, read the skill frontmatter **description** and extract the "Use when user says …" (or equivalent) phrases. Compare to the [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts) TRIGGERS. Record: in skill but not script, or in script but not skill.
3. **Report:** Run [document-verification](.claude/skills/document-verification/SKILL.md) with the files list and phrase mismatches (same run).

## Reference

[document-verification](.claude/skills/document-verification/SKILL.md): Writes the report. [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts): Single source of truth for phrase to flow; compare skill description phrases to TRIGGERS.
