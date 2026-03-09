---
name: document-agent
description: When to use subagents for docs; how to write or update .claude/agents/ files. Uses a TypeScript script for deterministic subagent choice (same pattern as AGENTS beginning rules with verify-task checklist). Use when user says document with a subagent, use a subagent for documentation, write a subagent, update subagent, /document-agent.
---

# Document Agent

When to use subagents for documentation, and how to write or update files in `.claude/agents/`. **Deterministic behavior:** Run the TypeScript script first (like [AGENTS.md](../../AGENTS.md) Rules 1–2 with [verify-task checklist](../verify-task/scripts/checklist.ts)); same task message → same subagent choice.

## Inputs

- **Target** – Subagent file path (e.g. `.claude/agents/example.md`) or documentation task. If omitted, use current context.
- **Source** – Optional. Draft, instructions, or research to merge into the subagent or doc.

## Output

Subagent file written or updated; or docs produced via a subagent when delegated.

## Process

1. **Subagent choice (deterministic):** Run `npm run doc:pick-subagent -- "<task message>"` (or `npx tsx .claude/skills/document-agent/scripts/pick-subagent.ts "<task>"`). Use the JSON output: `subagent` (explore | general-purpose | plan | main) and `useDesignerPlaybook`. Main = do the work in main context (e.g. writing an agent file); otherwise delegate to that subagent.
2. **Writing or updating a subagent file:** Files live in `.claude/agents/` (project) or `~/.claude/agents/` (user). Each file: YAML frontmatter (`name`, `description` required; `tools`, `model` optional) plus markdown body (role, scope, "When invoked:" steps that reference skills). Match existing subagents (e.g. documenter, verifier). Extra reference docs for agents (e.g. flow sequences) live in `.claude/agents/assets/docs/`.
3. **Subagent table** (from script logic): Explore = codebase/file discovery, read-only. Plan = read-only research then present a plan. general-purpose = multi-step docs, gather then write. Main = write/update agent files in main context.
4. Subagents cannot spawn other subagents. Chain from main: e.g. Explore for discovery, then document in main context.
5. If `useDesignerPlaybook` is true, apply [designer-playbook](../designer-playbook/SKILL.md) for product designs (UI, screens, design specs, accessibility).

## Reference

[verify-task checklist](../verify-task/scripts/checklist.ts) – same deterministic pattern. [Create custom subagents](https://code.claude.com/docs/en/sub-agents.md).
