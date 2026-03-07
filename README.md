<div align="center">
<pre>
██████╗ ██████╗ ██████╗ ██████╗ ██╗  ██╗██████╗ ████████╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔════╝╚══██╔══╝
██████╔╝██████╔╝██║  ██║██║  ██║██║  ██║██║        ██║   
██╔═══╝ ██╔══██╗██║  ██║██║  ██║██║  ██║██║        ██║   
██║     ██║  ██║╚█████╔╝██████╔╝╚█████╔╝╚█████╗    ██║   
╚═╝     ╚═╝  ╚═╝ ╚════╝ ╚═════╝  ╚════╝  ╚════╝    ╚═╝   
███████╗████████╗██╗  ██╗██████╗ ██╗██████╗ 
██╔════╝╚══██╔══╝██║  ██║██╔══██╗██║██╔══██╗
███████╗   ██║   ██║  ██║██║  ██║██║██║  ██║
╚════██║   ██║   ██║  ██║██║  ██║██║██║  ██║
███████║   ██║   ╚█████╔╝██████╔╝██║╚█████╔╝
╚══════╝   ╚═╝    ╚════╝ ╚═════╝ ╚═╝ ╚════╝ 
</pre>

</div>

![product-studio](https://raw.githubusercontent.com/ryanallen/product-studio/main/assets/hero.gif)

<div align="center">

Subagents for design capture, research, and strategic analysis.

<img src="https://img.shields.io/badge/product--studio-subagents-6366f1?style=flat" alt="product-studio" />
<img src="https://img.shields.io/badge/subagent-skills-0ea5e9?style=flat&labelColor=4b5563" alt="subagent skills" />
<img src="https://img.shields.io/badge/license-MIT-green?style=flat" alt="License" />
<a href="https://github.com/ryanallen/product-studio/generate"><img src="https://img.shields.io/badge/Use%20this%20template-%E2%96%B6-10b981?style=flat&labelColor=4b5563" alt="Use this template" /></a>

<a href=".claude/agents">.claude/agents</a> · <a href="LICENSE">LICENSE</a> · <a href="https://github.com/ryanallen/product-studio/generate">Use this template</a>

</div>

---

**Source**: [https://github.com/ryanallen/product-studio](https://github.com/ryanallen/product-studio)

---

> Say "install", "research", or "document". The rest runs on its own.

Product Studio connects specialist helpers (subagents) to jobs like install, research, document, and save. Each helper has skills: small how-to guides that live in `.claude/skills/`. You can run a skill by saying its phrase or typing `/skill-name`. In Claude Code and Cursor, `/skills` shows everything available.

## Contents

<details>
<summary>On this page</summary>

- [Setup](#-setup)
- [Subagents and skills](#-subagents-and-their-skills)
- [Repo structure](#-repo-structure)
- [.tmp and cleanup](#-tmp-and-cleanup)

</details>

---

## Setup

Say "setup", "install", or `/install`. The [install skill](.claude/skills/install/SKILL.md) walks through the usual steps: config, repo link, optional MCPs (tools that connect to Figma, Jira, etc.), and a short handoff. When it's done, quit the terminal and relaunch. Then in chat run `/mcp` and sign in to Figma and Atlassian when asked.

**Add your own steps:** On install, the template is copied to `.claude/skills/install-custom/SKILL.md` (gitignored). Put your custom setup in that `SKILL.md`. The installer runs it after the main steps when the file exists.

---

## Subagents and their skills

Subagents are defined in `.claude/agents/`. That's where Claude Code looks for them. ([How subagents work](https://code.claude.com/docs/en/sub-agents.md))

To run a skill, say its trigger phrase or type `/skill-name`. Each skill is a folder under `.claude/skills/` with a `SKILL.md` file.

| cleaner |
|:--|
| [![cleaner](https://img.shields.io/badge/cleaner-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/cleaner.md) [![clean](https://img.shields.io/badge/clean-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/clean/SKILL.md) |
| Empties `.tmp/`. Use after you've checked the verification report. "clean", "wipe .tmp", /clean. |

| coordinator |
|:--|
| [![coordinator](https://img.shields.io/badge/coordinator-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/coordinator.md) ![skills](https://img.shields.io/badge/skills-%E2%80%94-0ea5e9?style=flat&labelColor=4b5563) |
| Runs the other subagents in order. Handles Discover (research, document, strategize, update ticket) and Clean up studio (verify docs, then optionally clean .tmp). No skill of its own. |

| designer |
|:--|
| [![designer](https://img.shields.io/badge/designer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/designer.md) [![generate-figma](https://img.shields.io/badge/generate--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/generate-figma/SKILL.md) |
| Create or update a Figma design using the Figma MCP. Say "generate Figma", "generate design", or /generate-figma. |

| documenter |
|:--|
| [![documenter](https://img.shields.io/badge/documenter-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/documenter.md) [![document](https://img.shields.io/badge/document-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document/SKILL.md) [![document-paths](https://img.shields.io/badge/document--paths-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-paths/SKILL.md) [![document-ticket](https://img.shields.io/badge/document--ticket-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-ticket/SKILL.md) [![document-github](https://img.shields.io/badge/document--github-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-github/SKILL.md) [![document-agent](https://img.shields.io/badge/document--agent-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-agent/SKILL.md) [![document-skills](https://img.shields.io/badge/document--skills-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-skills/SKILL.md) |
| **document**: Turn research into structured markdown (and mermaid diagrams). "write up", "document", /document. **document-paths**: Keep work/paths.md in sync with real folders. **document-ticket**: Add a Jira comment with a link to deliverables. **document-github**: Rules for READMEs (GIFs, badges, links). **document-agent**: Use subagents to write or update subagent files. **document-skills**: Write or update a skill (SKILL.md). |

| installer |
|:--|
| [![installer](https://img.shields.io/badge/installer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/installer.md) [![install](https://img.shields.io/badge/install-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install/SKILL.md) [![install-custom](https://img.shields.io/badge/install--custom-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install-custom/) |
| Runs the full install: config, choices, MCP setup, optional Figma bridge, handoff. If you added custom steps in `.claude/skills/install-custom/SKILL.md`, runs those after. Say "setup", "install", or /install. Then quit terminal, relaunch, and run /mcp to sign in to Figma and Atlassian. |

| researcher |
|:--|
| [![researcher](https://img.shields.io/badge/researcher-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/researcher.md) [![research](https://img.shields.io/badge/research-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/research/SKILL.md) [![analyze-figma](https://img.shields.io/badge/analyze--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/analyze-figma/SKILL.md) |
| **research**: Pull in tickets, URLs, text, files, or images and follow links (up to 5 levels). Documenter then shapes the output. "research", "learn about this", /research. **analyze-figma**: Audit a Figma design link and output a report. "analyze Figma", /analyze-figma. Give the Figma URL. |

| strategist |
|:--|
| [![strategist](https://img.shields.io/badge/strategist-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/strategist.md) [![strategize](https://img.shields.io/badge/strategize-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/strategize/SKILL.md) |
| Dig into problems (Five Whys), find root causes, and suggest fixes. "why broken", "find cause", /strategize. |

| uninstaller |
|:--|
| [![uninstaller](https://img.shields.io/badge/uninstaller-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/uninstaller.md) [![uninstall](https://img.shields.io/badge/uninstall-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/uninstall/SKILL.md) |
| Removes Product Studio MCPs from your config. "uninstall", "remove MCP", /uninstall. Restart the terminal after. |

| updater |
|:--|
| [![updater](https://img.shields.io/badge/updater-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/updater.md) [![update-figma](https://img.shields.io/badge/update--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/update-figma/SKILL.md) [![save](https://img.shields.io/badge/save-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/save/SKILL.md) [![sync-upstream](https://img.shields.io/badge/sync--upstream-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/sync-upstream/SKILL.md) |
| **update-figma**: Refresh the Figma token in the MCP config. "update Figma token", /update-figma. **save**: Stage everything and commit (message is derived from changes). "save", "stage", /save. Does not push. **sync-upstream**: Pull from upstream main and push to your repo. "sync", "pull", /sync-upstream. |

| verifier |
|:--|
| [![verifier](https://img.shields.io/badge/verifier-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/verifier.md) [![verify-paths](https://img.shields.io/badge/verify--paths-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/verify-paths/SKILL.md) [![verify-docs](https://img.shields.io/badge/verify--docs-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/verify-docs/SKILL.md) [![document-verification](https://img.shields.io/badge/document--verification-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-verification/SKILL.md) |
| **verify-paths**: Compare work/paths.md to the real folder tree. If they differ, hand off to documenter. Part of Save. **verify-docs**: Check docs for heading order, top nav, and emojis on headings. **document-verification**: After verify-docs, list what was checked and write a report to `.tmp/`. Part of Clean up studio. |

---
<details>
<summary>Using a working repo with this as upstream</summary>

If your repo uses Product Studio as upstream (e.g. ryanallen/product-studio), add it once:

```bash
git remote add upstream https://github.com/ryanallen/product-studio.git
git fetch upstream
```

Then pull with `git pull upstream main` (or say "sync" or /sync-upstream).

**Paths:** `work/paths.md` is gitignored. Copy from `work/paths.md.template`, edit your tree, and keep it. Sync does not overwrite it.

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
│       ├── document-github/SKILL.md
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

**`.tmp/`** is for reports and temp files from subagents. It's gitignored and never committed. The **Clean up studio** flow writes a verification report there. When you're done checking it, you can run the **clean** skill ("clean", "wipe .tmp", /clean) to empty `.tmp/`. Clean only deletes what's inside `.tmp/`; the rest of the repo is untouched.

---

## License

[MIT](LICENSE)

<p align="center">
  <sub>If this helped you, consider <a href="https://github.com/ryanallen/product-studio">giving it a star</a>.</sub>
</p>
