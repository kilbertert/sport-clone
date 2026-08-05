import { chromium } from 'playwright-core'
import { mkdir, writeFile } from 'node:fs/promises'

const baseUrl = process.env.TARGET_URL
const username = process.env.TARGET_USER
const password = process.env.TARGET_PASSWORD

if (!baseUrl || !username || !password) {
  throw new Error('TARGET_URL, TARGET_USER and TARGET_PASSWORD are required')
}

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
})

const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
await mkdir('/tmp/target-sports/captures', { recursive: true })
await page.goto(baseUrl, { waitUntil: 'networkidle' })
const loginResponse = await page.request.post('http://8.163.88.109:2021/api/auth/login', {
  data: { username, password },
})
const loginPayload = await loginResponse.json()
if (String(loginPayload.code) !== '200') {
  throw new Error(loginPayload.msg || 'Target login failed')
}
await page.evaluate((token) => localStorage.setItem('token', token), loginPayload.data.token)
await page.goto(new URL('dashboard', baseUrl).href, { waitUntil: 'networkidle' })
await page.locator('.sider-brand').waitFor()
await page.waitForLoadState('networkidle')

const routes = ['dashboard', 'students', 'talent', 'risk', 'face', 'reports', 'profile']
for (const route of routes) {
  await page.goto(new URL(route, baseUrl).href, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  await page.screenshot({
    path: `/tmp/target-sports/captures/${route}.png`,
    fullPage: true,
  })
  const text = await page.locator('body').innerText()
  await writeFile(`/tmp/target-sports/captures/${route}.txt`, text)
}

await browser.close()
