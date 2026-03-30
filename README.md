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

![product-studio](assets/hero.gif)

<div align="center">

Agents and skills for design capture, research, and strategic analysis. Discover, Learn, Refine, Research, and Propose solutions run as agent teams when possible; fallback is the step sequence.

<img src="https://img.shields.io/badge/product--studio-subagents-6366f1?style=flat" alt="product-studio" />
<img src="https://img.shields.io/badge/subagent-skills-0ea5e9?style=flat&labelColor=4b5563" alt="subagent skills" />
<img src="https://img.shields.io/badge/license-MIT-green?style=flat" alt="License" />
<a href="/generate"><img src="https://img.shields.io/badge/Use%20this%20template-%E2%96%B6-10b981?style=flat&labelColor=4b5563" alt="Use this template" /></a>

<a href=".claude/agents">.claude/agents</a> · <a href="LICENSE">LICENSE</a>

</div>

---

> Say "install", "research", or "document". The rest runs on its own.

Product Studio connects specialist agents to jobs like [install](.claude/skills/install/SKILL.md), [research](.claude/skills/research/SKILL.md), [document](.claude/skills/document/SKILL.md), [save](.claude/skills/save/SKILL.md), and [ask](.claude/skills/ask/SKILL.md) (read-only Q&A, `/ask`). Agents live in [.claude/agents/](.claude/agents/); skills (how-to guides) in [.claude/skills/](.claude/skills/). Say a phrase or `/skill-name` to run a skill; `/skills` lists all.

**Verify task:** First step is `npm run checklist -- "<request or summary>"`. The [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts) is the single source of truth for flow and steps; it appends the task to [.tmp/verify-task-checklist.md](.tmp/verify-task-checklist.md) when the flow includes verify-task. [verify-task](.claude/skills/verify-task/SKILL.md). **[ask](.claude/skills/ask/SKILL.md)** (`/ask` **in that message**): read-only, skips the checklist; **each** message needs `/ask` again or it is normal mode. For Discover, Learn, Refine, Research, and Propose solutions, run as an [agent team](.claude/agents/references/agent-teams.md) when possible; fallback is the flow's step sequence.

## Contents

<details>
<summary>On this page</summary>

