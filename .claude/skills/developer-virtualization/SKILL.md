---
name: developer-virtualization
description: Best practices for development work running in a VM: isolation, file access, sessions, security. Use when the document flow calls the developer and the developer determines it needs this (e.g. explaining where work runs, security boundaries, or file access).
---

# Developer virtualization

Reference for best practices when development work runs inside a virtual machine. Use when the document flow invokes the developer and the developer decides it needs this context.

## Inputs

None. Reference content. The developer pulls this in when it needs to explain VM-based execution, security boundaries, or file access.

## Output

Knowledge applied inline. No file or command unless the user asks.

## Best practices and why

### Work runs in a VM

The host is the machine running the app. The guest is the VM where tasks run. Splitting host and guest gives isolation: code and tools run in a separate environment from the host OS, which limits blast radius and makes behavior easier to reason about.

### Layered architecture

| Layer | Role |
|-------|------|
| **UI / orchestrator** | Starts workflows and talks to the host. |
| **Host-side bridge** | Creates and manages the VM using the platform virtualization APIs. |
| **Guest-side runtime** | Runs tasks in the VM, enforces limits, mediates file access. |
| **Persistence** | Read-only base image plus a writable overlay (e.g. shadow disk) so session data is separate from the base OS. |
| **Network** | Outbound traffic restricted to an allowlist of domains (e.g. package registries, APIs). |
| **File bridge** | Only user-selected host folders are exposed to the guest; the rest of the host filesystem is not mounted. |

Keeping these layers clear improves security and predictability: the guest cannot see or touch the full host.

### Base image and session data

- **Base image:** Read-only. Provides a known OS and tool set. Integrity can be checked (e.g. hash) so tampering is detectable.
- **Session overlay:** Writable per-session state (homes, caches, logs) lives on a separate volume or overlay. Sessions do not mutate the base image, so you get reproducibility and easy reset.

Why: same base for everyone; session isolation; no hidden changes to the base.

### Session lifecycle

- Each session gets a dedicated user and home directory inside the guest.
- Session state is persisted so work can resume; recovery uses the session home (e.g. uid/gid).
- Session users are unprivileged (e.g. no sudo). Different uids keep sessions isolated from each other.

Why: multi-session safety and clear ownership of files.

### Host file access

- The user chooses which host folder(s) to use for the work.
- Only those folders are visible in the guest (e.g. via a single mount point). The rest of the host is not exposed.

Why: least privilege; the user explicitly decides what the VM can see.

### Security

- **Isolation:** A full VM (not just a container) plus, inside the guest, an extra sandbox (e.g. namespace-based) around task execution. Reduces impact of malicious or buggy code.
- **Network:** Outbound limited to an allowlist (registries, update servers, required APIs). Prevents arbitrary exfiltration or probing.
- **Integrity:** Base image verified; tampering can trigger VM recreation or similar. Ensures the environment matches a known good state.

## Reference

[developer](../../agents/developer.md) – Invoked by document flow; developer uses this skill when it needs VM context.
