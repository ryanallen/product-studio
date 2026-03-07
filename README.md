<div align="center">

<pre>
######## ########  ######  #######  ##    ##  ####### ######## 
##    ## ##    ## ##    ## ##    ## ##    ## ##          ##    
######## ######## ##    ## ##    ## ##    ## ##          ##    
##       ##  ##   ##    ## ##    ## ##    ## ##          ##    
##       ##   ##   ######  #######   ######   #######    ##    

        ####### ######## ##    ## #######  ###  ######  
       ##          ##    ##    ## ##    ##  ## ##    ## 
        ######     ##    ##    ## ##    ##  ## ##    ## 
             ##    ##    ##    ## ##    ##  ## ##    ## 
        #######    ##     ######  #######  ###  ######
</pre>

</div>

<div align="center">
  <img src="assets/hero.png" alt="Product Studio" width="480"/>
</div>

<p align="center">Agent workflows for design capture, research, and strategic analysis.</p>

<p align="center">
  <a href=".claude/agents"><img src="https://img.shields.io/badge/Product%20Studio-Agent%20workflows-6366f1?style=flat" alt="Product Studio"/></a>
  <a href=".claude/skills"><img src="https://img.shields.io/badge/Skills-Custom-0ea5e9?style=flat" alt="Custom skills"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat" alt="License"/></a>
  <a href="https://github.com/ryanallen/product-studio/generate"><img src="https://img.shields.io/badge/Use-this%20template-10b981?style=flat" alt="Use this template"/></a>
</p>

---

