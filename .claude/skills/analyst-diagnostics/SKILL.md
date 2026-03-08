---
name: analyst-diagnostics
description: Analyze findings: Ishikawa (fishbone) and Lovebug (causes + barriers), Five Whys, summary table of top problems. Use when user says analyst, diagnostics, define, figure out, find cause, /analyst-diagnostics.
disable-model-invocation: true
---

# Analyst diagnostics

Use documented findings to find problems, structure causes (Ishikawa/fishbone), add barriers and recovery (Lovebug), drill to root cause with Five Whys. [Ishikawa](https://en.wikipedia.org/wiki/Ishikawa_diagram) groups causes on branches; [Lovebug](http://cri.sagepub.com/content/19/4-5/87) (Card, Clinical Risk 2013) adds what prevents or mitigates (force-field style). Five Whys traces one cause branch to root. Use for incidents (retrospective) and planned change (prospective). Put all top problems in the Summary table first, then detailed analysis per problem.

## Inputs

1. **Project path** – From work/paths.md.
2. **Documents to analyze** – The project README.md at that path.

## Output

Update the project README with a new section: `## 🐛 Problems`. Put it at the **top**, right under the main title. Output location: [document](../document/SKILL.md).

### Summary (all top problems)

One row per problem. This table is the single place that lists every problem and its root cause.

| # | Perceived Problem | Root Cause | Category |
|---|-------------------|------------|----------|
| 1 | ...               | ...        | ...      |

### Detailed Analysis

For each problem use this shape:

```markdown
### Problem 1: {Perceived Problem}

**Symptom:** {What the user experiences}

**Cause categories (Ishikawa):** List the five categories; mark which branch you drilled. Example: Process, Knowledge, **Tool** ✓, Design, Communication.

**Causes and contributing factors:** (What made the problem more likely.) Brief bullets per category that applied.

**Barriers:** (What prevented or mitigated, or could have. Lovebug right side.) Same categories; note what went right, what failed, or what would help. Optional: mark strength (strong/moderate/weak) if useful.

**Five Whys:** (Drill the chosen cause branch to root cause.)

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
- Needs that don't match the current setup

Write each as a **perceived problem** (what the user sees or feels). These become the rows in the Summary table and the heads of each detailed analysis.

### 3. For each problem: Ishikawa, Lovebug, then Five Whys

**Ishikawa (fishbone):** Group potential causes into categories (five below; they align with [common frameworks](https://en.wikipedia.org/wiki/Ishikawa_diagram#Root_causes)). Problem = head; each category = bone; sub-causes branch off.

**Lovebug (bidirectional):** Add **barriers**: what prevents or mitigates the problem, or what enabled recovery. Same categories on both sides (causes left, barriers right). From [Card, Clinical Risk 2013](http://cri.sagepub.com/content/19/4-5/87): depicts forces for and against the outcome; use for incidents (causes vs barriers) or planned change (drivers vs obstacles). Optionally note strength of forces.

**Five Whys:** Pick the most likely cause branch and ask "Why?" until you reach a **root cause**: a broken process you can fix or a behavior someone can change. Stop when you have something actionable; do not force exactly five.

Write each chain in the README (cause categories, causes and barriers, then the Why chain); the last "because" is the root cause.

### 4. Label the root cause

Pick one category per root cause (same as the Ishikawa bones):
- **Process** – Workflow is missing or broken (Method)
- **Knowledge** – People don't know something they need (Manpower/Mindpower, Skill)
- **Tool** – The right tool is missing or not good enough (Machine, Material)
- **Design** – UX, layout, or structure is confusing or wrong (Physical evidence, Place)
- **Communication** – People are not aligned (People, Promotion)

### 5. Write the analysis

Write into the project README: first the **Summary (all top problems)** table, then detailed analysis per problem (cause categories, causes and barriers, Five Whys, mindmap, problem definition).

### 6. Put it at the top

Place everything under `## 🐛 Problems` at the top of the README, under the H1 only.

## Rules

- Use cause categories (Ishikawa) and barriers (Lovebug) for every problem, then Five Whys on the chosen cause branch.
- Root causes must be something you can act on (fix a process or change a behavior), not "that's just how it is."
- Write one problem definition sentence per root cause.
- Add a mermaid mindmap for each Five Whys chain.
- Summary table must list every problem from the run (all top problems in one place).

## Reference

[work/paths.md](../../work/paths.md) – Project path. [document](../document/SKILL.md) – Documenter may add problems to README per Propose solutions workflow. [Ishikawa diagram](https://en.wikipedia.org/wiki/Ishikawa_diagram) – Cause-and-effect (fishbone) categories. Card AJ. A new tool for hazard analysis and force-field analysis: The Lovebug diagram. *Clinical Risk* 2013;19(4-5):87. [DOI 10.1177/1356262213510855](http://cri.sagepub.com/content/19/4-5/87) – Lovebug (causes + barriers), force-field, prospective and retrospective use.
