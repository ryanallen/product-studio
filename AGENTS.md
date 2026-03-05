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
10. **No Invented Paths** - Never invent team or space names. Use values from the work-config skill (`.claude/skills/work-config/SKILL.md`) or ask.
11. **Install handoff marker** - If `.claude/skills/install/install-handoff.marker` exists, tell the user: "MCP might not be set up yet; run `/mcp` in the chat and complete OAuth for Figma and Atlassian. If you already did that, ignore this and you are good." Then delete the marker.
12. **Skill installs** - When installing artifacts for a skill, put them under that skill's `scripts/` folder (e.g. `.claude/skills/skill-name/scripts/`).

Start with `.claude/agents/coordinator.md`. Store deliverables in `work/`.

## Work Folder Structure

All deliverables live in `work/{Team}/{Space}/{Project}/README.md`. Single file per project containing all sections: problems, research findings, sources, link tree, current state, and solution proposals. Do not create notes, drafts, or content in any other files; everything for a project goes in that one README. Never create a new folder or new README for newly discovered problems or topics; add them to the existing project README (e.g. Problems, Audits, new subsections).

---
`CLAUDE.md` is a symlink to this file so Claude Code resolves the same config.
