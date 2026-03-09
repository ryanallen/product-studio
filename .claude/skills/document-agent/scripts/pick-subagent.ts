/**
 * document-agent SKILL: deterministic subagent choice for doc tasks.
 * Same pattern as verify-task [scripts/checklist.ts](../../verify-task/scripts/checklist.ts):
 * AGENTS beginning rules run a TypeScript script first for deterministic behavior.
 *
 * npx tsx .claude/skills/document-agent/scripts/pick-subagent.ts "<task message>"
 * Output: JSON { subagent, useDesignerPlaybook }
 */

export type SubagentChoice = "explore" | "general-purpose" | "plan" | "main";

export interface PickResult {
  subagent: SubagentChoice;
  useDesignerPlaybook: boolean;
}

type TriggerEntry = readonly [RegExp | string, SubagentChoice];

const TRIGGERS: TriggerEntry[] = [
  [/discover|explore|codebase|file discovery|find files|thoroughness|quick,? medium|medium,? thorough/i, "explore"],
  [/plan|read-only research|present a plan|outline first|plan the doc/i, "plan"],
  [/gather then write|multi-step|discovery and writing|one pass/i, "general-purpose"],
  [/subagent|\.claude\/agents|write (a )?subagent|update (a )?subagent|agent file/i, "main"],
];

const DESIGNER_PLAYBOOK_TRIGGERS = [
  /design|UI|screens|product design|design spec|accessibility|figma/i,
];

function matchSubagent(message: string): SubagentChoice {
  const m = message.trim();
  for (const [trigger, subagent] of TRIGGERS) {
    const hit = typeof trigger === "string" ? m.toLowerCase().includes(trigger) : trigger.test(m);
    if (hit) return subagent;
  }
  return "general-purpose";
}

function shouldUseDesignerPlaybook(message: string): boolean {
  const m = message.trim();
  return DESIGNER_PLAYBOOK_TRIGGERS.some((re) => re.test(m));
}

/** Deterministic for same message. */
export function pickSubagentForTask(message: string): PickResult {
  return {
    subagent: matchSubagent(message),
    useDesignerPlaybook: shouldUseDesignerPlaybook(message),
  };
}

const args = process.argv.slice(2);
const message = args.join(" ").trim() || "document";
const result = pickSubagentForTask(message);
console.log(JSON.stringify(result));
