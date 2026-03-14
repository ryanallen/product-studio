# Agent teams (reference)

When to use agent teams, how to set them up, and how to coordinate. Source: [Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams) and [How to Create Agent Coordination](https://oneuptime.com/blog/post/2026-01-30-agent-coordination/view) (OneUptime). Do not reference work docs; cite these sources only.

## When to use agent teams

Agent teams = multiple Claude Code instances with a shared task list and direct messaging. One session is the lead; teammates have their own context and can talk to each other. Use agent teams when teammates need to share findings, challenge each other, and converge on an answer. Use subagents when you need focused workers that report back. Agent teams cost more (one context per teammate) and need coordination; use them only where parallel exploration and debate add real value.

From Claude Code docs: research and review (multiple aspects, share and challenge findings), new modules/features (each teammate owns a piece), debugging with competing hypotheses (theories in parallel, debate to converge), cross-layer work (frontend/backend/tests per teammate).

**Flows that benefit from agent teams:** Discover (multi-angle research + analysts with competing hypotheses + documenter), Research (multi-angle research + documenter), Refine / Learn (multi-angle research + documenter), Propose solutions / Analyst (competing hypotheses + consensus + documenter). Other flows (Save, Clean, Install, Verify-*, Design, Dev) stay with subagents unless the task is explicitly parallel (e.g. "implement these three modules").

## Setup and limitations

From [agent teams docs](https://code.claude.com/docs/en/agent-teams) and [Limitations](https://code.claude.com/docs/en/agent-teams#limitations):

- **Enable:** Experimental; off by default. Set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in [settings](https://code.claude.com/docs/en/settings) or env.
- **Version:** Claude Code v2.1.32 or later. Check: `claude --version`.
- **Limitations:** No session resumption for in-process teammates; task status can lag; shutdown can be slow; one team per session; clean up via lead only (teammates must not run cleanup); no nested teams; lead is fixed. Split panes require tmux or iTerm2; in-process works everywhere.
- **Interaction:** You can message teammates directly (e.g. Shift+Down to cycle) without going through the lead.
- **Clean up:** Always use the lead to clean up. See [Clean up the team](https://code.claude.com/docs/en/agent-teams#clean-up-the-team).

## Coordination patterns

From OneUptime and Claude Code docs:

1. **Task allocation** – Lead assigns each teammate a distinct slice before they start (e.g. researcher 1 → product angle, researcher 2 → tech angle; or analyst 1 → hypothesis A, analyst 2 → hypothesis B). Avoids duplicate work and balances load.
2. **Blackboard** – One shared place (e.g. project README) where agents read state and post findings/hypotheses; lead uses it to decide who runs next (e.g. findings from all angles posted → trigger analysts).
3. **Consensus** – After multiple agents propose answers (e.g. cause branches), the team picks one via voting or ranked choice; then documenter writes the chosen result.
4. **Conflict prevention** – Allocate sections or files up front so teammates do not edit the same artifact; order handoffs (e.g. researchers first, then analysts, then documenter); wait for each phase to finish before the next.

## Flow → patterns

| Flow | Patterns |
|------|----------|
| Discover | Task allocation (angles + hypotheses), blackboard (README as shared state), consensus (root cause per problem). |
| Research, Refine, Learn | Task allocation (one angle per teammate), blackboard (findings in one doc), then documenter. |
| Propose solutions / Analyst | Task allocation (one hypothesis per teammate), consensus (vote/rank on root cause), then documenter. |

## Best practices (from docs)

Give spawn prompts enough context; teammates load CLAUDE.md and project context but not the lead's conversation history. Wait for teammates to finish before starting the next phase. Avoid file conflicts by allocating sections or files up front.

## Reference

[Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams) · [Limitations](https://code.claude.com/docs/en/agent-teams#limitations) · [Clean up the team](https://code.claude.com/docs/en/agent-teams#clean-up-the-team) · [How to Create Agent Coordination](https://oneuptime.com/blog/post/2026-01-30-agent-coordination/view)
