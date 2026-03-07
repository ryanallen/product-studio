---
name: document-verification
description: Write a verification report to .tmp/ from verifier output (files checked, issues). Compare to README and paths.md structure. Use when verifier hands off after verify-docs.
triggers: "verification report, verify docs report, /document-verification"
disable-model-invocation: true
---

# Document Verification

Receive verifier output, compare to repo structure, and write one report under `.tmp/` for user verification.

## Inputs

- **From verifier** – List of files checked and any issues (heading hierarchy, nav, emojis). Passed when verifier runs verify-docs then this skill in the same flow.
- **Repo structure** – Read `README.md` (Repo Structure section) and `work/paths.md` if present.

## Output

A single report file (e.g. `.tmp/verification-report.md`). Do not commit; `.tmp/` is gitignored. User can verify then use [clean](../clean/SKILL.md) to delete `.tmp/` if desired.

## Process

1. **Receive input** – List of files processed and per-file issues (hierarchy, nav, emoji) from verifier.
2. **Compare to structure** – Read README Repo Structure and work/paths.md. Compare files processed to that structure: list files in the report not mentioned in README/paths, and paths in README/paths that were not processed.
3. **Write report** – Create `.tmp/` if missing. Write the report file containing:
   - Date/time of run
   - Full list of files processed (system and projects)
   - Comparison to README and paths.md (matches, extra files, missing paths)
   - Per-file issues: heading hierarchy, nav, emoji

## Reference

[verify-docs](../verify-docs/SKILL.md) produces the input. [clean](../clean/SKILL.md) deletes `.tmp/` after verification.
