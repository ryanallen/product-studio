---
name: coordinator
description: Workflow spec for Install, Save, Discover, Learn, Propose solutions, Clean up studio, and single flows. Main uses this playbook; do not delegate to coordinator.
triggers: []
tools: Read, Bash, Grep, Glob, TodoWrite
model: opus, sonnet
---

# Coordinator

This file is the **workflow playbook**, not a subagent to invoke. Main uses it to decide which flow runs and which subagent runs each step. Main does the delegating; subagents cannot spawn other subagents.

**Before executing any flow:** Delegate to verifier for verify-task (required). Do not run single flow or workflow steps until the checklist is created.

## Inputs

1. **User request** – What the user said (e.g. "refine the README", "install", "save", "discover"). Match to one flow below.
2. **work/paths.md** – When a workflow needs team, space, or ticket-id, read from here. Do not invent values.

## Output

Depends on the flow: install completes setup; save produces commits; documenter produces or updates docs; researcher returns findings; etc. Each flow lists its outcome.

## Process

1. **Task checklist (required; do not skip):** Delegate to **verifier** for [verify-task](../skills/verify-task/SKILL.md). Pass the user request and, once known, the matched flow name and steps. Verifier creates or updates `.tmp/task-checklist.md`. Do not proceed to step 2 until the checklist exists.
2. Match the user's request to one **Single flow** or **Workflow** by checking trigger phrases. If unclear, prefer the flow that best fits the request.
3. **Single flow:** Delegate once to the subagent listed for that flow. Pass the request (and any optional input) as context.
4. **Workflow:** Run the steps in order. For each step, delegate to the listed subagent. Do not skip steps.
5. Do not delegate to the coordinator. Delegate only to subagents listed in Team. Check a subagent's `triggers` (or description) in `.claude/agents/` when matching.

## Team

researcher, documenter, strategist, verifier, cleaner, updater, installer, uninstaller, designer.

## Single flows

Each row: what triggers it, optional input from the user, which subagent, and what they do.

| Trigger phrases | Optional input | Subagent | Output |
|-----------------|----------------|----------|--------|
| refine, write, write up, document, update, make, /document | target (e.g. README, a file) or context | documenter | Updated docs; for README uses document-github, document-voice |
| research, learn, look at this, read, /research | ticket, URL, text, files, images | researcher | Findings; documenter can structure next |
| research Figma, analyze Figma, Figma audit, analyze this Figma link, /research-figma | Figma URL | researcher | Figma audit report |
| install, setup, /install | none | installer | Config, MCP, handoff; then /mcp to sign in |
| save, /save | none (or specific paths if user says "save just X") | Run **Save** workflow | Commits; no push |
| clean, wipe .tmp, /clean | none | cleaner | `.tmp/` emptied |
| strategize, define, figure out, find cause, /strategize | none | strategist | Root cause analysis, suggestions |
| uninstall, uninstall3, /uninstall | none | uninstaller | MCPs removed from config; restart terminal after |
| design, /generate-figma | none | designer | Figma design created or updated |
| update figma, /update-figma | none | updater | Figma token refreshed in config |
| sync, sync upstream, /sync-upstream | none | updater | Pull from upstream main, push to repo |

## Workflows

Multi-step flows. Run steps in order; delegate each step to the listed subagent.

**Install**
- **Input:** User says install, setup, /install.
- **Output:** Repo and MCP set up; handoff; custom steps run if present.
- **Steps:**  
  1. installer → full install (config, choices, MCP, figma-bridge if chosen, handoff, then customizer if [install-custom](../skills/install-custom/SKILL.md) exists). See [installer](installer.md).

**Learn**
- **Input:** User says learn or equivalent; optional ticket/URLs/files.
- **Output:** Structured findings.
- **Steps:**  
  1. researcher → [research](../skills/research/SKILL.md) (gather from ticket/URLs/text/files, crawl up to 5 levels).  
  2. documenter → [document](../skills/document/SKILL.md) (structure findings).

**Propose solutions**
- **Input:** User wants solutions or problem analysis.
- **Output:** Problems and proposed solutions in README.
- **Steps:**  
  1. strategist → [strategize](../skills/strategize/SKILL.md) (Five Whys, root causes).  
  2. documenter → [document](../skills/document/SKILL.md) (add problems to README).

**Save**
- **Input:** User says save, /save.
- **Output:** All changes committed (or only specified paths); no push.
- **Steps:**  
  1. verifier → [verify-paths](../skills/verify-paths/SKILL.md) (compare paths.md to disk).  
  2. If mismatch: documenter → [document-paths](../skills/document-paths/SKILL.md) (sync tree).  
  3. updater → [save](../skills/save/SKILL.md) (stage and commit).

**Discover**
- **Input:** User says discover or equivalent; optional ticket/URLs.
- **Output:** Research, analysis, solutions, and ticket comment with link.
- **Steps:**  
  1. researcher → [research](../skills/research/SKILL.md) (gather, crawl up to 5 levels).  
  2. documenter → [document](../skills/document/SKILL.md) (structure findings).  
  3. strategist → [strategize](../skills/strategize/SKILL.md) (Five Whys, root causes).  
  4. documenter → [document](../skills/document/SKILL.md) (add problems to README).  
  5. researcher → [research](../skills/research/SKILL.md) (audit: find existing solutions).  
  6. documenter → [document](../skills/document/SKILL.md) (write current state).  
  7. strategist → [strategize](../skills/strategize/SKILL.md) (propose solutions).  
  8. documenter → [document](../skills/document/SKILL.md) (final pass).  
  9. documenter → [document-ticket](../skills/document-ticket/SKILL.md) (comment on ticket with link).

**Clean up studio**
- **Input:** User says clean up studio or equivalent.
- **Output:** Verification report in `.tmp/`; optionally `.tmp/` cleared.
- **Steps:**  
  1. Ask user: clean everything (all docs in paths.md + system files) or pick which paths to verify.  
  2. verifier → [verify-docs](../skills/verify-docs/SKILL.md) then [document-verification](../skills/document-verification/SKILL.md) (run both in order; report to `.tmp/verification-report.md`).  
  3. User may verify the report; optionally cleaner → [clean](../skills/clean/SKILL.md) to delete `.tmp/` contents.

## Reference

[work/paths.md](../../work/paths.md) for team, space, ticket-id. Subagent trigger phrases in [.claude/agents/](.claude/agents/) `triggers` field (or description when triggers not set).
