import { useMemo } from 'react'
import type { Entry } from '../types'

export function useAllTags(entries: Entry[]) {
  return useMemo(() => {
    const tagCount: Record<string, number> = {}
    entries.forEach((e) => {
      e.tags.forEach((t) => {
        tagCount[t] = (tagCount[t] || 0) + 1
      })
    })
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }))
  }, [entries])
}
