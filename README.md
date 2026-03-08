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

Product Studio connects specialist helpers (subagents) to jobs like [install](.claude/skills/install/SKILL.md), [research](.claude/skills/research/SKILL.md), [document](.claude/skills/document/SKILL.md), and [save](.claude/skills/save/SKILL.md). Each helper has skills: small how-to guides that live in [.claude/skills/](.claude/skills/). You can run a skill by saying its phrase or typing `/skill-name`. In Claude Code and Cursor, `/skills` shows everything available.

**Verify task:** Before anything else, agents run `npm run checklist -- "<request or summary>"` (Step 1 of the [coordinator](.claude/agents/coordinator.md)). That appends the current task to the running checklist at [.tmp/task-checklist.md](.tmp/task-checklist.md) and lists the skills for the flow. See [verify-task](.claude/skills/verify-task/SKILL.md).

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

Say "setup", "install", or [/install](.claude/skills/install/SKILL.md). The [install skill](.claude/skills/install/SKILL.md) walks through the usual steps: config, repo link, optional MCPs (tools that connect to Figma, Jira, etc.), and a short handoff. When it's done, quit the terminal and relaunch. Then in chat run `/mcp` and sign in to Figma and Atlassian when asked.

**Add your own steps:** On install, the template is copied to [.claude/skills/install-custom/SKILL.md](.claude/skills/install-custom/SKILL.md) (gitignored). Put your custom setup in that `SKILL.md`. The [installer](.claude/agents/installer.md) runs it after the main steps when the file exists.

---

## Subagents and their skills

Subagents are defined in [.claude/agents/](.claude/agents/). That's where Claude Code looks for them. ([How subagents work](https://code.claude.com/docs/en/sub-agents.md))

To run a skill, say its trigger phrase or type `/skill-name`. Each skill is a folder under [.claude/skills/](.claude/skills/) with a `SKILL.md` file.

