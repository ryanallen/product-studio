# Component Documentation

Template and process for documenting design system components.

## When to Use

For any component that will be reused across multiple contexts — buttons, inputs, cards, modals, etc.

## Template

```markdown
# [Component Name]

## Purpose
What this component does and when to use it.

## Variants
List of variants with descriptions.

## States
Interactive states (default, hover, active, disabled, error, loading).

## Design Tokens
Which tokens this component uses.

## Accessibility
ARIA roles, keyboard behavior, screen reader announcements.

## Usage Guidelines
Do's and don'ts for using this component.
```

## Writing Guide

- **Purpose** — One sentence on what it does, one on when to use it (and when not to)
- **Variants** — Show each with a brief description of when to pick it
- **States** — Cover all interactive states; note visual differences and behavior changes
- **Design Tokens** — Reference token names, not raw values (e.g., `color.primary.500` not `#3B82F6`)
- **Accessibility** — Specific ARIA roles, keyboard shortcuts, focus management, announcements
- **Usage Guidelines** — Concrete do/don't pairs, not abstract principles
