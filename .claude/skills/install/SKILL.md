---
name: install
description: Run the standard Product Studio install steps. Use when user says "setup", "install", or /install. In Cursor, Claude Code, and other clients, /skills lists all.
---

# Install

## Steps

### 1. Config

Ensure `work/paths.md` exists. If it is missing or empty, copy from `work/paths.md.example`.

### 2. Repo link (deliverables base URL)

From the repo root, run `git remote get-url origin`. If it succeeds, convert to a deliverables base URL (e.g. `https://example.com/org/repo/tree/main/`). If git fails or there is no origin, ask the user for the deliverables link (the base URL where project folders are visible). Update `work/paths.md`: set the "Deliverables base URL:" line to that URL. Do not hardcode.

### 3. Show hidden files

Ask if they want to show hidden files. If no, continue to step 4. If yes:

**macOS:** Run (if it fails due to permissions, continue to step 4):
```bash
defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder
```

**Windows:** File Explorer → View → Show → Hidden items. (Or Folder Options → View → Show hidden files and folders.)

### 4. What to install

Ask if they want all of these installed, or to pick and choose.

- **All** – figma-console, playwright, atlassian-rovo. Figma token needed in step 5.
- **Pick and choose** – For each: figma-console, playwright, atlassian-rovo; ask if they want it.

Only run steps for the MCPs they chose.

### 5. Figma token (if they chose figma-console)

Give instructions below, then ask them to paste the token. Do not ask whether they have one.

**How to get it:** Figma → profile → Settings → Security. Personal access tokens: create (e.g. "Figma Console MCP", all scopes, up to 90 days), copy.

**Ask:** Paste your Figma token (starts with `figd_`).

### 6. MCP servers

Edit only the user's global config. Do not edit Cursor/VSCode project config.

**Config file:**
- **macOS:** `$HOME/.claude.json`
- **Linux:** `$HOME/.claude.json`
- **Windows:** `%USERPROFILE%\.claude.json`

For each MCP they chose (step 4), add with the CLI below. Do not use Write or Edit tool; use only these commands.

**figma-console** (replace `figd_xxx` with the token from step 5; use quoted `-e` so the token is valid):
```bash
claude mcp add -e "FIGMA_ACCESS_TOKEN=figd_xxx" -e "ENABLE_MCP_APPS=true" figma-console -- npx -y figma-console-mcp@latest
```

**playwright:**
```bash
claude mcp add playwright -- npx -y @executeautomation/playwright-mcp-server
```

**atlassian-rovo:**
```bash
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```

After step 8: user must fully restart the app (Cursor, Claude Code, etc.), then run `/mcp` for OAuth.

### 7. Figma Desktop bridge (if they chose figma-console)

From repo root:

```bash
npm run setup:figma-bridge
```

In Figma Desktop:

1. In a project: Plugins → Development → Import plugin from manifest.
2. Select `.claude/skills/generate-figma/scripts/figma-desktop-bridge/manifest.json`.
3. Plugins → Development → Figma Desktop Bridge. Keep it running for Prompt to Figma.

#### 7.1 Token renewal

Every 90 days: [update-figma](.claude/skills/update-figma/SKILL.md) to set new token, then user restarts the app.

### 8. Handoff

Tell the user: fully restart the app (Cursor, Claude Code, etc.), open project, run `/mcp` and complete OAuth for Figma and Atlassian. After giving that instruction, create `.claude/skills/install/install-handoff.marker`.
