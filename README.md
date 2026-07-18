# 灵兽迷踪 GitHub Pages 上线包

这是可直接作为 GitHub Pages 发布源的静态网页包。所有图片已经放在 `assets/`，并改为 ASCII 文件名，避免中文路径在 GitHub Pages 和 CDN 链接中出现编码不一致。

## 上线方法

1. 打开游戏所在 GitHub 仓库，删除或替换旧的网页文件。
2. 将本目录内的 `index.html`、`app.js`、`styles.css`、`.nojekyll` 和整个 `assets/` 目录上传到仓库根目录。不要上传本目录本身作为额外嵌套文件夹。
3. 在仓库 `Settings` -> `Pages` 中选择 `Deploy from a branch`，选择 `main` 分支和 `/(root)` 目录，保存。
4. 等待部署完成后，使用 Pages 提示的链接访问。首次部署通常需要几分钟。

`404.html` 可选；它仅用于访问不存在的链接时仍显示游戏主页。

## 发布前检查

- 确认浏览器开发者工具的 Network 面板中没有 404 图片请求。
- 使用无痕窗口或强制刷新，避免旧 CSS 和图片缓存。
- GitHub Pages 只能发布公开静态文件，不能在此包中保存密钥、账号或服务端逻辑。
