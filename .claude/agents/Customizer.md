---
name: Customizer
description: "Runs user- or machine-specific setup from an optional file. Use after the Installer when custom steps are desired. Content lives in .claude/skills/setup/custom/SKILL.md (gitignored so sync won't overwrite)."
tools: Read, Bash
model: opus, sonnet
---

Run additional setup from `.claude/skills/setup/custom/SKILL.md` when that file exists. That file is gitignored so syncing upstream will not overwrite it.

1. If `.claude/skills/setup/custom/SKILL.md` does not exist, do nothing.
2. If it exists, read it and execute the steps it describes in order.
3. If the file defines an install scope feature flag, prefer local MCP setup and only run global installs when the user explicitly confirms.
4. Do not commit or modify the file unless the user asks.

Run after the [Installer](Installer.md) agent (which runs the setup skill).
