export interface Entry {
  id: string
  radar: 'software-dev' | 'ai-infra' | 'music-tech'
  date: string
  cycle: 'morning' | 'afternoon' | 'evening'
  priority: 'paradigm-shift' | 'high' | 'medium' | 'low'
  title: string
  summary: string
  tags: string[]
  url: string
  price: string | null
  vram: string | null
  license: string | null
}

export interface IndexData {
  version: number
  updatedAt: string
  entries: Entry[]
}

export type RadarFilter = 'all' | 'software-dev' | 'ai-infra' | 'music-tech'
export type PriorityFilter = 'all' | 'paradigm-shift' | 'high' | 'medium'
export type TimeFilter = 'all' | 'today' | 'week' | 'month'
