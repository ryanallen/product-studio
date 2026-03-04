#!/usr/bin/env node

import { execSync } from "child_process";
import { readdirSync, rmSync, renameSync, unlinkSync, existsSync, mkdirSync } from "fs";
import path from "path";

const cwd = process.cwd();
const packDir = "package";
const bridgeInPack = path.join(packDir, "figma-desktop-bridge");
const bridgeInTarball = "package/figma-desktop-bridge";
const bridgeDest = ".claude/skills/generate-figma/scripts/figma-desktop-bridge";

// 1. Pack the package
execSync("npm pack figma-console-mcp", { cwd, stdio: "inherit" });

// 2. Find the tgz (single match)
const files = readdirSync(cwd);
const tgz = files.find((f) => f.startsWith("figma-console-mcp-") && f.endsWith(".tgz"));
if (!tgz) throw new Error("npm pack did not produce a figma-console-mcp-*.tgz");

const tgzPath = path.join(cwd, tgz);

// 3. Extract only package/figma-desktop-bridge (cross-platform tar: Windows 10+ and macOS have tar)
const tgzArg = tgzPath.replace(/\\/g, "/");
execSync(`tar -xzf "${tgzArg}" ${bridgeInTarball}`, { cwd, stdio: "inherit" });

// 4. Move to generate-figma skill scripts folder (ensure parent exists)
const destPath = path.join(cwd, bridgeDest);
const parent = path.dirname(destPath);
if (!existsSync(parent)) mkdirSync(parent, { recursive: true });
if (existsSync(destPath)) rmSync(destPath, { recursive: true });
renameSync(path.join(cwd, bridgeInPack), destPath);

// 5. Cleanup
rmSync(path.join(cwd, packDir), { recursive: true });
unlinkSync(tgzPath);

console.log("Figma Desktop Bridge extracted to .claude/skills/generate-figma/scripts/figma-desktop-bridge");
