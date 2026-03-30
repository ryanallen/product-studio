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

/** Step list per flow. All arrays vertical for consistency and readability. */
const FLOWS = {
  "analyst-diagnostics": [
    "verify-task",
    "analyst-diagnostics",
  ],
  clean: [
    "verify-task",
    "clean",
  ],
  "clean-up-studio": [
    "verify-task",
    "verify-docs",
    "document-verification",
    "verify-task",
    "clean",
  ],
  "designer-figma": [
    "verify-task",
    "designer-figma",
  ],
  developer: [
    "verify-task",
    "developer-typescript",
    "developer-check-types",
  ],
  "developer-electron": [
    "verify-task",
    "developer-electron",
  ],
  "developer-electrobun": [
    "verify-task",
    "developer-electrobun",
  ],
  "developer-python": [
    "verify-task",
    "developer-python",
  ],
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
  install: [
    "verify-task",
    "(Install workflow)",
  ],
  learn: [
    "verify-task",
    "research",
    "verify-task",
    "document",
  ],
  "propose-solutions": [
    "verify-task",
    "analyst-diagnostics",
    "verify-task",
    "document",
  ],
  refine: [
    "verify-task",
    "research",
    "verify-task",
    "document",
  ],
  research: [
    "verify-task",
    "research",
  ],
  "research-figma": [
    "verify-task",
    "research-figma",
  ],
  save: [
    "verify-paths",
    "document-paths",
    "save",
  ],
  "sync-upstream": [
    "verify-task",
    "sync-upstream",
  ],
  uninstall: [
    "verify-task",
    "uninstall",
  ],
  "update-figma": [
    "verify-task",
    "update-figma",
  ],
  "update-gitignore": [
    "verify-task",
    "update-gitignore",
  ],
  "user-test-plan": [
    "verify-task",
    "document-usertestplan",
  ],
} as const satisfies Record<string, readonly string[]>;

type FlowKey = keyof typeof FLOWS;
type TriggerEntry = readonly [RegExp | string, FlowKey];

/** First match wins. Alphabetical by flow name for easy lookup. More specific patterns come before broader ones where needed. */
const TRIGGERS: TriggerEntry[] = [
  [/analyst|diagnostics|define|figure out|find cause|\/analyst-diagnostics/i, "analyst-diagnostics"],
  [/clean up studio|\/clean-up-studio/i, "clean-up-studio"],
  [/clean|wipe\.tmp|\/clean/i, "clean"],
  [/design|\/designer-figma/i, "designer-figma"],
  [/\bdev\b|develop|\/developer|check types|typecheck|tsc|type errors|typescript|\/developer-typescript/i, "developer"],
  [/electrobun|\/developer-electrobun/i, "developer-electrobun"],
  [/electron|desktop app|\/developer-electron/i, "developer-electron"],
  [/python|\.py\b|py_compile|pytest|\/developer-python/i, "developer-python"],
  [/\bdiscover\b|\/discover/i, "discover"],
  [/install|setup|\/install/i, "install"],
  [/\blearn\b|\/learn/i, "learn"],
  [/propose solutions/i, "propose-solutions"],
  [/research figma|analyze figma|figma audit|\/research-figma/i, "research-figma"],
  [/research|look at this|read|\/research/i, "research"],
  [/save|\/save/i, "save"],
  [/sync|sync upstream|\/sync-upstream/i, "sync-upstream"],
  [/uninstall|\/uninstall/i, "uninstall"],
  [/update figma|\/update-figma/i, "update-figma"],
  [/gitignore|what'?s ignored|update ignore|\/update-gitignore/i, "update-gitignore"],
  [/user test plan|usertest plan|usability test plan|document usertestplan|\/document-usertestplan/i, "user-test-plan"],
  [/refine|write|write up|document|update|make|\/document/i, "refine"],
];

function matchFlow(message: string): FlowKey {
  const trimmed = message.trim().toLowerCase();
  for (const [trigger, flow] of TRIGGERS) {
    const hit = typeof trigger === "string"
      ? trimmed.includes(trigger)
      : trigger.test(message);
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
export function ensureChecklistSection(
  summary: string,
  steps?: readonly string[]
): void {
  ensureTmp();
  const heading = `## ${nowHeading()} — ${summary}\n\n`;
  const stepLines = (steps ?? getStepsForRequest(summary))
    .map((s) => `- ${s}\n`)
    .join("");
  const block = heading + stepLines + "\n## Notes\n\n";

  const content = fs.existsSync(CHECKLIST_PATH)
    ? fs.readFileSync(CHECKLIST_PATH, "utf-8") + block
    : TITLE + block;
  fs.writeFileSync(CHECKLIST_PATH, content, "utf-8");
}

const USAGE = `Usage: npx tsx .claude/skills/verify-task/scripts/verify-task-checklist.ts "<task summary>"
   or: npx tsx .claude/skills/verify-task/scripts/verify-task-checklist.ts --steps "<message>"`;

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
