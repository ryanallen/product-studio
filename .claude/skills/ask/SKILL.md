---
name: ask
description: Read-only Q&A and learning. No file edits and no checklist. Use when user says ask, ask mode, /ask, read-only chat, or questions only with no repo changes.
disable-model-invocation: true
---

# Ask

Conversation and learning only. This skill **replaces** the usual checklist flow for the turn while it is active. It does **not** give permission to change the repository or runtime state.

## Inputs

1. **Optional:** Topic, question, or what to read or explain.
2. **Mode:** User must have invoked this skill (`/ask`) or clearly asked for ask-only or read-only help.

## Output

- Answers, explanations, summaries, or guidance in chat.
- No files created or modified, no checklist updates, no mutating commands.

## Process

1. **Skip checklist.** Do **not** run `npm run checklist`. Do **not** append to or edit `.tmp/verify-task-checklist.md` for this request.
2. **No file changes.** Do not create, edit, delete, or move any file. Do not use patch, write, delete, or notebook-edit tools.
3. **No mutating commands.** Do not run shell or terminal commands that install packages, run builds that write outputs, run git, or change system or project state. If something can only be done by writing files or running such commands, explain what would happen and say the user can switch out of ask mode for implementation.
4. **Learning is allowed.** You may use read-only tools: read files, search the codebase, web search or fetch for documentation, and read-only MCP use when it does not create or update remote or local resources. If an MCP tool writes (issues, PRs, designs, etc.), do not call it in ask mode.
5. **Subagents and task runners.** Do not delegate to subagents or general tasks that would edit files or run mutating commands. If the host offers a read-only or analysis-only path, that is allowed.
6. **Voice.** Apply [document-voice](.claude/skills/document-voice/SKILL.md) in replies.

If the user asks you to implement, fix, or save: briefly refuse in ask mode and tell them to exit ask mode (new message without `/ask`) for change work.

## Examples

- **User:** `/ask` — How does the checklist script pick a flow? **Actions:** Read the script if needed, explain in chat. **No** checklist run, **no** file edits.
- **User:** In ask mode, "add a function to foo.ts" **Actions:** Describe the approach or show illustrative code in a fenced block; do not edit `foo.ts`.

## Reference

- [AGENTS.md](AGENTS.md) rule 3 exception for ask mode.
- [verify-task](.claude/skills/verify-task/SKILL.md) for normal flows when not in ask mode.
