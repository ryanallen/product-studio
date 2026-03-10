---
name: verify-docs
description: Check doc scope and skill triggers vs coordinator; write report via document-verification. Part of Clean up studio.
disable-model-invocation: true
---

# Verify Docs

Collect the doc set (from paths.md and system docs or user choice), compare each coordinator-referenced skill’s triggers to the coordinator table, then run [document-verification](../document-verification/SKILL.md) to write `.tmp/verification-report.md`.

## Inputs

- **Scope** – If `work/paths.md` exists, collect all doc paths from the Tree in its Editable section (README and any `assets/docs/` files per project) plus system docs: `.claude/**/*.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`, root markdown. If user chose specific paths, use those.
- **Coordinator** – [.claude/agents/coordinator.md](../../agents/coordinator.md) (trigger table). Flow steps live in [references/coordinator-flows.md](../../agents/references/coordinator-flows.md).

## Output

List of files in scope and any trigger mismatches (skill vs coordinator). Pass to document-verification in the same run; it writes `.tmp/verification-report.md`.

## Process

1. **Scope** – Build the file list from the Tree in paths.md Editable section (if present) and system docs, or from user-selected paths.
2. **Trigger phrases vs coordinator** – For each skill referenced in the coordinator, read the skill frontmatter `triggers`. Compare to the coordinator Trigger phrases column. Record: in skill but not coordinator, or in coordinator but not skill.
3. **Report** – Run [document-verification](../document-verification/SKILL.md) with the files list and trigger mismatches (same run).

## Reference

[document-verification](../document-verification/SKILL.md) – Writes the report. [Coordinator](../../agents/coordinator.md) and [references/coordinator-flows.md](../../agents/references/coordinator-flows.md) – Clean up studio workflow.
