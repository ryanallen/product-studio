---
name: customizer
description: "Runs install from .claude/skills/install/custom/SKILL.md after the installer."
tools: Read, Bash
model: opus, sonnet
---

1. If `.claude/skills/install/custom/SKILL.md` does not exist, do nothing.
2. Otherwise read it and execute its steps in order.
3. Do not commit or modify the file unless the user asks.
