---
name: install-handoff
description: State handoff message last and create marker. Run after all other install steps.
disable-model-invocation: true
---

# Install Handoff

State the handoff message last and create the marker so the installer knows the flow completed.

## Inputs

None. Installer runs this after install-mcp-setup (if run) and before install-custom.

## Output

User told to restart app, run `/mcp`, and complete OAuth. Marker file created at `.claude/skills/install/install-handoff.marker`.

## Process

1. **State last** – If you say the handoff earlier, they may read it and skip the steps above. Tell the user: fully restart the app (Cursor, Claude Code, etc.), open project, run `/mcp` and complete OAuth for Figma and Atlassian.

2. **Create marker** – Create `.claude/skills/install/install-handoff.marker`.

## Reference

[installer](.claude/agents/installer.md) – Step 5 runs this.
