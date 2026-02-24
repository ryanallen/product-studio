# Coordinator Workflow Diagrams

This document provides flow diagrams for all standard coordinator workflows, adapted for design operations.

## Legend

```
┌─────────────┐
│   AGENT     │  = Specialized agent
└─────────────┘

[ /skill ]       = Skill invocation

─────>           = Sequential flow
═════>           = Optional step
┌──── ────┐      = Decision point
│  ???   │
└──── ────┘
```

---

## 1. Research & Discovery

```txt
User Request: "What are competitors doing for onboarding?"
    │
    ▼
┌─────────────┐
│ coordinator │
└─────────────┘
    │
    ▼
┌─────────────┐
│ researcher  │ ← Competitive analysis, user research
└─────────────┘
    │
    ▼
┌─────────────┐
│ documenter  │ ← Write up findings, recommendations
└─────────────┘
    │
    ▼
Done ✓
```

---

## 2. Documentation & Specs

```txt
User Request: "Write a spec for the notification system"
    │
    ▼
┌─────────────┐
│ coordinator │
└─────────────┘
    │
    ▼
┌─────────────┐
│ documenter  │ ← Research existing docs, write spec
└─────────────┘
    │
    ▼
Done ✓
```

---

## 3. Research-Informed Documentation

```txt
User Request: "Document our current design system gaps"
    │
    ▼
┌─────────────┐
│ coordinator │
└─────────────┘
    │
    ▼
┌─────────────┐
│ researcher  │ ← Audit current state, identify gaps
└─────────────┘
    │
    ▼
┌─────────────┐
│ documenter  │ ← Write gap analysis with recommendations
└─────────────┘
    │
    ▼
Done ✓
```

---

## 4. Quick Task (No Multi-Agent Needed)

```txt
User Request: "Update the color token for error states"
    │
    ▼
┌─────────────┐
│ coordinator │ ← Simple enough to handle directly
└─────────────┘
    │
    ▼
[ Make the change ]
    │
    ▼
Done ✓
```

---

## Agent Interaction Matrix

Which agents know about each other?

| Agent/Skill | Knows About | Used By |
| ------------- | ------------- | --------- |
| **coordinator** | All agents & skills | User |
| **researcher** | documenter | coordinator |
| **documenter** | None | coordinator, researcher |

---

## Quality Gates Summary

**Before committing work, these should pass:**

1. Research is evidence-based with cited sources
2. Documentation is actionable with acceptance criteria
3. No contradictions with existing documentation
4. Rationale captured for all decisions

---

## Common Patterns

### Pattern 1: Research Before Documentation

```txt
[ researcher ] ← Understand the problem space
    ↓
[ documenter ] ← Write it up with evidence
```

### Pattern 2: Agent Self-Cleaning

```txt
Agent Attempt 1: Try approach A
    │
    ▼
Failed ❌
    │
    ▼
Clean up approach A ← Remove failed work
    │
    ▼
Agent Attempt 2: Try approach B
    │
    ▼
Success ✓ (no cruft left behind)
```

### Pattern 3: Escalation Chain

```txt
specialist agent (3 attempts)
    │
    ▼ (if stuck)
coordinator
    │
    ├─→ Try different specialist
    │
    ├─→ Simplify the approach
    │
    └─→ Ask user for clarification
```

---

## The D.E.S.I.G.N. Process

The six phases map to workflows, not a state machine. Currently only Discovery and Next Steps phases have implemented agents. Additional phases will be supported as agents are added:

| Phase | What Happens | Primary Agents | Status |
|-------|-------------|----------------|--------|
| **D** — Discovery | Understand users, competitors, requirements, current state | researcher, documenter | Available |
| **E** — Exploration | Define design direction, validate against system standards | designer | Available* |
| **S** — See What Works | Research, experiment, test divergent concepts | researcher, designer | Available* |
| **I** — Iterate | Refine based on findings, validate accessibility | designer | Available* |
| **G** — Go to Market | Polish, finalize, prep for handoff | designer, documenter | Available* |
| **N** — Next Steps | Position, communicate, measure, capture learnings | documenter | Available |

*Designer agent requires Figma Dev Mode running locally for full design creation capabilities

Not every task needs all six phases. Quick tasks skip directly to execution. The coordinator decides.
