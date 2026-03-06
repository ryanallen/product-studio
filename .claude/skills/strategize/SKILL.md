---
name: strategize
description: Analyze documented findings to identify problems and trace them to root causes using the Five Whys technique. Use when user says why broken, find cause, or /strategize. In Claude Code and Cursor, /skills lists all.
disable-model-invocation: true
---

# Strategize

Analyze documented findings to identify problems and trace them to root causes using the Five Whys technique.

## Inputs

1. **Project path** - See work/paths.md.
2. **Documents to analyze** - README.md in that path.

## Output

Project README updated with `## 🐛 Problems` at the **top** (above all other content except the H1 title). All output in that README only. Structure:

### Summary

| # | Perceived Problem | Root Cause | Category |
|---|-------------------|------------|----------|
| 1 | ...               | ...        | ...      |

### Detailed Analysis

For each problem:

```markdown
### Problem 1: {Perceived Problem}

**Symptom:** {What the user experiences}

**Five Whys:**

1. Why? ...because {reason}.
2. Why? ...because {reason}.
3. Why? ...because {reason}.
4. Why? ...because {reason}.
5. Why? ...because {root cause}.

**Root Cause:** {root cause}
**Category:** {category}

```mermaid
mindmap
  root(({Perceived Problem}))
    Why 1
      Why 2
        Why 3
          Why 4
            Root Cause
```

**Problem Definition:**
{One sentence: "To enable {who} to {what} in order to {outcome}."}
```

## Process

### 1. Read All Documentation

Read the project's `README.md`. Understand the full context before identifying any problems.

### 2. Identify Problems

Scan for:
- Explicit pain points or complaints
- Friction in processes or workflows
- Gaps between stated goals and actual outcomes
- Broken or missing processes
- Mismatches between user needs and current solutions

List each as a **perceived problem** (the symptom the user sees).

### 3. Five Whys for Each Problem

For every perceived problem, ask "Why?" iteratively to drill from symptom to root cause.

```
Perceived Problem: {symptom}

1. Why does this happen?
   ...because {reason}. (refined problem)
2. Why {reason}?
   ...because {deeper reason}. (refined problem)
3. Why {deeper reason}?
   ...because {deeper still}. (refined problem / alterable behavior)
4. Why {deeper still}?
   ...because {process gap}. (broken process identified)
5. Why {process gap}?
   ...because {root cause}. (root cause)
```

Stop when you identify either:
- A **broken process** that can be fixed
- An **alterable behavior** that can be changed

This may happen at why 3, 4, or 5. Do not force all five if the root cause is clear earlier.

### 4. Classify Root Causes

Categorize each root cause:
- **Process** - Missing or broken workflow
- **Knowledge** - Lack of awareness or information
- **Tool** - Inadequate or missing tooling
- **Design** - Poor UX, unclear interface, bad information architecture
- **Communication** - Misalignment between parties

### 5. Write Problem Analysis

Write to the project README at the path from work/paths.md using the structure in Output (Summary table, Detailed Analysis per problem). Use Five Whys, mindmaps, and problem definitions per Output.

### 6. Place in README

Put the output under `## 🐛 Problems` at the top of the README, above all other content except the H1 title.

## Rules

- Never skip the Five Whys. Every perceived problem gets the full treatment.
- Root causes must be actionable (a broken process or alterable behavior, not "that's just how it is")
- Always produce a one-sentence problem definition for each root cause
- Use mermaid mindmaps to visualize every Five Whys chain
- Do not create other files; all output goes in the project README only.

## Reference

[work/paths.md](../../work/paths.md) – Project path. [document](../document/SKILL.md) – Documenter may add problems to README per Propose solutions workflow.
