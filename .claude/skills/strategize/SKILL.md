---
name: strategize
description: Analyze documented findings to identify problems and trace them to root causes using the Five Whys technique.
triggers: "strategize, define, figure out, find cause, /strategize"
disable-model-invocation: true
---

# Strategize

Use documented findings to spot problems and trace each one to a root cause with the Five Whys.

## Inputs

1. **Project path** – From work/paths.md.
2. **Documents to analyze** – The project README.md at that path.

## Output

Update the project README with a new section: `## 🐛 Problems`. Put it at the **top**, right under the main title. Output location: [document](../document/SKILL.md).

### Summary

| # | Perceived Problem | Root Cause | Category |
|---|-------------------|------------|----------|
| 1 | ...               | ...        | ...      |

### Detailed Analysis

For each problem use this shape:

```markdown
### Problem 1: {Perceived Problem}

**Symptom:** {What the user experiences}

**Five Whys:**

1. Why? ...because {reason}.
2. Why? ...because {deeper reason}.
… (as many as needed; stop when you reach a root cause)
N. Why? ...because {root cause}.

**Root Cause:** {root cause}
**Category:** {category}

```mermaid
mindmap
  root(({Perceived Problem}))
    Why 1
      Why 2
        …
          Root Cause
```

**Problem Definition:** One sentence. Prefer How Might We when you have user, needs, and goals: *How might we help {user} do {mainNeed1} and {mainNeed2} so they can {userGoal} and we can {businessGoal}?* Otherwise: *Help {who} to {what} so that {outcome}.*
```

## Process

### 1. Read the doc

Read the project README. Get the full picture before you name any problems.

### 2. Find problems

Look for:
- Clear pain points or complaints
- Friction in how people work
- Gaps between what they want and what actually happens
- Steps that are broken or missing
- Needs that don’t match the current setup

Write each as a **perceived problem** (what the user sees or feels).

### 3. Five Whys for each problem

Keep asking “Why?” for each perceived problem until you reach a **root cause**: either a broken process you can fix or a behavior someone can change. You might get there in 3 whys or in 7; stop when you have something actionable, not at a fixed number. Do not force exactly five.

Write each chain in the README (as many “Why?” steps as you actually used); the last “because” in the chain is the root cause.

### 4. Label the root cause

Pick one category per root cause:
- **Process** – Workflow is missing or broken
- **Knowledge** – People don’t know something they need
- **Tool** – The right tool is missing or not good enough
- **Design** – UX, layout, or structure is confusing or wrong
- **Communication** – People are not aligned

### 5. Write the analysis

Write into the project README using the Output shape: summary table, then detailed analysis for each problem (Five Whys, mindmap, problem definition).

### 6. Put it at the top

Place everything under `## 🐛 Problems` at the top of the README, under the H1 only.

## Rules

- Do the Five Whys for every perceived problem.
- Root causes must be something you can act on (fix a process or change a behavior), not “that’s just how it is.”
- Write one problem definition sentence per root cause.
- Add a mermaid mindmap for each Five Whys chain.

## Reference

[work/paths.md](../../work/paths.md) – Project path. [document](../document/SKILL.md) – Documenter may add problems to README per Propose solutions workflow.