- [Setup](#-setup)
- [Agents and skills](#-agents-and-skills)
- [Skills without agents](#skills-without-agents)
- [Frontmatter (agents and skills)](#-frontmatter-agents-and-skills)
- [Repo structure](#-repo-structure)
- [.tmp and cleanup](#-tmp-and-cleanup)
- [How it works (details)](#-how-it-works-details)

</details>

---

## Setup

Say "setup", "install", or [/install](.claude/skills/install/SKILL.md). The [install skill](.claude/skills/install/SKILL.md) walks through the usual steps: config, repo link, optional MCPs (Figma, Jira/Atlassian, GitHub, GoDaddy domain search), and a short handoff. When it's done, quit the terminal and relaunch. Then in chat run `/mcp` and sign in to Figma and Atlassian when asked (GoDaddy needs no sign-in).

**Add your own steps:** On install, the template is copied to [.claude/skills/install-custom/SKILL.md](.claude/skills/install-custom/SKILL.md) (gitignored). Put your custom setup in that `SKILL.md`. The [installer](.claude/agents/installer.md) runs it after the main steps when the file exists.

---

## Agents and skills

Agents are in [.claude/agents/](.claude/agents/) ([subagents](https://code.claude.com/docs/en/sub-agents)). Skills live under [.claude/skills/](.claude/skills/) (one `SKILL.md` per skill). Say the trigger phrase or `/skill-name` to run a skill.

### Skills without agents

Many skills have **no** matching `.claude/agents/<name>.md`. That is normal.

- **Skills** are procedures: the host loads them from a phrase, `/skill-name`, or a checklist step. They do not require a named subagent file.
- **Agents** are optional named subagents (role, tools, model). Add one when you want a stable persona for routing, forked work, or [agent teams](.claude/agents/references/agent-teams.md). Example: [documenter](.claude/agents/documenter.md) pairs with several `document-*` skills; the skills are still real without each having their own agent.
- **Skill-only examples:** [ask](.claude/skills/ask/SKILL.md) (read-only when `/ask` is used **in that message**; not sticky across follow-ups), [verify-task](.claude/skills/verify-task/SKILL.md), [save](.claude/skills/save/SKILL.md), [document-voice](.claude/skills/document-voice/SKILL.md), [verify-paths](.claude/skills/verify-paths/SKILL.md), and other flow helpers. They appear in the tables below next to related agents where there is a natural pairing, or under **flows** / **verifier** when they are shared infrastructure.

**When to add a new agent:** Only if you need a dedicated subagent definition. Otherwise add or update a skill under `.claude/skills/` and, if you use the checklist, the step name in [verify-task-checklist.ts](.claude/skills/verify-task/scripts/verify-task-checklist.ts).

| analyst |
|:--|
| [![analyst](https://img.shields.io/badge/analyst-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/analyst.md) <br> [![analyst-diagnostics](https://img.shields.io/badge/analyst--diagnostics-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/analyst-diagnostics/SKILL.md) |
| Finds root causes (e.g. Five Whys, Ishikawa, Lovebug). |

| cleaner |
|:--|
| [![cleaner](https://img.shields.io/badge/cleaner-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/cleaner.md) <br> [![clean](https://img.shields.io/badge/clean-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/clean/SKILL.md) |
| Clears [.tmp/](.tmp/). Use after checking reports. |

| flows |
|:--|
| [![verify-task](https://img.shields.io/badge/verify--task-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/verify-task/SKILL.md) [![ask](https://img.shields.io/badge/ask-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/ask/SKILL.md) |
| **[verify-task](.claude/skills/verify-task/SKILL.md)** drives the checklist; steps come only from [verify-task-checklist.ts](.claude/skills/verify-task/scripts/verify-task-checklist.ts). Step 1 for normal work: `npm run checklist -- "<summary>"`. **[ask](.claude/skills/ask/SKILL.md)** has no agent file: run `/ask` **per message** for read-only Q&A (skips checklist, no edits); follow-ups without `/ask` use the checklist again (see [AGENTS.md](AGENTS.md)). Discover, Learn, Refine, Research, Propose solutions: run as [agent team](.claude/agents/references/agent-teams.md) when possible; else use the flow's step sequence. User test plan: [document-usertestplan](.claude/skills/document-usertestplan/SKILL.md). Refine: researcher when user shared links/context, then documenter. |

| designer |
|:--|
| [![designer](https://img.shields.io/badge/designer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/designer.md) <br> [![designer-figma](https://img.shields.io/badge/designer--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-figma/SKILL.md) [![designer-playbook](https://img.shields.io/badge/designer--playbook-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-playbook/SKILL.md) |
| Creates or updates Figma designs; uses designer-playbook for product design standards. |

| developer |
|:--|
| [![developer](https://img.shields.io/badge/developer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/developer.md) <br> [![developer-typescript](https://img.shields.io/badge/developer--typescript-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-typescript/SKILL.md) [![developer-check-types](https://img.shields.io/badge/developer--check--types-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-check-types/SKILL.md) [![developer-python](https://img.shields.io/badge/developer--python-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-python/SKILL.md) [![developer-electron](https://img.shields.io/badge/developer--electron-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-electron/SKILL.md) [![developer-electrobun](https://img.shields.io/badge/developer--electrobun-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-electrobun/SKILL.md) [![developer-virtualization](https://img.shields.io/badge/developer--virtualization-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/developer-virtualization/SKILL.md) |
| TypeScript and code: types, narrowing, generics, strict mode, type checking. Python: PEP 8, py_compile, pytest, uv, Pythonic patterns. Electron and Electrobun desktop apps. VM best practices when the document flow calls developer and it needs that context. Plain language. |

| documenter |
|:--|
| [![documenter](https://img.shields.io/badge/documenter-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/documenter.md) <br> [![document](https://img.shields.io/badge/document-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document/SKILL.md) [![document-paths](https://img.shields.io/badge/document--paths-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-paths/SKILL.md) [![document-ticket](https://img.shields.io/badge/document--ticket-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-ticket/SKILL.md) [![document-github](https://img.shields.io/badge/document--github-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-github/SKILL.md) [![document-agents](https://img.shields.io/badge/document--agents-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-agents/SKILL.md) [![document-skills](https://img.shields.io/badge/document--skills-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-skills/SKILL.md) [![document-agent-teams](https://img.shields.io/badge/document--agent--teams-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-agent-teams/SKILL.md) [![document-usertestplan](https://img.shields.io/badge/document--usertestplan-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-usertestplan/SKILL.md) [![designer-playbook](https://img.shields.io/badge/designer--playbook-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/designer-playbook/SKILL.md) |
| Docs: markdown, paths, tickets, READMEs, agents, skills, agent teams, user test plans, code documentation (uses developer skills); designer-playbook for product designs. End of job: files in scope in checklist (name, location, summary), review and check off. |

| installer |
|:--|
| [![installer](https://img.shields.io/badge/installer-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/installer.md) <br> [![install](https://img.shields.io/badge/install-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install/SKILL.md) [![install-custom](https://img.shields.io/badge/install--custom-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/install-custom/) |
| Sets up the repo and MCP; runs your custom steps if you add them to [.claude/skills/install-custom/SKILL.md](.claude/skills/install-custom/SKILL.md). Then run /mcp to sign in. |

| researcher |
|:--|
| [![researcher](https://img.shields.io/badge/researcher-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/researcher.md) <br> [![research](https://img.shields.io/badge/research-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/research/SKILL.md) [![research-figma](https://img.shields.io/badge/research--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/research-figma/SKILL.md) |
| Gathers content from links, tickets, and files; can audit Figma designs. |

| uninstaller |
|:--|
| [![uninstaller](https://img.shields.io/badge/uninstaller-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/uninstaller.md) <br> [![uninstall](https://img.shields.io/badge/uninstall-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/uninstall/SKILL.md) |
| Removes Product Studio MCPs (Figma, Atlassian, GitHub, GoDaddy) from your config. Restart terminal after. |

| updater |
|:--|
| [![updater](https://img.shields.io/badge/updater-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/updater.md) <br> [![update-figma](https://img.shields.io/badge/update--figma-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/update-figma/SKILL.md) [![save](https://img.shields.io/badge/save-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/save/SKILL.md) [![sync-upstream](https://img.shields.io/badge/sync--upstream-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/sync-upstream/SKILL.md) [![update-gitignore](https://img.shields.io/badge/update--gitignore-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/update-gitignore/SKILL.md) |
| Figma token, commit, sync upstream, or explain/update ignore rules. |

| verifier |
|:--|
| [![verifier](https://img.shields.io/badge/verifier-subagents-7D70DB?style=flat&labelColor=4b5563)](.claude/agents/verifier.md) <br> [![verify-paths](https://img.shields.io/badge/verify--paths-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/verify-paths/SKILL.md) [![verify-docs](https://img.shields.io/badge/verify--docs-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/verify-docs/SKILL.md) [![document-verification](https://img.shields.io/badge/document--verification-skills-0ea5e9?style=flat&labelColor=4b5563)](.claude/skills/document-verification/SKILL.md) |
| Checks paths and docs; writes verification report to [.tmp/](.tmp/). |

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
| `disable-model-invocation` | `true` = load only when the flow or user invokes the skill, not by description match. | For skills called by the flow or user (e.g. verify-task, document-voice, save, document). |
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

**Summary:** No `triggers` field; put "when to use" and phrases in **description**. Flow-invoked skills use `disable-model-invocation: true`. Fork + agent type for heavy or write-heavy skills.

</details>

---
<details>
<summary>Using a working repo with this as upstream</summary>

If your repo uses Product Studio as upstream (e.g. ryanallen/product-studio), add it once:

```bash
git remote add upstream https://github.com/ryanallen/product-studio.git
git fetch upstream
```

Then pull with `git pull upstream main` (or say "sync" or [/sync-upstream](.claude/skills/sync-upstream/SKILL.md)).

**Paths:** [work/paths.md](work/paths.md) is gitignored. Copy from [work/paths.md.template](work/paths.md.template), edit your tree, and keep it. Sync does not overwrite it. Per paths.md: one README per project as the main doc; supplementary docs go in that project's `references/` folder with kebab-case filenames; executable code in `scripts/`; templates, icons, and images in `assets/`.

</details>

---

## Repo structure

**Where documentation lives:** This README is the single overview; agents and skills are described here and in their own `.md` and `SKILL.md` files. When you add or change flows, agents, or skills, update this README so it stays accurate. The repo tree under `.claude/skills/` is not exhaustive; every folder with a `SKILL.md` is a skill (see the directory on disk for the full list).

```
Product Studio/
├── AGENTS.md
├── CLAUDE.md -> AGENTS.md
├── GEMINI.md -> AGENTS.md
├── README.md
├── .claude/
│   ├── agents/
│   │   ├── analyst.md
│   │   ├── cleaner.md
│   │   ├── customizer.md
│   │   ├── designer.md
│   │   ├── developer.md
│   │   ├── documenter.md
│   │   ├── installer.md
│   │   ├── researcher.md
│   │   ├── uninstaller.md
│   │   ├── updater.md
│   │   ├── verifier.md
│   │   └── references/
│   │       └── agent-teams.md
│   └── skills/
│       ├── ask/SKILL.md
│       ├── analyst-diagnostics/SKILL.md
│       ├── clean/
│       │   ├── SKILL.md
│       │   └── scripts/clean.mjs
│       ├── designer-figma/
│       │   ├── SKILL.md
│       │   └── scripts/
│       │       ├── setup-figma-bridge.mjs
│       │       └── figma-desktop-bridge/
│       ├── designer-playbook/SKILL.md
│       ├── developer-check-types/SKILL.md
│       ├── developer-electron/SKILL.md
│       ├── developer-electrobun/SKILL.md
│       ├── developer-python/SKILL.md
│       ├── developer-typescript/SKILL.md
│       ├── developer-virtualization/SKILL.md
│       ├── document/SKILL.md
│       ├── document-agent-teams/SKILL.md
│       ├── document-agents/SKILL.md
│       ├── document-github/SKILL.md
│       ├── document-paths/SKILL.md
│       ├── document-skills/SKILL.md
│       ├── document-ticket/SKILL.md
│       ├── document-usertestplan/SKILL.md
│       ├── document-verification/SKILL.md
│       ├── document-voice/SKILL.md
│       ├── install/
│       │   └── SKILL.md
│       ├── install-custom/
│       │   └── SKILL.md.template
│       ├── research/SKILL.md
│       ├── research-figma/SKILL.md
│       ├── save/
│       │   ├── SKILL.md
│       │   └── scripts/
│       ├── sync-upstream/SKILL.md
│       ├── uninstall/SKILL.md
│       ├── update-figma/SKILL.md
│       ├── update-gitignore/SKILL.md
│       ├── verify-docs/SKILL.md
│       ├── verify-paths/SKILL.md
│       └── verify-task/
│           ├── SKILL.md
│           └── scripts/verify-task-checklist.ts
├── .tmp/
├── package.json
└── work/
    ├── paths.md
    ├── paths.md.template
    └── {team}/{space}/{ticket-id}/{project}/
        ├── README.md
        ├── references/
        ├── scripts/
        └── assets/
```

### .tmp and cleanup

**[\`.tmp/\`](.tmp/) is for reports and temp files.** It's gitignored and never committed. The **Clean up studio** flow writes a verification report there. When you're done checking it, run the [**clean**](.claude/skills/clean/SKILL.md) skill ("clean", "wipe .tmp", `/clean`, or `npm run clean`) to empty \`.tmp/\`. Clean only deletes what's inside \`.tmp/\`; the rest of the repo is untouched.

---

## How it works (details)

<details>
<summary>Plain-language explanation of npm, the checklist command, and why we use scripts</summary>

**What is npm?** Node Package Manager (comes with Node). It runs scripts you define in package.json. `npm run checklist` runs the checklist script; it does not install anything.

**What does `npm run checklist -- "something"` do?** The `--` passes the rest to the script. The script matches your phrase to a flow (e.g. refine, save), appends a section to [.tmp/verify-task-checklist.md](.tmp/verify-task-checklist.md) with that flow’s steps, and the agent runs them in order. Same phrase → same flow every time.

**Why a script instead of the AI deciding?** So the step list is deterministic. Flow and steps live only in [verify-task-checklist.ts](.claude/skills/verify-task/scripts/verify-task-checklist.ts) (TRIGGERS and FLOWS).

</details>

---

## License

[MIT](LICENSE) · **Source**: [this repository](/)

<p align="center">
  <sub>If this helped you, consider <a href="/">giving it a star</a>.</sub>
</p>
