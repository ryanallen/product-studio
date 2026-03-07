---
name: document-skills
description: Write or update a skill (SKILL.md and any extra files) so it follows Claude Code best practices. Use when user says document a skill, write a skill, update skill docs, refine skill, or /document-skills.
disable-model-invocation: true
argument-hint: "[skill-path] [source]"
---

# Document Skills

Write or update a skill so it fits Claude Code’s expectations. Use the structure and checklist below for the target skill folder.

## Inputs

1. **Target skill** – Path to the skill folder (e.g. `.claude/skills/example/`) or the skill name. If you don’t give one, use the current or given context.
2. **Source** – Optional. A draft, user instructions, or notes to turn into the skill or merge in.

## Output

SKILL.md updated (and any supporting files if needed), using the structure and checklist below.

## Process

### 1. Skill layout

- One folder per skill. The main file is always `SKILL.md`.
- **Where skills live:** In a project, `.claude/skills/<name>/`. For your own machine, `~/.claude/skills/<name>/`. Claude finds `.claude/skills/` even when it’s nested (e.g. inside a package).
- You can add `template.md`, `examples/`, or `scripts/`. Say so in SKILL.md so Claude knows when to use them.
- **Length:** Keep SKILL.md under 500 lines. Put long reference material in other files (e.g. `reference.md`) and link from SKILL.md.

### 2. SKILL.md format

#### Frontmatter (the YAML block between the first `---` lines)

Frontmatter is the config at the top of the file. Use these fields:

| Field | Use |
|-------|-----|
| `name` | Optional. Lowercase, letters, numbers, hyphens only (max 64 chars). Defaults to the folder name. This becomes the `/slash-command`. |
| `description` | **Recommended.** What the skill does and when to use it. Include phrases people might say so Claude can run it automatically. If you leave it out, Claude uses the first paragraph of the file. |
| `argument-hint` | Optional. Shown in autocomplete (e.g. `[issue-number]`, `[filename] [format]`). |
| `disable-model-invocation` | Set `true` for skills that change things or must run only when the user asks (e.g. deploy, commit). |
| `user-invocable` | Set `false` to hide the skill from the `/` menu; then it’s context-only. |
| `allowed-tools` | Optional. Tools Claude can use without asking while this skill is active. Supports patterns (e.g. `Bash(gh *)`). |
| `model` | Optional. Which model to use when this skill runs. |
| `context` | Set `fork` to run the skill in a subagent. Only for skills with clear steps (a task), not reference-only. |
| `agent` | When `context: fork`, which subagent (e.g. Explore, Plan, general-purpose). |
| `hooks` | Optional. See hooks docs. |

**YAML gotcha:** Avoid colons inside a value. They can be read as a new key. Use something like “Scope is” instead of “Scope:” in the text.

#### Content type

- **Reference** – Conventions, patterns, style. Stays in the skill; Claude uses it in the conversation.
- **Task** – Step-by-step. Usually set `disable-model-invocation: true` and trigger with `/name`.

#### Body sections (same order for every skill)

Use the same section order so skills are easy to scan:

1. **# Title** – Skill name as H1, then one short intro (what it does).
2. **## Inputs** – What the skill needs (user input, paths, options). Number the items. Use “None” or “Optional” when nothing is required.
3. **## Output** – What you get (a file, a behavior, a handoff). One short block.
4. **## Process** – How to do it. Numbered steps or subsections (e.g. “### 1. Step name”). Put all how-to and rules here.
5. **## Reference** – Optional. Links to related skills or docs.

Skip a section only if it really doesn’t apply. When unsure, include all five. Match the layout of other skills in the repo.

#### Substitutions (in the body text)

- `$ARGUMENTS` – All arguments; if missing, they’re added as “ARGUMENTS: …”.
- `$ARGUMENTS[N]` or `$N` – The Nth argument (0-based).
- `${CLAUDE_SESSION_ID}` – Session ID.
- `${CLAUDE_SKILL_DIR}` – The skill folder (e.g. for scripts).

For injecting shell output before the skill runs, see [Inject dynamic context](https://code.claude.com/docs/en/skills.md#inject-dynamic-context).

### 3. Checklist when writing or updating

1. **Frontmatter:** `description` is there and specific (what it does, when to use it). `name` matches what the skill is for. For task or side-effect skills, set `disable-model-invocation: true`.
2. **Sections:** Inputs, Output, Process, Reference are present and in that order. Same layout as other skills in the repo.
3. **Length:** SKILL.md under 500 lines. Long reference in other files, linked from SKILL.md.
4. **Supporting files:** If you use them, say so in SKILL.md and when to load them.
5. **Arguments:** If the skill takes input, use `$ARGUMENTS` or `$N` and optionally `argument-hint`.
6. **Invocation:** Set `disable-model-invocation` and/or `user-invocable` so the skill runs when you want (user-only, Claude-only, or both).

### 4. Steps to run

1. Read the target skill path and any source you have.
2. Apply the checklist and structure above. Don’t change existing behavior unless the user asked for it.
3. Write or update SKILL.md (and supporting files if needed).
4. Only document what the skill actually does. Don’t add capabilities that aren’t there.

## Reference

[Extend Claude with skills](https://code.claude.com/docs/en/skills.md)
