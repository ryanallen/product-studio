---
name: developer-electron
description: Electron desktop apps: secure architecture, preload, packaging, and common pitfalls. Use when user says electron, desktop app, /developer-electron.
---

# Developer Electron

Use when building or debugging an Electron app. Apply secure defaults, preload rules, and avoid architecture and packaging traps. Plain language; [document-voice](../document-voice/SKILL.md).

## Inputs

- **Context** – Main process, renderer, preload, or packaging. Optional: project path.
- **Source** – User question or file; apply the rules below.

## Output

Guidance applied (secure config, preload, architecture, packaging). No new repo unless requested.

## Process

### 1. Security (non-negotiable)

- **nodeIntegration: false** in `webPreferences`. Renderer with Node = XSS can compromise the system.
- **contextIsolation: true**. Keeps preload separate from renderer.
- Whitelist IPC channels; do not forward arbitrary channel names from renderer.
- Validate all IPC message content; treat renderer as untrusted (like external API input).
- No `eval()` or `new Function()` in renderer; they break security boundaries.

### 2. Preload

- **contextBridge.exposeInMainWorld()** only. Raw `ipcRenderer` exposure is unsafe.
- Clone data before passing across the bridge (avoids prototype pollution).
- Minimal API: expose specific functions, not generic send/receive.

### 3. Architecture

- **webPreferences** are fixed after window creation; you cannot enable nodeIntegration later.
- Blocking main process freezes all windows. Use async; no sync file I/O.
- Each BrowserWindow is a separate renderer process; no shared in-memory JS state.
- `show: false` then show on `ready-to-show` to avoid white flash.

### 4. Native modules

- Prebuilt native modules often fail; rebuild for Electron’s Node version.
- Run **electron-rebuild** after every Electron upgrade; version mismatch = runtime crash.
- Prefer N-API modules; they survive Electron upgrades better than nan-based.

### 5. Packaging

- Dev dependencies included by default; exclude in production or builds bloat.
- macOS auto-update requires code signing; unsigned apps cannot use Squirrel.
- Windows notifications need **app.setAppUserModelId()** or they fail silently.
- ASAR is not encryption; source is readable; do not store secrets in it.

### 6. Platform-specific

- CORS blocks `file://`. Use a custom protocol (e.g. `app://`) or local server.
- Windows: NSIS or Squirrel for auto-update; installer format matters.
- macOS universal: `--universal` flag to ship Intel and ARM.

### 7. Memory and performance

- Unclosed windows leak; call **win.destroy()** when done.
- Lazy load heavy modules to keep startup fast.
- **backgroundThrottling: false** if timers must run when minimized.

### 8. Debugging

- Main: **--inspect**, then `chrome://inspect`.
- Renderer: **webContents.openDevTools()** or keyboard shortcut.
- Use **electron-log** (or similar) for persistent logs; console.log is lost on restart.

## Reference

[document-voice](../document-voice/SKILL.md). [developer-typescript](../developer-typescript/SKILL.md) for TypeScript in the same app.
