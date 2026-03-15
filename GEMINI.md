# Product Studio

## Rules (order is fixed; no other path)

**1. VOICE.** Apply [document-voice](.claude/skills/document-voice/SKILL.md) to every response and written output. Always.

**2. MARKER.** If `install-handoff.marker` exists: tell user to run `/mcp` to OAuth, then delete the marker. Fast check. Then continue.

**3. COORDINATOR.** No other options. Run coordinator flow: [coordinator-flows](.claude/agents/references/coordinator-flows.md), match request to flow, run `npm run checklist -- "<request summary>"`, then execute every step of that flow in order (step 1, step 2, step 3, …). Do not skip any step. Do not edit files, run shell, or fulfill the request until the flow is done. [Coordinator](.claude/agents/coordinator.md)

---
`CLAUDE.md` and `GEMINI.md` are symlinks to this file.
