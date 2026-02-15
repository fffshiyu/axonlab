# E2E 测试（含 4K 视口）

## 4K 适配验证

用 Playwright 在 **3840×2160** 视口下跑测试，方便核对 4K 屏上的显示是否正确。

- 当前站内 4K 断点为 `@media (min-width: 2560px)`，在 4K 视口下会生效。
- 若实际 4K (3840px) 下仍有问题，可在各组件中增加 `@media (min-width: 3840px)` 做进一步放大。

### 使用方式

1. 安装依赖（若尚未安装）：
   ```bash
   npm install
   npx playwright install chromium
   ```

2. **有头模式（推荐用于 4K 适配）**：开浏览器窗口，直接看 4K 效果：
   ```bash
   npm run test:4k:headed
   ```

3. 无头模式（跑用例 + 截 4K 图）：
   ```bash
   npm run test:4k
   ```
   截图会生成在 `test-results/4k-screenshots/4k-homepage.png`，可用来人工核对布局。
