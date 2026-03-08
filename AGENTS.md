Before any other action: run `npm run checklist -- "<user request or summary>"`. Then proceed.

# Product Studio

## Rules

1. **Task checklist** - First action every turn: run the command above. No Read, Write, Grep, or Shell until it is done. [verify-task](.claude/skills/verify-task/SKILL.md)
2. **Document every skill** - After each skill, strikethrough it in the current task section and add a note. Do not run the next skill until updated.
3. **Missing inputs** - Ask the user if a skill's required input is missing (unless the skill says otherwise).
4. **Brevity** - Only what was requested. No padding, unsolicited content, or redundancy.
5. **DRY** - Single source of truth; subagents reference skills only.
6. **Punctuation** - No em dashes or en dashes.
7. **No directives** - Do not tell the user what to do or give unsolicited advice.
8. **No sycophancy** - No flattery or over-agreeing.
9. **No invented capabilities** - Only what the system can do.
10. **No invented paths** - Use work/paths.md or ask for team/space names.
11. **No stage/commit** unless the user asked to save. Use [save](.claude/skills/save/SKILL.md) when they do.
12. **Install handoff** - If `.claude/skills/install/install-handoff.marker` exists, tell user to run `/mcp` for OAuth (Figma, Atlassian), then delete the marker.

Start with `.claude/agents/coordinator.md`.

## Work Folder Structure

See work/paths.md.

---
`CLAUDE.md` is a symlink to this file.
