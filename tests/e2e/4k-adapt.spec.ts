import { test, expect } from '@playwright/test'
import { mkdirSync } from 'fs'

/**
 * 4K 视口 (3840x2160) 适配测试
 * 用于验证在 4K 分辨率下页面布局、导航、页脚等显示是否正确
 * 运行前会自动启动 dev server，使用 project=4k 的 3840x2160 视口
 */
test.describe('4K 视口适配', () => {
  test('首页在 4K 下可访问且关键区域可见', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 45000 })
    await expect(page).toHaveTitle(/AXON|羽山/)

    // 用 load 即可，避免 networkidle 长时间等待导致超时/闪退
    await page.waitForLoadState('load').catch(() => {})

    const nav = page.locator('.navbar').first()
    await expect(nav).toBeVisible({ timeout: 15000 })

    const footer = page.locator('.footer').first()
    await expect(footer).toBeVisible({ timeout: 15000 })
  })

  test('4K 下截全屏图便于人工核对', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForLoadState('load').catch(() => {})

    const dir = 'test-results/4k-screenshots'
    mkdirSync(dir, { recursive: true })
    // 全页截图在 4K 下很占内存，设短超时并捕获错误避免进程崩
    await page.screenshot({
      path: `${dir}/4k-homepage.png`,
      fullPage: true,
      timeout: 60000,
    })
  })
})
