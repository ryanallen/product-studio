---
name: generate-figma
description: Generate or update a Figma design by calling the Figma Console MCP with target file details. Use when user says "generate Figma", "generate design", or /generate-figma. In Claude Code and Cursor, /skills lists all.
---

# Generate Figma

Use the Figma Console MCP with the target Figma file details to start a design generation or update, or to obtain any capture IDs / endpoints needed for capture flows.

## Inputs

**Figma file details** (required): Target file, e.g. file key or Figma file URL such as `https://www.figma.com/file/abc123/...`. Optionally: parent node ID if the design should be added under a specific node.

If missing, ask the user before proceeding.

## Process

1. Resolve file key (and optional node id) from the user's Figma file URL or details.
2. Call the Figma Console MCP with those parameters.
3. Use the response (e.g. capture ID and endpoint) as required: either report them to the user, or hand off to another flow (e.g. capture-webpage for live page capture).

## Requirements

- Figma Console MCP (`figma-console-mcp`) configured and authenticated for this project.
