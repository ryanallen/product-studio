---
name: document-verification
description: Write verification report to .tmp/ from verifier output; compare to README, project references/ (per paths.md), and paths.md.
disable-model-invocation: true
---

# Document Verification

Turn verifier output into one report under `.tmp/` for the user to check.

## Inputs

- **From verifier** – Files checked and per-file issues (heading hierarchy, nav, emojis). Passed when verifier runs verify-docs then this skill.
- **Repo structure** – README Repo Structure section and `work/paths.md` if present. Use the Tree in the Editable section of paths.md for project paths. Per paths.md, project deliverables are README plus any `references/` files (kebab-case names).

## Output

One file (e.g. `.tmp/verification-report.md`). Do not commit. User can run [clean](.claude/skills/clean/SKILL.md) after.

## Process

1. **Input** – Take the list of files processed and per-file issues from verifier.
2. **Compare** – Read README Repo Structure and work/paths.md (Editable section Tree for project paths). Report: files processed but not in README/paths; paths in README/paths (including project `references/` per paths.md) not processed.
3. **Write** – Create `.tmp/` if needed. Write the report with: date/time; full list of files processed; comparison (matches, extras, missing); per-file issues (hierarchy, nav, emoji).

## Reference

[verify-docs](.claude/skills/verify-docs/SKILL.md) – Produces input. [clean](.claude/skills/clean/SKILL.md) – Clears `.tmp/` after verification.
