# Webpage-to-Figma Capture

Recreates a live webpage as a Figma design using Playwright and Figma MCP.

## Inputs

You need two things from the user before starting:

1. **Webpage URL** — The page to capture (e.g., `https://example.com`)
2. **Figma file URL** — Where to put the generated design (e.g., `https://www.figma.com/file/abc123/...`)

If either is missing, ask the user before proceeding.

## External Sites

For sites you don't control (e.g., ryanallen.com, competitor.com). Uses `skills/scripts/capture.js` to bypass CSP and inject Figma's capture script.

### 1. Generate Capture ID

Call Figma MCP's `generate_figma_design` with the target Figma file details. You'll receive a capture ID and endpoint URL.

### 2. Run Capture Script

```bash
node skills/scripts/capture.js "https://example.com" "CAPTURE_ID" 1920 1080
```

The script handles:
- Launching browser with specified viewport
- Stripping CSP headers
- Fetching and injecting Figma's capture script
- Calling `window.figma.captureForDesign()` to send page data to Figma
- Cleanup

### 3. Poll for Completion

- Wait 5 seconds after script starts
- Call `generate_figma_design` with the captureId to check status
- Repeat until status is `completed` (max 10 polls)

### 4. Notify via Slack

Send a Slack message with the Figma file link letting the user know the capture is ready.

## Local Sites

For localhost or dev servers where you can modify the HTML.

### 1. Generate Capture ID

Same as external sites — call `generate_figma_design` to get a capture ID and endpoint.

### 2. Add Capture Script to HTML

```html
<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
```

### 3. Open Browser with Capture URL

```bash
open "http://localhost:3000#figmacapture=ID&figmaendpoint=ENDPOINT&figmadelay=1000"
```

### 4. Poll for Completion

Same polling process as external sites.

### 5. Notify via Slack

Same as external sites — send Slack message with the Figma link.

## Requirements

- Playwright installed (`npm install playwright`) — for capture.js script
- Figma MCP server configured and authenticated
- Slack MCP server configured for notifications
