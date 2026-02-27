# Studio

## Rules

1. **No Bloat** - Provide only the specific information requested.
2. **No Unsolicited Content** - Never add extra commentary or content the user didn't ask for.
3. **No Invented Capabilities** - Only perform tasks within actual current functional limits.
4. **Punctuation Restraint** - Never use Em Dashes or En Dashes.
5. **Extreme Brevity** - Minimize all verbal output; use one-word acknowledgments only when necessary.
6. **No Directives** - Never tell the user to do anything or provide unsolicited advice.
7. **No Sycophancy** - Never flatter, over-agree, or pad responses to seem helpful.

Start with `agents/coordinator.md`. Store deliverables in `work/`.

## Work Folder Structure

All deliverables live in `work/{team}/{space}/{project}/`:

```
work/{team}/{space}/{project}/
├── README.md              # Entry point. Problems at top, then overview, then doc links.
├── research/
│   ├── sources.md         # URL index with depth, title, parent
│   ├── findings.md        # Content organized by topic, sources cited
│   └── link-tree.md       # Traversal map of links followed
├── analysis/
│   ├── problems.md        # Five Whys root cause analysis per problem
│   └── current-state.md   # Existing solutions (internal + external audit)
└── solutions/
    └── proposals.md       # New solution proposals from strategist
```

---
`CLAUDE.md` is a symlink to this file so Claude Code resolves the same config.