// Headless verification: render the production build, capture Desktop + Mobile
// screenshots, and report any console errors / page errors.
import { chromium } from 'playwright'
import http from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const DIST = path.resolve('dist')
const PORT = 5055
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon',
}

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0])
    if (p === '/') p = '/index.html'
    const file = path.join(DIST, p)
    if (!existsSync(file)) { res.writeHead(404); res.end('not found'); return }
    const data = await readFile(file)
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
    res.end(data)
  } catch (e) { res.writeHead(500); res.end(String(e)) }
})

await new Promise((r) => server.listen(PORT, r))
await mkdir('screens', { recursive: true })

const browser = await chromium.launch()
const errors = []

async function shoot(name, viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${name}] console: ${m.text()}`))
  page.on('pageerror', (e) => errors.push(`[${name}] pageerror: ${e.message}`))
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  // Scroll through the page so IntersectionObserver reveals fire before we
  // capture the full-page screenshot, then return to top.
  await page.evaluate(async () => {
    // Disable smooth-scroll so each step settles instantly and every reveal
    // gets a frame inside the IntersectionObserver trigger zone.
    const prev = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    const step = 300
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 70))
    }
    window.scrollTo(0, 0)
    document.documentElement.style.scrollBehavior = prev
  })
  await page.waitForTimeout(900) // let reveals settle
  await page.screenshot({ path: `screens/${name}.png`, fullPage: opts.full !== false })
  // Interact with the Stilfinder on desktop to verify the configurator works.
  if (opts.finder) {
    await page.locator('#stilfinder').scrollIntoViewIfNeeded()
    await page.locator('#stilfinder input[value="farbe"]').check()
    await page.locator('#stilfinder button:has-text("Weiter")').click()
    await page.locator('#stilfinder input[value="lang"]').check()
    await page.locator('#stilfinder button:has-text("Weiter")').click()
    await page.locator('#stilfinder input[value="wellig"]').check()
    await page.locator('#stilfinder button:has-text("Empfehlung zeigen")').click()
    await page.waitForTimeout(300)
    await page.locator('#stilfinder').scrollIntoViewIfNeeded()
    await page.screenshot({ path: 'screens/finder-result.png', clip: await page.locator('.finder').boundingBox() })
  }
  await ctx.close()
}

await shoot('desktop', { width: 1280, height: 900 }, { finder: true })
await shoot('tablet', { width: 768, height: 1024 })
await shoot('mobile', { width: 360, height: 740 })

await browser.close()
server.close()

if (errors.length) {
  console.log('CONSOLE/PAGE ERRORS:\n' + errors.join('\n'))
  process.exit(1)
} else {
  console.log('OK — no console or page errors. Screenshots in ./screens')
}
