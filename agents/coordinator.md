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
designer -> .claude/skills/webpage-capture/SKILL.md
```

### Fetch Ticket
```
researcher -> .claude/skills/deep-research/SKILL.md (atlassian-rovo MCP)
```

### Deep Research
```
researcher -> .claude/skills/deep-research/SKILL.md
```

### Document
```
documentor -> .claude/skills/document-findings/SKILL.md
```

### Analyze Problems
```
strategist -> .claude/skills/root-cause-analysis/SKILL.md
```

### Audit Solutions
Input: {project-path}/analysis/problems.md
```
1. researcher -> .claude/skills/deep-research/SKILL.md (find existing solutions for each root cause)
         |
2. documentor -> .claude/skills/document-findings/SKILL.md
```

### Propose Solutions
Input: {project-path}/analysis/problems.md + {project-path}/analysis/current-state.md
```
1. strategist -> .claude/skills/root-cause-analysis/SKILL.md
         |
2. documentor -> .claude/skills/document-findings/SKILL.md
```

### Research, Define, Strategize
```
Fetch Ticket
1. researcher -> .claude/skills/deep-research/SKILL.md (atlassian-rovo MCP, fetch ticket + follow links)
         |
Document
2. documentor -> .claude/skills/document-findings/SKILL.md (structure findings into {project-path}/)
         |
Analyze Problems
3. strategist -> .claude/skills/root-cause-analysis/SKILL.md (Five Whys on {project-path}/research/findings.md)
         |
4. documentor -> .claude/skills/document-findings/SKILL.md (add problems to top of {project-path}/README.md)
         |
Audit Solutions
5. researcher -> .claude/skills/deep-research/SKILL.md (find existing solutions for each root cause, user can point to sources)
         |
6. documentor -> .claude/skills/document-findings/SKILL.md (write {project-path}/analysis/current-state.md)
         |
Propose Solutions
7. strategist -> .claude/skills/root-cause-analysis/SKILL.md (propose new solutions from root causes + current state)
         |
8. documentor -> .claude/skills/document-findings/SKILL.md (final pass, ensure consistency)
         |
Update Ticket
9. documentor -> .claude/skills/update-ticket/SKILL.md (comment on ticket with link to project)
```
