/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  ★★★  这是「书」的目录 —— 每一页放什么，由你在这里决定  ★★★  ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * 改法：
 *   · 想换顺序：把整段 { ... } 上下移动就行。
 *   · 想改标题：改 title / kicker。
 *   · 想加一页自己写的字：复制一个 note 页（文件末尾有样例）。
 *   · 想删一页：把那一整段（含结尾逗号）删掉。
 *
 * kind 是这页的「内容类型」，只能填下面这些（填错构建会报错，正好提醒你）：
 *   cover       封面（只有第一页该用）
 *   today       今日摘要：下一次重要日子还有几天
 *   stats       我们的数字
 *   timers      时光印记：实时跳秒的计时器
 *   story       我们的故事：里程碑
 *   anniversary 纪念日倒计时
 *   wishes      愿望清单
 *   gallery     相册（点开是照片墙）
 *   note        空白页：写你自己的话（paragraphs 里一行一段）
 *   colophon    版权页（建议放最后）
 *
 * 资料本身（名字、日期、愿望、照片）还在 content/personal.ts，别改错文件。
 */

export type PageKind =
  | 'cover'
  | 'today'
  | 'stats'
  | 'timers'
  | 'story'
  | 'anniversary'
  | 'wishes'
  | 'gallery'
  | 'note'
  | 'colophon';

export interface BookPageDef {
  kind: PageKind;
  /** 页眉那行小字（章节提示），可留空 */
  kicker?: string;
  /** 页面大标题 */
  title?: string;
  /** note 页的正文，一行一段 */
  paragraphs?: string[];
  /** 右上角贴纸，随便填一个 emoji，比如 '🌸'、'🎀' */
  sticker?: string;
  /** 左上角胶带：'left' | 'right' | 'both' | 'none' */
  tape?: 'left' | 'right' | 'both' | 'none';
}

export interface BookDef {
  /** 书脊上的书名（也让浏览器标题用） */
  title: string;
  /** 封面副标题，留空就不显示 */
  subtitle?: string;
  /** 封面底部那行小提示 */
  hint?: string;
  pages: BookPageDef[];
}

export const BOOK: BookDef = {
  title: '我们的纪念册',
  subtitle: '从青丝到白发，从心动到心安',
  hint: '轻触翻开相册',

  pages: [
    {
      kind: 'cover',
      sticker: '💗',
    },

    {
      kind: 'today',
      kicker: '第一章',
      title: '今日摘要',
      tape: 'left',
    },

    {
      kind: 'stats',
      kicker: '第二章',
      title: '我们的数字',
      tape: 'right',
    },

    {
      kind: 'timers',
      kicker: '第三章',
      title: '时光印记',
    },

    {
      kind: 'story',
      kicker: '第四章',
      title: '我们的故事',
      sticker: '🍃',
      tape: 'left',
    },

    {
      kind: 'anniversary',
      kicker: '第五章',
      title: '纪念日',
      sticker: '🎀',
    },

    {
      kind: 'wishes',
      kicker: '第六章',
      title: '愿望清单',
      tape: 'right',
    },

    {
      kind: 'gallery',
      kicker: '第七章',
      title: '相册',
      sticker: '📷',
    },

    {
      kind: 'note',
      kicker: '第八章',
      title: '写给你们',
      sticker: '✏️',
      // 这一页是你自己的留白，改 paragraphs 里的句子即可
      paragraphs: [
        '愿有岁月可回首，且以深情共白头。',
        '这里可以写任何想说的话：一次旅行的回忆、一句道歉、一个只属于你们的暗号。',
        '每一段都是页面上独立的一段，想加几段都可以。',
      ],
    },

    {
      kind: 'colophon',
    },

    // ── 想再加一页？复制下面这段，把开头的 // 删掉就行 ──
    // {
    //   kind: 'note',
    //   kicker: '第九章',
    //   title: '写给你',
    //   sticker: '🌙',
    //   paragraphs: ['今天想说的是……'],
    // },
  ],
};
