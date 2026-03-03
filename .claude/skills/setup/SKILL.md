---
name: setup
description: Run the standard Studio setup steps. Use when user says "setup", "install", or /setup. In Claude Code and Cursor, /skills lists all.
---

# Setup

Run the standard Studio setup.

## Inputs (get from user when needed)

Ask which from the list below they want installed; skip any they don't want.

- **FIGMA_ACCESS_TOKEN** – Prompt to Figma. Have the user get their token (step 2) before writing config; they paste it and you put it in `figma-console` env in `~/.claude.json`. Skip if no Figma.
- **playwright** – Browser automation (e.g. capture-webpage). Skip if not needed.
- **atlassian-rovo** – Jira/Confluence (tickets, update-ticket). Skip if not needed.
- **Project path** – This repo’s path for `projects` in `~/.claude.json`. Infer from workspace or ask.
- **Teams and spaces** – For `work/config.md`. Ask if missing or empty.

## Steps

### 1. Show hidden files (macOS)

```bash
defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder
```

### 2. Get Figma token (before quitting terminal, if using Figma)

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

Read `install_scope` and any per-server overrides from `.claude/skills/setup/custom/SKILL.md`. For each MCP they want: if that server’s scope is **local**, add it to the project block in `~/.claude.json` (below); if **global**, run the matching `claude mcp add` from the custom file. Use **the user's project path** (from Inputs) and **the user's Figma token** (from step 2). On Windows escape backslashes in the path (e.g. `c:\\Users\\TheirName\\path\\to\\Studio`).

For local servers, add to `~/.claude.json`:

```json
"projects": {
  "<THEIR_PROJECT_PATH>": {
    "mcpServers": {
      "figma-console": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "figma-console-mcp@latest"],
        "env": {
          "FIGMA_ACCESS_TOKEN": "<TOKEN_USER_GAVE_YOU>",
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

### 4. Figma Desktop bridge

Run from the root of this repo:

```bash
npm pack figma-console-mcp
tar -xzf figma-console-mcp-*.tgz package/figma-desktop-bridge
mv package/figma-desktop-bridge ./figma-desktop-bridge
rm -rf package figma-console-mcp-*.tgz
```

Then tell the user to do this in Figma Desktop:

1. Inside a Figma project, click Plugins → (dropdown) Development → Import plugin from manifest. (Or Plugins → search "Import plugin from manifest" and click it.)
2. Select `figma-desktop-bridge/manifest.json`.
3. Run the plugin: Plugins → Development → Figma Desktop Bridge.
4. Keep the bridge plugin running while using Prompt to Figma.

#### 4.1 Restart after config changes

After editing `~/.claude.json`, tell the user to restart Claude Code / Claude Desktop so it picks up the MCP config.

#### 4.2 FIGMA_ACCESS_TOKEN renewal

Every 90 days: new Figma PAT, update `FIGMA_ACCESS_TOKEN` in `figma-console` env in `~/.claude.json`, restart Claude.

### 5. Config

Ensure `work/config.md` exists. Add the user's teams and spaces to that file.

### 6. Handoff

Tell the user to quit the terminal and relaunch, then run `/mcp` in the chat and follow the OAuth flow for Figma and Atlassian. Create `.claude/skills/setup/setup-handoff.marker` so that when they run setup again we know they are at this step.
