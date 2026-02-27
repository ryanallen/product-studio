---
name: setup
description: Runs the standard Studio setup steps. Use when user says "install studio", "set up", "run setup", or "ask AI to install".
---

# Setup

Perform the standard Studio setup. Stop when the user must quit the terminal and relaunch; they then run `/mcp` in the chat to authenticate. Do not proceed past that until they have completed OAuth for Figma and Atlassian.

## Steps

### 1. Show Hidden Files (macOS)

```bash
defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder
```

### 2. Add MCP Servers

```bash
# Figma (design creation)
claude mcp add figma -- npx -y @figma/mcp-figma

# Playwright (browser automation)
claude mcp add playwright -- npx -y @executeautomation/playwright-mcp-server

# Atlassian Jira/Confluence (ticket management)
claude mcp add --transport sse atlassian-rovo https://mcp.atlassian.com/v1/sse
```

After adding any new MCP server, the user must relaunch the terminal before proceeding.

### 3. Config

Ensure `work/config.md` exists. Add the user's teams and spaces to that file.

### 4. Handoff

Tell the user to quit the terminal and relaunch, then run `/mcp` in the chat and follow the OAuth flow for Figma and Atlassian.
