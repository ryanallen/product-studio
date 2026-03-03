---
name: setup
description: Run the standard Studio setup steps. Use when user says "setup", "install", or /setup. In Claude Code and Cursor, /skills lists all.
---

# Setup

Run the standard Studio setup. Stop when the user must quit the terminal and relaunch; they then run `/mcp` in the chat to authenticate. Do not proceed past that until they have completed OAuth for Figma and Atlassian.

**Handoff marker** – `.claude/skills/setup/setup-handoff.marker` is created at step 5 (Handoff). If the user says they completed /mcp and OAuth (or "mcp done"), delete the marker if it exists. (When any agent sees the marker, AGENTS.md rule 9: remind user to check MCP and delete the marker.)

## Inputs (get from user when needed)

Assume the user wants each; offer to skip any.

- **FIGMA_ACCESS_TOKEN** – Prompt to Figma (generate/update designs from chat). User creates a Figma PAT (steps in 3.1), pastes it; you put it in `figma-console` env in `~/.claude.json`. Skip if no Figma.
- **playwright** – Browser automation (e.g. capture-webpage). Skip if not needed.
- **atlassian-rovo** – Jira/Confluence (tickets, update-ticket). Skip if not needed.
- **Project path** – This repo’s path for `projects` in `~/.claude.json`. Infer from workspace or ask.
- **Teams and spaces** – For `work/config.md`. Ask if missing or empty.

## Steps

### 1. Show hidden files (macOS)

```bash
defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder
```

### 2. MCP servers

Install scope (local vs global) is set in `.claude/skills/setup/custom/SKILL.md`.

Edit `~/.claude.json` under this repo’s project path (see Inputs), add:

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

### 3. Figma Console token & bridge (Prompt to Figma)

#### 3.1 Get value for FIGMA_ACCESS_TOKEN

1. In Figma, open profile → Settings → Security.
2. Under Personal access tokens, create a new token:
   - Description: "Figma Console MCP"
   - Check ALL permission boxes
   - Set expiration to 90 days
3. Copy the token (starts with `figd_`). It expires every 90 days.

Put that value into `FIGMA_ACCESS_TOKEN` in the `figma-console` env in `~/.claude.json` (step 2; replace `figd_YOUR_TOKEN`).

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

#### 3.3 Restart after config changes

After editing `~/.claude.json`, tell the user to restart Claude Code / Claude Desktop so it picks up the MCP config.

#### 3.4 FIGMA_ACCESS_TOKEN renewal

Every 90 days: new Figma PAT, update `FIGMA_ACCESS_TOKEN` in `figma-console` env in `~/.claude.json`, restart Claude.

### 4. Config

Ensure `work/config.md` exists. Add the user's teams and spaces to that file.

### 5. Handoff

Tell the user to quit the terminal and relaunch, then run `/mcp` in the chat and follow the OAuth flow for Figma and Atlassian. Create `.claude/skills/setup/setup-handoff.marker` so that when they run setup again we know they are at this step.
