---
name: update-ticket
description: Post a comment on a Jira ticket with a link to the project deliverables. Use when user says "update ticket", "Jira", or /update-ticket. In Claude Code and Cursor, /skills lists all.
---

# Update Ticket

Post a comment on the Jira ticket with a link to the project deliverables.

## Inputs

1. **Ticket ID** - Jira ticket key (e.g. PROJ-123)
2. **Project path** - See work/paths.md.

## Process

### 1. Build Link

Base URL: `https://github.com/rallen1-godaddy/Studio/tree/main/`

Append the project path to get the full URL.

### 2. Post Comment

Use atlassian-rovo MCP to add a comment on the ticket:

```
Research, Define, Strategize deliverables: {full URL}
```
