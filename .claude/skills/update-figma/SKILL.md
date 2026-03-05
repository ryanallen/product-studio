---
name: update-figma
description: Update the Figma token in figma-console MCP config. Use when user says "update Figma token", "renew Figma token", or /update-figma.
---

# Update Figma token

Update `FIGMA_ACCESS_TOKEN` in the user's global Claude config so figma-console MCP keeps working after token expiry (e.g. every 90 days).

## Steps

### 1. Instructions and ask for token

Do not ask whether they have a token. Give the instructions below, then ask them to paste it.

**How to get it:** In Figma (desktop app or website), click profile → Settings → Security. Under Personal access tokens, create a new token (description e.g. "Figma Console MCP", check all scopes, set expiration up to 90 days), then copy the token.

**Then ask:** Paste your Figma token (starts with `figd_`).

### 2. Update config with CLI

Use the official CLI so the global config is updated. Do not use the Write or Edit tool on the config file.

**Config file (for reference):**
- **macOS/Linux:** `$HOME/.claude.json`
- **Windows:** `%USERPROFILE%\.claude.json`

Run (replace `figd_xxx` with the token they pasted; use quoted `-e` so the token is valid):

```bash
claude mcp add -e "FIGMA_ACCESS_TOKEN=figd_xxx" -e "ENABLE_MCP_APPS=true" figma-console -- npx -y figma-console-mcp@latest
```

### 3. Restart

Tell the user to fully restart Claude Code so the new token is used.
