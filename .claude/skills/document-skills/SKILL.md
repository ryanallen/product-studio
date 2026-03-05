---
name: document-skills
description: Document or update a skill (SKILL.md and supporting files) using Claude Code best practices. Use when user says document a skill, write a skill, update skill docs, or /document-skills. Reference: https://code.claude.com/docs/en/skills.md
disable-model-invocation: true
---

# Document Skills

Produce or update a skill so it follows Claude Code skills best practices. Apply the following to the target skill directory.

## Inputs

1. **Target skill** – Path to the skill directory (e.g. `.claude/skills/example/`) or the skill name. If omitted, use the current or specified context.
2. **Source** – Existing draft, user instructions, or research output to turn into or merge into the skill.

## Skill structure

- One directory per skill; required file: `SKILL.md`.
- **Where**: Project = `.claude/skills/<name>/`; personal = `~/.claude/skills/<name>/`. Nested `.claude/skills/` (e.g. in a package) are discovered automatically.
- Optional: `template.md`, `examples/`, `scripts/`. Reference them from `SKILL.md` so Claude knows when to load them.
- Keep `SKILL.md` under 500 lines; move long reference material to supporting files (e.g. `reference.md`, `examples.md`).

## SKILL.md format

### Frontmatter (YAML between `---`)

| Field | Use |
|-------|-----|
| `name` | Optional. Lowercase, letters, numbers, hyphens only (max 64 chars). Defaults to directory name. Becomes `/slash-command`. |
| `description` | **Recommended.** What the skill does and when to use it; include phrases users would say so Claude can auto-invoke. If omitted, uses the first paragraph of markdown content. |
| `argument-hint` | Optional. Shown in autocomplete (e.g. `[issue-number]`, `[filename] [format]`). |
| `disable-model-invocation` | Set `true` for workflows with side effects or that must run only when the user invokes (e.g. deploy, commit). |
| `user-invocable` | Set `false` to hide from `/` menu; skill is context-only for Claude. |
| `allowed-tools` | Optional. Tools Claude may use without asking when this skill is active. Can use patterns (e.g. `Bash(gh *)`, `Bash(python *)`). |
| `model` | Optional. Model when skill is active. |
| `context` | Set `fork` to run in a forked subagent. Only makes sense for skills with explicit instructions (a task), not reference-only content. |
| `agent` | When `context: fork`, which subagent type (e.g. Explore, Plan, general-purpose). |
| `hooks` | Optional. See hooks docs. |

### Content type

- **Reference content**: Conventions, patterns, style guides. Stays inline; Claude uses it in conversation.
- **Task content**: Step-by-step; often add `disable-model-invocation: true` and invoke with `/name`.

### Substitutions (in body)

- `$ARGUMENTS` – All arguments; if absent, arguments are appended as `ARGUMENTS: `.
- `$ARGUMENTS[N]` or `$N` – Argument by 0-based index.
- `${CLAUDE_SESSION_ID}` – Session ID.
- `${CLAUDE_SKILL_DIR}` – Skill directory (e.g. for scripts).

For pre-run shell output injection, see [Inject dynamic context](https://code.claude.com/docs/en/skills.md#inject-dynamic-context).

## Checklist when writing or updating a skill

1. **Frontmatter and discovery**: `description` present and specific, with natural keywords and when-to-use; `name` matches intent; `disable-model-invocation: true` for task-only or side-effect skills.
2. **Length**: Keep `SKILL.md` under 500 lines; long reference in separate files, linked from `SKILL.md`.
3. **Supporting files**: Mention in `SKILL.md` with clear when-to-load guidance.
4. **Arguments**: If the skill takes inputs, use `$ARGUMENTS` or `$N` and optionally `argument-hint`.
5. **Invocation**: Set `disable-model-invocation` and/or `user-invocable` per desired (user-only, Claude-only, or both).

## Process

1. Read the target skill path and any provided source material.
2. Apply the checklist and the structure above; preserve existing behavior unless the user asks to change it.
3. Write or update `SKILL.md` (and any supporting files if requested).
4. Do not invent capabilities; only document what the skill actually does or is specified to do.

## Reference

[Extend Claude with skills](https://code.claude.com/docs/en/skills.md)
