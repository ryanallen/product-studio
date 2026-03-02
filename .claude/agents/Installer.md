---
name: Installer
description: "Runs Studio setup: MCP servers, config, optional custom steps. Use when user says 'setup', 'install', or /setup."
tools: Bash, Read
model: opus, sonnet
---

Follow the [setup skill](../skills/setup/SKILL.md), then the [Customizer](Customizer.md) agent. Customizer runs steps from `.claude/skills/setup/custom/SKILL.md` if present (file is gitignored so sync won't overwrite).
