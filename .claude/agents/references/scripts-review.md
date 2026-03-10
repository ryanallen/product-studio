# Scripts dev review

**clean.mjs** – Empties `.tmp/`. Sync fs APIs; wrapped in try/catch, exit(1) on error. Safe when `.tmp` is missing. No dependencies.

**sync-codex-from-claude.mjs** – Copies `.claude` to `.codex` with path mapping. Requires `.claude` to exist; readdir will throw otherwise. Uses fs.promises; main().catch exits 1. No changes needed.

**setup-figma-bridge.mjs** – Packs figma-console-mcp, extracts figma-desktop-bridge into skill scripts. Uses execSync, readdirSync, path.join. Throws if pack fails or no tgz found. Fine as-is.

**figma-desktop-bridge/code.js** – Figma plugin runtime (runs inside Figma sandbox). ES5-style for compatibility. Not Node; leave as-is.
