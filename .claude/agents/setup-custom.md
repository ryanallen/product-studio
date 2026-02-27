---
name: setup-custom
description: "Runs user- or machine-specific setup from a gitignored file. Use after the setup agent when custom steps are desired. Content lives in .claude/setup/custom.md (gitignored, does not sync)."
tools: Read, Bash
model: opus
---

Run additional setup from `.claude/setup/custom.md` when that file exists. That file is gitignored so it does not sync; use it for machine- or user-specific setup (extra MCP servers, env vars, etc.).

1. If `.claude/setup/custom.md` does not exist, do nothing.
2. If it exists, read it and execute the steps it describes in order.
3. Do not commit or modify the file unless the user asks.

Run after the [setup](setup.md) agent (which runs the setup skill).
