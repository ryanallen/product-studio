---
name: document-agent
description: Use Claude Code subagents when documenting. See https://code.claude.com/docs/en/sub-agents
---

# Document Agent

When doing documentation work, use [Claude Code subagents](https://code.claude.com/docs/en/sub-agents) as follows:

1. **Exploration** – Delegate codebase or file discovery to **Explore** (read-only, fast). Keeps exploration out of the main conversation context.
2. **Multi-step documentation** – Delegate to **general-purpose** when the task needs both gathering context and writing (e.g. read source material then produce README).
3. **Chaining** – Subagents cannot spawn other subagents. Chain from the main conversation: e.g. Explore for discovery, then document skill in main context, or general-purpose for a full pass.
4. **When to delegate** – Use subagents when the work is self-contained and can return a summary; use main conversation when the task needs frequent back-and-forth or shared context across phases.

Reference: [Create custom subagents](https://code.claude.com/docs/en/sub-agents).
