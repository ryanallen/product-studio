# Product Studio

Product Studio: agent workflows for design capture, research, and strategic analysis.

---

## ⚙️ Setup

Say "setup", "install", or type `/install`. The [install skill](.claude/skills/install/SKILL.md) runs the standard steps (show hidden files, project config). After that, quit the terminal and relaunch, then run `/mcp` in the chat and complete OAuth for Figma and Atlassian.

Custom setup: `.claude/skills/install/custom/SKILL.md`. The installer runs the [customizer](.claude/agents/customizer.md) agent, which runs that file.

---

## 🤖 Agents and their skills

Call a skill by saying its trigger phrase or typing /skill-name. In Claude Code and Cursor, /skills lists all. Skills live under an assistant config folder (this repo uses `.claude/skills/`), where each skill must live in a kebab-case folder with a file named `SKILL.md` (e.g. `.claude/skills/save/SKILL.md`).

### 🧭 coordinator
Orchestrates researcher, documenter, strategist, verifier, updater. Discover: research, document, strategize, audit, propose, update ticket. No skill of its own. See [coordinator](.claude/agents/coordinator.md).

### 🔧 customizer
Runs `.claude/skills/install/custom/SKILL.md` after the installer (local overrides). See [customizer](.claude/agents/customizer.md).

### 🎨 designer
- **capture-webpage**: Capture a live webpage as a Figma design. "capture page", "to Figma", /capture-webpage. Give webpage URL and Figma file URL.
- **generate-figma**: Generate or update a Figma design by calling the Figma Console MCP with target file details. "generate Figma", "generate design", /generate-figma.

### 📝 documenter
Documenter skills use the `document` prefix: **document**, **document-paths**, **document-ticket**.
- **document**: Take research output and produce structured markdown with mermaid diagrams. "write up", "document", /document.
- **document-paths**: Sync work/paths.md tree with actual paths under work/. Handoff from verifier (verify-paths).
- **document-ticket**: Post a comment on a Jira ticket with link to project deliverables. "update ticket", "Jira", /document-ticket.

### 📦 installer
- **install**: Run the standard Product Studio install steps (show hidden files, project config). "setup", "install", /install. Then quit terminal, relaunch, run /mcp and complete OAuth for Figma and Atlassian.

### 🗑️ uninstaller
- **uninstall**: Remove Product Studio MCP entries from the user's global config. "uninstall", "remove MCP", /uninstall. See [uninstall skill](.claude/skills/uninstall/SKILL.md). Then restart terminal.

### ✅ verifier
- **verify-paths**: Compare work/paths.md to actual paths under work/. If mismatch, hand off to documenter (document-paths). Used in Save flow.

### 🔄 updater
- **update-figma**: Update the Figma token in figma-console MCP config. "update Figma token", "renew Figma token", /update-figma.
- **save**: Stage all and create a commit with derived message. "save", "stage", or "commit", /save. Does not push.
- **sync-upstream**: Sync from upstream main, push to origin. "sync", "pull", /sync-upstream.

### 🔍 researcher
- **research**: Gather from any input (ticket, URL(s), text, file(s), image(s)) and follow links up to 5 levels deep; documenter then structures the output. "research", "learn about this", "look at this", /research.
- **analyze-figma**: Analyze a Figma link and produce a structured report. General link = full file; specific link (with node-id) = deep analysis from that node. "analyze Figma", "Figma audit", /analyze-figma. Give Figma design URL.

### 🎯 strategist
- **strategize**: Analyze findings with Five Whys, identify root causes and propose solutions. "why broken", "find cause", /strategize.

<details>
<summary>📌 Using a working repo with this as upstream</summary>

For a working repo that pulls from Product Studio as upstream (e.g. owner/repo).

**Add upstream.** In the working repo:

```bash
git remote add upstream https://github.com/owner/repo.git
git fetch upstream
```

Pull with `git pull upstream main` (or say "sync", "pull", or /sync-upstream).

**Local paths config.** `work/paths.md` is gitignored. Copy from `work/paths.md.example` once and edit the tree; sync never overwrites it.

</details>

---

## 📁 Repo Structure

```
Product Studio/
├── AGENTS.md
├── CLAUDE.md -> AGENTS.md
├── .claude/
│   ├── agents/
│   │   ├── coordinator.md
│   │   ├── designer.md
│   │   ├── documenter.md
│   │   ├── researcher.md
│   │   ├── strategist.md
│   │   ├── verifier.md
│   │   ├── installer.md
│   │   ├── uninstaller.md
│   │   ├── updater.md
│   │   └── customizer.md (runs .claude/skills/install/custom/SKILL.md)
│   └── skills/
│       ├── research/SKILL.md
│       ├── document/SKILL.md
│       ├── strategize/SKILL.md
│       ├── analyze-figma/SKILL.md
│       ├── install/
│       │   ├── SKILL.md
│       │   └── custom/
│       │       └── SKILL.md
│       ├── save/
│       │   ├── SKILL.md
│       │   └── scripts/
│       │       └── sync-codex-from-claude.mjs
│       ├── sync-upstream/SKILL.md
│       ├── verify-paths/SKILL.md
│       ├── uninstall/SKILL.md
│       ├── update-figma/SKILL.md
│       ├── document-paths/SKILL.md
│       ├── document-ticket/SKILL.md
│       ├── generate-figma/
│       │   ├── SKILL.md
│       │   └── scripts/
│       │       ├── setup-figma-bridge.mjs
│       │       └── figma-desktop-bridge/   (created by npm run setup:figma-bridge)
│       └── capture-webpage/
│           ├── SKILL.md
│           └── scripts/capture.js
├── work/
│   ├── paths.md
│   └── (see paths.md for pattern)
│       └── README.md
├── package.json
└── README.md
```
