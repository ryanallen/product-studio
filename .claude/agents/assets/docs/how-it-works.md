# How it works (plain language)

This page explains the technical bits in simple terms. You don't need to read it to use Product Studio; it's here if you're curious what's going on under the hood.

---

## What is npm?

**npm** is the Node Package Manager. It comes with Node.js. It does two main things: it installs packages (libraries other people wrote), and it runs **scripts** (short commands you define).

When you run `npm run checklist`, you're not installing anything. You're asking npm to run a script named `checklist` that's defined in `package.json`. So "npm" is just the thing that reads that file and runs the command next to that name.

---

## What does `npm run checklist -- "something"` do?

Three parts:

1. **`npm run checklist`** – Run the script called `checklist` (see [package.json](../../../../package.json)). That script runs a small TypeScript program that lives under `.claude/skills/verify-task/scripts/checklist.ts`.

2. **`--`** – In npm, everything after `--` is passed to the script, not to npm. So the `--` is how you give your sentence to the checklist program.

3. **`"something"`** – The words you put here (e.g. "refine the doc" or "save") are the **task summary**. The checklist program reads this and decides which **flow** you're in (e.g. refine, save, research). Same words → same flow every time. That's what we mean by **deterministic**.

So in one line: **you type a short description of what you want; the program turns that into a list of steps and writes that list into the task checklist file.**

---

## What does the checklist program actually do?

It looks at your message and matches it against a list of phrases (e.g. "save", "refine", "research"). When it finds a match, it picks the right **flow** (a fixed list of steps). Then it appends a new section to `.tmp/task-checklist.md` with:

- A date and time
- Your summary
- The steps for that flow (e.g. verify-task, document-voice, document, document-github)
- A Notes section

So the checklist file is a **running log**: one block per task, with the steps the agent is supposed to follow. The agent (or you) can check off each step as it's done. The program doesn't do the work; it only **writes down the plan**.

---

## Why use a TypeScript script instead of "the AI decides"?

So that the same request always produces the same steps. If the AI decided every time, "refine the doc" might sometimes get three steps and sometimes five, or different ones. The script is a single source of truth: same phrase → same flow → same list. That way the checklist is predictable and you can see exactly what the agent is supposed to do. We use the same idea in a couple of other places (e.g. picking which doc subagent to use, or which README sections to use). Small scripts, same input → same output.

---

## Other npm scripts in this repo

In [package.json](../../../../package.json) you'll see a few more:

| Script | What it runs | What it's for |
|--------|----------------|----------------|
| `checklist` | The checklist TypeScript program | Append a task section and steps to `.tmp/task-checklist.md` |
| `doc:pick-subagent` | A script under document-agent | Decides which doc subagent to use (explore, plan, etc.) from your message |
| `doc:structure` | A script under document | Returns the section outline for a doc type (research, project-overview, etc.) |
| `clean` | A small Node script | Empties `.tmp/` |
| `sync:codex`, `setup:figma-bridge` | Other helpers | Syncing config and setting up Figma; see the script files if you care |

Same idea: you run `npm run <name> -- <args>` and the script does one job in a deterministic way.

---

## Where the logic lives

- **Flow steps and trigger phrases:** [.claude/skills/verify-task/scripts/checklist.ts](../../../skills/verify-task/scripts/checklist.ts) (FLOWS and TRIGGERS at the top).
- **What the coordinator does with that:** [coordinator-flows.md](coordinator-flows.md).

If you change trigger phrases or add a flow, edit the TypeScript file and the flows doc so they stay in sync.
