import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright 配置 - 含 4K 视口项目，用于验证 4K 屏幕适配
 * 运行: npm run test:4k        (无头模式，可截图)
 * 运行: npm run test:4k:headed (有头模式，直接看浏览器 4K 效果)
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 90 * 1000,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'off',
    actionTimeout: 30 * 1000,
    navigationTimeout: 45 * 1000,
  },
  projects: [
    // 4K 视口 (3840x2160)：用于验证 @media (min-width: 2560px) 及更高分辨率下的样式
    {
      name: '4k',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 3840, height: 2160 },
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
