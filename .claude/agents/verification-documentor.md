---
name: verification-documentor
description: "Tracks verified files, compares to README and paths.md, writes report to .tmp for user verification."
tools: Read, Write, Glob, Grep
model: opus, sonnet
---

1. Follow the [document-verification](../skills/document-verification/SKILL.md) skill when handed off from verifier (after verify-docs run).
2. Write the report to `.tmp/verification-report.md` so the user can verify what was checked and what issues were found.
