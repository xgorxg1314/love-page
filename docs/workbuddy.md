# 用 WorkBuddy AI 改这个网站的流程

> 适用：本机已装 WorkBuddy AI（`D:\Apps\WorkBuddyAI`），项目在 `F:\BaiduSyncdisk\xgorxg1001\love-page`。

核心思路：**你只描述「想改成什么」，让 WorkBuddy 去改 `content/personal.ts` 这一个文件，然后把改动推上去。**
项目已经把所有个人资料集中到一个文件里，就是为了让 AI 不会改错地方。

---

## 第 0 步：先做一次准备（做过就跳过）

1. 删掉旧的 GitHub Secret，否则 AI 改什么都白改：
   仓库 → **Settings** → **Secrets and variables** → **Actions** → 删除 `LOVE_CONFIG_JSON`。
2. 在 WorkBuddy 里把项目文件夹加入工作区 / 允许访问 `F:\BaiduSyncdisk\xgorxg1001\love-page`。
3. 确认 WorkBuddy 有**读写文件**和**执行命令**的权限（没有的话看下面「方案 B」）。

---

## 方案 A：WorkBuddy 能直接改文件、能跑命令（推荐）

把下面整段复制进对话框，末尾写上你这次要改什么：

```text
你是我的网站维护助手。项目是一个 Astro 静态站，本地路径：
F:\BaiduSyncdisk\xgorxg1001\love-page

【规则，必须遵守】
1. 只允许修改 content/personal.ts 和 content/book.ts。如果我要求调配色，才允许改
   src/styles/handbook.css 顶部的配色变量。
2. 严禁修改 astro.config.mjs（里面的 base: '/love-page/' 是全站样式能否加载的关键）、
   .github/workflows/deploy.yml、src/config/ 下的其他文件、以及 .git 目录。
3. 改完必须先构建：npm run build。构建报错就把报错原文发给我，不要执行推送。
   （如果提示找不到 node/npm，说明本机没装 Node，直接跳过构建并告诉我。）
4. 构建通过后执行：
     cd /d F:\BaiduSyncdisk\xgorxg1001\love-page
     git add content/personal.ts
     git commit -m "chore: 更新资料"
     git push
   本机 git 直连 GitHub 不通，仓库里已经配好代理 127.0.0.1:7897，直接 push 即可。
5. 不要执行 git reset、git push -f、git checkout -- .、删除 .git 等破坏性命令。
6. 改完把「改了哪几行、原值 → 新值」列给我确认。

【当前资料文件】
请先读 content/personal.ts 再动手，不要凭空猜测字段名。

【我这次要改的】
（在这里用大白话写，例如：把 girl 改成「小橘」，并在 milestones 里加一条
 2025-12-24「第一次见面」，icon 用 ☕）
```

---

## 方案 B：WorkBuddy 只能聊天，不能读写文件

那就让它**输出整个文件**，你自己粘贴：

```text
项目是一个 Astro 静态站，资料都在一个 TypeScript 文件里。
请根据我的要求，输出修改后的【完整】文件内容：
- 必须完整输出，不能省略任何行，不能用「...」或「此处同上」占位
- 保持原有中文注释和缩进
- 保持字段名不变，只改我要改的值

下面是当前文件全文：
<<< 把 content/personal.ts 全文粘贴在这里 >>>

我要改的：
（在这里写需求）
```

拿到输出后：

1. VSCode 打开 `F:\BaiduSyncdisk\xgorxg1001\love-page\content\personal.ts`
2. 全选（Ctrl+A）→ 粘贴 → 保存（Ctrl+S）
3. 终端执行：

```powershell
cd /d F:\BaiduSyncdisk\xgorxg1001\love-page
git add content/personal.ts
git commit -m "chore: 更新资料"
git push
```

---

## 每次改完的验收清单（3 步，1 分钟）

1. **看构建**：<https://github.com/xgorxg1314/love-page/actions> 出现绿色 ✓（约 1～3 分钟）。
   红色 ✗ 表示代码有语法错误，线上仍是旧版本，看日志报错行号改回来即可。
2. **开网页并 Ctrl + F5**：<https://xgorxg1314.github.io/love-page/>
3. **手机上再看一眼**：手机浏览器缓存更顽固，用无痕/隐私模式打开最稳。

---

## 排错对照表

| 现象 | 原因 | 怎么修 |
| --- | --- | --- |
| 网页变成纯文字、样式全丢 | `astro.config.mjs` 里的 `base` 被改了/删了 | 确认有 `base: '/love-page/'`，改回来重新推 |
| AI 说改好了，线上内容没变 | GitHub Secret `LOVE_CONFIG_JSON` 还在，覆盖了仓库内容 | 按「第 0 步」删掉它 |
| `git push` 卡住 / 让输密码 | 凭据过期（GitHub token 失效） | 在自己的终端里手动 `git push` 一次，按提示登录 |
| push 报 `Connection was reset` | 没走代理 | 确认在仓库目录执行；或手动加 `-c http.proxy=http://127.0.0.1:7897` |
| Actions 报错 `Expected ","` 之类 | `personal.ts` 少了逗号 / 引号没配对 | 按报错行号补上；引号一律用英文单引号 |
| 打开还是旧样子 | 浏览器缓存 | Ctrl + F5，或手机用无痕窗口 |
| 保存文件/提交时报 Win32 错误 | 百度同步盘正在占用这个目录 | 暂停百度网盘同步再操作；长期建议把仓库移出 `BaiduSyncdisk` |

---

## 两条长期建议

1. **别让 AI 碰 `astro.config.mjs`**。那个文件里 `site` / `base` 两行决定全站资源路径，
   一改整个网站的 CSS/JS 会全部 404（就是你最初遇到的那个问题）。
2. **这个仓库放在百度同步盘里，风险不小**：同步客户端会临时占用 `.git` 里的文件，导致
   `git commit` 偶发失败。如果方便，把它移到 `F:\Projects\love-page` 这类本地目录，
   再在百度网盘里只同步 `dist` 或备份包。
