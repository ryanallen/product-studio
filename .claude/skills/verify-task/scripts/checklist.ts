/**
 * Implements verify-task SKILL: append a section to .tmp/task-checklist.md per task.
 * Rule 1 in AGENTS.md triggers this: first action every turn run `npm run checklist -- "<summary>"`.
 * Step 0 is always verify-task; steps are derived from user message (FLOWS + TRIGGERS).
 * Run: npx tsx .claude/skills/verify-task/scripts/checklist.ts "<task summary>"
 * Run: npx tsx .claude/skills/verify-task/scripts/checklist.ts --steps "<message>"
 */

import * as fs from "fs";
import * as path from "path";

const STEP_0 = "verify-task" as const;

const FLOWS: Record<string, readonly string[]> = {
  save: ["verify-paths", "document-paths", "save"],
  clean: ["clean"],
  strategize: ["strategize"],
  uninstall: ["uninstall"],
  "generate-figma": ["generate-figma"],
  "update-figma": ["update-figma"],
  "sync-upstream": ["sync-upstream"],
  research: ["research"],
  "research-figma": ["research-figma"],
  install: ["(Install workflow)"],
  refine: ["document", "document-github", "document-voice"],
  developer: ["developer-typescript", "developer-check-types"],
} as const;

const TRIGGERS: [RegExp | string, string][] = [
  [/save|\/save/i, "save"],
  [/clean|wipe\.tmp|\/clean/i, "clean"],
  [/strategize|define|figure out|find cause|\/strategize/i, "strategize"],
  [/uninstall|\/uninstall/i, "uninstall"],
  [/design|\/generate-figma/i, "generate-figma"],
  [/update figma|\/update-figma/i, "update-figma"],
  [/sync|sync upstream|\/sync-upstream/i, "sync-upstream"],
  [/research figma|analyze figma|figma audit|\/research-figma/i, "research-figma"],
  [/research|learn|look at this|read|\/research/i, "research"],
  [/install|setup|\/install/i, "install"],
  [/\bdev\b|develop|\/developer|check types|typecheck|tsc|type errors/i, "developer"],
  [/refine|write|write up|document|update|make|\/document/i, "refine"],
];

function matchFlow(message: string): string {
  const m = message.trim().toLowerCase();
  for (const [trigger, flow] of TRIGGERS) {
    if (typeof trigger === "string" ? m.includes(trigger) : trigger.test(message)) {
      return flow;
    }
  }
  return "refine";
}

/** Deterministic: always [verify-task, ...flowSteps]. */
export function getStepsForRequest(message: string): readonly [string, ...string[]] {
  const flow = matchFlow(message);
  const flowSteps = FLOWS[flow] ?? FLOWS.refine;
  return [STEP_0, ...flowSteps];
}

function nowHeading(): string {
  const d = new Date();
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${Y}-${M}-${D} ${h}:${min}`;
}

const TMP = path.join(process.cwd(), ".tmp");
const CHECKLIST_PATH = path.join(TMP, "task-checklist.md");
const TITLE = "# Task checklist (running list)\n\n";

function ensureTmp(): void {
  if (!fs.existsSync(TMP)) {
    fs.mkdirSync(TMP, { recursive: true });
  }
}

/** Appends a new section. Deterministic: same summary → same section shape. */
export function ensureChecklistSection(summary: string, steps?: readonly string[]): void {
  ensureTmp();
  const heading = `## ${nowHeading()} — ${summary}\n\n`;
  const stepLines = (steps ?? getStepsForRequest(summary)).map((s) => `- ${s}\n`).join("");
  const block = heading + stepLines + "\n## Notes\n\n";

  let content: string;
  if (!fs.existsSync(CHECKLIST_PATH)) {
    content = TITLE + block;
  } else {
    content = fs.readFileSync(CHECKLIST_PATH, "utf-8") + block;
  }
  fs.writeFileSync(CHECKLIST_PATH, content, "utf-8");
}

const args = process.argv.slice(2);
if (args[0] === "--steps") {
  const msg = args.slice(1).join(" ") || "refine";
  const steps = getStepsForRequest(msg);
  console.log(JSON.stringify([...steps]));
} else if (args.length > 0) {
  const summary = args.join(" ").trim() || "task";
  const steps = getStepsForRequest(summary);
  ensureChecklistSection(summary, steps);
  console.log("OK: appended section with steps:", [...steps]);
} else {
  console.error("Usage: npx tsx .claude/skills/verify-task/scripts/checklist.ts \"<task summary>\"");
  console.error("   or: npx tsx .claude/skills/verify-task/scripts/checklist.ts --steps \"<message>\"");
  process.exit(1);
}
