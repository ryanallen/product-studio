---
name: install
description: Run standard Product Studio install (config, choices, MCP, Figma bridge if chosen, handoff, customizer if present). Use when user says install, setup, /install.
disable-model-invocation: true
---

# Install

Run the Install workflow (flow and steps from [checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts)). The installer runs the full flow (config, choices, MCP, Figma bridge if chosen, handoff, then customizer if present).

## Inputs

None. User invokes with setup, install, or /install.

## Output

Install complete. User may need to restart the app and run `/mcp` for OAuth (see handoff).

## Process

1. Run the Install workflow; the installer runs the full flow (config, choices, MCP, Figma bridge if chosen, handoff, then customizer if present).

## Reference

[checklist script](.claude/skills/verify-task/scripts/verify-task-checklist.ts). [installer](.claude/agents/installer.md) runs the flow.
