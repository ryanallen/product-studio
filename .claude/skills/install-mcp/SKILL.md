---
name: install-mcp
description: Add chosen MCP servers to user global config via CLI. Part of Install workflow. Use only the MCPs they chose in install-choices.
disable-model-invocation: true
---

# Install MCP

Add each chosen MCP to the user's global config via CLI. Do not edit Cursor/VSCode project config.

## Inputs

From install-choices: which MCPs they chose (figma-console, atlassian-rovo). If figma-console, the Figma token from that step.

## Output

Each chosen MCP added to global config. User must fully restart the app after the full Install workflow, then run `/mcp` for OAuth.

## Process

### Config file

- **macOS/Linux** – `$HOME/.claude.json`
- **Windows** – `%USERPROFILE%\.claude.json`

For each MCP they chose, add with the CLI below. Do not use Write or Edit tool; use only these commands.

**figma-console** (replace `figd_xxx` with the token from install-choices; use quoted `-e` so the token is valid):
```bash
claude mcp add -e "FIGMA_ACCESS_TOKEN=figd_xxx" -e "ENABLE_MCP_APPS=true" figma-console -- npx -y figma-console-mcp@latest
```

**atlassian-rovo**
```bash
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```

## Reference

[Coordinator](../../agents/coordinator.md) – Install workflow. [install-choices](../install-choices/SKILL.md) – Source of choices.
