# 📄 Skill heading structure comparison

[Summary](#summary) | [Per-skill headings](#per-skill-headings) | [Canonical order](#canonical-order) | [Differences](#differences) | [Recommended fixes](#recommended-fixes)

---
## 📋 Summary

All SKILL.md files under `.claude/skills/` were read and their heading structure (H1, H2, H3) was extracted. Most refined skills follow **Inputs → Output → Process → (Error Handling) → Reference**. Several skills differ in section names or order. This README lists each skill's headings, a comparison, and recommended fixes to align structure where it makes sense.

---

## 📑 Per-skill headings

| Skill | H2 / H3 order |
|-------|----------------|
| **analyze-figma** | # Analyze Figma → ## Inputs → ## URL Parsing → ## Behavior → ## Figma MCP Tools → ## Output → ## Caveat |
| **clean** | # Clean → (no H2; numbered list only) |
| **document** | # Document → ## Inputs → ## Output → ## Required on every README → ## Markdown standards → ## Process → ### README structure → ## Rules |
| **document-agent** | # Document Agent → ## Inputs → ## Agent files → ## Using subagents when documenting → ## Reference |
| **document-paths** | # Document Paths → ## Inputs → ## Output → ## Process → ## Reference |
| **document-skills** | # Document Skills → ## Inputs → ## Skill structure → ## SKILL.md format → ## Checklist → ## Process → ## Reference |
| **document-ticket** | # Document Ticket → ## Inputs → ## Output → ## Process → ## Reference |
| **document-verification** | # Document Verification → ## Inputs → ## Output → ## Process → ## Reference |
| **generate-figma** | # Generate Figma → ## Inputs → ## Output → ## Process → ## Requirements → ## Reference |
| **install** | # Install → ## Inputs → ## Output → ## Reference |
| **install-choices** | # Install Choices → ## Inputs → ## Output → ## Process (custom path) → ## Reference |
| **install-config** | # Install Config → ## Inputs → ## Output → ## Process → ## Reference |
| **install-express** | # Install Express → ## Inputs → ## Output → ## Process → ## Reference |
| **install-handoff** | # Install Handoff → ## Inputs → ## Output → ## Process → ## Reference |
| **install-mcp** | # Install MCP → ## Inputs → ## Output → ## Config file → ## Process → ## Reference |
| **install-mcp-setup** | # Install MCP setup → ## Inputs → ## Output → ## Process → ## Reference |
| **research** | # Research → ## Inputs → ## Output → ## Process → ## Rules → ## Reference |
| **save** | # Save → ## Inputs → ## Output → ## Command → ## Steps → ## Error Handling → ## Reference |
| **strategize** | # Strategize → ## Inputs → ## Output → ## Process → ## Rules → ## Reference |
| **sync-upstream** | # Sync Upstream → ## Inputs → ## Output → ## Process → ## Error Handling → ## Reference |
| **uninstall** | # Uninstall → ## Inputs → ## Output → ## Process → ## Reference |
| **update-figma** | # Update Figma token → ## Inputs → ## Output → ## Process → ## Reference |
| **verify-docs** | # Verify Docs → ## Inputs → ## Output → ## Process → ## Reference |
| **verify-paths** | # Verify Paths → ## Inputs → ## Output → ## Process → ## Reference |

**Template (not a standalone skill):** install-custom SKILL.md.template → # Install Customization → ### Your local setup (no H2 section labels).

---

## 📐 Canonical order

From the majority of refined task skills:

1. **# {Skill title}** (H1)
2. **## Inputs**
3. **## Output**
4. **## Process** (or ## Command + ## Steps when steps and command are both needed, e.g. save)
5. **## Error Handling** (optional)
6. **## Reference**

Optional: **## Rules** after Process when the skill has many rules (research, strategize). **## Requirements** or **## Config file** can sit under Process or as a separate H2 when they are reference blocks (e.g. generate-figma, install-mcp).

---

## ⚠️ Differences

- **analyze-figma** – Output is after URL Parsing, Behavior, Figma MCP Tools; no Process; ends with Caveat instead of Reference.
- **clean** – No H2 sections; only a numbered list under H1.
- **document** – Has "Required on every README", "Markdown standards", "Process", "Rules"; no Reference section in heading list (content may still reference docs). Hybrid reference + process skill.
- **document-agent** – No Output; has "Agent files" and "Using subagents" instead of a single Process.
- **document-skills** – Meta-skill: Inputs then Skill structure, SKILL.md format, Checklist, Process, Reference. No Output section.
- **generate-figma** – Has ## Requirements between Process and Reference.
- **install** – No Process section (only Inputs, Output, Reference).
- **install-mcp** – Has ## Config file between Output and Process.
- **save** – Uses ## Command and ## Steps instead of ## Process; has ## Error Handling. Order is correct.

---

## 🔧 Recommended fixes

1. **analyze-figma** – Move ## Output to immediately after ## Inputs. Group URL Parsing, Behavior, Figma MCP Tools under ## Process (with ### subsections). Rename ## Caveat to a note under Process or add ## Reference and keep Caveat as a subsection there.
2. **clean** – Add ## Inputs (none), ## Output (.tmp cleared or n/a), ## Process (current steps 1–2), and optionally ## Reference (e.g. document-verification, README .tmp section).
3. **document** – Add ## Reference at the end if missing (link to paths.md, document-skills, or Coordinator). Keep existing structure; document is a reference-heavy skill.
4. **document-agent** – Add ## Output (e.g. "Agent file written or updated"). Optionally group "Agent files" and "Using subagents" under ## Process with ### subsections so the order is Inputs → Output → Process → Reference.
5. **document-skills** – Add ## Output (e.g. "SKILL.md and optional supporting files updated"). Keep Skill structure / SKILL.md format / Checklist as reference; order stays Inputs → (reference sections) → Process → Reference.
6. **generate-figma** – Leave as-is, or move ## Requirements under ## Process as a final subsection (e.g. ### Requirements). Either is valid.
7. **install** – Add ## Process with one step (e.g. "Run the Install workflow in Coordinator; the installer runs the full flow") so all three have Inputs → Output → Process → Reference.
8. **install-mcp** – Move "Config file" under ## Process as the first bullet or ### Config file so the top-level order is Inputs → Output → Process → Reference.
9. **save** – No change; Command + Steps + Error Handling is the correct pattern for this skill.

After edits, re-run this comparison to confirm alignment.
