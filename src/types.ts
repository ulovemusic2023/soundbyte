export interface Entry {
  id: string
  radar: 'software-dev' | 'ai-infra' | 'music-tech' | 'founder-mind'
  date: string
  cycle: 'morning' | 'afternoon' | 'evening' | 'tuesday' | string
  priority: 'paradigm-shift' | 'high' | 'medium' | 'low' | 'mental-model'
  title: string
  summary: string
  tags: string[]
  url: string | null
  source: string | null
  sourceUrl: string | null
  price: string | null
  vram: string | null
  license: string | null
}

export type RadarFilter = 'all' | 'software-dev' | 'ai-infra' | 'music-tech' | 'founder-mind'
export type PriorityFilter = 'all' | 'paradigm-shift' | 'high' | 'medium' | 'mental-model'
export type TimeFilter = 'all' | 'today' | 'week' | 'month'
export type SortOption = 'date' | 'priority' | 'relevance'
