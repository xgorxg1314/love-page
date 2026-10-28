# 这里放的是「我俩」的全部资料

## 只需要改一个文件

**`content/personal.ts`** —— 名字、日期、故事、情话、愿望、照片、文案都在里面，每一段都有中文注释。

其他文件（`src/` 里那些）是程序逻辑，不用碰。

---

## 改之前记住 3 条

1. **只改单引号 `' '` 里面的字**，引号本身别删。
2. **日期写成 `'年-月-日'`**，例如 `'2025-10-01'`，别写 `2025/10/1`。
3. **每行结尾的逗号 `,` 别删**。

> 改错了也不会把网站搞坏：GitHub 构建失败时线上仍是上一个版本，改回来重新推一次就行。

---

## 改完怎么上线（3 条命令）

打开终端（PowerShell 或 CMD），逐行执行：

```powershell
cd /d F:\BaiduSyncdisk\xgorxg1001\love-page
git add content/personal.ts
git commit -m "更新资料"
git push
```

- 仓库里已经配好了本机代理（`127.0.0.1:7897`），直接 `git push` 就行，不用加参数。
- 推送成功后，GitHub Actions 会自动构建部署，**等 1～3 分钟**。
- 看进度：<https://github.com/xgorxg1314/love-page/actions>
- 打开网页后按 **Ctrl + F5** 强制刷新（不然看到的是缓存）。

---

## ⚠️ 必须做一次的事：删掉旧的 GitHub Secret

以前你的名字是存在仓库 Secret 里的（`LOVE_CONFIG_JSON`），它会**覆盖**仓库里的任何内容。
现在资料已经搬到 `content/personal.ts`，那个 Secret 必须删掉，否则你在 VSCode 里改什么都不生效。

路径：仓库页面 → **Settings** → 左侧 **Secrets and variables** → **Actions**
→ 找到 `LOVE_CONFIG_JSON` → 点 **Delete**。

删完之后，`content/personal.ts` 就是唯一的数据来源。

---

## 字段对照表

| 想改什么 | 改这个字段 | 效果 |
| --- | --- | --- |
| 两个人的名字 | `boy` / `girl` | 首页大标题「小歌 ♥ 小橘」 |
| 在一起的日子 | `LOVE_DATE`（文件顶部常量） | 相恋时光计时器、相恋纪念日倒计时、页脚年份 |
| 结婚日期 | `MARRIAGE_DATE` | 留空 `''` = 隐藏婚姻相关内容 |
| 时间线故事 | `milestones` | 「我们的故事」每一张卡片 |
| 计时器 | `timers` | 「时光印记」实时跳秒的条目 |
| 纪念日 | `anniversaries` | 「纪念日」倒计时卡片 |
| 首页情话 | `quotes` | 每次刷新随机显示一条 |
| 数字卡片 | `stats` | 「我们的数字」里自己填的几项 |
| 愿望清单 | `wishes` | 打勾 = `done: true` |
| 照片墙 | `photos` | 点右下角相机图标看到 |
| 背景音乐 | `music` | 现在是关闭状态，注释里有开启例子 |
| 浏览器标题 / 分享文案 | `siteName` / `seoDescription` | 标签页标题、微信分享卡片 |
| 加载提示 / 彩蛋悄悄话 | `loadingLabel` / `secretMessage` | 开场动画、彩蛋 |
| 默认深浅色 | `defaultTheme` | `'light'` 弥散渐变 / `'dark'` 星空 / `'auto'` 跟随系统 |

---

## 加照片和音乐

1. 把图片放进 `public/photos/`，音乐放进 `public/music/`。
2. 引用路径写 **`'/photos/文件名.jpg'`**、**`'/music/文件名.mp3'`** 就行
   （程序会自动补上 `/love-page/` 这个前缀，**不要自己写 `/love-page/`**，否则会变成两层）。
3. 也可以直接填网上的完整地址：`'https://...'`。

---

## 想调整配色

颜色不在这个文件夹，在 **`src/styles/base.css` 开头的「★ 配色区」**，四个变量：

```css
--rose: #e95d8a;   /* 玫瑰粉：主色 */
--peri: #837cda;   /* 长春花紫：辅助色 */
--sky:  #a3d5f4;   /* 天蓝：背景光斑 */
--paper:#e9f3f8;   /* 冷白：兜底底色 */
```

---

## 想在本地预览（可选）

需要先装 [Node.js](https://nodejs.org/)，然后：

```powershell
cd /d F:\BaiduSyncdisk\xgorxg1001\love-page
npm install
npm run dev
```

浏览器打开 <http://localhost:4321/love-page/>，改文件保存后页面自动刷新。

---

## 想隐藏某个板块

去 `src/config/defaults.ts`，最下面 `sections` 里把对应的 `true` 改成 `false`
（`todaySummary` 今日摘要、`stats` 数字、`timeline` 故事、`timers` 计时器、
`anniversary` 纪念日、`wishes` 愿望、`photoWall` 照片墙、`themeToggle` 主题按钮）。