| cleaner |
|:--|
| [![cleaner](https://img.shields.io/badge/cleaner-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/cleaner.md) <br> [![clean](https://img.shields.io/badge/clean-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/clean/SKILL.md) |
| Clears [.tmp/](.tmp/). Use after checking reports. |

| coordinator |
|:--|
| [![coordinator](https://img.shields.io/badge/coordinator-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/coordinator.md) <br> ![skills](https://img.shields.io/badge/skills-%E2%80%94-0ea5e9?style=flat&labelColor=4b5563) |
| Runs the other subagents per flow. Step 1: verify task ([checklist](.claude/skills/verify-task/SKILL.md), `npm run checklist -- "<summary>"`). Flows in [ref/coordinator-flows.md](.claude/agents/ref/coordinator-flows.md). |

| designer |
|:--|
| [![designer](https://img.shields.io/badge/designer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/designer.md) <br> [![designer-figma](https://img.shields.io/badge/designer--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-figma/SKILL.md) [![designer-playbook](https://img.shields.io/badge/designer--playbook-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-playbook/SKILL.md) |
| Creates or updates Figma designs; uses designer-playbook for product design standards. |

| developer |
|:--|
| [![developer](https://img.shields.io/badge/developer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/developer.md) <br> [![developer-typescript](https://img.shields.io/badge/developer--typescript-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-typescript/SKILL.md) [![developer-check-types](https://img.shields.io/badge/developer--check--types-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-check-types/SKILL.md) [![developer-electron](https://img.shields.io/badge/developer--electron-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-electron/SKILL.md) |
| TypeScript and code: types, narrowing, generics, strict mode, type checking. Electron desktop apps: secure architecture, preload, packaging. Plain language. |

| documenter |
|:--|
| [![documenter](https://img.shields.io/badge/documenter-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/documenter.md) <br> [![document](https://img.shields.io/badge/document-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document/SKILL.md) [![document-paths](https://img.shields.io/badge/document--paths-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-paths/SKILL.md) [![document-ticket](https://img.shields.io/badge/document--ticket-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-ticket/SKILL.md) [![document-github](https://img.shields.io/badge/document--github-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-github/SKILL.md) [![document-agent](https://img.shields.io/badge/document--agent-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-agent/SKILL.md) [![document-skills](https://img.shields.io/badge/document--skills-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-skills/SKILL.md) [![designer-playbook](https://img.shields.io/badge/designer--playbook-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-playbook/SKILL.md) |
| Writes and syncs docs (markdown, paths, tickets, READMEs, agents, skills); uses designer-playbook when creating or reviewing product designs. |

| installer |
|:--|
| [![installer](https://img.shields.io/badge/installer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/installer.md) <br> [![install](https://img.shields.io/badge/install-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install/SKILL.md) [![install-custom](https://img.shields.io/badge/install--custom-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install-custom/) |
| Sets up the repo and MCP; runs your custom steps if you add them to [.claude/skills/install-custom/SKILL.md](.claude/skills/install-custom/SKILL.md). Then run /mcp to sign in. |

| researcher |
|:--|
| [![researcher](https://img.shields.io/badge/researcher-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/researcher.md) <br> [![research](https://img.shields.io/badge/research-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/research/SKILL.md) [![research-figma](https://img.shields.io/badge/research--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/research-figma/SKILL.md) |
| Gathers content from links, tickets, and files; can audit Figma designs. |

| strategist |
|:--|
| [![strategist](https://img.shields.io/badge/strategist-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/strategist.md) <br> [![strategize](https://img.shields.io/badge/strategize-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/strategize/SKILL.md) |
| Finds root causes (e.g. Five Whys). |

| uninstaller |
|:--|
| [![uninstaller](https://img.shields.io/badge/uninstaller-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/uninstaller.md) <br> [![uninstall](https://img.shields.io/badge/uninstall-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/uninstall/SKILL.md) |
| Removes Product Studio MCPs from your config. Restart terminal after. |

| updater |
|:--|
| [![updater](https://img.shields.io/badge/updater-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/updater.md) <br> [![update-figma](https://img.shields.io/badge/update--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/update-figma/SKILL.md) [![save](https://img.shields.io/badge/save-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/save/SKILL.md) [![sync-upstream](https://img.shields.io/badge/sync--upstream-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/sync-upstream/SKILL.md) |
| Figma token, commit, or sync with upstream. |

| verifier |
|:--|
| [![verifier](https://img.shields.io/badge/verifier-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/verifier.md) <br> [![verify-paths](https://img.shields.io/badge/verify--paths-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/verify-paths/SKILL.md) [![verify-docs](https://img.shields.io/badge/verify--docs-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/verify-docs/SKILL.md) [![document-verification](https://img.shields.io/badge/document--verification-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-verification/SKILL.md) |
| Checks paths and docs; writes verification report to [.tmp/](.tmp/). |

---
<details>
<summary>Using a working repo with this as upstream</summary>

If your repo uses Product Studio as upstream (e.g. ryanallen/product-studio), add it once:

```bash
git remote add upstream https://github.com/ryanallen/product-studio.git
git fetch upstream
```

Then pull with `git pull upstream main` (or say "sync" or [/sync-upstream](.claude/skills/sync-upstream/SKILL.md)).

**Paths:** [work/paths.md](work/paths.md) is gitignored. Copy from [work/paths.md.template](work/paths.md.template), edit your tree, and keep it. Sync does not overwrite it.

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
│   │   ├── ref/
│   │   │   └── coordinator-flows.md
│   │   ├── developer.md
│   │   ├── designer.md
│   │   ├── documenter.md
│   │   ├── researcher.md
│   │   ├── strategist.md
│   │   ├── verifier.md
│   │   ├── cleaner.md
│   │   ├── installer.md
│   │   ├── customizer.md
│   │   ├── uninstaller.md
│   │   └── updater.md
│   └── skills/
│       ├── research/SKILL.md
│       ├── document/SKILL.md
│       ├── document-voice/SKILL.md
│       ├── document-paths/SKILL.md
│       ├── document-ticket/SKILL.md
│       ├── document-github/SKILL.md
│       ├── document-agent/SKILL.md
│       ├── designer-playbook/SKILL.md
│       ├── document-skills/SKILL.md
│       ├── strategize/SKILL.md
│       ├── research-figma/SKILL.md
│       ├── verify-task/
│       │   ├── SKILL.md
│       │   └── scripts/checklist.ts
│       ├── install/
│       │   └── SKILL.md
│       ├── install-custom/
│       │   └── SKILL.md.template
│       ├── developer-typescript/SKILL.md
│       ├── developer-check-types/SKILL.md
│       ├── developer-electron/SKILL.md
│       ├── save/
│       │   ├── SKILL.md
│       │   └── scripts/
│       ├── sync-upstream/SKILL.md
│       ├── verify-paths/SKILL.md
│       ├── verify-docs/SKILL.md
│       ├── document-verification/SKILL.md
│       ├── clean/
│       │   ├── SKILL.md
│       │   └── scripts/clean.mjs
│       ├── uninstall/SKILL.md
│       ├── update-figma/SKILL.md
│       ├── designer-figma/
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

**[\`.tmp/\`](.tmp/) is for reports and temp files from subagents.** It's gitignored and never committed. The **Clean up studio** flow writes a verification report there. When you're done checking it, run the [**clean**](.claude/skills/clean/SKILL.md) skill ("clean", "wipe .tmp", `/clean`, or `npm run clean`) to empty \`.tmp/\`. Clean only deletes what's inside \`.tmp/\`; the rest of the repo is untouched.

---

## License

[MIT](LICENSE)

<p align="center">
  <sub>If this helped you, consider <a href="https://github.com/ryanallen/product-studio">giving it a star</a>.</sub>
</p>
