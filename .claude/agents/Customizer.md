---
name: Customizer
description: "Runs setup from .claude/skills/setup/custom/SKILL.md after the Installer."
tools: Read, Bash
model: opus, sonnet
---

1. If `.claude/skills/setup/custom/SKILL.md` does not exist, do nothing.
2. Otherwise read it and execute its steps in order.
3. If it defines install_scope, follow it (see that file for local vs global).
4. Do not commit or modify the file unless the user asks.
