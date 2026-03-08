#!/usr/bin/env node
/**
 * /clean: Empty .tmp/. Real command for coordinator flow.
 * Dev: Uses sync fs APIs; try/catch for graceful exit. Safe when .tmp missing.
 */
import { rmSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const tmp = join(process.cwd(), ".tmp");
try {
  if (existsSync(tmp)) {
    for (const name of readdirSync(tmp)) {
      rmSync(join(tmp, name), { recursive: true });
    }
  }
  console.log("OK: .tmp/ emptied");
} catch (err) {
  console.error("clean.mjs:", err?.message ?? err);
  process.exit(1);
}
