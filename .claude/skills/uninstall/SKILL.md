---
name: uninstall
description: Remove Product Studio MCP entries from the user's Claude config. Use when user says uninstall, remove MCP, or /uninstall.
disable-model-invocation: true
---

# Uninstall

Remove the MCP servers that the Install skill adds (figma-console, atlassian-rovo). They may be in the user's global config or project-scoped in `~/.claude.json` under `projects["<projectPath>"].mcpServers`. Do not edit the file by hand or with Write/Edit tool.

## Inputs

None. User invokes with uninstall, remove MCP, or /uninstall.

## Output

figma-console and atlassian-rovo removed from config. User must fully restart the app.

## Process

1. Run these commands from the project root (or the directory where Product Studio is open). The CLI removes them from the right place (global or project-scoped):

```bash
claude mcp remove figma-console
claude mcp remove atlassian-rovo
```

2. Tell the user to fully restart Claude Code so the change is picked up.

## Reference

[install-mcp](../install-mcp/SKILL.md) – Adds these MCPs. [Coordinator](../../agents/coordinator.md) – Uninstaller agent.
