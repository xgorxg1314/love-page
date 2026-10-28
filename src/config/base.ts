/**
 * 部署路径前缀工具
 *
 * GitHub Pages 的项目站点部署在 https://<用户>.github.io/<仓库名>/，
 * 也就是 astro.config.mjs 里的 `base`。仓库里的静态资源（图片、音乐）
 * 必须带上这个前缀才不会 404。
 *
 * 构建时由 Vite 注入 BASE_URL；Node 单元测试环境下 import.meta.env 不存在，
 * 自动回退成 '/'，所以测试里也不会炸。
 */

export function getBasePath(): string {
  let raw = '/';
  try {
    // @ts-ignore Vite 注入的构建期变量，Node 环境下没有
    const injected = import.meta.env?.BASE_URL;
    if (typeof injected === 'string' && injected) raw = injected;
  } catch {
    raw = '/';
  }
  return raw.endsWith('/') ? raw : `${raw}/`;
}

/** 给站内相对路径补上 base 前缀；完整网址 / 协议相对地址 / data: 原样返回 */
export function withBaseUrl(path: string): string {
  const value = (path ?? '').trim();
  if (!value) return value;
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(value)) return value;
  if (/^(?:data|blob|mailto|tel):/i.test(value)) return value;
  return `${getBasePath()}${value.replace(/^\/+/, '')}`;
}
