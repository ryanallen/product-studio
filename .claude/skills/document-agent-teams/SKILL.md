---
name: document-agent-teams
description: Document or build agent teams: when to use them, which flows, and how to coordinate (task allocation, blackboard, consensus). Use when user says agent team, document agent team, build agent team, multi-agent, coordinate teammates, /document-agent-teams.
disable-model-invocation: true
argument-hint: "[task or doc path]"
---

# Document Agent Teams

Create or update documentation and runbooks for agent teams: which flows to run as teams, how to assign work and coordinate (task allocation, blackboard, consensus), and how to set up and run teams per the official docs. Use this skill when the documentation task involves agent teams or multi-agent coordination.

**Sources (cite these only):** [Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams). [How to Create Agent Coordination](https://oneuptime.com/blog/post/2026-01-30-agent-coordination/view) (OneUptime: Contract Net, blackboard, task allocation, consensus, conflict resolution, deadlock prevention). Do not reference work/studio/ or any other work docs; use only the official sources above and the system reference [agent-teams](.claude/agents/references/agent-teams.md).

## When to use this skill

- User asks to document, design, or build agent teams.
- User asks how to coordinate multiple teammates or which flows work with agent teams.
- Refine/document flow detects that the task is about agent teams (e.g. "document agent teams," "how should we use agent teams," "create runbook for Discover as a team").

Use [document](.claude/skills/document/SKILL.md) for general README or project docs; use [document-agents](.claude/skills/document-agents/SKILL.md) for `.claude/agents/` subagent files; use [document-skills](.claude/skills/document-skills/SKILL.md) for SKILL.md files. Use this skill when the deliverable is agent-team design, runbook, or coordination guidance.

## Inputs

- **Task or path** – What to produce (e.g. "document which flows to run as agent teams and how to coordinate") or the path where the doc lives (e.g. project README or `assets/docs/agent-teams-runbook.md`).
- **Source** – Optional. Existing draft, notes, or research to merge.

## Output

A doc (README section, standalone runbook, or `assets/docs/` file with kebab-case name) that covers:

1. **When to use agent teams** – Which flows to run as teams (from Claude Code docs: research and review, new modules/features, debugging with competing hypotheses, cross-layer work). Call out flows where parallel exploration and debate add value vs sequential/subagent flows.
2. **How to coordinate** – Task allocation (assign work up front), blackboard (shared state), consensus (voting/ranked choice for shared decisions), and when to use conflict resolution and deadlock prevention (OneUptime patterns).
3. **Flow-to-pattern mapping** – Short table: for each flow that benefits from teams, which patterns to use (e.g. Discover: task allocation + blackboard + consensus).
4. **Setup and run** – Enable agent teams (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`), how the lead creates the team and assigns tasks, how to use the shared task list and messaging (from [agent teams docs](https://code.claude.com/docs/en/agent-teams)).

Write in plain language. Link to the official docs above and to [agent-teams](.claude/agents/references/agent-teams.md) when referring to setup or coordination. Do not reference work/studio/ or any internal work docs by path.

## Process

1. **Scope** – Confirm the deliverable: standalone runbook, README section, or doc in `assets/docs/`. Path from [work/paths.md](work/paths.md) if a project path is needed.
2. **When to use agent teams** – From Claude Code docs: agent teams suit research and review (multiple aspects, share and challenge findings), new modules/features (each teammate owns a piece), debugging with competing hypotheses (theories in parallel, debate to converge), cross-layer work (frontend/backend/tests per teammate). Subagents suit focused tasks where only the result matters. Agent teams cost more (one context per teammate) and need coordination; use them only where parallel exploration and debate add real value.
3. **Which flows** – Identify flows that benefit from teams: long research-and-analysis flows (e.g. multi-angle research, then analysts with competing hypotheses, then documenter); standalone analyst when the user wants competing hypotheses and a team-chosen root cause; standalone research when the ask is "research from several angles." Other flows (Save, Clean, Install, Verify-*, single-actor or short sequential) stay with subagents unless the specific task is "do these N things in parallel."
4. **Coordination patterns** (from OneUptime and Claude Code):
   - **Task allocation:** Lead assigns each teammate a distinct slice (e.g. "research product angle," "research tech angle"; or "hypothesis 1" to analyst 1, "hypothesis 2" to analyst 2). Prevents duplicate work and balances load.
   - **Blackboard:** One shared place (e.g. project README or one doc) where agents read state and post findings/hypotheses; lead uses it to decide who runs next (e.g. "findings posted → trigger analysts").
   - **Consensus:** After multiple agents propose answers (e.g. cause branches), the team picks one via voting or ranked choice; then documenter writes the chosen result.
   - **Conflict resolution and deadlock prevention:** Allocate sections or files up front so teammates don’t edit the same artifact; order handoffs (e.g. researchers first, then analysts, then documenter); use timeouts if waiting on the board.
5. **Flow → patterns table** – For each flow that uses teams, list which patterns apply (task allocation, blackboard, consensus, conflict/deadlock as needed).
6. **Setup and run** – From Claude Code agent teams docs: enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; lead creates team and spawns teammates; shared task list and direct messaging; display modes (in-process vs split panes); clean up via lead when done. Include link to [agent teams](https://code.claude.com/docs/en/agent-teams).
7. **Write the doc** – Clear headings, tables for flow→patterns and when-to-use, short paragraphs. Apply [document-voice](.claude/skills/document-voice/SKILL.md). Link to [Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams), [How to Create Agent Coordination](https://oneuptime.com/blog/post/2026-01-30-agent-coordination/view), and [agent-teams](.claude/agents/references/agent-teams.md). Do not reference work/studio/ or any work docs; only these official and system sources.

## Rules

- Cite only the official sources above (Claude Code agent teams, OneUptime coordination) and the system reference [agent-teams](.claude/agents/references/agent-teams.md). Do not reference work/studio/ or any project-specific work docs by path.
- Output lives in README or in the project's `assets/docs/` with a kebab-case filename per [work/paths.md](work/paths.md).
- Use [document-voice](.claude/skills/document-voice/SKILL.md) and [document-github](.claude/skills/document-github/SKILL.md) if the target is a GitHub README.

## Reference

[Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams). [How to Create Agent Coordination](https://oneuptime.com/blog/post/2026-01-30-agent-coordination/view). [document](.claude/skills/document/SKILL.md). [document-agents](.claude/skills/document-agents/SKILL.md). [document-skills](.claude/skills/document-skills/SKILL.md). [work/paths.md](work/paths.md).
