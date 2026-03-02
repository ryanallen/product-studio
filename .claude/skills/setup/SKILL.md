---
name: setup
description: Run the standard Studio setup steps. Use when user says "setup", "install", or /setup. In Claude Code and Cursor, /skills lists all.
---

# Setup

Run the standard Studio setup. Stop when the user must quit the terminal and relaunch; they then run `/mcp` in the chat to authenticate. Do not proceed past that until they have completed OAuth for Figma and Atlassian.

## Steps

### 1. Show hidden files (macOS)

```bash
defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder
```

### 2. MCP servers

By default, treat this repo as **local-scoped** and avoid touching global Claude config. The Customizer can flip behavior using `.claude/skills/setup/custom/SKILL.md` (`install_scope: global`).

#### 2.1 Local (project-scoped) config

Edit `~/.claude.json` under this repo’s project path, for example:

```json
"projects": {
  "c:\\Users\\rwall\\Desktop\\Studio": {
    "mcpServers": {
      "figma-console": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "figma-console-mcp@latest"],
        "env": {
          "FIGMA_ACCESS_TOKEN": "figd_YOUR_TOKEN",
          "ENABLE_MCP_APPS": "true"
        }
      },
      "playwright": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@executeautomation/playwright-mcp-server"]
      },
      "atlassian-rovo": {
        "type": "sse",
        "url": "https://mcp.atlassian.com/v1/sse"
      }
    }
  }
}
```

#### 2.2 Global (optional)

Only run these if the user explicitly agrees to a global install (affects all projects):

```bash
# Figma Console (design creation / updates)
claude mcp add figma-console -- npx -y figma-console-mcp@latest

# Playwright (browser automation)
claude mcp add playwright -- npx -y @executeautomation/playwright-mcp-server

# Atlassian Jira/Confluence (ticket management)
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```

After adding any new MCP server globally, the user must relaunch the terminal before proceeding.

### 3. Figma Console token & bridge (Prompt to Figma)

#### 3.1 Get Figma token

1. In Figma, open profile → Settings → Security.
2. Under Personal access tokens, create a new token:
   - Description: "Figma Console MCP"
   - Check ALL permission boxes
   - Set expiration to 90 days
3. Copy the token (starts with `figd_`). It expires every 90 days.

Set `FIGMA_ACCESS_TOKEN` in the environment where Claude Desktop runs (or in your MCP config) to that value.

#### 3.2 Figma Desktop bridge

From this repo (or a temp folder), run:

```bash
npm pack figma-console-mcp
tar -xzf figma-console-mcp-*.tgz package/figma-desktop-bridge
mv package/figma-desktop-bridge ./figma-desktop-bridge
rm -rf package figma-console-mcp-*.tgz
```

Then:
1. Open Figma Desktop.
2. Plugins → Development → Import plugin from manifest.
3. Select `figma-desktop-bridge/manifest.json`.
4. Run it via Plugins → Development → Figma Desktop Bridge and keep it open.

#### 3.3 Token renewal

Every 90 days, create a new Figma token and update `FIGMA_ACCESS_TOKEN` to the new value, then restart Claude.

### 4. Config

Ensure `work/config.md` exists. Add the user's teams and spaces to that file.

### 5. Handoff

Tell the user to quit the terminal and relaunch, then run `/mcp` in the chat and follow the OAuth flow for Figma and Atlassian.

### 6. Custom (optional)

If `.claude/skills/setup/custom.md` exists, the Customizer agent runs it after this skill. That file is gitignored so syncing upstream will not overwrite it. Add it locally for machine- or user-specific steps (e.g. extra MCP servers, env vars).
