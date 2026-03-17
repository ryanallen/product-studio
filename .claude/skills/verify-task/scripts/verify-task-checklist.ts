/**
 * Verify-task checklist: single source of truth for request → flow and flow → steps.
 *
 * Phrase → flow: TRIGGERS (first match wins).
 * Flow → steps: FLOWS. Steps are defined only in this script.
 *
 * Two modes:
 * - --steps "<message>": return step list as JSON; no file write.
 * - default: append a section to .tmp/verify-task-checklist.md with the steps for the matched flow.
 *
 * npx tsx .claude/skills/verify-task/scripts/verify-task-checklist.ts "<task summary>"
 * npx tsx .claude/skills/verify-task/scripts/verify-task-checklist.ts --steps "<message>"
 */

import * as fs from "fs";
import * as path from "path";

const DEFAULT_FLOW = "refine" as const;

const TMP = path.join(process.cwd(), ".tmp");
const CHECKLIST_PATH = path.join(TMP, "verify-task-checklist.md");
const TITLE = "# Verify task checklist (running list)\n\n";

/** Step list per flow. Save has no verify-task. */
const FLOWS = {
  save: ["verify-paths", "document-paths", "save"],
  "clean-up-studio": ["verify-task", "verify-docs", "document-verification", "verify-task", "clean"],
  clean: ["verify-task", "clean"],
  "analyst-diagnostics": ["verify-task", "analyst-diagnostics"],
  uninstall: ["verify-task", "uninstall"],
  "designer-figma": ["verify-task", "designer-figma"],
  "update-figma": ["verify-task", "update-figma"],
  "sync-upstream": ["verify-task", "sync-upstream"],
  "update-gitignore": ["verify-task", "update-gitignore"],
  research: ["verify-task", "research"],
  "research-figma": ["verify-task", "research-figma"],
  learn: ["verify-task", "research", "verify-task", "document"],
  "propose-solutions": ["verify-task", "analyst-diagnostics", "verify-task", "document"],
  discover: [
    "verify-task",
    "research",
    "verify-task",
    "document",
    "verify-task",
    "analyst-diagnostics",
    "verify-task",
    "document",
    "verify-task",
    "research",
    "verify-task",
    "document",
    "verify-task",
    "analyst-diagnostics",
    "verify-task",
    "document",
    "verify-task",
    "document-ticket",
  ],
  install: ["verify-task", "(Install workflow)"],
  refine: ["verify-task", "research", "verify-task", "document"],
  developer: ["verify-task", "developer-typescript", "developer-check-types"],
  "developer-electron": ["verify-task", "developer-electron"],
  "developer-electrobun": ["verify-task", "developer-electrobun"],
  "user-test-plan": ["verify-task", "document-usertestplan"],
} as const satisfies Record<string, readonly string[]>;

type FlowKey = keyof typeof FLOWS;

type TriggerEntry = readonly [RegExp | string, FlowKey];

/** First match wins. More specific phrases before broader (e.g. "clean up studio" before "clean"). */
const TRIGGERS: TriggerEntry[] = [
  [/save|\/save/i, "save"],
  [/clean up studio|\/clean-up-studio/i, "clean-up-studio"],
  [/clean|wipe\.tmp|\/clean/i, "clean"],
  [/analyst|diagnostics|define|figure out|find cause|\/analyst-diagnostics/i, "analyst-diagnostics"],
  [/uninstall|\/uninstall/i, "uninstall"],
  [/design|\/designer-figma/i, "designer-figma"],
  [/update figma|\/update-figma/i, "update-figma"],
  [/sync|sync upstream|\/sync-upstream/i, "sync-upstream"],
  [/gitignore|what'?s ignored|update ignore|\/update-gitignore/i, "update-gitignore"],
  [/research figma|analyze figma|figma audit|\/research-figma/i, "research-figma"],
  [/\blearn\b|\/learn/i, "learn"],
  [/research|look at this|read|\/research/i, "research"],
  [/install|setup|\/install/i, "install"],
  [/\bdev\b|develop|\/developer|check types|typecheck|tsc|type errors|typescript|\/developer-typescript/i, "developer"],
  [/electron|desktop app|\/developer-electron/i, "developer-electron"],
  [/electrobun|\/developer-electrobun/i, "developer-electrobun"],
  [/user test plan|usertest plan|usability test plan|document usertestplan|\/document-usertestplan/i, "user-test-plan"],
  [/propose solutions/i, "propose-solutions"],
  [/\bdiscover\b|\/discover/i, "discover"],
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

/** Returns steps for the matched flow. Deterministic for same message. */
export function getStepsForRequest(message: string): readonly string[] {
  const flow = matchFlow(message);
  return FLOWS[flow];
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

const USAGE = "Usage: npx tsx .claude/skills/verify-task/scripts/verify-task-checklist.ts \"<task summary>\"\n   or: npx tsx .claude/skills/verify-task/scripts/verify-task-checklist.ts --steps \"<message>\"";

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
