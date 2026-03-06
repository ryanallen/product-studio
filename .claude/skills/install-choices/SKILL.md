---
name: install-choices
description: Ask custom or express install. Custom walks through each choice; express runs install-express then workflow continues from install-mcp. Part of Install workflow.
disable-model-invocation: true
---

# Install Choices

First ask **Custom or express install?** Then run the chosen path.

## Inputs

None. User answers the prompt.

## Output

Choice recorded. If express, run [install-express](../install-express/SKILL.md) then installer continues at install-mcp. If custom, continue with the steps below.

## Process (custom path)

1. **Show hidden files** – Ask if they want to show hidden files. If no, continue. If yes:
   - **macOS** – Run (if it fails due to permissions, continue): `defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder`
   - **Windows** – File Explorer → View → Show → Hidden items. (Or Folder Options → View → Show hidden files and folders.)

2. **What to install** – Ask if they want all or to pick and choose.
   - **All** – figma-console, atlassian-rovo. Figma token needed next if figma-console.
   - **Pick and choose** – For each of figma-console, atlassian-rovo ask if they want it.
   Record which MCPs they chose; later steps use only those.

3. **Figma token (if they chose figma-console)** – Give instructions, then ask them to paste the token. Do not ask whether they have one.
   - **How to get it** – Figma → profile → Settings → Security. Personal access tokens: create (e.g. "Figma Console MCP", all scopes, up to 90 days), copy.
   - **Ask** – Paste your Figma token (starts with `figd_`).

## Reference

[Coordinator](../../agents/coordinator.md) – Install workflow. [install-express](../install-express/SKILL.md) – Express path.
