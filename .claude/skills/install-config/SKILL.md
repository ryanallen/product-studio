---
name: install-config
description: Ensure work/paths.md exists and set deliverables base URL. Part of Install workflow.
disable-model-invocation: true
---

# Install Config

Ensure paths and deliverables URL are set before other install steps.

## Inputs

None. Reads repo (git remote) and optional user input if git fails.

## Output

`work/paths.md` present with Deliverables base URL set. If install-custom template exists, `SKILL.md` created from it.

## Process

1. **Paths** – If `work/paths.md` is missing or empty, copy from `work/paths.md.template`. If `.claude/skills/install-custom/SKILL.md` is missing and `.claude/skills/install-custom/SKILL.md.template` exists, copy the template to `SKILL.md`.

2. **Deliverables base URL** – From repo root run `git remote get-url origin`. If it succeeds, convert to a deliverables base URL (e.g. `https://example.com/org/repo/tree/main/`). If git fails or there is no origin, ask the user for the deliverables link. Update `work/paths.md` and set the "Deliverables base URL:" line to that URL. Do not hardcode.

## Reference

[Coordinator](../../agents/coordinator.md) – Install workflow.
