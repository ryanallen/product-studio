---
name: developer-check-types
description: Run the project's TypeScript type checker and fix or explain errors in plain language. Use when user says check types, typecheck, tsc, type errors.
disable-model-invocation: true
---

# Developer Check Types

Run the project's type checker (e.g. `tsc --noEmit` or the script in package.json). Use after changing TypeScript code. Explain any errors in simple words; use [document-voice](.claude/skills/document-voice/SKILL.md) when talking to the user.

## When to use

- After writing or changing TypeScript.
- When the user reports type errors.
- After formatting (Prettier), before linting (ESLint). Fix types first so lint rules see clean code.

## Process

1. Find how the project runs type checking (e.g. `npm run check:types`, `pnpm exec tsc --noEmit`, or `npx tsc --noEmit`). Run it from the right directory (package or repo root, per project).
2. If there are errors: read file and line, fix the type issue (use [developer-typescript](.claude/skills/developer-typescript/SKILL.md) for patterns). Re-run until clean.
3. When explaining to the user: use plain language, explain terms the first time, no jargon.

## Output

- Success: types are valid; say so briefly.
- Errors: list file and line, what’s wrong in plain language, and what you changed (or what the user should change). Fix one at a time if many; re-run after each fix.

## Reference

[developer-typescript](.claude/skills/developer-typescript/SKILL.md) – type patterns. [document-voice](.claude/skills/document-voice/SKILL.md) – how to explain.
