---
name: install
description: Run standard Product Studio install (config, choices, MCP, Figma bridge if chosen, handoff, customizer if present).
disable-model-invocation: true
---

# Install

Run the **Install** workflow in [Coordinator](../../agents/coordinator.md). The installer runs the full flow (config, choices, MCP, Figma bridge if chosen, handoff, then customizer if present).

## Inputs

None. User invokes with setup, install, or /install.

## Output

Install complete. User may need to restart the app and run `/mcp` for OAuth (see handoff).

## Process

1. Run the Install workflow in Coordinator; the installer runs the full flow (config, choices, MCP, Figma bridge if chosen, handoff, then customizer if present).

## Reference

[Coordinator](../../agents/coordinator.md) – Install workflow. [installer](../../agents/installer.md) – Subagent that runs the flow.
