# Product Studio

## Rules (order is fixed; no other path)

**1. VOICE.** Apply [document-voice](.claude/skills/document-voice/SKILL.md) to every response and written output. Always.

**2. MARKER.** If `install-handoff.marker` exists: tell user to run `/mcp` to OAuth, then delete the marker. Fast check. Then continue.

**3. CHECKLIST FLOW.** **Exception:** If the user invoked [ask](.claude/skills/ask/SKILL.md) (`/ask`, "ask mode", or clear read-only Q&A only), follow that skill and do **not** run the checklist or edit files. Otherwise: **first action every request:** run `npm run checklist -- "<request summary>"`. The [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts) is the single source of truth for flow and steps. It appends the step list to .tmp/verify-task-checklist.md when the flow includes verify-task. Then execute the steps in that section in order: step 1 = first bullet, step 2 = second, … do not skip or reorder. After each step, strikethrough that bullet and add a note in the same section. [verify-task](.claude/skills/verify-task/SKILL.md). Do not edit files, run shell, or fulfill the request until the flow is done.

---
`CLAUDE.md` and `GEMINI.md` are symlinks to this file.
