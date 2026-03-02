---
name: setup-custom
description: Optional local overrides for Studio setup. Lives in .claude/skills/setup/custom/SKILL.md and is gitignored so it never syncs upstream.
---

# Setup Customization

This file lets you:
- Choose **local vs global** MCP install behavior for MCP installs in setup.
- Customize setup behavior specific to this machine or user.

## Install scope

```text
install_scope: local
```

- `local` = Installer/Customizer keep MCP config changes scoped to this repo’s project entry in `~/.claude.json` and avoid global `claude mcp add`.
- `global` = Installer/Customizer are allowed to touch global MCP config (e.g. via `claude mcp add`) using the commands below.

When `install_scope: global` is set and the flow confirms global install, use:

```bash
# Figma Console (design creation / updates)
claude mcp add figma-console -- npx -y figma-console-mcp@latest

# Playwright (browser automation)
claude mcp add playwright -- npx -y @executeautomation/playwright-mcp-server

# Atlassian Jira/Confluence (ticket management)
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```

After adding any new MCP server globally, relaunch the terminal before proceeding.

