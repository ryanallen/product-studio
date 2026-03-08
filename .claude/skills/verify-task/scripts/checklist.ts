/**
 * verify-task SKILL: append a section to .tmp/task-checklist.md per task.
 * AGENTS Rule 1: first action every turn run `npm run checklist -- "<summary>"`.
 * Steps: [verify-task, document-voice, ...flowSteps] from FLOWS + TRIGGERS.
 *
 * npx tsx .claude/skills/verify-task/scripts/checklist.ts "<task summary>"
 * npx tsx .claude/skills/verify-task/scripts/checklist.ts --steps "<message>"
 */

import * as fs from "fs";
import * as path from "path";

const STEP_0 = "verify-task" as const;
const STEP_1 = "document-voice" as const;
const DEFAULT_FLOW = "refine" as const;

const TMP = path.join(process.cwd(), ".tmp");
const CHECKLIST_PATH = path.join(TMP, "task-checklist.md");
const TITLE = "# Task checklist (running list)\n\n";

const FLOWS = {
  save: ["verify-paths", "document-paths", "save"],
  clean: ["clean"],
  "analyst-diagnostics": ["analyst-diagnostics"],
  uninstall: ["uninstall"],
  "designer-figma": ["designer-figma"],
  "update-figma": ["update-figma"],
  "sync-upstream": ["sync-upstream"],
  research: ["research"],
  "research-figma": ["research-figma"],
  install: ["(Install workflow)"],
  refine: ["document", "document-github"],
  developer: ["developer-typescript", "developer-check-types"],
  "developer-electron": ["developer-electron"],
  "developer-electrobun": ["developer-electrobun"],
} as const satisfies Record<string, readonly string[]>;

type FlowKey = keyof typeof FLOWS;

type TriggerEntry = readonly [RegExp | string, FlowKey];

const TRIGGERS: TriggerEntry[] = [
  [/save|\/save/i, "save"],
  [/clean|wipe\.tmp|\/clean/i, "clean"],
  [/analyst|diagnostics|define|figure out|find cause|\/analyst-diagnostics/i, "analyst-diagnostics"],
  [/uninstall|\/uninstall/i, "uninstall"],
  [/design|\/designer-figma/i, "designer-figma"],
  [/update figma|\/update-figma/i, "update-figma"],
  [/sync|sync upstream|\/sync-upstream/i, "sync-upstream"],
  [/research figma|analyze figma|figma audit|\/research-figma/i, "research-figma"],
  [/research|learn|look at this|read|\/research/i, "research"],
  [/install|setup|\/install/i, "install"],
  [/\bdev\b|develop|\/developer|check types|typecheck|tsc|type errors|typescript|\/developer-typescript/i, "developer"],
  [/electron|desktop app|\/developer-electron/i, "developer-electron"],
  [/electrobun|\/developer-electrobun/i, "developer-electrobun"],
  [/refine|write|write up|document|update|make|\/document/i, "refine"],
];

function matchFlow(message: string): FlowKey {
  const trimmed = message.trim().toLowerCase();
  for (const [trigger, flow] of TRIGGERS) {
    const hit = typeof trigger === "string" ? trimmed.includes(trigger) : trigger.test(message);
    if (hit) return flow;
  }
  return DEFAULT_FLOW;
}

/** Returns [STEP_0, STEP_1, ...flowSteps]. Deterministic for same message. */
export function getStepsForRequest(message: string): readonly [string, ...string[]] {
  const flow = matchFlow(message);
  return [STEP_0, STEP_1, ...FLOWS[flow]];
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function nowHeading(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function ensureTmp(): void {
  if (!fs.existsSync(TMP)) {
    fs.mkdirSync(TMP, { recursive: true });
  }
}

/** Appends a new section. Same summary → same section shape. */
export function ensureChecklistSection(summary: string, steps?: readonly string[]): void {
  ensureTmp();
  const heading = `## ${nowHeading()} — ${summary}\n\n`;
  const stepLines = (steps ?? getStepsForRequest(summary)).map((s) => `- ${s}\n`).join("");
  const block = heading + stepLines + "\n## Notes\n\n";

  const content = fs.existsSync(CHECKLIST_PATH)
    ? fs.readFileSync(CHECKLIST_PATH, "utf-8") + block
    : TITLE + block;
  fs.writeFileSync(CHECKLIST_PATH, content, "utf-8");
}

const USAGE = "Usage: npx tsx .claude/skills/verify-task/scripts/checklist.ts \"<task summary>\"\n   or: npx tsx .claude/skills/verify-task/scripts/checklist.ts --steps \"<message>\"";

const args = process.argv.slice(2);
if (args[0] === "--steps") {
  const msg = args.slice(1).join(" ").trim();
  console.log(JSON.stringify([...getStepsForRequest(msg || "")]));
} else if (args.length > 0) {
  const summary = args.join(" ").trim() || "task";
  const steps = getStepsForRequest(summary);
  ensureChecklistSection(summary, steps);
  console.log("OK: appended section with steps:", [...steps]);
} else {
  console.error(USAGE);
  process.exit(1);
}
