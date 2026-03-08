# Product Studio

## Rules

1. **Task checklist (mandatory; do not ignore)** - First action every turn: run [verify-task](.claude/skills/verify-task/SKILL.md) via verifier. Create or append a section in `.tmp/task-checklist.md` for this task. No exceptions: save, clean, refine, install, any request. You must not run any other skill, flow step, or delegation until the checklist section exists. Deterministic: if you have not run verify-task this turn, run it now before anything else.
2. **Document every skill** - After each skill in the flow, update current task section in `.tmp/task-checklist.md`: strikethrough that skill, add brief note. Do not run next skill until updated. Prevents skipping steps (e.g. document-voice at end of refine).
3. **Missing inputs** - If a skill's required input is missing, ask the user before proceeding (unless the skill says otherwise).
4. **No Bloat** - Provide only the specific information requested. No extra padding or commentary.
5. **Extreme Brevity** - Minimize all verbal output; use one-word acknowledgments only when necessary.
6. **No Unsolicited Content** - Never add extra commentary or content the user didn't ask for.
7. **No Redundancy** - Do not repeat the same thing in multiple places; say it once.
8. **DRY** - Put the single source of truth in the core place it belongs (e.g. step details and lists in skills; subagents reference skills only, no duplicate enumeration).
9. **Punctuation Restraint** - Never use Em Dashes or En Dashes.
10. **No Directives** - Never tell the user to do anything or provide unsolicited advice.
11. **No Sycophancy** - Never flatter, over-agree, or pad responses to seem helpful.
12. **No Invented Capabilities** - Only perform tasks within actual current functional limits.
13. **No Invented Paths** - Never invent team or space names. Use values from work/paths.md or ask.
14. **No stage/commit unless requested** - Never run `git add` (stage) or `git commit` unless the user has explicitly asked to save (e.g. save, stage, commit, /save). Use the [save](.claude/skills/save/SKILL.md) skill when they do.
15. **Install handoff marker** - If `.claude/skills/install/install-handoff.marker` exists, tell the user: "MCP might not be set up yet; run `/mcp` in the chat and complete OAuth for Figma and Atlassian. If you already did that, ignore this and you are good." Then delete the marker.

Start with `.claude/agents/coordinator.md`.

## Work Folder Structure

See work/paths.md.

---
`CLAUDE.md` is a symlink to this file so Claude Code resolves the same config.
