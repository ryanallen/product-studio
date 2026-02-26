# Design Spec

Template and process for writing actionable design specifications.

## When to Use

For any feature, component, or interaction that needs to be communicated to developers or stakeholders.

## Template

```markdown
# [Feature Name] Design Spec

## Problem
What problem does this solve? Who has it?

## Solution
What are we building? Key design decisions.

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Design Details
Component specs, interaction patterns, edge cases.

## Accessibility
WCAG requirements, keyboard navigation, screen reader behavior.

## Acceptance Criteria
How do we know this is done?
```

## Writing Guide

- **Problem section** — Frame from the user's perspective, not internal needs
- **Solution section** — Lead with what changes, then explain key decisions
- **Requirements** — Checkboxes so progress is trackable
- **Design Details** — Be specific: exact spacing, colors (reference tokens), states, transitions
- **Accessibility** — Not optional. WCAG level, keyboard flow, ARIA roles, announcements
- **Acceptance Criteria** — Testable statements, not vague goals
