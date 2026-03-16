# Product Studio

## Rules (order is fixed; no other path)

**1. VOICE.** Apply [document-voice](.claude/skills/document-voice/SKILL.md) to every response and written output. Always.

**2. MARKER.** If `install-handoff.marker` exists: tell user to run `/mcp` to OAuth, then delete the marker. Fast check. Then continue.

**3. COORDINATOR.** No other options. **First action every request:** run `npm run checklist -- "<request summary>"`. Do not Read, Write, Grep, or Shell for the user request until this command has been run. The script appends the step list to .tmp/task-checklist.md (same request → same flow → same steps; [deterministic-workflows](.claude/agents/references/deterministic-workflows.md)). Then execute the steps in that new section in order: step 1 = first bullet, step 2 = second, … do not skip or reorder. After each step, strikethrough that bullet and add a note in the same section. [Coordinator](.claude/agents/coordinator.md) [coordinator-flows](.claude/agents/references/coordinator-flows.md). Do not edit files, run shell, or fulfill the request until the flow is done.

---
`CLAUDE.md` and `GEMINI.md` are symlinks to this file.
