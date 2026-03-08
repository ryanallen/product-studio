---
name: document-agent
description: When to use subagents for docs; how to write or update .claude/agents/ files. Use when user says document with a subagent, use a subagent for documentation, write a subagent, update subagent, /document-agent.
---

# Document Agent

When to use subagents for documentation, and how to write or update files in `.claude/agents/`.

## Inputs

- **Target** – Subagent file path (e.g. `.claude/agents/example.md`) or documentation task. If omitted, use current context.
- **Source** – Optional. Draft, instructions, or research to merge into the subagent or doc.

## Output

Subagent file written or updated; or docs produced via a subagent when delegated.

## Process

**Writing or updating a subagent file:** Files live in `.claude/agents/` (project) or `~/.claude/agents/` (user). Each file: YAML frontmatter (`name`, `description` required; `tools`, `model` optional) plus markdown body (role, scope, "When invoked:" steps that reference skills). Match existing subagents (e.g. documenter, verifier).

| Subagent | Use when |
|----------|----------|
| **Explore** | Codebase or file discovery. Read-only, fast. Specify thoroughness: quick, medium, or very thorough. |
| **general-purpose** | Multi-step docs (gather then write). Use when task needs discovery and writing in one pass. |
| **Plan** | Read-only research before presenting a plan. |

Subagents cannot spawn other subagents. Chain from main: e.g. Explore for discovery, then document in main context. Delegate when work is self-contained; use main when the task needs frequent back-and-forth.

**Digital product designs:** When the documentation task involves creating or reviewing product designs (UI, screens, design specs, accessibility), use [designer-playbook](../designer-playbook/SKILL.md) so designs meet standards and you can review against them.

## Reference

[Create custom subagents](https://code.claude.com/docs/en/sub-agents.md)
