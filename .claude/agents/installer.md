---
name: installer
description: Runs Product Studio install: paths, choices, MCP (Figma, Atlassian, GitHub, GoDaddy), Figma bridge, handoff, then customizer. Use when user says setup or install.
tools: Read, Write, Bash, Grep
model: opus, sonnet
---

Scope: install skills below, in sequence. Express → install-express then step 3. figma-console → install-mcp-setup else skip.

When invoked:
1. [install-config](.claude/skills/install-config/SKILL.md) (work/paths.md, deliverables URL).
2. [install-choices](.claude/skills/install-choices/SKILL.md). If **express**, run [install-express](.claude/skills/install-express/SKILL.md), then step 3.
3. [install-mcp](.claude/skills/install-mcp/SKILL.md).
4. If figma-console chosen: [install-mcp-setup](.claude/skills/install-mcp-setup/SKILL.md).
5. [install-handoff](.claude/skills/install-handoff/SKILL.md).
6. If [install-custom](.claude/skills/install-custom/SKILL.md) exists, run customizer; else nothing.
