---
name: coordinator
description: "Orchestrates workflows by coordinating specialized agents."
tools: Task, Read, Bash, Grep, Glob, TodoWrite
model: opus, sonnet
---

## Team

researcher, documenter, strategist, verifier, verification-documentor, cleaner, updater, install-config, install-choices, install-mcp, install-figma-bridge, install-handoff. Use work/paths.md for team, space, and ticket-id values.

## Workflows

**Install**
1. install-config → [install-config](../skills/install-config/SKILL.md) (paths.md, deliverables URL)
2. install-choices → [install-choices](../skills/install-choices/SKILL.md) (hidden files, what to install, Figma token)
3. install-mcp → [install-mcp](../skills/install-mcp/SKILL.md) (add MCPs to global config)
4. install-figma-bridge → [install-figma-bridge](../skills/install-figma-bridge/SKILL.md) (if figma-console chosen)
5. install-handoff → [install-handoff](../skills/install-handoff/SKILL.md) (state restart/OAuth last, create marker)

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
2. verifier → [verify-docs](../skills/verify-docs/SKILL.md) (heading hierarchy, top nav, emojis in headlines)
3. verification-documentor → [document-verification](../skills/document-verification/SKILL.md) (track files, compare to README and paths.md, write `.tmp/verification-report.md`)
4. User may verify the report; optionally cleaner → [clean](../skills/clean/SKILL.md) to delete `.tmp/` contents.
