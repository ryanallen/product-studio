# Building desktop apps with Electrobun

Everything you need to build fast, small, cross-platform desktop apps with TypeScript. Electrobun uses Bun for the main process and the system WebView (or optional CEF) for the UI. Source: [Electrobun Documentation](https://blackboard.sh/electrobun/docs/).

## What Electrobun is

A desktop framework that gives you:

- **Small bundles** – About 14 MB compressed (vs 150 MB+ with Electron).
- **Tiny updates** – Patches around 14 KB using a custom bsdiff-style updater.
- **Fast startup** – Under 50 ms cold start (vs 2–5 s with Electron).
- **One stack** – TypeScript for main process and UI; HTML/CSS/JS and any frontend framework in the window.
- **Cross-platform** – macOS, Windows, Linux. Optional CEF (Chromium) when you need identical behavior everywhere.

Rough comparison:

| Metric        | Electron | Tauri | Electrobun |
|---------------|----------|-------|------------|
| Bundle size   | 150 MB+  | 25 MB | 14 MB      |
| Update size   | 100 MB+  | 10 MB | 14 KB      |
| Startup time  | 2–5 s    | 500 ms| &lt;50 ms   |
| Memory        | 100–200 MB | 30–50 MB | 15–30 MB |

Good fit: tools that need to feel native and ship often, bandwidth-sensitive apps, cross-platform products, and quick MVPs.

## Prerequisites

- [Bun](https://bun.sh/) installed.
- Basic TypeScript/JavaScript.
- A code editor (e.g. [co(lab)](https://blackboard.sh/colab/)).

## Quick start

Create a new project:

```bash
bunx electrobun init
```

Pick a template (e.g. hello-world, photo-booth, web-browser). You get:

```
my-app/
├── src/
│   ├── main.ts
│   └── renderer/
│       ├── index.html
│       ├── style.css
│       └── script.ts
├── package.json
└── electrobun.config.ts
```

Run it:

```bash
cd my-app
bun install
bun start
```

That runs a dev build and opens the app.

## Project layout and config

- **Main process** – Entrypoint is set in `electrobun.config.ts` under `build.bun.entrypoint` (e.g. `src/bun/index.ts`). This code runs in a Bun worker; the native GUI runs on the main thread and talks to your code via FFI.
- **Views (UI)** – Each “view” is a separate TypeScript entrypoint. You declare them in `electrobun.config.ts` under `build.views`. The CLI compiles them and serves them under the `views://` scheme (e.g. `views://main-ui/index.html`, `views://main-ui/index.js`).
- **Static files** – Use `build.copy` to copy HTML or other assets into the bundle so they are available at `views://<view-name>/...`.

Example config:

```ts
// electrobun.config.ts
export default {
  app: {
    name: "My App",
    identifier: "dev.my.app",
    version: "0.0.1",
  },
  build: {
    bun: {
      entrypoint: "src/bun/index.ts",
    },
    views: {
      "main-ui": {
        entrypoint: "src/main-ui/index.ts",
      },
    },
    copy: {
      "src/main-ui/index.html": "views/main-ui/index.html",
    },
  },
  release: {
    baseUrl: "https://your-static-host.com/yourapp/",
  },
};
```

## Opening a window

In the main process:

```ts
import { BrowserWindow } from "electrobun/bun";

const win = new BrowserWindow({
  title: "My App",
  url: "views://mainview/index.html",
});
```

You can load a remote URL (`https://...`) or bundled content via `views://<view>/path`. Use `frame: { width, height, x, y }` for size and position. Other options: `titleBarStyle` (`"default"` | `"hidden"` | `"hiddenInset"`), `transparent: true`, `sandbox: true` for untrusted content (disables RPC). See [BrowserWindow API](https://blackboard.sh/electrobun/docs/apis/browser-window).

## Building UI (views)

1. Add a view in config (e.g. `main-ui` with entrypoint `src/main-ui/index.ts`).
2. In that file, create an `Electroview` and attach your logic to `window` or the DOM.
3. In HTML, load the compiled script with `views://main-ui/index.js` and use the custom `<electrobun-webview>` tag for an embedded webview (e.g. for a browser tab or embedded page).

Example:

```ts
// src/main-ui/index.ts
import { Electroview } from "electrobun/view";
const electrobun = new Electroview({ rpc: null });

window.loadPage = () => {
  const url = document.querySelector("#urlInput").value;
  document.querySelector(".webview").src = url;
};
```

```html
<!-- index.html -->
<script src="views://main-ui/index.js"></script>
<input type="text" id="urlInput" placeholder="Enter URL">
<electrobun-webview class="webview" width="100%" height="100%" src="https://electrobun.dev"></electrobun-webview>
```

Use [Draggable Regions](https://blackboard.sh/electrobun/docs/apis/browser/draggable-regions) for custom title bars when using `titleBarStyle: "hidden"` or `"hiddenInset"`.

## Menus and shortcuts

Set the app menu from the main process so shortcuts (e.g. Copy, Paste) work in inputs:

```ts
import { ApplicationMenu } from "electrobun/bun";

ApplicationMenu.setApplicationMenu([
  { submenu: [{ label: "Quit", role: "quit" }] },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "selectAll" },
    ],
  },
]);
```

Roles wire up native shortcuts; you can add custom items with `action` and handle them in your code.

## IPC and RPC

Electrobun uses typed RPC between the Bun process and a window’s webview. You define a shared type (requests and messages for both directions), then in the main process you call `BrowserView.defineRPC<YourType>({ handlers })` and pass that to `BrowserWindow` as `rpc`. In the browser you use the same type with the Electroview class so you can call Bun handlers and receive messages. See [Electroview Class](https://blackboard.sh/electrobun/docs/apis/browser/electroview-class) and the [BrowserWindow RPC section](https://blackboard.sh/electrobun/docs/apis/browser-window#rpc). For untrusted or third-party content, use `sandbox: true` so RPC is disabled and only events are available.

## Scripts and builds

Typical `package.json` scripts:

```json
{
  "scripts": {
    "start": "bun run build:dev && electrobun dev",
    "dev": "electrobun dev",
    "dev:watch": "electrobun dev --watch",
    "build:dev": "bun install && electrobun build",
    "build:canary": "electrobun build --env=canary",
    "build:stable": "electrobun build --env=stable"
  }
}
```

- **Dev** – `electrobun dev` uses a dev launcher; no artifacts. Good for daily development.
- **Canary / stable** – `electrobun build --env=canary` or `--env=stable` produces an `artifacts` folder: installers, `.tar.zst` bundles, and patch files for updates. Upload these to a static host (S3, R2, GitHub Releases, etc.).

## Artifacts and distribution

Artifacts use a flat naming scheme: `{channel}-{os}-{arch}-*` (e.g. `canary-macos-arm64-MyApp-canary.dmg`, `canary-win-x64-MyApp-Setup-canary.zip`). Set `release.baseUrl` in config to your host; the updater uses it to fetch `*-update.json` and patch or full bundles.

- **macOS** – DMG and `.app.tar.zst`; code signing and notarization can be enabled in config (needs Apple credentials in env).
- **Windows** – ZIP containing the Setup exe; `.tar.zst` for updates.
- **Linux** – `.tar.gz` with a self-extracting installer; `.tar.zst` for updates.

Keep old patch files on the host so users on older versions can patch step by step. If a patch path is missing, the updater falls back to downloading the full bundle. See [Bundling & Distribution](https://blackboard.sh/electrobun/docs/guides/bundling-and-distribution) and [Updates](https://blackboard.sh/electrobun/docs/guides/updates).

## Updates

The built-in [Updater API](https://blackboard.sh/electrobun/docs/apis/updater) checks `release.baseUrl`, compares version hashes, downloads small bsdiff patches (or the full `.tar.zst` when needed), and can replace the app and relaunch. You control when to check and when to apply. For GitHub Releases, set `baseUrl` to `https://github.com/ORG/REPO/releases/latest/download`; note that “latest” points to the latest non-prerelease, so canary builds do not auto-update from that URL unless you use another host. See [Updates guide](https://blackboard.sh/electrobun/docs/guides/updates).

## Architecture in short

- A small native launcher (Zig) starts Bun and runs your entrypoint in a worker. The main thread runs the OS GUI event loop; your code talks to it via FFI.
- Windows and webviews are native (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux). CEF is optional.
- Bundled assets are loaded with the `views://` scheme. The installed app lives in the normal app bundle; for distribution, Electrobun can build a ZSTD self-extracting bundle so the first run extracts into Application Support and then launches the full app.
- IPC is encrypted and typed; you define RPC schemas and handlers in both Bun and the browser.

## Where to go next

- In this repo: [.claude/skills/developer-electrobun/SKILL.md](../../../.claude/skills/developer-electrobun/SKILL.md) – Practices and links to Electron guidance; ecosystem (Co(lab), GoldfishDB, zig-bsdiff, etc.) is in the skill.
- [Electrobun docs](https://blackboard.sh/electrobun/docs/) – Full guides and API reference.
- [Quick Start](https://blackboard.sh/electrobun/docs/guides/quick-start) – First app in minutes.
- [Hello World](https://blackboard.sh/electrobun/docs/guides/hello-world) – Project setup from scratch.
- [Creating UI](https://blackboard.sh/electrobun/docs/guides/creating-ui) – Views and `<electrobun-webview>`.
- [Bundling & Distribution](https://blackboard.sh/electrobun/docs/guides/bundling-and-distribution) – Artifacts and hosting.
- [Architecture Overview](https://blackboard.sh/electrobun/docs/guides/architecture/overview) – How the app and bundles work.
- [GitHub](https://github.com/blackboardsh/electrobun) · [Discord](https://discord.gg/ueKE4tjaCE)
