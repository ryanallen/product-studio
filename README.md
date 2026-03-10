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

**Verify task:** Before anything else, agents run `npm run checklist -- "<request or summary>"` (Step 1 of the [coordinator](.claude/agents/coordinator.md)). That appends the current task to the running checklist at [.tmp/task-checklist.md](.tmp/task-checklist.md) and lists the skills for the flow. See [verify-task](.claude/skills/verify-task/SKILL.md). For a plain-language explanation of these commands and scripts, see [How it works (details)](.claude/agents/references/how-it-works.md). [Deterministic workflows](.claude/agents/references/deterministic-workflows.md).

## Contents

<details>
<summary>On this page</summary>

- [Setup](#-setup)
- [Subagents and skills](#-subagents-and-their-skills)
- [Frontmatter (agents and skills)](#-frontmatter-agents-and-skills)
- [Repo structure](#-repo-structure)
- [.tmp and cleanup](#-tmp-and-cleanup)
- [How it works (details)](#-how-it-works-details)

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
| Runs the other subagents per flow. Step 1: verify task ([checklist](.claude/skills/verify-task/SKILL.md), `npm run checklist -- "<summary>"`). Flows in [references/coordinator-flows.md](.claude/agents/references/coordinator-flows.md). Refine flow: researcher when the user shared links or context that needs learning, then documenter. |

| designer |
|:--|
| [![designer](https://img.shields.io/badge/designer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/designer.md) <br> [![designer-figma](https://img.shields.io/badge/designer--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-figma/SKILL.md) [![designer-playbook](https://img.shields.io/badge/designer--playbook-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-playbook/SKILL.md) |
| Creates or updates Figma designs; uses designer-playbook for product design standards. |

| developer |
|:--|
| [![developer](https://img.shields.io/badge/developer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/developer.md) <br> [![developer-typescript](https://img.shields.io/badge/developer--typescript-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-typescript/SKILL.md) [![developer-check-types](https://img.shields.io/badge/developer--check--types-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-check-types/SKILL.md) [![developer-electron](https://img.shields.io/badge/developer--electron-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-electron/SKILL.md) [![developer-electrobun](https://img.shields.io/badge/developer--electrobun-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-electrobun/SKILL.md) [![developer-virtualization](https://img.shields.io/badge/developer--virtualization-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-virtualization/SKILL.md) |
| TypeScript and code: types, narrowing, generics, strict mode, type checking. Electron and Electrobun desktop apps. VM best practices when the document flow calls developer and it needs that context. Plain language. |

| documenter |
|:--|
| [![documenter](https://img.shields.io/badge/documenter-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/documenter.md) <br> [![document](https://img.shields.io/badge/document-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document/SKILL.md) [![document-paths](https://img.shields.io/badge/document--paths-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-paths/SKILL.md) [![document-ticket](https://img.shields.io/badge/document--ticket-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-ticket/SKILL.md) [![document-github](https://img.shields.io/badge/document--github-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-github/SKILL.md) [![document-agent](https://img.shields.io/badge/document--agents-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-agents/SKILL.md) [![document-skills](https://img.shields.io/badge/document--skills-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-skills/SKILL.md) [![designer-playbook](https://img.shields.io/badge/designer--playbook-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-playbook/SKILL.md) |
| Writes and syncs docs (markdown, paths, tickets, READMEs, agents, skills); uses designer-playbook when creating or reviewing product designs. At end of job: lists files in scope in the checklist (name, location, content summary), reviews each for needed updates, checks off with notes. |

| installer |
|:--|
| [![installer](https://img.shields.io/badge/installer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/installer.md) <br> [![install](https://img.shields.io/badge/install-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install/SKILL.md) [![install-custom](https://img.shields.io/badge/install--custom-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install-custom/) |
| Sets up the repo and MCP; runs your custom steps if you add them to [.claude/skills/install-custom/SKILL.md](.claude/skills/install-custom/SKILL.md). Then run /mcp to sign in. |

| researcher |
|:--|
| [![researcher](https://img.shields.io/badge/researcher-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/researcher.md) <br> [![research](https://img.shields.io/badge/research-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/research/SKILL.md) [![research-figma](https://img.shields.io/badge/research--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/research-figma/SKILL.md) |
| Gathers content from links, tickets, and files; can audit Figma designs. |

| analyst |
|:--|
| [![analyst](https://img.shields.io/badge/analyst-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/analyst.md) <br> [![analyst-diagnostics](https://img.shields.io/badge/analyst--diagnostics-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/analyst-diagnostics/SKILL.md) |
| Finds root causes (e.g. Five Whys, Ishikawa, Lovebug). |

| uninstaller |
|:--|
| [![uninstaller](https://img.shields.io/badge/uninstaller-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/uninstaller.md) <br> [![uninstall](https://img.shields.io/badge/uninstall-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/uninstall/SKILL.md) |
| Removes Product Studio MCPs from your config. Restart terminal after. |

| updater |
|:--|
| [![updater](https://img.shields.io/badge/updater-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/updater.md) <br> [![update-figma](https://img.shields.io/badge/update--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/update-figma/SKILL.md) [![save](https://img.shields.io/badge/save-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/save/SKILL.md) [![sync-upstream](https://img.shields.io/badge/sync--upstream-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/sync-upstream/SKILL.md) [![update-gitignore](https://img.shields.io/badge/update--gitignore-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/update-gitignore/SKILL.md) |
| Figma token, commit, sync upstream, or explain/update ignore rules. |

---

## Frontmatter (agents and skills)

<details>
<summary>What the YAML at the top of agents and skills means</summary>

Agents (`.claude/agents/*.md`) and skills (`.claude/skills/<name>/SKILL.md`) use a YAML block between the first `---` lines. This is frontmatter. Here’s what each field does and why we set it the way we do.

### Common to both

| Field | Meaning | Reasoning |
|-------|--------|-----------|
| `name` | Identifier and slash-command (e.g. `/document`). Lowercase, letters, numbers, hyphens. | Lets users and flows invoke by name. Defaults to folder name if omitted. |
| `description` | What this agent or skill does and when to use it. Include phrases users might say (e.g. "Use when user says save, sync, /save"). | Per [official docs](https://code.claude.com/docs/en/skills.md#frontmatter-reference), Claude uses description to decide when to apply. No separate `triggers` field; put matching phrases in the description. |


### Skills only

| Field | Meaning | Reasoning |
|-------|--------|-----------|
| `disable-model-invocation` | `true` = only run when explicitly asked or when an agent runs it. | Used for skills that change things (write files, deploy) or must run only on purpose. The agent that invokes the skill should have matching phrases in its description. |
| `argument-hint` | Shown in autocomplete (e.g. `[skill-path] [source]`). | Tells the user what optional args they can pass. |
| `context` | e.g. `fork` = run in a subagent. | Keeps the main chat clean when the skill does multi-step or file-changing work. |
| `agent` | When `context: fork`, which subagent type (e.g. `general-purpose`). | Picks the runner so the forked task has the right tools and behavior. |
| `user-invocable` | `false` = hide from `/` menu; skill is only used when referenced. | For skills that are internal to a flow. |
| `allowed-tools` | Optional allowlist of tools the skill can use without asking. | Restricts or focuses tool use. |
| `model` | Optional model override when this skill runs. | Use when a task needs a specific model. |

### Agents only

| Field | Meaning | Reasoning |
|-------|--------|-----------|
| `tools` | Tools this agent can use (e.g. Read, Write, MCP tools). | Scopes capability; listed in agent file. |
| `model` | Preferred model(s) for this agent (e.g. opus, sonnet). | Match model to task (e.g. research vs. quick edits). |

**Summary:** Per official docs there is no `triggers` field. Put "when to use" and example phrases in the **description** so Claude and the coordinator can match. Skills that are run only when asked use `disable-model-invocation: true`; the agent that invokes them lists those phrases in its description. Fork plus agent type keeps heavy or write-heavy skills in a subagent.

</details>

---

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

**Paths:** [work/paths.md](work/paths.md) is gitignored. Copy from [work/paths.md.template](work/paths.md.template), edit your tree, and keep it. Sync does not overwrite it. Per paths.md: one README per project as the main doc; supplementary docs go in that project's `assets/docs/` folder with kebab-case filenames.

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
│   │   ├── assets/
│   │   │   └── docs/
│   │   │       ├── coordinator-flows.md
│   │   │       ├── deterministic-workflows.md
│   │   │       ├── how-it-works.md
│   │   │   └── scripts-review.md
│   │   ├── developer.md
│   │   ├── designer.md
│   │   ├── documenter.md
│   │   ├── researcher.md
│   │   ├── analyst.md
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
│       ├── document-agents/SKILL.md
│       ├── designer-playbook/SKILL.md
│       ├── document-skills/SKILL.md
│       ├── analyst-diagnostics/SKILL.md
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
│       ├── developer-virtualization/SKILL.md
│       ├── uninstall/SKILL.md
│       ├── update-figma/SKILL.md
│       ├── update-gitignore/SKILL.md
│       ├── designer-figma/
│       │   ├── SKILL.md
│       │   └── scripts/
│       │       ├── setup-figma-bridge.mjs
│       │       └── figma-desktop-bridge/
├── .tmp/
├── work/
│   ├── paths.md
│   ├── paths.md.template
│   └── {team}/{space}/{ticket-id}/{project}/
│       ├── README.md
│       └── assets/
│           └── docs/
├── package.json
└── README.md
```

### .tmp and cleanup

**[\`.tmp/\`](.tmp/) is for reports and temp files from subagents.** It's gitignored and never committed. The **Clean up studio** flow writes a verification report there. When you're done checking it, run the [**clean**](.claude/skills/clean/SKILL.md) skill ("clean", "wipe .tmp", `/clean`, or `npm run clean`) to empty \`.tmp/\`. Clean only deletes what's inside \`.tmp/\`; the rest of the repo is untouched.

---

## How it works (details)

<details>
<summary>Plain-language explanation of npm, the checklist command, and why we use scripts</summary>

What is npm? What does `npm run checklist -- "something"` actually do? Why use TypeScript scripts instead of letting the AI decide the steps? For short, simple answers to these (and where to find the logic), see **[How it works (details)](.claude/agents/references/how-it-works.md)**. The main README stays short; the details live there.

</details>

---

## License

[MIT](LICENSE)

<p align="center">
  <sub>If this helped you, consider <a href="https://github.com/ryanallen/product-studio">giving it a star</a>.</sub>
</p>
