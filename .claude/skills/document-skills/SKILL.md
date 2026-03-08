---
name: document-skills
description: Write or update a skill (SKILL.md and supporting files) to match Claude Code structure and best practices.
disable-model-invocation: true
argument-hint: "[skill-path] [source]"
context: fork
agent: general-purpose
---

# Document Skills

Write or update a skill to fit Claude Code's expectations. Use the structure and checklist below.

## Inputs

1. **Target skill** – Path to the skill folder (e.g. `.claude/skills/example/`) or the skill name.
2. **Source** – Draft, user instructions, or notes to turn into the skill or merge in.

**If you don't give either:** Use the current or given context (e.g. the skill or path already under discussion).

## Output

SKILL.md updated (and supporting files if needed).

## Process

### 1. Skill layout

- One folder per skill. The main file is always `SKILL.md`.
- **Where skills live:** In a project, `.claude/skills/<name>/`. For your own machine, `~/.claude/skills/<name>/`. Claude finds `.claude/skills/` even when it's nested (e.g. inside a package).
- You can add `template.md`, `examples/`, or `scripts/`. Say so in SKILL.md so Claude knows when to use them.
- **Length:** Keep SKILL.md under 500 lines. Long reference material in other files (e.g. `reference.md`), linked from SKILL.md.

### 2. SKILL.md format

#### Frontmatter (the YAML block between the first `---` lines)

Frontmatter configures when and how the skill runs. The table below follows the [official skills reference](https://code.claude.com/docs/en/skills.md#frontmatter-reference); Product Studio adds one extra field.

| Field | Required | Description (from [code.claude.com/docs](https://code.claude.com/docs/en/skills.md#frontmatter-reference)) |
|-------|----------|-------------------------------------------------------------------------------------------------------------|
| `name` | No | Display name for the skill. If omitted, uses the directory name. Lowercase letters, numbers, and hyphens only (max 64 characters). Becomes the `/slash-command`. |
| `description` | Recommended | What the skill does and when to use it. Claude uses this to decide when to apply the skill. If omitted, uses the first paragraph of markdown content. |
| `argument-hint` | No | Hint shown during autocomplete to indicate expected arguments. Example: `[issue-number]` or `[filename] [format]`. |
| `disable-model-invocation` | No | Set to `true` to prevent Claude from automatically loading this skill. Use for workflows you want to trigger manually with `/name`. Default: `false`. |
| `user-invocable` | No | Set to `false` to hide from the `/` menu. Use for background knowledge users shouldn't invoke directly. Default: `true`. |
| `allowed-tools` | No | Tools Claude can use without asking permission when this skill is active. |
| `model` | No | Model to use when this skill is active. |
| `context` | No | Set to `fork` to run in a forked subagent context. |
| `agent` | No | Which subagent type to use when `context: fork` is set. Options include built-in agents (`Explore`, `Plan`, `general-purpose`) or any custom subagent from `.claude/agents/`. If omitted, uses `general-purpose`. |
| `hooks` | No | Hooks scoped to this skill's lifecycle. See [Hooks in skills and agents](https://code.claude.com/docs/en/hooks#hooks-in-skills-and-agents) for configuration format. |
| `triggers` | No (Product Studio) | Not in the official docs. Comma-separated phrases the coordinator or agents use to match user requests. When `disable-model-invocation: true`, triggers on the skill are not used; put those phrases on the **agent** that invokes this skill. |

**YAML gotcha:** Avoid colons inside a value. They can be read as a new key. Use something like "Scope is" instead of "Scope:" in the text.

#### Content type

- **Reference content** – Conventions, patterns, style. Claude applies it inline to your current work. No invocation control needed.
- **Task content** – Step-by-step instructions for a specific action (deploy, commit, code generation). Often invoked directly with `/skill-name`. The docs recommend `disable-model-invocation: true` so Claude does not trigger it automatically.

#### Body sections (same order for every skill)

Use the same section order so skills are easy to scan:

1. **# Title** – Skill name as H1, then one short intro (what it does).
2. **## Inputs** – What the skill needs (user input, paths, options). Number the items. Use "None" or "Optional" when nothing is required.
3. **## Output** – What you get (a file, a behavior, a handoff). One short block.
4. **## Process** – How to do it. Numbered steps or subsections (e.g. "### 1. Step name"). Put all how-to and rules here.
5. **## Reference** – Optional. Links to related skills or docs.

Skip a section only if it really doesn't apply. When unsure, include all five. Match the layout of other skills in the repo.

#### Substitutions (in the body text)

From the [official docs](https://code.claude.com/docs/en/skills.md#available-string-substitutions):

- `$ARGUMENTS` – All arguments passed when invoking the skill. If not present in the content, arguments are appended as `ARGUMENTS: `.
- `$ARGUMENTS[N]` or `$N` – The Nth argument (0-based index).
- `${CLAUDE_SESSION_ID}` – The current session ID.
- `${CLAUDE_SKILL_DIR}` – The directory containing the skill's `SKILL.md` file.

For injecting shell output before the skill runs, see [Inject dynamic context](https://code.claude.com/docs/en/skills.md#inject-dynamic-context).

### 3. Checklist when writing or updating

1. **Frontmatter:** `description` present and specific (what it does and when to use it). `name` matches the skill. Task or side-effect skills: `disable-model-invocation: true` per official docs. For Product Studio skills run only by an agent, omit `triggers` on the skill and set triggers on the agent.
2. **Sections:** Inputs, Output, Process, Reference in that order. Same layout as other skills.
3. **Length:** Under 500 lines; long reference in other files, linked from SKILL.md.
4. **Supporting files:** If used, say so in SKILL.md and when to load them.
5. **Arguments:** Use `$ARGUMENTS` or `$N` and optionally `argument-hint` if the skill takes input.
6. **Invocation:** Use `disable-model-invocation` and/or `user-invocable` so the skill runs when intended (see [Control who invokes a skill](https://code.claude.com/docs/en/skills.md#control-who-invokes-a-skill)).

### 4. Steps to run

1. Read the target skill path and any source.
2. Apply the checklist and structure above. Don't change behavior unless the user asked.
3. Write or update SKILL.md (and supporting files if needed). Only document what the skill does; don't add capabilities that aren't there.

## After writing

- **Coordinator sync:** If you changed `triggers` (on the skill or on the subagent that uses it), update [.claude/agents/coordinator.md](../../agents/coordinator.md) so Single flows and Workflow Input lines match. Coordinator uses trigger phrases from the flow table and from agents.
- **Rename/move:** If a skill was **renamed or moved** (e.g. generate-figma → designer-figma), update all references: coordinator, agents, README, package.json, other skills that link to it, [verify-task checklist script](verify-task/scripts/checklist.ts), and .gitignore.

## Reference

[Extend Claude with skills](https://code.claude.com/docs/en/skills.md) – official frontmatter reference, control who invokes a skill, run in subagent, substitutions. [Coordinator](../../agents/coordinator.md) – Single flows and Workflows must match agent trigger phrases in Product Studio.
