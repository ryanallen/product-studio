---
name: setup-custom
description: Optional local overrides for Studio setup. Lives in .claude/skills/setup/custom/SKILL.md and is gitignored so it never syncs upstream.
---

# Setup Customization

This file lets you:
- Choose **local vs global** MCP install behavior.
- Add any extra machine- or user-specific steps.

## Install scope feature flag

Set one of:

- `install_scope: local` (default)  
- `install_scope: global`

Behavior:

- If `install_scope` is missing or set to `local`, the Installer + Customizer should:
  - Prefer **project-scoped** MCP config (editing `~/.claude.json` under this repo’s project path).
  - Avoid running `claude mcp add` unless the user explicitly asks.
- If `install_scope: global`, the Customizer should:
  - Ask: "Use global Claude MCP install (touches all projects) instead of local-only for this repo?"  
  - Only run the global `claude mcp add ...` commands if the user answers yes.

## Extra steps

You can also list shell commands or notes here for additional local setup (extra MCP servers, env vars, tools). The Customizer reads this file and executes the steps you describe after the main setup skill finishes.

