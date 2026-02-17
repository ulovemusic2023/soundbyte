export const zhTW = {
  // Header
  tagline: 'Tech intelligence, distilled.',
  insights: 'insights',
  radars: '3 radars',
  updatedDaily: 'updated daily',

  // Navigation
  navInsights: 'Insights',
  navTrends: 'Trends',
  navCollections: 'Collections',

  // Search
  searchPlaceholder: "搜尋 insights... (e.g. 'multi-agent', 'plugin', 'Rust')",
  noResults: '沒有找到相關資料',
  noResultsHint: '試試調整搜尋條件或篩選器',

  // Filter bar
  radar: 'Radar',
  all: '所有',
  musicTech: '🎵 音樂科技',
  aiInfra: '🤖 AI 基礎建設',
  softwareDev: '💻 軟體開發',
  priority: '優先級',
  paradigmShift: '🔴 Paradigm Shift',
  high: '🟡 High',
  medium: '🟢 Medium',
  time: '時間',
  allTime: '全部',
  today: '本日',
  thisWeek: '本週',
  thisMonth: '本月',
  newest: '最新',
  prioritySort: '優先度',
  relevance: '相關性',

  // View toggle
  gridView: '⊞ Grid',
  timelineView: '📈 Timeline',

  // Trends
  trendsTitle: '📊 趨勢儀表板',
  keywordFrequency: '關鍵字頻率 — Top 20',
  weeklyItemCount: '每日項目數 — 過去 14 天',
  hotTagsRanking: '🔥 熱門標籤排名',
  items: '項',
  rank: '#',
  tag: '標籤',
  count: '次數',

  // Collections
  collectionsTitle: '📁 收藏集',
  createCollection: '＋ 建立收藏集',
  newCollectionName: '收藏集名稱',
  create: '建立',
  cancel: '取消',
  rename: '重新命名',
  delete: '刪除',
  removeFromCollection: '移除',
  emptyCollection: '這個收藏集是空的',
  emptyCollectionHint: '到 Insights 頁面把感興趣的條目加到這裡',
  noCollections: '還沒有收藏集',
  noCollectionsHint: '建立一個收藏集來整理你的 insights',
  addToCollection: '加入收藏集',
  backToCollections: '← 返回收藏集',
  confirmDelete: '確定要刪除',
  confirmDeleteSuffix: '嗎？',
  itemCount: '項',

  // Share
  share: '分享',
  shareToX: '分享到 X',
  shareToThreads: '分享到 Threads',
  shareToFacebook: '分享到 Facebook',
  copyLink: '複製連結',
  copiedToClipboard: '已複製到剪貼簿！',
  copiedForThreads: '已複製到剪貼簿！可貼到 Threads',

  // Stats footer
  insightLandscape: '📊 Insight Landscape',
  topTags: 'Top Tags',
  radarDistribution: 'Radar Distribution',

  // Donation
  supportTitle: '☕ 支持 SoundByte',
  supportDesc: 'SoundByte 完全免費。您的支持讓 radar 持續運作。',
  kofi: '🌏 Ko-fi (International)',
  ecpay: '🇹🇼 綠界 ECPay (台灣)',

  // Footer
  builtBy: 'Built by',
  poweredBy: 'Powered by AI',
  dataRefreshed: 'Data refreshed 6× daily from 30+ sources',

  // Language toggle
  langToggle: '中/EN',
} as const

export type TranslationKeys = keyof typeof zhTW
