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
- **Conversational.** Easy to skim: short paragraphs, bullets when they help. Professional and clear, not sloppy or over-familiar.
- **DRY.** Single source of truth; subagents reference skills only.

## Mechanics

- No em dashes or en dashes.
- No product or vendor names; use neutral terms (e.g. "the assistant"). Keep official paths/filenames as-is (e.g. `.claude/`, `CLAUDE.md`).
- Paths and structure from work/paths.md; no invented paths or capabilities.
- Links: canonical path from repo root (e.g. `.claude/skills/verify-task/SKILL.md`). No relative `../` or `./` hrefs.
- Avoid: fancy words, long explanations, robotic tone, assuming reader expertise.

## Reference

[document-skills](.claude/skills/document-skills/SKILL.md). [document](.claude/skills/document/SKILL.md).
