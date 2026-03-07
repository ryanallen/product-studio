---
name: coordinator
description: "Workflow spec for Install, Save, Discover, Learn, Propose solutions, Clean up studio. Main conversation uses this playbook; do not delegate to coordinator. When user says install, save, discover, etc., main runs the steps below by delegating to the listed subagents."
tools: Read, Bash, Grep, Glob, TodoWrite
model: opus, sonnet
---

This file is the **workflow playbook**, not a subagent to invoke. The main conversation uses it as the single source of truth for which workflow runs and which subagent runs each step. Main must do the delegating because subagents cannot spawn other subagents; using this playbook lets main call researcher, documenter, verifier, etc. for each step.

**How it works:** When the user requests Install, Save, Discover, Learn, Propose solutions, or Clean up studio, you (the main conversation) determine which workflow applies, then run that workflow's steps in order by **delegating from main** to the subagent listed for each step. Do not delegate to the coordinator; you are following this spec and delegating to researcher, documenter, verifier, installer, etc. yourself.

Use work/paths.md for team, space, and ticket-id values. Do not skip steps or invent workflows. Delegate only to subagents listed in Team.

## Team

researcher, documenter, strategist, verifier, cleaner, updater, installer.

## Workflows

**Install**
1. installer → runs full install flow (config, choices, MCP, figma-bridge if chosen, handoff, then customizer if custom SKILL exists). See [installer](../agents/installer.md).

**Learn**
1. researcher → [research](../skills/research/SKILL.md) (gather from ticket/URLs/text/files, crawl up to 5 levels)
2. documenter → [document](../skills/document/SKILL.md) (structure findings)

**Propose solutions**
1. strategist → [strategize](../skills/strategize/SKILL.md) (Five Whys, root causes)
2. documenter → [document](../skills/document/SKILL.md) (add problems to README)

**Save**
1. verifier → [verify-paths](../skills/verify-paths/SKILL.md) (compare paths.md to disk)
2. If mismatch: documenter → [document-paths](../skills/document-paths/SKILL.md) (sync tree)
3. updater → [save](../skills/save/SKILL.md) (stage and commit)

**Discover**
1. researcher → [research](../skills/research/SKILL.md) (gather from ticket/URLs/text/files, crawl up to 5 levels)
2. documenter → [document](../skills/document/SKILL.md) (structure findings)
3. strategist → [strategize](../skills/strategize/SKILL.md) (Five Whys, root causes)
4. documenter → [document](../skills/document/SKILL.md) (add problems to README)
5. researcher → [research](../skills/research/SKILL.md) (audit: find existing solutions)
6. documenter → [document](../skills/document/SKILL.md) (write current state)
7. strategist → [strategize](../skills/strategize/SKILL.md) (propose solutions)
8. documenter → [document](../skills/document/SKILL.md) (final pass)
9. documenter → [document-ticket](../skills/document-ticket/SKILL.md) (comment on ticket with link)

**Clean up studio**
1. Ask user: clean everything (all docs in paths.md + system files) or pick and choose which paths to verify.
2. verifier → [verify-docs](../skills/verify-docs/SKILL.md) then [document-verification](../skills/document-verification/SKILL.md) (run both in order; report to `.tmp/verification-report.md`).
3. User may verify the report; optionally cleaner → [clean](../skills/clean/SKILL.md) to delete `.tmp/` contents.
