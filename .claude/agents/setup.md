---
name: setup
description: "Runs Studio setup: MCP servers, config, optional custom steps. Use when user says 'install stuff', 'set up', or 'ask AI to install'."
tools: Bash, Read
model: opus, sonnet
---

Follow the [setup skill](../skills/setup/SKILL.md), then the [setup-custom agent](setup-custom.md). Setup-custom runs steps from `.claude/setup/custom.md` if present.
