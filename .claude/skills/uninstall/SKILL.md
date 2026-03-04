---
name: uninstall
description: Remove Studio MCP entries from the user's global Claude config. Use when user says "uninstall", "remove MCP", or /uninstall.
---

# Uninstall

Remove the MCP servers that the Install skill adds via `claude mcp add` (figma-console, playwright, atlassian-rovo). They live in the user's global config `mcpServers`. Does not remove other MCPs or delete the config file. Edit **only** the global Claude config file. Do **not** edit Cursor settings.json, VSCode settings.json, or any project/workspace config.

## Config file location (only file to edit)

- **macOS:** `$HOME/.claude.json` (e.g. `/Users/username/.claude.json`)
- **Linux:** `$HOME/.claude.json`
- **Windows:** `%USERPROFILE%\.claude.json`

Resolve the path for the current platform (e.g. expand `$HOME` or `~`) before reading or writing.

## Steps

1. Resolve the user's global config path (see above). Optionally confirm with the user if unsure.
2. Read the file. If it does not exist or has no `mcpServers`, report nothing to remove and stop.
3. From `mcpServers`, remove these keys if present: `figma-console`, `playwright`, `atlassian-rovo`. Leave all other keys and top-level properties unchanged.
4. Write the modified JSON back to the same path. Do not use the Write or Edit tool (it often fails on Mac). Use a Node one-liner run in terminal from project root:

```bash
node -e "
const fs=require('fs'),path=require('path');
const p=path.join(process.env.HOME||process.env.USERPROFILE,'.claude.json');
if(!fs.existsSync(p)){console.log('No config file');process.exit(0);}
const c=JSON.parse(fs.readFileSync(p,'utf8'));
if(!c.mcpServers){console.log('No mcpServers');process.exit(0);}
['figma-console','playwright','atlassian-rovo'].forEach(k=>delete c.mcpServers[k]);
fs.writeFileSync(p,JSON.stringify(c,null,2));
console.log('Removed Studio MCPs');
"
```

5. Tell the user to fully restart Claude Code so the change is picked up.
