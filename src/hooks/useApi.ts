import { useState, useEffect, useCallback, useRef } from 'react'
import { healthCheck, fetchEntries, type ApiEntry } from '../api/client'
import type { Entry, IndexData } from '../types'

function getBaseUrl() {
  return import.meta.env.BASE_URL
}

// Map API entry → frontend Entry format
function apiToEntry(e: ApiEntry): Entry {
  return {
    id: e.id,
    radar: e.radar as Entry['radar'],
    date: e.date,
    cycle: e.cycle as Entry['cycle'],
    priority: e.priority as Entry['priority'],
    title: e.title,
    summary: e.summary,
    tags: e.tags,
    url: e.url,
    source: e.source,
    sourceUrl: e.sourceUrl,
    price: e.price,
    vram: e.vram,
    license: e.license,
  }
}

// Load all entries from API (paginated)
async function loadAllFromApi(): Promise<Entry[]> {
  const all: Entry[] = []
  let page = 1
  const limit = 200

  while (true) {
    const res = await fetchEntries({ page, limit, sort: 'date', order: 'desc' })
    all.push(...res.entries.map(apiToEntry))
    if (page >= res.totalPages) break
    page++
  }

  return all
}

// Fallback: load from static index.json
async function loadFromStatic(): Promise<Entry[]> {
  const res = await fetch(`${getBaseUrl()}index.json`)
  if (!res.ok) throw new Error(`Static fetch failed: ${res.status}`)
  const data: IndexData = await res.json()
  return data.entries
}

export function useApi() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [apiOnline, setApiOnline] = useState<boolean | null>(null)
  const checkedRef = useRef(false)

  const load = useCallback(async () => {
    if (checkedRef.current) return
    checkedRef.current = true
    setLoading(true)

    // Try API first
    const online = await healthCheck()
    setApiOnline(online)

    try {
      if (online) {
        console.log('[useApi] Loading from backend API')
        const entries = await loadAllFromApi()
        setEntries(entries)
      } else {
        console.log('[useApi] API offline, falling back to static index.json')
        const entries = await loadFromStatic()
        setEntries(entries)
      }
    } catch (err) {
      console.error('[useApi] Load failed, trying fallback:', err)
      try {
        const entries = await loadFromStatic()
        setEntries(entries)
        setApiOnline(false)
      } catch (err2) {
        console.error('[useApi] All sources failed:', err2)
      }
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { entries, loading, apiOnline }
}
