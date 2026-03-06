---
name: install-express
description: Express install shows hidden yes, install all, then Figma token. Part of Install workflow. Used when user chose express in install-choices.
disable-model-invocation: true
---

# Install Express

1. **Show hidden files:** Yes. **macOS:** Run (if it fails due to permissions, continue): `defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder`. **Windows:** File Explorer → View → Show → Hidden items. (Or Folder Options → View → Show hidden files and folders.)

2. **What to install:** All (figma-console, atlassian-rovo). Record this for later steps.

3. **Figma token:** Give instructions, then ask them to paste the token. Do not ask whether they have one.
   - **How to get it:** Figma → profile → Settings → Security. Personal access tokens: create (e.g. "Figma Console MCP", all scopes, up to 90 days), copy.
   - **Ask:** Paste your Figma token (starts with `figd_`).

Then resume at step 3 of the **Install** workflow in [Coordinator](../../agents/coordinator.md).
