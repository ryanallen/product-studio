# Webpage-to-Figma Capture

Captures a live webpage into a Figma file using Playwright for browser automation and Figma MCP for capture infrastructure.

## Prerequisites

- Node.js installed
- Playwright installed (`npm install playwright`)
- Figma MCP configured and authenticated

## External Sites

For sites you don't control (e.g., ryanallen.com, competitor.com):

### 1. Generate Capture ID

Call `mcp__figma__generate_figma_design` with target file details. You'll receive a unique capture ID and endpoint URL.

### 2. Run Capture Script

Use the reusable capture script with the URL, capture ID, and optional dimensions:

```bash
node skills/scripts/capture.js "https://example.com" "CAPTURE_ID" 1920 1080
```

The script handles:
- Launching browser with specified viewport
- Stripping CSP headers (required for external sites)
- Injecting Figma capture script
- Executing capture
- Cleanup

### 3. Poll for Completion

- Wait 5 seconds after script starts
- Call `mcp__figma__generate_figma_design` with captureId to check status
- Repeat until status is `completed`
- Maximum 10 polls

### 4. Report Results

Provide the Figma file link and note any sizing adjustments needed.

## Local Sites

For localhost or dev servers:

### 1. Generate Capture ID

Same as external sites — call `mcp__figma__generate_figma_design`.

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

## Why Both Tools Are Needed

- **Figma MCP** provides capture infrastructure (IDs, endpoints, file creation)
- **Playwright** handles browser automation and CSP bypass for external sites
- Without Figma MCP: No capture IDs or Figma file creation
- Without Playwright: Can't bypass CSP on external sites
