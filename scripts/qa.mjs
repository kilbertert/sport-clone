import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:8524'
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
})

await mkdir('/tmp/sport-clone-qa', { recursive: true })
const errors = []

async function openContext(name, viewport) {
  const context = await browser.newContext({ viewport })
  const page = await context.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`${name}: ${message.text()}`)
  })
  page.on('pageerror', (error) => errors.push(`${name}: ${error.message}`))
  return { context, page }
}

const desktop = await openContext('desktop', { width: 1440, height: 1000 })
await desktop.page.goto(baseUrl, { waitUntil: 'networkidle' })
await desktop.page.getByLabel('用户名').fill('产品')
await desktop.page.getByLabel('密码').fill('Sports1116.')
await desktop.page.getByRole('button', { name: '登 录' }).click()
await desktop.page.waitForURL(/dashboard/)

const routes = ['dashboard', 'precision', 'capture', 'students', 'talent', 'risk', 'teaching', 'recess', 'training', 'schedules', 'home-school', 'research', 'team', 'face', 'reports', 'profile']
for (const route of routes) {
  await desktop.page.goto(`${baseUrl}/${route}`, { waitUntil: 'networkidle' })
  await desktop.page.waitForTimeout(250)
  const metrics = await desktop.page.evaluate(() => ({
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
    bodyHeight: document.body.scrollHeight,
    textLength: document.body.innerText.length,
  }))
  if (metrics.bodyWidth > metrics.viewportWidth + 2) {
    errors.push(`${route}: horizontal overflow ${metrics.bodyWidth}/${metrics.viewportWidth}`)
  }
  if (metrics.textLength < 60) errors.push(`${route}: unexpectedly little content`)
  await desktop.page.screenshot({ path: `/tmp/sport-clone-qa/${route}-desktop.png`, fullPage: true })
}

await desktop.page.goto(`${baseUrl}/students/100023017`, { waitUntil: 'networkidle' })
await desktop.page.screenshot({ path: '/tmp/sport-clone-qa/student-detail-desktop.png', fullPage: true })

await desktop.page.goto(`${baseUrl}/training`, { waitUntil: 'networkidle' })
await desktop.page.getByRole('button', { name: '生成处方' }).click()
await desktop.page.locator('.modal').getByLabel('训练重点').fill('专项速度耐力与落地稳定')
await desktop.page.locator('.modal').getByRole('button', { name: '生成处方' }).click()
if (!(await desktop.page.getByText('专项速度耐力与落地稳定').count())) errors.push('training: generated plan not visible')

await desktop.page.goto(`${baseUrl}/schedules`, { waitUntil: 'networkidle' })
await desktop.page.getByRole('button', { name: '新建计划' }).click()
await desktop.page.locator('.modal').getByLabel('计划名称').fill('自动化验收测试计划')
await desktop.page.locator('.modal').getByRole('button', { name: '创建计划' }).click()
if (!(await desktop.page.getByText('自动化验收测试计划').count())) errors.push('schedules: created schedule not visible')

await desktop.page.goto(`${baseUrl}/face`, { waitUntil: 'networkidle' })
await desktop.page.locator('input[type=file]').setInputFiles({ name: 'student-face.png', mimeType: 'image/png', buffer: Buffer.from('test') })
await desktop.page.getByRole('button', { name: '开始归一化' }).click()
if (!(await desktop.page.getByText(/归一化完成/).count())) errors.push('face: normalize result not visible')

await desktop.page.goto(`${baseUrl}/capture`, { waitUntil: 'networkidle' })
await desktop.page.getByRole('button', { name: '启动采集' }).click()
await desktop.page.waitForTimeout(4300)
if (!(await desktop.page.locator('.lane-card').filter({ hasText: '文福智' }).getByText('1.76s').count())) errors.push('capture: live collection did not advance')

await desktop.page.goto(`${baseUrl}/teaching`, { waitUntil: 'networkidle' })
await desktop.page.getByRole('button', { name: 'AI 生成课堂方案' }).click()
if (!(await desktop.page.getByText('分层课堂方案已重新生成').count())) errors.push('teaching: AI lesson generation did not run')

