---
name: designer-figma
description: Generate or update a Figma design via Figma Console MCP; or get capture ID/endpoint for capture flows.
disable-model-invocation: true
argument-hint: "[file-url-or-key] [node-id]"
---

# Designer Figma

Use the Figma Console MCP with target file details to generate or update a design, or to get capture IDs or endpoints for capture flows.

## Inputs

- **Figma file details** – Target file, file key, or Figma file URL. Optional parent node ID if design should go under a specific node.

## Output

Design generated or updated in Figma, or capture ID/endpoint to report or hand off.

## Process

1. **Resolve** – File key (and node id if given) from the user's Figma file URL or details.
2. **Call MCP** – Figma Console MCP with those parameters.
3. **Report** – Use the response (capture ID, endpoint) to report to the user or hand off to another flow.

### Requirements

- Figma Console MCP configured and authenticated.
- Figma Desktop Bridge (for Prompt to Figma): run `npm run setup:figma-bridge` to extract to `.claude/skills/designer-figma/scripts/figma-desktop-bridge`. In Figma Desktop, Plugins → Development → Import plugin from manifest → select `.claude/skills/designer-figma/scripts/figma-desktop-bridge/manifest.json`. Keep the bridge running while using Prompt to Figma.

## Reference

Figma Console MCP and setup are documented in the Install workflow (install-mcp-setup, install-figma-bridge).
