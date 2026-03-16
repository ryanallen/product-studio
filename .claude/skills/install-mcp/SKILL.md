---
name: install-mcp
description: Add chosen MCP servers to user config (Cursor .cursor/mcp.json or Claude Code global). Use only MCPs chosen in install-choices.
disable-model-invocation: true
---

# Install MCP

Add each chosen MCP to the user's config. In Cursor use project `.cursor/mcp.json`; in Claude Code use global config via CLI.

## Inputs

From install-choices: which MCPs they chose (figma-console, atlassian-rovo, github). If figma-console, the Figma token from that step. If github, the GitHub PAT from that step.

## Output

Each chosen MCP added to config. User must fully restart the app after the full Install workflow, then run `/mcp` for OAuth where applicable.

## Process

### Cursor (project `.cursor/mcp.json`)

1. Read `.cursor/mcp.json` if it exists; otherwise start with `{"mcpServers":{}}`.
2. For each chosen MCP, set the entry in `mcpServers`:
   - **figma-console** – `"figma-console": { "command": "npx", "args": ["-y", "figma-console-mcp@latest"], "env": { "FIGMA_ACCESS_TOKEN": "<token from choices or figd_xxx>", "ENABLE_MCP_APPS": "true" } }`. Use the token from install-choices, or `"${env:FIGMA_ACCESS_TOKEN}"` if storing in env.
   - **atlassian-rovo** – `"atlassian-rovo": { "url": "https://mcp.atlassian.com/v1/sse" }`.
   - **github** – `"github": { "url": "https://api.githubcopilot.com/mcp/", "headers": { "Authorization": "Bearer <token from choices>" } }`. Use the GitHub PAT from install-choices, or `"Bearer ${env:GITHUB_PAT}"` if storing in env.
3. Write `.cursor/mcp.json`. Merge with existing so other servers are preserved.

### Claude Code (global config)

- **macOS/Linux** – `$HOME/.claude.json`
- **Windows** – `%USERPROFILE%\.claude.json`

Do not use Write or Edit on Claude config; use only these commands.

**figma-console** (replace `figd_xxx` with the token from install-choices; use quoted `-e` so the token is valid):
```bash
claude mcp add -e "FIGMA_ACCESS_TOKEN=figd_xxx" -e "ENABLE_MCP_APPS=true" figma-console -- npx -y figma-console-mcp@latest
```

**atlassian-rovo**
```bash
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```

**github** – Claude Code does not document a single `claude mcp add` for the remote GitHub HTTP server. Add manually to global config: server key `github`, type `http`, url `https://api.githubcopilot.com/mcp/`, headers `Authorization: Bearer <PAT>`. Or use Docker per [GitHub MCP Server](https://github.com/github/github-mcp-server) local install.

## Reference

[install-choices](.claude/skills/install-choices/SKILL.md) – Source of choices.
