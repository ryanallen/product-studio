---
name: root-cause-analysis
description: Analyzes documented findings to identify problems and trace them to root causes using the Five Whys technique. Use when user says "analyze problems", "find root cause", "Five Whys", or asks to identify why something is broken.
---

# Root Cause Analysis

Analyzes documented findings to identify problems and trace them to root causes using the Five Whys technique.

## Inputs

1. **Project path** - `work/{team}/{space}/{project}/`
2. **Documents to analyze** - Typically `work/{team}/{space}/{project}/README.md`

If the project path is missing, ask the user before proceeding.

Valid team and space values are defined in `work/config.md`.

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

Output to the `## Problems` section of `{project-path}/README.md`:

```markdown
# Problem Analysis

## Summary

| # | Perceived Problem | Root Cause | Category |
|---|-------------------|------------|----------|
| 1 | ...               | ...        | ...      |

## Detailed Analysis

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

### 6. Place in README

The problems summary goes at the **top** of the project's `README.md` under a `## Problems` heading, above all other content (except the H1 title).

## Rules

- Never skip the Five Whys. Every perceived problem gets the full treatment.
- Root causes must be actionable (a broken process or alterable behavior, not "that's just how it is")
- Always produce a one-sentence problem definition for each root cause
- Use mermaid mindmaps to visualize every Five Whys chain