await desktop.page.goto(`${baseUrl}/recess`, { waitUntil: 'networkidle' })
await desktop.page.locator('.demo-grid > button').first().click()
if (!(await desktop.page.locator('.motion-demo').count())) errors.push('recess: action demonstration did not open')
await desktop.page.locator('.modal').getByTitle('关闭').click()

await desktop.page.goto(`${baseUrl}/research`, { waitUntil: 'networkidle' })
await desktop.page.getByRole('button', { name: '新建课题' }).click()
await desktop.page.locator('.modal').getByLabel('课题名称').fill('自动化验收科研课题')
await desktop.page.locator('.modal').getByRole('button', { name: '创建课题' }).click()
if (!(await desktop.page.getByText('自动化验收科研课题').count())) errors.push('research: created project not visible')

await desktop.page.goto(`${baseUrl}/home-school`, { waitUntil: 'networkidle' })
await desktop.page.getByRole('button', { name: '发布家庭作业' }).click()
await desktop.page.locator('.modal').getByLabel('作业名称').fill('自动化验收家庭作业')
await desktop.page.locator('.modal').getByRole('button', { name: '发布到家长端' }).click()
if (!(await desktop.page.getByText('自动化验收家庭作业').count())) errors.push('home-school: published homework not visible')

await desktop.page.goto(`${baseUrl}/team`, { waitUntil: 'networkidle' })
const firstTeamAction = desktop.page.locator('.team-selection-grid tbody .button').first()
const previousTeamAction = await firstTeamAction.textContent()
await firstTeamAction.click()
if ((await firstTeamAction.textContent()) === previousTeamAction) errors.push('team: selection state did not update')
await desktop.page.getByRole('button', { name: '冠军训练体系' }).click()
if (!(await desktop.page.getByText('谁适合什么项目').count())) errors.push('team: champion training tab did not open')
await desktop.page.getByRole('button', { name: '生成专项计划' }).click()
if (!(await desktop.page.getByText(/已为 .* 创建 .* 训练计划/).count())) errors.push('team: project fit plan was not generated')

await desktop.page.goto(`${baseUrl}/precision`, { waitUntil: 'networkidle' })
await desktop.page.getByRole('button', { name: '生成建议' }).first().click()
if (!(await desktop.page.getByText(/已生成专项干预建议/).count())) errors.push('precision: grade intervention was not generated')

const mobile = await openContext('mobile', { width: 390, height: 844 })
await mobile.page.goto(baseUrl, { waitUntil: 'networkidle' })
await mobile.page.evaluate(() => localStorage.setItem('sport-auth', '1'))
for (const route of ['dashboard', 'precision', 'capture', 'students', 'teaching', 'recess', 'training', 'schedules', 'home-school', 'research', 'team']) {
  await mobile.page.goto(`${baseUrl}/${route}`, { waitUntil: 'networkidle' })
  await mobile.page.waitForTimeout(250)
  const metrics = await mobile.page.evaluate(() => ({
    bodyWidth: document.body.scrollWidth,
    viewportWidth: window.innerWidth,
    contentRight: document.querySelector('.workspace')?.getBoundingClientRect().right,
  }))
  if (metrics.bodyWidth > metrics.viewportWidth + 2) {
    errors.push(`mobile ${route}: horizontal overflow ${metrics.bodyWidth}/${metrics.viewportWidth}`)
  }
  await mobile.page.screenshot({ path: `/tmp/sport-clone-qa/${route}-mobile.png`, fullPage: true })
}
await mobile.page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle' })
await mobile.page.getByTitle('打开导航').click()
if (!(await mobile.page.getByRole('button', { name: /测试计划/ }).count())) errors.push('mobile: navigation did not open')

await desktop.context.close()
await mobile.context.close()
await browser.close()

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('QA passed: desktop and mobile routes render without console errors or page overflow.')
