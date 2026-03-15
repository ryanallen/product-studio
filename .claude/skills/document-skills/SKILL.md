---
name: document-skills
description: Write or update a skill (SKILL.md and supporting files) to match host structure and best practices. Use when user says create skill, write skill, update SKILL.md, /document-skills.
disable-model-invocation: true
argument-hint: "[skill-path] [source]"
context: fork
agent: general-purpose
---

# Document Skills

Write or update a skill to fit the host's expected structure. Use the structure and checklist below.

## Inputs

1. **Target skill** – Path to the skill folder (e.g. the project skills directory `skills/example/`) or the skill name.
2. **Source** – Draft, user instructions, or notes to turn into the skill or merge in.

**If you don't give either:** Use the current or given context (e.g. the skill or path already under discussion).

## Output

SKILL.md updated (and supporting files if needed).

## Process

### 1. Skill layout

- One folder per skill. The main file is always `SKILL.md` (exact name, case-sensitive).
- **Folder name:** Must be **kebab-case** (lowercase, hyphens; no spaces, underscores, or capitals). The frontmatter `name` must match the folder name.
- **Where skills live:** In a project, typically a dedicated skills directory (e.g. `skills/<name>/`). The host discovers skills from this location even when it's nested (e.g. inside a package).
- **Optional subfolders only:** Use **scripts/** (executable code), **references/** (documentation loaded as needed), and **assets/** (templates, icons, etc.). Do not put README.md inside the skill folder; all documentation goes in SKILL.md or references/. Long reference material goes in `references/` and is linked from SKILL.md (progressive disclosure).
- **Length:** Under ~5,000 words; long material in `references/`, linked from SKILL.md.
- **Progressive disclosure:** (1) Frontmatter always loaded; (2) SKILL.md when relevant; (3) references/assets opened as needed.
- **Composability:** Skills can load together; don't assume one skill is alone.

### 2. SKILL.md format

#### Frontmatter (the YAML block between the first `---` lines)

Frontmatter configures when and how the skill runs. The table below follows the [official skills reference](https://code.claude.com/docs/en/skills.md#frontmatter-reference).

**name** and **description** required. **name** = folder name (kebab-case). **description** = **`[What it does] + [When to use it] + [Key capabilities]`**; under 1024 chars; no `<` or `>`; include trigger phrases.

| Field                      | Required    | Description                                                                                                                                           |
| :------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                     | Yes         | kebab-case only; must match skill folder name. Lowercase letters, numbers, and hyphens (max 64 characters).                                           |
| `description`              | Yes         | **`[What it does] + [When to use it] + [Key capabilities]`**. Include trigger phrases (e.g. "Use when user says save, /save"). Mention file types if relevant. Under 1024 characters. No `<` or `>`.        |
| `argument-hint`            | No          | Hint shown during autocomplete to indicate expected arguments. Example: `[issue-number]` or `[filename] [format]`.                                    |
| `disable-model-invocation` | No          | `true` = load only when invoked (flow or user), not by description. Default: `false`. |
| `user-invocable`           | No          | Set to `false` to hide from the `/` menu. Use for background knowledge users shouldn't invoke directly. Default: `true`.                              |
| `allowed-tools`            | No          | Tools the assistant can use without asking permission when this skill is active.                                                                             |
| `model`                    | No          | Model to use when this skill is active.                                                                                                               |
| `context`                  | No          | Set to `fork` to run in a forked subagent context.                                                                                                    |
| `agent`                    | No          | Which subagent type to use when `context: fork` is set.                                                                                               |
| `hooks`                    | No          | Hooks scoped to this skill's lifecycle. See [Hooks in skills and agents](/en/hooks#hooks-in-skills-and-agents) for configuration format.              |

**Optional:** `license` (e.g. MIT for open source), `compatibility` (1–500 chars: product, system deps, network), `metadata` (e.g. author, version, mcp-server). See [complete skills guide](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf).

**Security:** No XML angle brackets in frontmatter. Avoid reserved names in the skill name (e.g. host or vendor names).

**YAML gotcha:** Avoid colons inside a value. They can be read as a new key. Use something like "Scope is" instead of "Scope:" in the text.

#### Content type

- **Reference** – Conventions, patterns, style. Applied inline. No invocation control needed.
- **Task or flow-invoked** – Step-by-step actions or skills called by AGENTS/coordinator by name. Use `disable-model-invocation: true` so the skill loads only when invoked, not by description match.

#### Body sections (same order for every skill)

Use the same section order so skills are easy to scan:

1. **# Title** – Skill name as H1, then one short intro (what it does).
2. **## Inputs** – What the skill needs (user input, paths, options). Number the items. Use "None" or "Optional" when nothing is required.
3. **## Output** – What you get (a file, a behavior, a handoff). One short block.
4. **## Process** – How to do it. Numbered steps or subsections (e.g. "### 1. Step name"). Put all how-to and rules here. Be specific and actionable (e.g. "Run `python scripts/validate.py --input {filename}`" not "Validate the data"). Include error handling for common failures; reference bundled files (e.g. "Before queries, consult `references/api-patterns.md`") when relevant.
5. **## Examples** – Optional but recommended. Common scenarios: "User says X → Actions → Result."
6. **## Troubleshooting** – Optional but recommended. Error or symptom → Cause → Solution.
7. **## Reference** – Optional. Links to related skills or docs.

Skip a section only if it really doesn't apply. When unsure, include Inputs, Output, Process, and Reference; add Examples and Troubleshooting where they help. Match the layout of other skills in the repo.

#### Substitutions (in the body text)

From the [official docs](https://code.claude.com/docs/en/skills.md#available-string-substitutions):

- `$ARGUMENTS` – All arguments passed when invoking the skill. If not present in the content, arguments are appended as `ARGUMENTS: `.
- `$ARGUMENTS[N]` or `$N` – The Nth argument (0-based index).
- `${CLAUDE_SESSION_ID}` – The current session ID (host-defined).
- `${CLAUDE_SKILL_DIR}` – The directory containing the skill's `SKILL.md` file (host-defined).

For injecting shell output before the skill runs, see [Inject dynamic context](https://code.claude.com/docs/en/skills.md#inject-dynamic-context).

### 3. Checklist when writing or updating

1. **Frontmatter:** `description` = **`[What it does] + [When to use it] + [Key capabilities]`**; include trigger phrases. `name` matches folder. Task or flow-invoked: `disable-model-invocation: true`.
2. **Sections:** Inputs, Output, Process, then optionally Examples, Troubleshooting, Reference. Same order as other skills.
3. **Length:** Under 500 lines; long material in `references/`, linked from SKILL.md.
4. **Supporting files:** Say when to load them; long docs in `references/`, link from SKILL.md.
5. **Arguments:** Use `$ARGUMENTS` or `$N` and optionally `argument-hint`.
6. **Invocation:** `disable-model-invocation` and/or `user-invocable` per [official docs](https://code.claude.com/docs/en/skills.md#control-who-invokes-a-skill).

### 4. Steps to run

1. Read the target skill path and any source.
2. Apply the checklist and structure above. Don't change behavior unless the user asked.
3. Write or update SKILL.md (and supporting files if needed). Only document what the skill does; don't add capabilities that aren't there.

## Examples

**User says:** "Create a skill for validating CSV uploads."

**Actions:** Create `skills/validate-csv/` (kebab-case). SKILL.md with frontmatter (`name: validate-csv`, description = what it does + when to use + key capabilities + trigger phrases). Inputs, Output, Process, optional Reference. If it runs a script, add `scripts/validate.sh` and reference in Process.

**Result:** New skill that triggers on the stated phrases; coordinator and flows updated if it is part of a flow.

**User says:** "Update the save skill to mention update-gitignore."

**Actions:** Open the save skill's SKILL.md (e.g. `skills/save/SKILL.md`). Add the new step or reference in Process. Update description if trigger phrases change. Sync coordinator and [coordinator-flows](.claude/agents/references/coordinator-flows.md) if the Save flow changes.

## Troubleshooting

**Invalid frontmatter / upload error.**  
Cause: YAML formatting (missing `---` delimiters, unclosed quotes, or colons in a value read as a new key).  
Solution: Ensure frontmatter is between two `---` lines. Avoid colons in description text; use "Use when" not "When:". No `<` or `>` in frontmatter.

**Skill doesn't trigger.**  
Cause: Description too vague or missing the full formula (what it does, when to use it, key capabilities) or trigger phrases.  
Solution: Use **`[What it does] + [When to use it] + [Key capabilities]`** and add specific "Use when user says X, Y, /skill-name". Same phrases should appear in coordinator flow table if the skill is part of a flow. **Debug:** Ask the assistant "When would you use the [skill name] skill?" and adjust the description from what’s missing.

**Skill triggers too often.**  
Cause: Description too broad or overlapping with other skills.  
Solution: Add negative triggers (e.g. "Do NOT use for simple data exploration; use data-viz skill instead"). Narrow scope (e.g. "PDF legal documents for contract review" instead of "Processes documents"). Clarify when not to use (e.g. "Use specifically for online payment workflows, not general financial queries").

**Wrong folder name.**  
Cause: Folder has spaces, underscores, or capitals.  
Solution: Rename to kebab-case. Update `name` in SKILL.md to match. Update all references (coordinator, agents, README, package.json, checklist script, [agents references](.claude/agents/references/)).

## After writing

- **Coordinator sync:** Phrase → flow is defined in [checklist script](.claude/skills/verify-task/scripts/checklist.ts) (single source of truth). If description or flow role changed, update the checklist script first, then [coordinator-flows](.claude/agents/references/coordinator-flows.md) and coordinator agent flow lookup table so descriptions and table stay in sync with the script.
- **Rename/move:** Update all references: coordinator, agents, README, package.json, [checklist script](.claude/skills/verify-task/scripts/checklist.ts), coordinator-flows.md, .gitignore.

## Reference

[Official skills reference](https://code.claude.com/docs/en/skills.md) – frontmatter, control who invokes a skill, run in subagent, substitutions. [Coordinator](.claude/agents/coordinator.md) – Flow lookup table mirrors [checklist script](.claude/skills/verify-task/scripts/checklist.ts) TRIGGERS. Skill descriptions should follow **`[What it does] + [When to use it] + [Key capabilities]`** and "Use when user says …" phrases should align with the checklist script.

[Complete guide to building skills](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf) – progressive disclosure, description formula, good/bad examples, optional frontmatter, triggering and troubleshooting, instructions best practices.

[Creating Agent Skills](https://geminicli.com/docs/cli/creating-skills.md) (Gemini CLI) · [GEMINI.md context](https://geminicli.com/docs/cli/gemini-md.md) (Gemini CLI).
