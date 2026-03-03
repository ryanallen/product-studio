---
name: setup-custom
description: Local overrides for Studio setup. Lives in .claude/skills/setup/custom/SKILL.md.
---

# Setup Customization

This file lets you:
- Choose **local vs global** MCP install behavior for MCP installs in setup.
- Customize setup behavior.

## Install scope

```text
install_scope: local

# Optional: per server (overrides install_scope for that server)
# figma-console: local
# playwright: global
# atlassian-rovo: local
```

- `local` = Add to this repo’s project entry in `~/.claude.json`.
- `global` = Use `claude mcp add` (commands below). Relaunch terminal after adding.

For each MCP the user wants, use its per-server line if present, else `install_scope`. When a server’s scope is global, use:

```bash
# Figma Console (design creation / updates)
claude mcp add figma-console -- npx -y figma-console-mcp@latest

# Playwright (browser automation)
claude mcp add playwright -- npx -y @executeautomation/playwright-mcp-server

# Atlassian Jira/Confluence (ticket management)
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```


---

### Your local setup
