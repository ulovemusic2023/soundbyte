import { useState, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'
import type { Entry, IndexData, RadarFilter, PriorityFilter, TimeFilter } from './types'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import ResultsGrid from './components/ResultsGrid'
import StatsFooter from './components/StatsFooter'
import DonationSection from './components/DonationSection'
import Footer from './components/Footer'

function getBaseUrl() {
  // In dev, base is '/', in production it's '/soundbyte/'
  return import.meta.env.BASE_URL
}

function App() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [radarFilter, setRadarFilter] = useState<RadarFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')

  // Fetch data at runtime
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

  // Fuse.js instance
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

  // Apply search
  const searchResults = useMemo(() => {
    if (!query.trim()) return entries
    return fuse.search(query).map((r) => r.item)
  }, [query, entries, fuse])

  // Apply filters
  const filteredEntries = useMemo(() => {
    let results = searchResults

    // Radar filter
    if (radarFilter !== 'all') {
      results = results.filter((e) => e.radar === radarFilter)
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      results = results.filter((e) => e.priority === priorityFilter)
    }

    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      results = results.filter((e) => {
        const entryDate = new Date(e.date)
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

    return results
  }, [searchResults, radarFilter, priorityFilter, timeFilter])

  if (loading) {
    return (
      <div className="grain min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin mb-4" />
          <p className="font-mono text-sm text-text-secondary">Loading radar data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grain min-h-screen relative">
      {/* Ambient background glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(6,182,212,0.04) 0%, rgba(6,182,212,0.01) 40%, transparent 70%)',
        }}
      />

      <Header entryCount={entries.length} />
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        resultCount={filteredEntries.length}
        totalCount={entries.length}
      />
      <FilterBar
        radarFilter={radarFilter}
        priorityFilter={priorityFilter}
        timeFilter={timeFilter}
        onRadarChange={setRadarFilter}
        onPriorityChange={setPriorityFilter}
        onTimeChange={setTimeFilter}
      />
      <ResultsGrid entries={filteredEntries} />
      <StatsFooter entries={entries} />
      <DonationSection />
      <Footer />
    </div>
  )
}

export default App
