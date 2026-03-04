---
name: setup
description: Run the standard Studio setup steps. Use when user says "setup", "install", or /setup. In Claude Code and Cursor, /skills lists all.
---

# Setup

Run the standard Studio setup.

## Inputs (get from user when needed)

Ask which from the list below they want installed; skip any they don't want.

- **FIGMA_ACCESS_TOKEN** – Prompt to Figma. Have the user get their token (step 2) before writing config; they paste it and you put it in `figma-console` env in the user's global `~/.claude.json`. Skip if no Figma.
- **playwright** – Browser automation (e.g. capture-webpage). Skip if not needed.
- **atlassian-rovo** – Jira/Confluence (tickets, update-ticket). Skip if not needed.
- **Teams and spaces** – For `work/config.md`. Ask if missing or empty.

## Steps

### 1. Show hidden files

**macOS:** Run:
```bash
defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder
```

**Windows:** File Explorer → View → Show → Hidden items. (Or Folder Options → View → Show hidden files and folders.)

### 2. Get Figma token (if using Figma)

Have the user get their token so you can fill it into step 3. Tell them:

**Figma Console MCP (Prompt to Figma) – Get Figma token**

1. In Figma (desktop app or website), click profile → Settings → Security.
2. Scroll down. Under Personal access tokens, create a new token:
   - Description: "Figma Console MCP" or whatever they want
   - Check all permission scopes
   - Set expiration (max 90 days)
3. Copy the token (starts with `figd_`).

User pastes the token; you use it in step 3 for `FIGMA_ACCESS_TOKEN`.

### 3. MCP servers

MCPs install to the user's **global** config so Claude recognizes them. Config file: `~/.claude.json` (macOS/Linux) or `%USERPROFILE%\\.claude.json` (Windows).

For each MCP they want, add it to the `mcpServers` object in that file (create the file or merge with existing). Use the user's Figma token (from step 2) for `FIGMA_ACCESS_TOKEN` in figma-console. Omit servers they did not want.

**Option A – run these commands** (then for figma-console, edit the file to add `env` with `FIGMA_ACCESS_TOKEN` and `ENABLE_MCP_APPS` to the figma-console entry):

```bash
claude mcp add figma-console -- npx -y figma-console-mcp@latest
claude mcp add playwright -- npx -y @executeautomation/playwright-mcp-server
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```

**Option B – write or merge this JSON** into the user's global config (under top-level `mcpServers`):

```json
{
  "mcpServers": {
    "figma-console": {
      "command": "npx",
      "args": ["-y", "figma-console-mcp@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "<TOKEN_USER_GAVE_YOU>",
        "ENABLE_MCP_APPS": "true"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    },
    "atlassian-rovo": {
      "url": "https://mcp.atlassian.com/v1/sse"
    }
  }
}
```

### 4. Figma Desktop bridge

Run from the root of this repo (works on Windows and macOS):

```bash
npm run setup:figma-bridge
```

Then tell the user to do this in Figma Desktop:

1. Inside a Figma project, click Plugins → (dropdown) Development → Import plugin from manifest. (Or Plugins → search "Import plugin from manifest" and click it.)
2. Select `.claude/skills/generate-figma/scripts/figma-desktop-bridge/manifest.json` (from this repo).
3. Run the plugin: Plugins → Development → Figma Desktop Bridge.
4. Keep the bridge plugin running while using Prompt to Figma.

#### 4.1 FIGMA_ACCESS_TOKEN renewal

Every 90 days: new Figma PAT, update `FIGMA_ACCESS_TOKEN` in `figma-console` env in the user's global `~/.claude.json`, restart Claude.

### 5. Config

Ensure `work/config.md` exists. Add the user's teams and spaces to that file.

### 6. Handoff

As the last step, tell the user to restart terminal (or Claude Code / Claude Desktop) so MCP config is picked up; then run `/mcp` in the chat and follow the OAuth flow for Figma and Atlassian.
Create `.claude/skills/setup/setup-handoff.marker` so that when they run setup again we know they are at this step.
