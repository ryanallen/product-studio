---
name: update-ticket
description: Post a comment on a Jira ticket with a link to the project deliverables. Use when user says "update ticket", "Jira", or /update-ticket. In Claude Code and Cursor, /skills lists all.
---

# Update Ticket

Post a comment on the Jira ticket with a link to the project deliverables.

## Inputs

1. **Ticket ID** - Jira ticket key (e.g. PROJ-123)
2. **Project path** - `work/{Team}/{Space}/{Project}/`

If either is missing, ask the user before proceeding.

Valid team and space values are defined in `work/config.md`.

## Process

### 1. Build Link

Base URL: `https://github.com/rallen1-godaddy/Studio/tree/main/`

Append the project path to get the full URL:
```
https://github.com/rallen1-godaddy/Studio/tree/main/work/{Team}/{Space}/{Project}
```

### 2. Post Comment

Use atlassian-rovo MCP to add a comment on the ticket:

```
Research, Define, Strategize deliverables: {full URL}
```
