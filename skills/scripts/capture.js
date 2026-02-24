const { chromium } = require('playwright');

const url = process.argv[2];
const captureId = process.argv[3];
const width = parseInt(process.argv[4]) || 1920;
const height = parseInt(process.argv[5]) || 1080;

if (!url || !captureId) {
  console.error('Usage: node capture.js <url> <captureId> [width] [height]');
  process.exit(1);
}

const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit`;

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();

  await page.route('**/*', async (route) => {
    try {
      const response = await route.fetch();
      const headers = { ...response.headers() };
      delete headers['content-security-policy'];
      delete headers['content-security-policy-report-only'];
      await route.fulfill({ response, headers });
    } catch (err) {
      await route.continue();
    }
  });

  await page.goto(url);
  await page.waitForTimeout(3000);

  const r = await page.context().request.get('https://mcp.figma.com/mcp/html-to-design/capture.js');
  await page.evaluate((s) => {
    const el = document.createElement('script');
    el.textContent = s;
    document.head.appendChild(el);
  }, await r.text());

  await page.waitForTimeout(500);

  await page.evaluate((captureId, endpoint) => window.figma.captureForDesign({
    captureId,
    endpoint,
    selector: 'body'
  }), captureId, endpoint);

  await page.waitForTimeout(5000);
  await browser.close();
})();
