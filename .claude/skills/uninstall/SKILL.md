---
name: uninstall
description: Remove Product Studio MCP entries from the user's Claude config and Cursor's project MCP config.
disable-model-invocation: true
---

# Uninstall

Remove the MCP servers that the Install skill adds (figma-console, atlassian-rovo, github). Config may be global or project-scoped.

## Inputs

None. User invokes with uninstall or /uninstall.

## Output

figma-console, atlassian-rovo, and github removed from config. User must fully restart the app.

## Process

### Cursor

If the project has `.cursor/mcp.json`: remove `figma-console`, `atlassian-rovo`, and `github` from `mcpServers`. If `mcpServers` is empty afterward, either delete `.cursor/mcp.json` or leave `{"mcpServers":{}}`. Tell user to fully restart Cursor.

### Claude Code

Do not edit the file by hand. Run from project root:

```bash
claude mcp remove figma-console
claude mcp remove atlassian-rovo
claude mcp remove github
```

Tell user to fully restart Claude Code.

## Reference

[install-mcp](../install-mcp/SKILL.md) – Adds these MCPs. [Coordinator](../../agents/coordinator.md) – Uninstaller subagent.
