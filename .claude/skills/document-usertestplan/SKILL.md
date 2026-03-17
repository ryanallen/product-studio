---
name: document-usertestplan
description: Build a user test plan by asking a series of questions, then fill a templated plan you can use to run a usability test (e.g. run someone through a prototype on usertesting.com to see what's good and bad about the flow). Use when user says user test plan, usertest plan, usability test plan, make a user test plan, document usertestplan, /document-usertestplan.
disable-model-invocation: true
---

# Document User Test Plan

Build a user test plan like a plan agent: ask the user a series of questions, then fill a structured template and write it to the project so they can run a real test (e.g. prototype on usertesting.com, moderated session, or unmoderated tasks).

**Output:** One plan doc in the project's `references/` (e.g. `user-test-plan.md`) per [work/paths.md](work/paths.md). Link from the project README. Apply [document-voice](.claude/skills/document-voice/SKILL.md): clear, casual, no jargon.

## Inputs

- **Project path:** From [work/paths.md](work/paths.md). If the user didn't name a project, use or create a sensible one (e.g. the current work project or a new folder under `work/studio/`).
- **Source:** None required up front. You collect everything by asking the questions below.

## Output

- A single markdown file in the project's `references/` folder with a kebab-case name (e.g. `user-test-plan.md` or `prototype-usertest-2026-03.md`).
- Add or update the project README with a short note and link to the plan (e.g. under a "References" or "Test plan" section).

## Process

### 1. Ask these questions (plan-agent style)

Ask in order. One or two questions at a time is fine; you can group related ones. Skip only if the user already gave the answer in the request. Record answers so you can fill the template.

1. **What are you testing?** Product, prototype, or flow. (e.g. "Figma prototype for checkout", "live app on usertesting.com", "new onboarding flow")
2. **What do you want to learn?** Main goal or research project question. (e.g. "Do users understand how to complete a purchase?" or "Where do they get stuck in the flow?")
3. **Research questions (1–3):** Specific, practical, actionable questions you want to answer. (e.g. "Can users find the shipping options?" "Do they notice the promo code field?")
4. **Who are the participants?** Who (characteristics, behaviors), how many, how you'll recruit, inclusion/exclusion, compensation.
5. **Method:** Moderated or unmoderated? Session length? Tools (e.g. usertesting.com, Zoom, Calendly)?
6. **What will they do?** Tasks or scenario (e.g. "Run through the prototype from landing to checkout and think aloud; we watch for confusion and time to complete").
7. **Stimuli:** Link to prototype or live product; any instructions you'll give before they start.
8. **Logistics:** When, who facilitates, who observes, observer guidelines (e.g. don't interrupt, take notes on X).
9. **After the test:** How you'll analyze (themes, severity), what you'll deliver (report, deck, highlights), and what decision or next step this enables.

### 2. Fill the template

Use the answers to fill the sections below. Omit a section only if there’s no content; keep headings so the plan is scannable.

```markdown
# User Test Plan: [Short title]

One-line summary of what you're testing and why.

## 1. Purpose and goals

- **What we're testing:** [Product/prototype/flow]
- **What we want to learn:** [Main goal]
- **Why:** [Decision or next step this enables]

## 2. Research questions

- [Question 1]
- [Question 2]
- (optional) [Question 3]

## 3. Participants

- **Who:** [Characteristics, behaviors]
- **How many:** [Number and mix]
- **Inclusion/exclusion:** [Criteria]
- **Recruitment:** [How you'll find them]
- **Compensation:** [What you offer]

## 4. Method and procedure

- **Method:** [Moderated / unmoderated]
- **Session length:** [e.g. 45–60 min]
- **Tools:** [e.g. usertesting.com, Zoom, Figma link]

## 5. Tasks and scenario

What participants will do (and what you'll say):

1. [Task or step 1]
2. [Task or step 2]
…

(Or a short scenario: e.g. "Complete a purchase using the promo code FIELD20. Think aloud as you go.")

## 6. Stimuli

- **Prototype or product:** [Link and any access instructions]
- **Briefing:** [What you tell participants before they start]

## 7. Logistics

- **Schedule:** [When sessions run]
- **Roles:** [Facilitator, notetaker, observers]
- **Observer guidelines:** [How to watch without interrupting; what to note]

## 8. Documents to prepare

- [ ] Consent form
- [ ] Screener (if recruiting)
- [ ] Facilitator cheat sheet or script (intro, tasks, wrap-up)

## 9. After the test

- **Analysis:** [How you'll analyze — e.g. themes, severity, success rate]
- **Deliverables:** [Report, deck, highlights, repo]
- **Next steps:** [What decision or follow-up this enables]
```

### 3. Write the file and link from README

- Write the filled plan to `references/user-test-plan.md` (or another kebab-case name) in the project from [work/paths.md](work/paths.md).
- Add or update the project README with a link to the plan (e.g. "**User test plan:** [user-test-plan.md](references/user-test-plan.md)").

## Examples

**User says:** "Make a user test plan for our checkout prototype on usertesting.com."

**Actions:** Run verify-task, then run this skill: ask the questions (product = checkout prototype, tool = usertesting.com; ask the rest), fill the template, write to the project's `references/user-test-plan.md`, link from README.

**User says:** "I want to run five people through the new onboarding flow and see where they get stuck."

**Actions:** Ask who the five people are, how long each session is, moderated or unmoderated, then fill template with scenario "complete onboarding; we note where they hesitate or fail."

## Reference

- [work/studio/document-usertestplan/README.md](work/studio/document-usertestplan/README.md) — What makes a good test plan (NN/g, User Interviews, urbook).
- [document](.claude/skills/document/SKILL.md) — General document skill; this skill is for the specific artifact "user test plan".
- [work/paths.md](work/paths.md) — Project path; output goes in that project's `references/`.
