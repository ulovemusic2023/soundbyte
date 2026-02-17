import { useState, useEffect, useMemo, useCallback } from 'react'
import Fuse from 'fuse.js'
import type {
  Entry,
  IndexData,
  RadarFilter,
  PriorityFilter,
  TimeFilter,
  SortOption,
} from './types'
import { useTheme } from './hooks/useTheme'
import { useAllTags } from './hooks/useAllTags'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import ResultsGrid from './components/ResultsGrid'
import StatsFooter from './components/StatsFooter'
import DonationSection from './components/DonationSection'
import Footer from './components/Footer'

function getBaseUrl() {
  return import.meta.env.BASE_URL
}

const priorityOrder: Record<string, number> = {
  'paradigm-shift': 0,
  high: 1,
  medium: 2,
  low: 3,
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [radarFilter, setRadarFilter] = useState<RadarFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')
  const [sortOption, setSortOption] = useState<SortOption>('date')

  const allTags = useAllTags(entries)

  useEffect(() => {
    fetch(`${getBaseUrl()}index.json`)
      .then((res) => res.json())
      .then((data: IndexData) => {
        setEntries(data.entries)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load index.json:', err)
        setLoading(false)
      })
  }, [])

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'summary', weight: 0.3 },
          { name: 'tags', weight: 0.3 },
        ],
        threshold: 0.4,
        includeScore: true,
        ignoreLocation: true,
      }),
    [entries]
  )

  // Search results with scores for relevance sorting
  const searchResultsWithScores = useMemo(() => {
    if (!query.trim()) return entries.map((item) => ({ item, score: 1 }))
    return fuse.search(query).map((r) => ({ item: r.item, score: r.score ?? 1 }))
  }, [query, entries, fuse])

  const filteredAndSorted = useMemo(() => {
    let results = searchResultsWithScores

    if (radarFilter !== 'all') {
      results = results.filter((r) => r.item.radar === radarFilter)
    }

    if (priorityFilter !== 'all') {
      results = results.filter((r) => r.item.priority === priorityFilter)
    }

    if (timeFilter !== 'all') {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      results = results.filter((r) => {
        const entryDate = new Date(r.item.date)
        switch (timeFilter) {
          case 'today':
            return entryDate >= today
          case 'week': {
            const weekAgo = new Date(today)
            weekAgo.setDate(weekAgo.getDate() - 7)
            return entryDate >= weekAgo
          }
          case 'month': {
            const monthAgo = new Date(today)
            monthAgo.setMonth(monthAgo.getMonth() - 1)
            return entryDate >= monthAgo
          }
          default:
            return true
        }
      })
    }

    // Sort
    const effectiveSort =
      sortOption === 'relevance' && !query.trim() ? 'date' : sortOption

    if (effectiveSort === 'date') {
      results.sort(
        (a, b) => new Date(b.item.date).getTime() - new Date(a.item.date).getTime()
      )
    } else if (effectiveSort === 'priority') {
      results.sort(
        (a, b) =>
          (priorityOrder[a.item.priority] ?? 99) -
          (priorityOrder[b.item.priority] ?? 99)
      )
    } else if (effectiveSort === 'relevance') {
      results.sort((a, b) => a.score - b.score)
    }

    return results.map((r) => r.item)
  }, [searchResultsWithScores, radarFilter, priorityFilter, timeFilter, sortOption, query])

  // Tag click-to-filter: set as search query
  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag)
    setSortOption('relevance')
  }, [])

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="text-center">
          <div
            className="inline-block w-8 h-8 rounded-full animate-spin mb-4"
            style={{
              border: '2px solid var(--border)',
              borderTopColor: 'var(--accent)',
            }}
          />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Loading insights...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative transition-colors duration-300"
      style={{ background: 'var(--bg-primary)' }}
    >
      <Header
        entryCount={entries.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        resultCount={filteredAndSorted.length}
        totalCount={entries.length}
        allTags={allTags}
        onTagClick={handleTagClick}
      />
      <FilterBar
        radarFilter={radarFilter}
        priorityFilter={priorityFilter}
        timeFilter={timeFilter}
        sortOption={sortOption}
        hasQuery={query.trim().length > 0}
        onRadarChange={setRadarFilter}
        onPriorityChange={setPriorityFilter}
        onTimeChange={setTimeFilter}
        onSortChange={setSortOption}
      />
      <ResultsGrid
        entries={filteredAndSorted}
        onTagClick={handleTagClick}
      />
      <StatsFooter entries={entries} />
      <DonationSection />
      <Footer />
    </div>
  )
}

export default App
