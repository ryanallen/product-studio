---
name: install
description: Run the standard Product Studio install steps.
triggers: "setup, install, /install"
disable-model-invocation: true
---

# Install

Run the **Install** workflow in [Coordinator](../../agents/coordinator.md). The installer subagent runs the full flow (config, choices, MCP, Figma bridge if chosen, handoff, then customizer if present).

## Inputs

None required. User invokes with setup, install, or /install.

## Output

Install flow complete. User may need to restart the app and run `/mcp` for OAuth (see handoff).

## Process

1. Run the Install workflow in Coordinator; the installer runs the full flow (config, choices, MCP, Figma bridge if chosen, handoff, then customizer if present).

## Reference

[Coordinator](../../agents/coordinator.md) – Install workflow. [installer](../../agents/installer.md) – Subagent that runs the flow.
