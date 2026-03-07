---
name: document-agent
description: Use subagents when documenting or when writing/updating subagent files (.claude/agents/).
triggers: "document with a subagent, use a subagent for documentation, write a subagent, update subagent, /document-agent"
---

# Document Agent

When to use subagents for documentation, and how to write or update subagent files.

## Inputs

- **Target** – Subagent file path (e.g. `.claude/agents/example.md`) or documentation task. If omitted, use current or specified context.
- **Source** – Optional. Draft, instructions, or research to merge into the subagent or doc.

## Output

Subagent file written or updated; or documentation produced using a subagent when delegated.

## Process

### Subagent files

Subagents are stored in `.claude/agents/` (project) or `~/.claude/agents/` (user). See [Create custom subagents](https://code.claude.com/docs/en/sub-agents.md). Each file: YAML frontmatter plus markdown body. Body = subagent system prompt; frontmatter = name, description (required), tools, model, and optionally skills, disallowedTools, permissionMode, hooks, memory.

**When writing or updating a subagent:** Full system prompt in the body: role, scope, and "When invoked:" steps that reference skills. Match existing subagents (e.g. documenter, verifier). Frontmatter: at least `name` and `description`; set `tools` and `model` as needed.

### Using subagents when documenting

| Subagent | Use when |
|----------|----------|
| **Explore** | Codebase or file discovery. Read-only, fast. Specify thoroughness: quick, medium, or very thorough. Keeps exploration out of main context. |
| **general-purpose** | Multi-step documentation (gather then write). All tools, inherits model. Use when task needs discovery and writing (e.g. read source then produce README). |
| **Plan** | Read-only research during plan mode before presenting a plan. |

**Chaining:** Subagents cannot spawn other subagents. Chain from main: e.g. Explore for discovery, then run the document skill in main context; or general-purpose for one full pass.

**When to delegate:** Subagents when the work is self-contained and can return a summary. Main conversation when the task needs frequent back-and-forth or shared context across phases.

## Reference

[Create custom subagents](https://code.claude.com/docs/en/sub-agents.md)
