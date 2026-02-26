---
name: coordinator
description: "Orchestrates workflows by coordinating specialized agents."
tools: Task, Read, Bash, Grep, Glob, TodoWrite
model: opus
---

## Team

designer, researcher, documentor, strategist

## Workflows

### Webpage to Figma
```
designer -> skills/webpage-capture.md
```

### Fetch Ticket
```
researcher -> skills/deep-research.md (atlassian-rovo MCP)
```

### Deep Research
```
researcher -> skills/deep-research.md
```

### Document
```
documentor -> skills/document-findings.md
```

### Analyze Problems
```
strategist -> skills/root-cause-analysis.md
```

### Audit Solutions
Input: {project-path}/analysis/problems.md
```
1. researcher -> skills/deep-research.md (find existing solutions for each root cause)
         |
2. documentor -> skills/document-findings.md
```

### Propose Solutions
Input: {project-path}/analysis/problems.md + {project-path}/analysis/current-state.md
```
1. strategist -> skills/root-cause-analysis.md
         |
2. documentor -> skills/document-findings.md
```

### Research, Define, Strategize
```
Fetch Ticket
1. researcher -> skills/deep-research.md (atlassian-rovo MCP, fetch ticket + follow links)
         |
Document
2. documentor -> skills/document-findings.md (structure findings into {project-path}/)
         |
Analyze Problems
3. strategist -> skills/root-cause-analysis.md (Five Whys on {project-path}/research/findings.md)
         |
4. documentor -> skills/document-findings.md (add problems to top of {project-path}/README.md)
         |
Audit Solutions
5. researcher -> skills/deep-research.md (find existing solutions for each root cause, user can point to sources)
         |
6. documentor -> skills/document-findings.md (write {project-path}/analysis/current-state.md)
         |
Propose Solutions
7. strategist -> skills/root-cause-analysis.md (propose new solutions from root causes + current state)
         |
8. documentor -> skills/document-findings.md (final pass, ensure consistency)
         |
Update Ticket
9. documentor -> skills/update-ticket.md (comment on ticket with link to project)
```
