/**
 * document SKILL: deterministic README section outline by document type.
 * Same pattern as verify-task [scripts/checklist.ts](../../verify-task/scripts/checklist.ts):
 * AGENTS beginning rules run a TypeScript script first for deterministic behavior.
 *
 * npx tsx .claude/skills/document/scripts/doc-structure.ts <document-type>
 * Output: markdown outline (headings only). Use when writing the README.
 */

export type DocumentType = "research" | "analysis" | "solutions" | "project-overview";

const OUTLINES: Record<DocumentType, string> = {
  research: `# {Project Name}

## Research and context

### Sources and links
### Notes and findings
`,

  analysis: `# {Project Name}

## Analysis

### Summary
### Findings
### Recommendations
`,

  solutions: `# {Project Name}

## Solutions

### Options
### Comparison
### Recommendation
`,

  "project-overview": `# {Project Name}

## Research and context

### Team and roadmap
### Reviews and sources
### Users and needs

## Ideas and testing

### Ideas and hypotheses
### What we made
### Testing and results

## Launch and follow-up

### What we're shipping
### Results and QA
### What's next
`,
};

/** Deterministic for same document type. */
export function getOutlineForDocumentType(docType: DocumentType): string {
  return OUTLINES[docType] ?? OUTLINES["project-overview"];
}

const valid: DocumentType[] = ["research", "analysis", "solutions", "project-overview"];
const arg = process.argv[2]?.toLowerCase().trim() as DocumentType | undefined;
const docType = valid.includes(arg) ? arg : "project-overview";
console.log(getOutlineForDocumentType(docType));
