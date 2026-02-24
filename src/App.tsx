import { useState, useMemo, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Fuse from 'fuse.js'
import type {
  RadarFilter,
  PriorityFilter,
  TimeFilter,
  SortOption,
} from './types'
import { useTheme } from './hooks/useTheme'
import { useI18n } from './hooks/useI18n'
import { useAllTags } from './hooks/useAllTags'
import { useCollections } from './hooks/useCollections'
import { useApi } from './hooks/useApi'
import Header, { type NavPage } from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar, { type ViewMode } from './components/FilterBar'
import ResultsGrid from './components/ResultsGrid'
import TimelineView from './components/TimelineView'
import TrendsDashboard from './components/TrendsDashboard'
import CollectionManager from './components/CollectionManager'
import StatsFooter from './components/StatsFooter'
import DonationSection from './components/DonationSection'
import Footer from './components/Footer'

const priorityOrder: Record<string, number> = {
  'paradigm-shift': 0,
  high: 1,
  'mental-model': 2,
  medium: 3,
  low: 4,
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useI18n()
  const {
    collections,
    createCollection,
    renameCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
  } = useCollections()

  const { entries, loading, apiOnline } = useApi()
  const [query, setQuery] = useState('')
  const [radarFilter, setRadarFilter] = useState<RadarFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')
  const [sortOption, setSortOption] = useState<SortOption>('date')
  const [currentPage, setCurrentPage] = useState<NavPage>('insights')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const allTags = useAllTags(entries)

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

  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag)
    setSortOption('relevance')
    setCurrentPage('insights')
  }, [])

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
            Loading insights...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative transition-colors duration-300"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* API offline banner */}
      {apiOnline === false && (
        <div
          className="text-center text-xs py-2 font-mono"
          style={{ background: 'var(--priority-paradigm)', color: '#fff' }}
        >
          ⚡ Backend offline — showing cached static data
        </div>
      )}

      <Header
        entryCount={entries.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        t={t}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              resultCount={filteredAndSorted.length}
              totalCount={entries.length}
              allTags={allTags}
              onTagClick={handleTagClick}
              t={t}
            />
            <FilterBar
              radarFilter={radarFilter}
              priorityFilter={priorityFilter}
              timeFilter={timeFilter}
              sortOption={sortOption}
              hasQuery={query.trim().length > 0}
              viewMode={viewMode}
              onRadarChange={setRadarFilter}
              onPriorityChange={setPriorityFilter}
              onTimeChange={setTimeFilter}
              onSortChange={setSortOption}
              onViewModeChange={setViewMode}
              t={t}
            />

            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ResultsGrid
                    entries={filteredAndSorted}
                    onTagClick={handleTagClick}
                    t={t}
                    collections={collections}
                    onAddToCollection={addToCollection}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TimelineView
                    entries={filteredAndSorted}
                    onTagClick={handleTagClick}
                    t={t}
                    collections={collections}
                    onAddToCollection={addToCollection}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <StatsFooter entries={entries} t={t} />
            <DonationSection t={t} />
          </motion.div>
        )}

        {currentPage === 'trends' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <TrendsDashboard
              entries={entries}
              onTagClick={handleTagClick}
              t={t}
            />
            <DonationSection t={t} />
          </motion.div>
        )}

        {currentPage === 'collections' && (
          <motion.div
            key="collections"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <CollectionManager
              entries={entries}
              collections={collections}
              onCreateCollection={createCollection}
              onRenameCollection={renameCollection}
              onDeleteCollection={deleteCollection}
              onRemoveFromCollection={removeFromCollection}
              onTagClick={handleTagClick}
              t={t}
            />
            <DonationSection t={t} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer t={t} />
    </div>
  )
}

export default App
