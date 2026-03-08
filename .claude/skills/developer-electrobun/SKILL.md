---
name: developer-electrobun
description: Build Electrobun desktop apps: Bun main process, views, RPC, bundling. Use when user says electrobun, Electrobun desktop app, /developer-electrobun.
---

# Developer Electrobun

Best practices for Electrobun: config, views, RPC, security, distribution. [document-voice](../document-voice/SKILL.md). Full build guide: [work/product-studio/electrobun/README.md](../../work/product-studio/electrobun/README.md).

## Inputs

- **Context** – Main process (Bun), views (UI), RPC, config, or packaging. Optional: project path.
- **Source** – User question or file; apply the rules below.

## Output

Guidance applied (config, views, RPC, security, bundling). No new repo unless the user asks.

## When to use Electrobun vs Electron

Electrobun fits when you want **smaller bundles** (~14 MB), **tiny updates** (~14 KB patches), **fast startup** (&lt;50 ms), and **one TypeScript stack** (no preload bridge). Use [developer-electron](../developer-electron/SKILL.md) when you need the mature Electron ecosystem or existing native addons. The same security ideas apply: sandbox untrusted content, minimal exposed API, validate cross-boundary data.

## Process

### 1. Config and entrypoints

- Set **build.bun.entrypoint** in `electrobun.config.ts` (e.g. `src/bun/index.ts`).
- Define each UI surface under **build.views** with an entrypoint; use **build.copy** for HTML/assets so they are available at `views://<view-name>/...`.
- Load bundled UI with `url: "views://mainview/index.html"` in `BrowserWindow`; do not use `file://` for app assets.

### 2. Security and sandbox

- For **untrusted or third-party content** (arbitrary URLs, user-provided links), set **sandbox: true** on the window or `<electrobun-webview>`. Sandbox disables RPC and allows only events.
- Use **typed RPC** with a shared schema; do not expose a generic "run anything" API (same idea as Electron's whitelisted preload; see [developer-electron](../developer-electron/SKILL.md)).
- Validate RPC params and responses; treat the webview as untrusted when it can load external content.

### 3. RPC and IPC

- Define a shared type (requests + messages both ways); use **BrowserView.defineRPC&lt;T&gt;** in the main process and **Electroview** in the browser. Pass the RPC instance to **BrowserWindow** as **rpc**.
- Keep handlers small and async; avoid long-running work on the main thread. Use **maxRequestTime** or offload work.
- For events-only windows (e.g. navigation), omit RPC or use **Electroview({ rpc: null })**.

### 4. Views and UI

- Each view is a TS entrypoint; the CLI serves it at `views://<view-name>/index.js`. In HTML, load that script and use `<electrobun-webview>` for embedded pages.
- With **titleBarStyle: "hidden"** or **"hiddenInset"**, use **Draggable Regions** so the user can drag the window; wire close/minimize/maximize to the window control APIs.
- Set **ApplicationMenu.setApplicationMenu** from the main process so system edit shortcuts work in inputs.

### 5. Packaging and distribution

- Run **electrobun build --env=canary** or **--env=stable** to produce the **artifacts** folder. Upload to a static host and set **release.baseUrl** in config.
- Keep **old patch files** on the host so users can patch incrementally; the updater falls back to a full bundle when a patch is missing.
- macOS: enable **codesigning** and **notarization** in config with credentials in env for distribution; disable for local debugging.
- Build per target OS (or CI); artifact names are `{channel}-{os}-{arch}-*`. See [work/product-studio/electrobun/README.md](../../work/product-studio/electrobun/README.md) for naming and URLs.

### 6. Ecosystem and related projects

- **Reference app:** [Co(lab)](https://github.com/blackboardsh/colab) is a full Electrobun app (browser, editor, terminal, AI). Use it to see structure (`src/main/`, `src/renderers/`, `src/shared/`), `electrobun.config.ts`, and multi-pane patterns. Stack: Electrobun, SolidJS, Monaco, Bun.
- **Local data:** For settings, cache, or small structured data without a server, use [GoldfishDB](https://github.com/blackboardsh/goldfishdb) (`npm install goldfishdb`). TypeScript schemas, atomic writes, optional encryption; works in main or renderer. Co(lab) uses it as its local datastore.
- **Updates:** Small patches (4–14 KB) come from Electrobun’s built-in updater (powered by zig-bsdiff under the hood). No direct dependency; use **release.baseUrl** and the [Updater API](https://blackboard.sh/electrobun/docs/apis/updater). Full ecosystem list: [work/product-studio/electrobun/ECOSYSTEM.md](../../work/product-studio/electrobun/ECOSYSTEM.md).

## Reference

[document-voice](../document-voice/SKILL.md). [developer-electron](../developer-electron/SKILL.md) for security and preload-style API design. [developer-typescript](../developer-typescript/SKILL.md) for TypeScript. Build guide: [work/product-studio/electrobun/README.md](../../work/product-studio/electrobun/README.md). Ecosystem (Co(lab), GoldfishDB, zig-bsdiff): [work/product-studio/electrobun/ECOSYSTEM.md](../../work/product-studio/electrobun/ECOSYSTEM.md).
