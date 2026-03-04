---
name: uninstall
description: Remove Studio MCP entries from the user's global Claude config. Use when user says "uninstall", "remove MCP", or /uninstall.
---

# Uninstall

Remove the MCP servers that the Installer adds to the user's global config. Does not remove other MCPs or delete the config file.

## Config file location

- **macOS / Linux:** `~/.claude.json` (expand `$HOME` or `~`)
- **Windows:** `%USERPROFILE%\.claude.json`

Resolve the path for the current platform before reading or writing.

## Steps

1. Resolve the user's global config path (see above). Optionally confirm with the user if unsure.
2. Read the file. If it does not exist or has no `mcpServers`, report nothing to remove and stop.
3. From `mcpServers`, remove these keys if present: `figma-console`, `playwright`, `atlassian-rovo`. Leave all other keys and top-level properties unchanged.
4. Write the modified JSON back to the same path. Preserve formatting where possible; valid JSON is required.
5. Tell the user to restart terminal (or Claude Code / Claude Desktop) so the change is picked up.
