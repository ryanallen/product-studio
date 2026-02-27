---
name: update-ticket
description: Posts a comment on a Jira ticket with a link to the project deliverables. Use when user says "update the ticket", "post to Jira", or asks to link deliverables to a ticket.
---

# Update Ticket

Posts a comment on the Jira ticket with a link to the project deliverables.

## Inputs

1. **Ticket ID** - Jira ticket key (e.g. PROJ-123)
2. **Project path** - `work/{team}/{space}/{project}/`

If either is missing, ask the user before proceeding.

Valid team and space values are defined in `work/config.md`.

## Process

### 1. Build Link

Base URL: `https://github.com/rallen1-godaddy/Studio/tree/main/`

Append the project path to get the full URL:
```
https://github.com/rallen1-godaddy/Studio/tree/main/work/{team}/{space}/{project}
```

### 2. Post Comment

Use atlassian-rovo MCP to add a comment on the ticket:

```
Research, Define, Strategize deliverables: {full URL}
```
