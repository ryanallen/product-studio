---
name: cowork-virtualization
description: Reference for how Claude Cowork runs in a VM on macOS: architecture, guest OS, security, and file access. Use when user asks about Cowork, Claude Desktop VM, Cowork security, or how Cowork runs tasks.
---

# Cowork virtualization

Reference summary of how Claude Cowork runs work in a virtual machine. Use this when explaining Cowork behavior, security, or architecture. Source: [A Review of Claude Cowork Virtualization](https://blog.jimmyvo.com/posts/claude-coworks-virtualization/) (Jimmy Vo, March 2026).

## Inputs

None. This is reference content. Apply it when the user asks about Cowork, the Claude Desktop VM, or related security and architecture.

## Output

Knowledge applied inline in the conversation. No file or command output unless the user asks for it.

## Overview (from Anthropic)

Cowork:

1. Analyzes the request and creates a plan.
2. Breaks complex work into subtasks when needed.
3. Executes work in a **virtual machine (VM)** environment.
4. Coordinates multiple workstreams in parallel when appropriate.
5. Delivers finished outputs to the host file system.

The **host** is the Mac running Claude Desktop. The **guest** is the VM managed by Claude Desktop.

## Architecture (high level)

| Layer | Technology | Role |
|-------|------------|------|
| **UI / Orchestrator** | Electron (v28) + ASAR bundle | UI and workflow start |
| **Host-side native bridge** | Swift + @ant/claude-swift (native addon) | Uses Apple VZ* APIs to create and manage the VM |
| **Guest-side runtime** | Go daemon (`coworkd`) + Bubblewrap (`bwrap`) | Runs tasks in the VM, enforces limits, mediates file access |
| **Persistence** | `sessiondata.img` (Apple shadow disk) + `.origin` hash files | Per-session home dirs, NPM logs, mutable state |
| **Network** | `srt-settings.json` allowlist (22 domains) | Restricts outbound traffic to a fixed set of domains |
| **File bridge** | VirtioFS mount at `/mnt/.virtiofs-root/` | Exposes only user-selected host folders to the guest |

Stack: **Electron (Node.js)** → **Swift** (macOS Virtualization.framework) → **Go** (guest daemon). The Swift addon is unpacked from ASAR (`swift_addon.node`); the guest runs Ubuntu 22.04 LTS ARM64 and the Claude Code CLI.

## Storage and VM bundle (macOS)

Location: `~/Library/Application Support/Claude/vm_bundles/claudevm.bundle/`

| Item | Size / format | Purpose |
|------|----------------|---------|
| **rootfs.img** | 10 GB, GPT with EFI + ext4 | Base OS: Ubuntu 22.04 LTS ARM64 |
| **sessiondata.img** | ~54 MB, Apple shadow disk | Per-session writable overlay (homes, NPM logs) |
| **smol-bin.arm64.img** | 10 MB, ExFAT as USB mass storage | Updater binaries and `srt-settings.json` policy |
| **rootfs.img.zst** / **bundle.tar.gz** | Compressed | Used to build the base image |
| **efivars.fd** | 128 KB | UEFI firmware state |
| **vmIP** / **machineIdentifier** | Binary plist | Persistent IDs for session affinity |

Base OS: Ubuntu 22.04.5 LTS (kernel 6.8.0-94-generic HWE), aarch64. Non-standard dirs: `/sessions/` (per-session homes, e.g. `inspiring-quirky-volta`), `/smol/bin/`, `/workspace/` (project mount). Users: `root`, `ubuntu` (1000), plus session users (uid ≥ 1001). Preinstalled: Python 3.10, Node, uv/uvx, pip, numpy, tesseract, LibreOffice converters, magika, pdf tools, markitdown, img2pdf. Claude Code CLI: `/usr/local/bin/claude` (ARM64 ELF, ~213 MB).

## Session lifecycle

- Host Swift layer starts the VM and creates/attaches session data disk.
- Guest `coworkd` creates a session user and home under `/sessions/<session-name>` (e.g. `vigilant-youthful-carson`).
- Session data is persisted in `sessiondata.img`; recovery reads uid/gid from the session home.
- Session users are not in sudoers; different UIDs isolate sessions from each other.

## Host file access

- User picks a local folder to “work in” in Cowork.
- That folder is exposed to the guest via **VirtioFS** at `/mnt/.virtiofs-root/`.
- Only the chosen folder(s) are visible; the rest of the host filesystem is not mounted.

## Security

- **Isolation:** Full ARM64 Linux VM (macOS Virtualization.framework), not a container. Extra constraint inside the guest via **Bubblewrap** (`bwrap`).
- **Network:** Outbound traffic limited to an allowlist in `srt-settings.json` (22 domains), e.g. NPM, PyPI, crates.io, Ubuntu archives, Anthropic API.
- **Integrity:** Base rootfs is checked (e.g. `.rootfs.img.origin` SHA1). Tampering with the rootfs can trigger VM recreation; there may be additional hardcoded or remote checks.

## Reference

- [A Review of Claude Cowork Virtualization](https://blog.jimmyvo.com/posts/claude-coworks-virtualization/) – source for this summary (static analysis, disk and log inspection; not official Anthropic docs).
