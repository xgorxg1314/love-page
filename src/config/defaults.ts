import type { Config } from './types';
import { PERSONAL } from '../../content/personal';

/**
 * 系统级默认值：与「我俩是谁」无关的部分（资源路径、功能开关、隐私设置）。
 *
 * 名字、日期、故事、愿望、照片、音乐等个人内容
 * 全部搬到了 content/personal.ts —— 要改东西去那里，不要改这个文件。
 */
const BASE_CONFIG: Omit<Config, keyof typeof PERSONAL> = {
  googleAnalyticsId: '',
  siteLocale: 'zh-CN',
  siteImage: '/og.png',
  siteLogo: '/favicon.svg',
  shareTemplates: ['classic', 'minimal', 'romantic'],
  statsMode: 'hybrid',
  anniversaryCountdownThreshold: 10,
  anniversarySortOrder: 'asc',
  sections: {
    todaySummary: true,
    stats: true,
    timeline: true,
    timers: true,
    anniversary: true,
    wishes: true,
    photoWall: true,
    themeToggle: true,
  },
  privacy: {
    privateMode: true,
    noIndex: true,
  },
  enableWelcomeMessage: true,
  passwordConfig: {
    enabled: false,
    password: '',
    bruteForceProtection: {
      enabled: true,
      freeAttempts: 5,
      baseLockSeconds: 3,
      maxLockSeconds: 120,
      failureResetMinutes: 30,
    },
  },
};

export const DEFAULT_CONFIG: Config = {
  ...BASE_CONFIG,
  ...PERSONAL,
};
