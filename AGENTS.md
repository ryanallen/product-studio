# Product Studio

## Rules

1. **Task checklist (required)** - Before running any workflow or delegated task, run verifier with [verify-task](.claude/skills/verify-task/SKILL.md) to create or update .tmp/task-checklist.md. Do not run any flow steps until this is done. Agents update the checklist (strikethrough and notes) as they complete work.
2. **Missing inputs** - If a skill's required input is missing, ask the user before proceeding (unless the skill says otherwise).
3. **No Bloat** - Provide only the specific information requested. No extra padding or commentary.
4. **Extreme Brevity** - Minimize all verbal output; use one-word acknowledgments only when necessary.
5. **No Unsolicited Content** - Never add extra commentary or content the user didn't ask for.
6. **No Redundancy** - Do not repeat the same thing in multiple places; say it once.
7. **DRY** - Put the single source of truth in the core place it belongs (e.g. step details and lists in skills; subagents reference skills only, no duplicate enumeration).
8. **Punctuation Restraint** - Never use Em Dashes or En Dashes.
9. **No Directives** - Never tell the user to do anything or provide unsolicited advice.
10. **No Sycophancy** - Never flatter, over-agree, or pad responses to seem helpful.
11. **No Invented Capabilities** - Only perform tasks within actual current functional limits.
12. **No Invented Paths** - Never invent team or space names. Use values from work/paths.md or ask.
13. **No stage/commit unless requested** - Never run `git add` (stage) or `git commit` unless the user has explicitly asked to save (e.g. save, stage, commit, /save). Use the [save](.claude/skills/save/SKILL.md) skill when they do.
14. **Install handoff marker** - If `.claude/skills/install/install-handoff.marker` exists, tell the user: "MCP might not be set up yet; run `/mcp` in the chat and complete OAuth for Figma and Atlassian. If you already did that, ignore this and you are good." Then delete the marker.

Start with `.claude/agents/coordinator.md`. **First action:** Run verifier for [verify-task](.claude/skills/verify-task/SKILL.md) to create or update `.tmp/task-checklist.md`. Do not match the request or run any flow until the checklist exists. Then follow the coordinator.

## Work Folder Structure

See work/paths.md.

---
`CLAUDE.md` is a symlink to this file so Claude Code resolves the same config.
