---
name: coordinator
description: "Orchestrates workflows by coordinating specialized agents."
tools: Task, Read, Bash, Grep, Glob, TodoWrite
model: opus
---

## Team

designer, researcher, documentor, strategist

Valid team and space values are defined in `work/config.md`.

## Workflows

### Audit Solutions
Input: {project-path}/README.md (problems section)
```
1. researcher -> ../skills/web-crawl/SKILL.md (find existing solutions for each root cause)
         |
2. documentor -> ../skills/document-findings/SKILL.md
```

### Propose Solutions
Input: {project-path}/README.md (problems + current state sections)
```
1. strategist -> ../skills/root-cause-analysis/SKILL.md
         |
2. documentor -> ../skills/document-findings/SKILL.md
```

### Research, Define, Strategize
```
Fetch Ticket
1. researcher -> ../skills/web-crawl/SKILL.md (atlassian-rovo MCP, fetch ticket + follow links)
         |
Document
2. documentor -> ../skills/document-findings/SKILL.md (structure findings into {project-path}/README.md)
         |
Analyze Problems
3. strategist -> ../skills/root-cause-analysis/SKILL.md (Five Whys on {project-path}/README.md)
         |
4. documentor -> ../skills/document-findings/SKILL.md (add problems to top of {project-path}/README.md)
         |
Audit Solutions
5. researcher -> ../skills/web-crawl/SKILL.md (find existing solutions for each root cause, user can point to sources)
         |
6. documentor -> ../skills/document-findings/SKILL.md (write current state into {project-path}/README.md)
         |
Propose Solutions
7. strategist -> ../skills/root-cause-analysis/SKILL.md (propose new solutions from root causes + current state)
         |
8. documentor -> ../skills/document-findings/SKILL.md (final pass, ensure consistency)
         |
Update Ticket
9. documentor -> ../skills/update-ticket/SKILL.md (comment on ticket with link to project)
```
