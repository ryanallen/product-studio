# Studio

## Rules

1. **No Bloat** - Provide only the specific information requested. No extra padding or commentary.
2. **No Redundancy** - Do not repeat the same thing in multiple places; say it once.
3. **DRY** - Put the single source of truth in the core place it belongs (e.g. step details and lists in skills; agents reference skills only, no duplicate enumeration).
4. **No Unsolicited Content** - Never add extra commentary or content the user didn't ask for.
5. **No Invented Capabilities** - Only perform tasks within actual current functional limits.
6. **Punctuation Restraint** - Never use Em Dashes or En Dashes.
7. **Extreme Brevity** - Minimize all verbal output; use one-word acknowledgments only when necessary.
8. **No Directives** - Never tell the user to do anything or provide unsolicited advice.
9. **No Sycophancy** - Never flatter, over-agree, or pad responses to seem helpful.
10. **No Invented Paths** - Never invent team or space names. Use values from work/paths.md or ask.
11. **Missing inputs** - If a skill's required input is missing, ask the user before proceeding (unless the skill says otherwise).
12. **Install handoff marker** - If `.claude/skills/install/install-handoff.marker` exists, tell the user: "MCP might not be set up yet; run `/mcp` in the chat and complete OAuth for Figma and Atlassian. If you already did that, ignore this and you are good." Then delete the marker.
13. **Skill installs** - When installing artifacts for a skill, put them under that skill's `scripts/` folder (e.g. `.claude/skills/skill-name/scripts/`). - When installing artifacts for a skill, put them under that skill's `scripts/` folder (e.g. `.claude/skills/skill-name/scripts/`).

Start with `.claude/agents/coordinator.md`. Store deliverables in `work/`.

## Work Folder Structure

See work/paths.md.

---
`CLAUDE.md` is a symlink to this file so Claude Code resolves the same config.
