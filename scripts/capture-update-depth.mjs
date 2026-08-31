import { chromium } from 'playwright-core'

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:5175'
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error' && message.text().includes('Maximum update depth exceeded')) errors.push(message.text())
})
page.on('pageerror', (error) => {
  if (error.message.includes('Maximum update depth exceeded')) errors.push(error.message)
})

await page.goto(baseUrl, { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('sport-auth', '1'))
await page.goto(`${baseUrl}/capture`, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: '启动采集' }).click()
await page.waitForTimeout(5000)
await browser.close()

if (errors.length) {
  console.error('CaptureCenter maximum update depth reproduced')
  process.exit(1)
}
console.log('CaptureCenter update depth check passed')
