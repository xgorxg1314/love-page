/**
 * Love Page — Locale Definitions
 *
 * 说明：
 * - LOCALE_CODES: 标准 locale 标识符
 * - LOCALE_SLUGS: URL 路径段（小写）
 * - DEFAULT_LOCALE: 默认语言
 */
import { withBaseUrl } from '../config/base';

export const LOCALE_CODES = ['zh-CN', 'en-US'] as const;
export type LocaleCode = (typeof LOCALE_CODES)[number];

export const LOCALE_SLUGS: Record<LocaleCode, string> = {
  'zh-CN': 'zh-cn',
  'en-US': 'en-us',
};

export const LOCALE_NAMES: Record<LocaleCode, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English',
};

export const DEFAULT_LOCALE: LocaleCode = 'zh-CN';

export function isValidLocale(locale: string | undefined): locale is LocaleCode {
  return LOCALE_CODES.includes(locale as LocaleCode);
}

export function parseLocaleFromSlug(slug: string): LocaleCode | null {
  for (const [code, s] of Object.entries(LOCALE_SLUGS)) {
    if (s === slug) return code as LocaleCode;
  }
  return null;
}

export function getLocaleSlug(code: LocaleCode): string {
  return LOCALE_SLUGS[code];
}

export function getLocalePath(code: LocaleCode): string {
  // 带上部署前缀（/love-page/），否则 hreflang 会指向不存在的根路径
  return withBaseUrl(code === DEFAULT_LOCALE ? '/' : `/${getLocaleSlug(code)}/`);
}
