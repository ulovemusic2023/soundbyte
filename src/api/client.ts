const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export interface ApiEntryResponse {
  ok: boolean
  entries: ApiEntry[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiEntry {
  id: string
  radar: string
  date: string
  cycle: string
  priority: string
  title: string
  summary: string
  tags: string[]
  source: string
  sourceUrl: string
  url: string | null
  vram: string | null
  license: string | null
  price: string | null
  author: string | null
}

export interface ApiStatsResponse {
  ok: boolean
  totalEntries: number
  radars: Record<string, number>
  priorities: Record<string, number>
  dateRange: { from: string | null; to: string | null }
  totalDates: number
  topTags: { tag: string; count: number }[]
}

interface FetchEntriesParams {
  radar?: string
  date?: string
  dateFrom?: string
  dateTo?: string
  priority?: string
  tags?: string
  q?: string
  sort?: 'date' | 'priority'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

function buildQuery(params: FetchEntriesParams): string {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '' && v !== 'all') {
      sp.set(k, String(v))
    }
  }
  return sp.toString()
}

export async function fetchEntries(params: FetchEntriesParams): Promise<ApiEntryResponse> {
  const qs = buildQuery(params)
  const res = await fetch(`${API_URL}/entries${qs ? '?' + qs : ''}`)
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export async function fetchStats(): Promise<ApiStatsResponse> {
  const res = await fetch(`${API_URL}/stats`)
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(3000) })
    return res.ok
  } catch {
    return false
  }
}
