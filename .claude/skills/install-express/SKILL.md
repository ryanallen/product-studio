---
name: install-express
description: Express install: show hidden yes, install all (figma-console, atlassian-rovo, github), collect Figma token and GitHub PAT. Then resume at install-mcp.
disable-model-invocation: true
---

# Install Express

Run when user chose express in install-choices. Then resume at step 3 (install-mcp) of the Install workflow.

## Inputs

None. User already chose express.

## Output

Hidden files shown (or instructions given), all MCPs recorded, Figma token collected if figma-console, GitHub PAT if github. Flow continues at install-mcp.

## Process

1. **Show hidden files** – Yes. **macOS** – Run (if it fails due to permissions, continue): `defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder`. **Windows** – File Explorer → View → Show → Hidden items. (Or Folder Options → View → Show hidden files and folders.)

2. **What to install** – All (figma-console, atlassian-rovo, github). Record for later steps.

3. **Figma token** – Give instructions, then ask them to paste the token. Do not ask whether they have one.
   - **How to get it** – Figma → profile → Settings → Security. Personal access tokens: create (e.g. "Figma Console MCP", all scopes, up to 90 days), copy.
   - **Ask** – Paste your Figma token (starts with `figd_`).

4. **GitHub PAT** – Give instructions, then ask them to paste the token. Do not ask whether they have one.
   - **How to get it** – GitHub → Settings → Developer settings → Personal access tokens. Create (e.g. "GitHub MCP", scopes: repo; for Projects add read:project, project), copy.
   - **Ask** – Paste your GitHub token.

Then resume at step 3 (install-mcp) of the **Install** workflow in [Coordinator](../../agents/coordinator.md).

## Reference

[Coordinator](../../agents/coordinator.md) – Install workflow. [install-choices](../install-choices/SKILL.md) – Where express is chosen.
