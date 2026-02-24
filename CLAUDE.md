# Studio

Operations system for teams. Orchestrates specialized AI agents through the D.E.S.I.G.N. process.

## Dependencies

- **Node.js** — Required for Playwright automation
- **Playwright** — Browser automation for webpage capture (`npm install playwright`)
- **Figma MCP** — Provides capture infrastructure and Figma file creation (configured in Claude Desktop)

## Agent System

Agents live in `agents/`. Each is a specialist with a focused role.

**Available agents:**
- `coordinator` — Orchestrates workflows, delegates to specialists. Entry point for complex tasks.
- `researcher` — Competitive analysis, user research, pattern research, current state audits.
- `documenter` — Specs, requirements, handoff documentation, research summaries.
- `designer` — Captures webpages to Figma using Playwright + Figma MCP. Extracts design tokens and creates handoff docs.


## The D.E.S.I.G.N. Process

| Phase | What Happens |
|-------|-------------|
| **D** — Discovery | Understand users, competitors, requirements, current state |
| **E** — Exploration | Define design direction, validate against system standards |
| **S** — See What Works | Research, experiment, test divergent concepts |
| **I** — Iterate | Refine based on findings, validate accessibility |
| **G** — Go to Market | Polish, finalize, prep for handoff |
| **N** — Next Steps | Measure, capture learnings |

Not every task needs all six phases. The coordinator decides which apply.

## Quality Standards

- No stub files — every agent/skill must be fully implemented before being referenced
- Research before design — don't jump to solutions
- Document decisions with rationale, not just outcomes
- Accessibility is a requirement, not an afterthought
- Self-cleaning — when an approach fails, remove the failed work before trying again

## File Storage

- `work/` — Projects, research, specs, deliverables
- `agents/` — Agent definitions and workflow diagrams
- `skills/scripts/` — Automation scripts (capture.js for webpage-to-Figma)
- `package.json` — Node.js dependencies (Playwright)

## Git Commits

Use title + detailed description format with Problem/Solution/Changes/Impact structure. Place formatted commit at end of work summary.

## Communication

- Direct, no fluff
- Technical accuracy over politeness
- Say when something is broken
- Honest assessment of problems

## Retry & Escalation

1. **Attempt 1** — Execute with current context
2. **Attempt 2** — Clean up failed work, try alternative approach
3. **Attempt 3** — Escalate to coordinator or ask user for help

## Self-Improvement

Agents have a **Learnings** section at the bottom of their files. This is how the system gets smarter over time:

**When to update Learnings:**
- After completing a task that revealed something non-obvious
- When a pattern worked particularly well (or failed)
- When an edge case was discovered
- When feedback changed how an agent should behave

**What to record:**
- Date and brief context
- What happened and what was learned
- How future work should be different

**What NOT to record:**
- Obvious things ("documentation should be clear")
- One-off details that won't recur
- Anything already covered by the agent's main instructions
