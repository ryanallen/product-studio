---
name: uninstall
description: Remove Studio MCP entries from the user's Claude config. Use when user says "uninstall", "remove MCP", or /uninstall.
---

# Uninstall

Remove the MCP servers that the Install skill adds (figma-console, playwright, atlassian-rovo). They may be in the user's global config or project-scoped in `~/.claude.json` under `projects["<projectPath>"].mcpServers`. Do not edit the file by hand or with Write/Edit tool.

## Steps

1. Run these commands from the project root (or the directory where Studio is open). The CLI removes them from the right place (global or project-scoped):

```bash
claude mcp remove figma-console
claude mcp remove playwright
claude mcp remove atlassian-rovo
```

2. Tell the user to fully restart Claude Code so the change is picked up.
