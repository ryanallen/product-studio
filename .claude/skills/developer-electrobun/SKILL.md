---
name: developer-electrobun
description: Build Electrobun desktop apps: Bun main process, views, RPC, bundling. Use when user says electrobun, Electrobun desktop app, /developer-electrobun.
---

# Developer Electrobun

Best practices for Electrobun: config, views, RPC, security, distribution. [document-voice](../document-voice/SKILL.md).

## Inputs

- **Context** – Main process (Bun), views (UI), RPC, config, or packaging. Optional: project path.
- **Source** – User question or file; apply the rules below.

## Output

Guidance applied (config, views, RPC, security, bundling). No new repo unless the user asks.

## When to use Electrobun vs Electron

Electrobun fits when you want **smaller bundles** (~14 MB), **tiny updates** (~14 KB patches), **fast startup** (&lt;50 ms), and **one TypeScript stack** (no preload bridge). Use [developer-electron](../developer-electron/SKILL.md) when you need the mature Electron ecosystem or existing native addons. Same security ideas: sandbox untrusted content, minimal exposed API, validate cross-boundary data.

## Process

### 1. Config and entrypoints

- Main process runs in a Bun worker; the native launcher runs the OS GUI on the main thread and talks to your code via FFI. Set **build.bun.entrypoint** in `electrobun.config.ts` (e.g. `src/bun/index.ts`).
- Define each UI surface under **build.views** with an entrypoint; use **build.copy** for HTML/assets so they are available at `views://<view-name>/...`. Load bundled UI with `url: "views://mainview/index.html"` in `BrowserWindow`; do not use `file://` for app assets.
- Typical scripts: **build:dev** (`bun install && electrobun build`), **start** or **dev** (`electrobun dev`), **build:canary** / **build:stable** (`electrobun build --env=...`). Template layout: `src/main.ts`, `src/renderer/` (index.html, style.css, script.ts), `package.json`, `electrobun.config.ts`. Official [Quick Start](https://blackboard.sh/electrobun/docs/guides/quick-start) and [Hello World](https://blackboard.sh/electrobun/docs/guides/hello-world).

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
- Build per target OS (or CI); artifact names are `{channel}-{os}-{arch}-*`. Download URLs: `{baseUrl}/{channel}-{os}-{arch}-{filename}` (e.g. `canary-macos-arm64-MyApp-canary.dmg`). macOS: DMG and `.app.tar.zst`; Windows: ZIP (Setup exe) and `.tar.zst`; Linux: `.tar.gz` (self-extracting) and `.tar.zst`. [Bundling & Distribution](https://blackboard.sh/electrobun/docs/guides/bundling-and-distribution), [Updates](https://blackboard.sh/electrobun/docs/guides/updates).

### 6. Related projects

All from [Blackboard Open Source](https://blackboard.sh/opensource/).

- **Reference app:** [Co(lab)](https://github.com/blackboardsh/colab) – Full Electrobun app (browser, editor, terminal, AI). Study `src/main/`, `src/renderers/`, `src/shared/`, `electrobun.config.ts`, and multi-pane patterns. Stack: Electrobun, SolidJS, Monaco, Bun. Features: multi-tab browser (Chromium/WebKit), git UI, plugin system. [blackboard.sh/colab](https://blackboard.sh/colab/) for downloads.
- **Local data:** [GoldfishDB](https://github.com/blackboardsh/goldfishdb) – Document DB with TypeScript schemas, atomic writes, optional AES-256-GCM encryption. `npm install goldfishdb`; define schema (version, stores), `new DB<typeof schema>().init({ schemaHistory, db_folder, passphrase? })`, then `db.collection('name').insert()` / `.query()` / `.queryById()`. Works in main or renderer. Use for: config, settings, local-first data, prototyping. Not for shared or heavy backend. Co(lab) uses it as local datastore. [NPM](https://www.npmjs.com/package/goldfishdb).
- **Updates:** Small patches (4–14 KB) come from Electrobun’s built-in updater. Under the hood: [zig-bsdiff](https://github.com/blackboardsh/zig-bsdiff) (TRDIFF10 format: tar diff with zstd); CLI diffs the app tarball between versions and produces `.patch` files. You don’t use zig-bsdiff in app code; set **release.baseUrl** and use the [Updater API](https://blackboard.sh/electrobun/docs/apis/updater). Prebuilt `bsdiff`/`bspatch` from zig-bsdiff Releases only if contributing to Electrobun or building custom update tooling.
- **Templates and framework:** [blackboardsh/electrobun](https://github.com/blackboardsh/electrobun) – `bunx electrobun init` pulls from `templates/` (hello-world, photo-booth, web-browser). Repo layout: `package/` (CLI), `templates/`, `kitchen/` (kitchen-sink). Docs: BUILD.md, CEF.md, [blackboard.sh/electrobun/docs](https://blackboard.sh/electrobun/docs/). Example apps: Audio TTS, Co(lab), DOOM.
- **Other:** zig-asar (ASAR pack/unpack in Zig, packaging pipelines), zig-zstd (Zstandard CLI, compression), electrobun-doom (DOOM-in-Electrobun demo), audio-tts (TTS desktop app). Full list: [Blackboard Open Source](https://blackboard.sh/opensource/).

## Reference

[document-voice](../document-voice/SKILL.md). [developer-electron](../developer-electron/SKILL.md) for security and preload-style API design. [developer-typescript](../developer-typescript/SKILL.md) for TypeScript. [Electrobun docs](https://blackboard.sh/electrobun/docs/).