**Source**: [https://github.com/ryanallen/product-studio](https://github.com/ryanallen/product-studio)

---

> Say "install" or "research" or "document". Skills and agents do the rest.

Product Studio wires researcher, documenter, strategist, verifier, and other agents to workflows: install, discover, clean up studio, save. Skills live under `.claude/skills/`; call them by trigger phrase or `/skill-name`. In Claude Code and Cursor, `/skills` lists all.

## Table of contents

- [Setup](#-setup)
- [Agents and skills](#-agents-and-their-skills)
- [Coordinator](#-coordinator)
- [Customizer](#-customizer)
- [Designer](#-designer)
- [Documenter](#-documenter)
- [Installer](#-installer)
- [Uninstaller](#-uninstaller)
- [Verifier](#-verifier)
- [Verification-documentor](#-verification-documentor)
- [Cleaner](#-cleaner)
- [Updater](#-updater)
- [Researcher](#-researcher)
- [Strategist](#-strategist)
- [Repo structure](#-repo-structure)
- [.tmp and cleanup](#-tmp-and-cleanup)

---

## Setup

Say "setup", "install", or `/install`. The [install skill](.claude/skills/install/SKILL.md) runs the standard steps (config, repo link, show hidden files, MCPs, handoff). After that, quit the terminal and relaunch, then run `/mcp` in the chat and complete OAuth for Figma and Atlassian.

Custom setup: Add your own steps or notes to the bottom of `.claude/skills/install-custom/SKILL.md.template`. During install that template is copied to `SKILL.md` (gitignored); the [customizer](.claude/agents/customizer.md) then runs that file.

---

## Agents and their skills

Call a skill by saying its trigger phrase or typing `/skill-name`. Skills live in `.claude/skills/` in a kebab-case folder with `SKILL.md` (e.g. `.claude/skills/save/SKILL.md`).

### Coordinator

Orchestrates researcher, documenter, strategist, verifier, verification-documentor, cleaner, updater. Discover: research, document, strategize, audit, propose, update ticket. Clean up studio: say "clean up studio" or "verify docs"; verifier checks heading hierarchy, nav, emojis; report saved to .tmp; optionally run cleaner to wipe .tmp. No skill of its own. See [coordinator](.claude/agents/coordinator.md).

### Customizer

Runs `.claude/skills/install-custom/SKILL.md` after the installer (local overrides; that file is created from `SKILL.md.template` during install and is gitignored). See [customizer](.claude/agents/customizer.md).

### Designer

- **generate-figma**: Generate or update a Figma design by calling the Figma Console MCP with target file details. "generate Figma", "generate design", /generate-figma.

### Documenter

Documenter skills use the `document` prefix: **document**, **document-paths**, **document-ticket**.
- **document**: Take research output and produce structured markdown with mermaid diagrams. "write up", "document", /document.
- **document-paths**: Sync work/paths.md tree with actual paths under work/. Handoff from verifier (verify-paths).
- **document-ticket**: Post a comment on a Jira ticket with link to project deliverables. "update ticket", "Jira", /document-ticket.

### Installer

- **install**: Run the standard Product Studio install steps: config (paths.md), repo link (from git or ask), show hidden files, MCPs, Figma bridge if chosen, handoff. "setup", "install", /install. Then quit terminal, relaunch, run /mcp and complete OAuth for Figma and Atlassian.

### Uninstaller

- **uninstall**: Remove Product Studio MCP entries from the user's global config. "uninstall", "remove MCP", /uninstall. See [uninstall skill](.claude/skills/uninstall/SKILL.md). Then restart terminal.

### Verifier

- **verify-paths**: Compare work/paths.md to actual paths under work/. If mismatch, hand off to documenter (document-paths). Used in Save flow.
- **verify-docs**: Check all documents (paths.md + system + projects) for proper h1/h2/h3 hierarchy, horizontal top nav to sections, and emojis at start of every headline. Used in Clean up studio flow.

### Verification-documentor

- **document-verification**: After verify-docs, track all files processed, compare to README and paths.md, write `.tmp/verification-report.md` for user verification. Used in Clean up studio flow.

### Cleaner

- **clean**: Delete everything in `.tmp/`. "clean", "wipe .tmp", /clean. Use after verifying the report.

### Updater

- **update-figma**: Update the Figma token in figma-console MCP config. "update Figma token", "renew Figma token", /update-figma.
- **save**: Stage all and create a commit with derived message. "save", "stage", or "commit", /save. Does not push.
- **sync-upstream**: Sync from upstream main, push to origin. "sync", "pull", /sync-upstream.

### Researcher

- **research**: Gather from any input (ticket, URL(s), text, file(s), image(s)) and follow links up to 5 levels deep; documenter then structures the output. "research", "learn about this", "look at this", /research.
- **analyze-figma**: Analyze a Figma link and produce a structured report. General link = full file; specific link (with node-id) = deep analysis from that node. "analyze Figma", "Figma audit", /analyze-figma. Give Figma design URL.

### Strategist

- **strategize**: Analyze findings with Five Whys, identify root causes and propose solutions. "why broken", "find cause", /strategize.

<details>
<summary>Using a working repo with this as upstream</summary>

For a working repo that pulls from Product Studio as upstream (e.g. ryanallen/product-studio).

**Add upstream.** In the working repo:

```bash
git remote add upstream https://github.com/ryanallen/product-studio.git
git fetch upstream
```

Pull with `git pull upstream main` (or say "sync", "pull", or /sync-upstream).

**Local paths config.** `work/paths.md` is gitignored. Copy from `work/paths.md.template` once and edit the tree; sync never overwrites it.

</details>

---

## Repo structure

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
│   │   ├── verification-documentor.md
│   │   ├── cleaner.md
│   │   ├── installer.md
│   │   ├── uninstaller.md
│   │   ├── updater.md
│   │   └── customizer.md
│   └── skills/
│       ├── research/SKILL.md
│       ├── document/SKILL.md
│       ├── strategize/SKILL.md
│       ├── analyze-figma/SKILL.md
│       ├── install/
│       │   └── SKILL.md
│       ├── install-custom/
│       │   └── SKILL.md.template
│       ├── save/
│       │   ├── SKILL.md
│       │   └── scripts/
│       │       └── sync-codex-from-claude.mjs
│       ├── sync-upstream/SKILL.md
│       ├── verify-paths/SKILL.md
│       ├── verify-docs/SKILL.md
│       ├── document-verification/SKILL.md
│       ├── clean/SKILL.md
│       ├── uninstall/SKILL.md
│       ├── update-figma/SKILL.md
│       ├── document-paths/SKILL.md
│       ├── document-ticket/SKILL.md
│       ├── generate-figma/
│       │   ├── SKILL.md
│       │   └── scripts/
│       │       ├── setup-figma-bridge.mjs
│       │       └── figma-desktop-bridge/
├── .tmp/
├── work/
│   ├── paths.md.template
│   └── {team}/{space}/{ticket-id}/{project}/
│       └── README.md
├── package.json
└── README.md
```

### .tmp and cleanup

**`.tmp/`** holds agent-generated reports and temp files. It is gitignored and never committed. The **Clean up studio** flow writes a verification report to `.tmp/verification-report.md` (after verify-docs and document-verification). After you verify the report, optionally run the **clean** skill ("clean", "wipe .tmp", /clean) to delete all contents of `.tmp/`. The clean skill only removes files inside `.tmp/`; it does not touch the rest of the repo.

---

## License

[MIT](LICENSE)

<p align="center">
  <sub>If this helped you, consider <a href="https://github.com/ryanallen/product-studio">giving it a star</a>.</sub>
</p>
