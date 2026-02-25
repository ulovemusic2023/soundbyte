// API URL resolution:
// 1. Build-time env (VITE_API_URL) — set by start.sh --rebuild
// 2. Runtime: check /api/config.json (served by backend via tunnel)
// 3. Fallback: same-origin /api (works if served behind tunnel/proxy)
// 4. Last resort: localhost
const FALLBACK_API = 'http://localhost:3000/api'

function resolveApiUrl(): string {
  // Build-time override
  const buildTime = import.meta.env.VITE_API_URL
  if (buildTime) return buildTime

  // If page is served from trycloudflare.com or custom domain with /api, use same origin
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    if (!origin.includes('github.io')) {
      return `${origin}/api`
    }
  }

  return FALLBACK_API
}

const API_URL = resolveApiUrl()

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
