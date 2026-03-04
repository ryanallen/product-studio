---
name: install
description: Run the standard Studio install steps. Use when user says "setup", "install", or /install. In Claude Code and Cursor, /skills lists all.
---

# Install

Run the standard Studio install.

## Inputs (get from user when needed)

**What to install:** Ask if they want all of these installed, or to pick and choose.

- **All** – Install figma-console (Figma/Prompt to Figma), playwright (browser automation), atlassian-rovo (Jira/Confluence). For figma-console you will need their Figma token in step 2.
- **Pick and choose** – Go through the list one at a time; for each, ask if they want it installed. List: figma-console, playwright, atlassian-rovo.

Only run steps for the MCPs they chose. For figma-console, get the Figma token (step 2) before step 3.

## Steps

### 1. Show hidden files (optional)

Ask if they want to show hidden files. Helpful for changing the system itself (e.g. editing config files); not required for using Studio to do your work. If they decline, skip and continue to step 2. If yes:

**macOS:** Run:
```bash
defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder
```

**Windows:** File Explorer → View → Show → Hidden items. (Or Folder Options → View → Show hidden files and folders.)

### 2. Get Figma token (if they chose figma-console)

Paste your Figma token (starts with `figd_`). You use it in step 3 for `FIGMA_ACCESS_TOKEN`.

**Where to find it:** In Figma (desktop app or website), click profile → Settings → Security. Under Personal access tokens, create a new token (description e.g. "Figma Console MCP", check all scopes, set expiration up to 90 days), then copy the token.

### 3. MCP servers

MCPs install to the user's **global** config so Claude recognizes them. Config file: `~/.claude.json` (macOS/Linux) or `%USERPROFILE%\\.claude.json` (Windows).

For each MCP they chose (from Inputs), add it to the `mcpServers` object in that file (create the file or merge with existing). For figma-console use the user's Figma token (from step 2) as `FIGMA_ACCESS_TOKEN`. Omit servers they did not choose.

**Option A – run these commands** (then for figma-console, edit the file to add `env` with `FIGMA_ACCESS_TOKEN` and `ENABLE_MCP_APPS` to the figma-console entry):

```bash
claude mcp add figma-console -- npx -y figma-console-mcp@latest
claude mcp add playwright -- npx -y @executeautomation/playwright-mcp-server
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```

**Option B – run Python to update config** (avoids jq not installed or Edit tool failing on frequently updated files). Replace `USER_TOKEN` with the token from step 2; include only the `mcpServers` entries for MCPs they chose. Config path uses `expanduser` so it works on macOS, Linux, and Windows.

```bash
python3 <<'EOF'
import json
import os
path = os.path.expanduser(os.path.join("~", ".claude.json"))
with open(path, "r") as f:
    config = json.load(f)
config.setdefault("mcpServers", {})
# Add or overwrite only the servers they chose; replace USER_TOKEN for figma-console
config["mcpServers"].update({
    "figma-console": {
        "command": "npx",
        "args": ["-y", "figma-console-mcp@latest"],
        "env": {"FIGMA_ACCESS_TOKEN": "USER_TOKEN", "ENABLE_MCP_APPS": "true"}
    },
    "playwright": {
        "command": "npx",
        "args": ["-y", "@executeautomation/playwright-mcp-server"]
    },
    "atlassian-rovo": {"url": "https://mcp.atlassian.com/v1/sse"}
})
with open(path, "w") as f:
    json.dump(config, f, indent=2)
EOF
```

Before running: substitute the actual token for `USER_TOKEN` in the figma-console entry, and remove from the `update({...})` dict any server they did not choose.

### 4. Figma Desktop bridge (if they chose figma-console)

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

Ensure `work/config.md` exists. If it is missing or empty, ask for their teams and spaces and add them to that file.

### 6. Handoff

As the last step, tell the user to restart terminal (or Claude Code / Claude Desktop) so MCP config is picked up; then run `/mcp` in the chat and follow the OAuth flow for Figma and Atlassian. Never tell them to restart terminal first; that instruction must always be the last step you give the user.
Create `.claude/skills/install/install-handoff.marker` so that when they run install again we know they are at this step.
