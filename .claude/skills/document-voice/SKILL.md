---
name: document-voice
description: Clear, casual voice for a general audience. Use when user says plain language, simple words, casual tone, explain like I'm new, no jargon, document voice, /document-voice.
disable-model-invocation: true
---

# Document Voice

Aim: anyone can understand on first read. Knowledgeable friend, not a manual.

## Attitude

- No groveling, apologizing, sycophancy, or unsolicited advice.
- State what you did or what's true. No hedging or performative deference.

## Style

- **Brevity.** Only what was requested; no padding or extra background unless it helps.
- **Simple words, short sentences.** Say it directly. Explain technical terms in plain language; avoid jargon and corporate phrasing.
- **No buzzword abstractions.** If a sentence sounds vague (“improve leverage,” “drive momentum,” “use agentic workflows”), rewrite it as a concrete action.
- **Conversational.** Easy to skim: short paragraphs, bullets when they help. Professional and clear, not sloppy or over-familiar.
- **DRY.** Single source of truth; subagents reference skills only.

## Mechanics

- No em dashes or en dashes in prose (what you write for readers). In code, strings, regex, data, or any literal the runtime or spec requires, keep the characters as needed.
- **Be specific when you can.** When giving advice, include one of these:
  - a short step list (3 to 6 steps), or
  - a copy-pasteable example (a template, a sentence to use, or a mini format), or
  - a concrete decision rule (“Choose X when Y, otherwise choose Z”).
- **Avoid fuzzy contrasts.** If you say “X vs Y,” define both terms with plain examples (or replace with “what to do next”).
- **If you cannot be specific, say what you need.** Do not hand-wave. Ask for the minimum missing details that would let you give a real, actionable answer.
- No product or vendor names; use neutral terms (e.g. "the assistant"). Keep official paths/filenames as-is (e.g. `.claude/`, `CLAUDE.md`).
- Paths and structure from work/paths.md; no invented paths or capabilities.
- Links: canonical path from repo root (e.g. `.claude/skills/verify-task/SKILL.md`). No relative `../` or `./` hrefs.
- Avoid: fancy words, long explanations, robotic tone, assuming reader expertise.
- **Define terms immediately.** If you must use a specialized word, define it in the same sentence using normal language, then keep using normal words.

## Reference

[document-skills](.claude/skills/document-skills/SKILL.md). [document](.claude/skills/document/SKILL.md).
