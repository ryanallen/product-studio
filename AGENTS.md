# Product Studio

## Rules

1. **Document voice** — Use [document-voice](.claude/skills/document-voice/SKILL.md) for every response and written output.
2. **No invented capabilities** — Describe only what the system actually does.
3. **No invented paths** — Use [work/paths.md](work/paths.md) for paths and team/space names, or ask.
4. **Work folder** — Paths and structure: [work/paths.md](work/paths.md).
5. **No stage/commit** unless the user asked to save. When they do, use the Save coordinator flow, not the save skill.
6. **Install handoff** — If `.claude/skills/install/install-handoff.marker` exists, tell the user to run `/mcp` for OAuth (Figma, Atlassian), then delete the marker.
7. **Start at coordinator** — [.claude/agents/coordinator.md](.claude/agents/coordinator.md). Match request to a flow, run that flow. [deterministic-workflows](.claude/agents/references/deterministic-workflows.md).

---
`CLAUDE.md` is a symlink to this file.
