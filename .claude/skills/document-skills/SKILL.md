---
name: document-skills
description: Write or update a skill (SKILL.md and supporting files) to match Claude Code structure and best practices. Use when user says create skill, write skill, update SKILL.md, /document-skills.
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

- One folder per skill. The main file is always `SKILL.md` (exact name, case-sensitive).
- **Folder name:** Must be **kebab-case** (lowercase, hyphens; no spaces, underscores, or capitals). The frontmatter `name` must match the folder name.
- **Where skills live:** In a project, `.claude/skills/<name>/`. For your own machine, `~/.claude/skills/<name>/`. Claude finds `.claude/skills/` even when it's nested (e.g. inside a package).
- **Optional subfolders only:** Use **scripts/** (executable code), **references/** (documentation loaded as needed), and **assets/** (templates, icons, etc.). Do not put README.md inside the skill folder; all documentation goes in SKILL.md or references/. Long reference material goes in `references/` and is linked from SKILL.md (progressive disclosure).
- **Length:** Keep SKILL.md under ~5,000 words. Long reference in `references/`, linked from SKILL.md.

### 2. SKILL.md format

#### Frontmatter (the YAML block between the first `---` lines)

Frontmatter configures when and how the skill runs. The table below follows the [official skills reference](https://code.claude.com/docs/en/skills.md#frontmatter-reference). There is no `triggers` field in the official docs; put "when to use" and example phrases users might say into the **description** so Claude knows when to apply the skill.

Per the Anthropic guide, **name** and **description** are required. **name** must match the folder name (kebab-case). **description** must include what the skill does and when to use it (trigger phrases); under 1024 characters; no XML angle brackets (`<` `>`).

| Field                      | Required    | Description                                                                                                                                           |
| :------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                     | Yes         | kebab-case only; must match skill folder name. Lowercase letters, numbers, and hyphens (max 64 characters).                                           |
| `description`              | Yes         | What the skill does and when to use it. Include trigger phrases (e.g. "Use when user says save, /save"). Under 1024 characters. No `<` or `>`.        |
| `argument-hint`            | No          | Hint shown during autocomplete to indicate expected arguments. Example: `[issue-number]` or `[filename] [format]`.                                    |
| `disable-model-invocation` | No          | Set to `true` to prevent Claude from automatically loading this skill. Use for workflows you want to trigger manually with `/name`. Default: `false`. |
| `user-invocable`           | No          | Set to `false` to hide from the `/` menu. Use for background knowledge users shouldn't invoke directly. Default: `true`.                              |
| `allowed-tools`            | No          | Tools Claude can use without asking permission when this skill is active.                                                                             |
| `model`                    | No          | Model to use when this skill is active.                                                                                                               |
| `context`                  | No          | Set to `fork` to run in a forked subagent context.                                                                                                    |
| `agent`                    | No          | Which subagent type to use when `context: fork` is set.                                                                                               |
| `hooks`                    | No          | Hooks scoped to this skill's lifecycle. See [Hooks in skills and agents](/en/hooks#hooks-in-skills-and-agents) for configuration format.              |

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

1. **Frontmatter:** `description` present and specific (what it does and when to use it; include phrases users might say, e.g. "Use when user says save, /save"). No `triggers` field per official docs. `name` matches the skill. Task or side-effect skills: `disable-model-invocation: true` per official docs.
2. **Sections:** Inputs, Output, Process, Reference in that order. Same layout as other skills.
3. **Length:** Under 500 lines; long reference in other files, linked from SKILL.md.
4. **Supporting files:** If used, say so in SKILL.md and when to load them.
5. **Arguments:** Use `$ARGUMENTS` or `$N` and optionally `argument-hint` if the skill takes input.
6. **Invocation:** Use `disable-model-invocation` and/or `user-invocable` so the skill runs when intended (see [Control who invokes a skill](https://code.claude.com/docs/en/skills.md#control-who-invokes-a-skill)).

### 4. Steps to run

1. Read the target skill path and any source.
2. Apply the checklist and structure above. Don't change behavior unless the user asked.
3. Write or update SKILL.md (and supporting files if needed). Only document what the skill does; don't add capabilities that aren't there.

## Examples

**User says:** "Create a skill for validating CSV uploads."

**Actions:** Create folder `.claude/skills/validate-csv/` (kebab-case). Add SKILL.md with required frontmatter (`name: validate-csv`, description including "Use when user says validate CSV, check upload, /validate-csv"). Add Inputs, Output, Process, optional Reference. If the skill runs a script, add `scripts/validate.sh` and reference it in Process.

**Result:** New skill that triggers on the stated phrases; coordinator and flows updated if it is part of a flow.

**User says:** "Update the save skill to mention update-gitignore."

**Actions:** Open `.claude/skills/save/SKILL.md`. Add the new step or reference in Process. Update description if trigger phrases change. Sync coordinator and [references/coordinator-flows.md](../../agents/references/coordinator-flows.md) if the Save flow changes.

## Troubleshooting

**Invalid frontmatter / upload error.**  
Cause: YAML formatting (missing `---` delimiters, unclosed quotes, or colons in a value read as a new key).  
Solution: Ensure frontmatter is between two `---` lines. Avoid colons in description text; use "Use when" not "When:". No `<` or `>` in frontmatter.

**Skill doesn't trigger.**  
Cause: Description too vague or missing trigger phrases.  
Solution: Add specific "Use when user says X, Y, /skill-name" to the description. Same phrases should appear in coordinator flow table if the skill is part of a flow.

**Wrong folder name.**  
Cause: Folder has spaces, underscores, or capitals.  
Solution: Rename to kebab-case. Update `name` in SKILL.md to match. Update all references (coordinator, agents, README, package.json, checklist script, [agents/references/](../../agents/references/)).

## After writing

- **Coordinator sync:** If you changed the description (e.g. phrases that match user requests), update [.claude/agents/coordinator.md](../../agents/coordinator.md) and the flow steps in [references/coordinator-flows.md](../../agents/references/coordinator-flows.md) if the skill is part of a flow, so the flow table and agent descriptions stay in sync.
- **Rename/move:** If a skill was **renamed or moved** (e.g. generate-figma → designer-figma), update all references: coordinator, agents, README, package.json, other skills that link to it, [verify-task checklist script](verify-task/scripts/checklist.ts), [agents/references/](../../agents/references/) (e.g. coordinator-flows.md if the skill appears in a flow), and .gitignore.

## Reference

[Extend Claude with skills](https://code.claude.com/docs/en/skills.md) – official frontmatter reference, control who invokes a skill, run in subagent, substitutions. [Coordinator](../../agents/coordinator.md) – Flow table and agent descriptions should match the phrases users say (no separate triggers field).
