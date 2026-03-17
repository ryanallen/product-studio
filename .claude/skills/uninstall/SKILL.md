---
name: uninstall
description: Remove Product Studio MCP entries from the user's Claude config and Cursor's project MCP config. Use when user says uninstall, /uninstall.
disable-model-invocation: true
---

# Uninstall

Remove the MCP servers that the Install skill adds (figma-console, atlassian-rovo, github, godaddy). Config may be global or project-scoped.

## Inputs

None. User invokes with uninstall or /uninstall.

## Output

figma-console, atlassian-rovo, github, and godaddy removed from config. User must fully restart the app.

## Process

### Cursor

If the project has `.cursor/mcp.json`: remove `figma-console`, `atlassian-rovo`, `github`, and `godaddy` from `mcpServers`. If `mcpServers` is empty afterward, either delete `.cursor/mcp.json` or leave `{"mcpServers":{}}`. Tell user to fully restart Cursor.

### Claude Code

Do not edit the file by hand. Run from project root:

```bash
claude mcp remove figma-console
claude mcp remove atlassian-rovo
claude mcp remove github
claude mcp remove godaddy
```

Tell user to fully restart Claude Code.

## Reference

[install-mcp](.claude/skills/install-mcp/SKILL.md) adds these MCPs. Uninstaller runs when the flow is uninstall.
