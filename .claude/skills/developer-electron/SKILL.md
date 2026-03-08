---
name: developer-electron
description: Best practices for building an Electron desktop app: secure architecture, preload, packaging, and pitfalls. Use when user says electron, desktop app, /developer-electron.
---

# Developer Electron

When you build an Electron app, follow these practices. They focus on security, preload scripts, process model, packaging, and common traps. Plain language; [document-voice](../document-voice/SKILL.md).

## Inputs

- **Context** – Main process, renderer, preload, or packaging. Optional: project path.
- **Source** – User question or file; apply the rules below.

## Output

Guidance applied (secure config, preload, architecture, packaging). No new repo unless the user asks for one.

## Process

### 1. Security (required)

- Set **nodeIntegration: false** in `webPreferences`. If the renderer has Node, a single XSS can take over the machine.
- Set **contextIsolation: true**. Keeps preload and renderer worlds separate.
- Do not expose raw `ipcRenderer` to the renderer. Use a small, whitelisted API via the preload (see below).
- Whitelist IPC channel names. Do not let the renderer pass arbitrary channel names to the main process.
- Validate every IPC message. Treat the renderer as untrusted (same as API input). Check types and shape.
- Do not use `eval()` or `new Function()` in the renderer; they break the security boundary.

### 2. Preload script

- Use **contextBridge.exposeInMainWorld()** only. Exposing the full `ipcRenderer` is unsafe.
- Expose a minimal API: named functions for specific actions, not a generic send/receive.
- Clone data when passing across the bridge to avoid prototype pollution. Do not pass objects that carry prototype chains you do not control.
- Keep the preload script small. No business logic; only bridge calls.

### 3. Architecture

- **webPreferences** cannot be changed after the window is created. You cannot turn nodeIntegration on later. Set them once when creating the window.
- The main process is single-threaded. Blocking it (e.g. sync file I/O) freezes all windows. Use async APIs.
- Each BrowserWindow runs in its own renderer process. There is no shared in-memory JS state between windows. Use IPC or main-process state if you need to share.
- Use **show: false** and show the window on **ready-to-show** to avoid a white flash on load.

### 4. Native modules

- Prebuilt native addons are often built for a different Node/Electron version and will fail at runtime. Rebuild them for the Electron version you use.
- Run **electron-rebuild** after every Electron upgrade. Version mismatch usually means a crash on require.
- Prefer N-API–based native modules; they tend to survive Electron upgrades better than nan-based ones.

### 5. Packaging

- By default, devDependencies can be included in the packaged app. Exclude them in your packager config or the build gets large.
- On macOS, auto-update (e.g. Squirrel) needs code signing. Unsigned apps cannot use it.
- On Windows, set **app.setAppUserModelId()** or notifications may fail with no clear error.
- ASAR is a single-file archive, not encryption. Anyone can unpack and read the source. Do not put secrets in the app bundle.

### 6. Platform-specific

- CORS applies to `file://`. If you load from the filesystem, use a custom protocol (e.g. `app://`) or a local HTTP server so fetch/XHR works as expected.
- Windows: choose installer and update format (e.g. NSIS vs Squirrel) up front; it affects how you ship updates.
- macOS: use the **--universal** flag if you need to ship both Intel and ARM in one binary.

### 7. Memory and performance

- Closing a window without calling **win.destroy()** can leave the process and memory in use. Destroy when the window is no longer needed.
- Lazy load heavy modules so startup stays fast. Require them only when the feature is used.
- If you need timers or background work to run when the window is minimized, set **backgroundThrottling: false** for that window (use sparingly; it uses more power).

### 8. Debugging

- Main process: start with **--inspect**, then open `chrome://inspect` in Chrome and attach.
- Renderer: use **webContents.openDevTools()** or the usual DevTools shortcut.
- Relying on **console.log** in the main process is fragile; logs are lost on restart. Use a logger (e.g. electron-log) that writes to a file.

## Reference

[document-voice](../document-voice/SKILL.md). [developer-typescript](../developer-typescript/SKILL.md) for TypeScript in the same app.
