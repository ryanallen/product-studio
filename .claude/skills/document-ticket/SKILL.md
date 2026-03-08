---
name: document-ticket
description: Post a comment on the Jira ticket with the deliverables link.
disable-model-invocation: true
argument-hint: "[ticket-id]"
---

# Document Ticket

Post a comment on the Jira ticket with the deliverables link for the project.

## Inputs

1. **Ticket ID** – Jira key (e.g. PROJ-123). From user or work/paths.md (ticket-id).
2. **Deliverables URL** – From work/paths.md "Deliverables base URL:". If missing, ask.

## Output

One comment on the ticket: `Deliverables: {full URL}`.

## Process

1. **Base URL** – Read "Deliverables base URL:" from [work/paths.md](../../work/paths.md). If absent, ask the user.
2. **Full URL** – Append the project path (from paths.md) to the base URL.
3. **Post** – Use atlassian-rovo MCP to add a comment on the ticket with that link.

## Reference

[work/paths.md](../../work/paths.md) – Project path and Deliverables base URL.
