---
name: document-ticket
description: Post a comment on a Jira ticket with a link to the project deliverables. Use when user says update ticket, Jira, document ticket, or /document-ticket. In Claude Code and Cursor, /skills lists all.
disable-model-invocation: true
argument-hint: "[ticket-id]"
---

# Document Ticket

Post a comment on the Jira ticket with a link to the project deliverables.

## Inputs

1. **Ticket ID** – Jira ticket key (e.g. PROJ-123). From user or work/paths.md (ticket-id).
2. **Project path** – From [work/paths.md](../../work/paths.md). Deliverables base URL is on the "Deliverables base URL:" line; if missing or empty, ask the user for the deliverables URL.

## Output

A comment on the Jira ticket containing the deliverables link.

## Process

1. **Build link** – Base URL from work/paths.md "Deliverables base URL:" line. Append the project path for the full URL. Do not hardcode; if base URL is missing, ask the user.
2. **Post comment** – Use atlassian-rovo MCP to add a comment on the ticket:
   ```
   Deliverables: {full URL}
   ```

## Reference

[work/paths.md](../../work/paths.md) – Project path and Deliverables base URL.
