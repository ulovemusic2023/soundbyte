import { useState, useCallback, useEffect } from 'react'

export interface Collection {
  id: string
  name: string
  entryIds: string[]
}

interface CollectionsData {
  collections: Collection[]
}

const STORAGE_KEY = 'soundbyte-collections'

function loadCollections(): Collection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data: CollectionsData = JSON.parse(raw)
    return data.collections ?? []
  } catch {
    return []
  }
}

function saveCollections(collections: Collection[]) {
  const data: CollectionsData = { collections }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function generateId(): string {
  return `col-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>(loadCollections)

  // Persist on every change
  useEffect(() => {
    saveCollections(collections)
  }, [collections])

  const createCollection = useCallback((name: string) => {
    const newCol: Collection = {
      id: generateId(),
      name: name.trim(),
      entryIds: [],
    }
    setCollections((prev) => [...prev, newCol])
    return newCol.id
  }, [])

  const renameCollection = useCallback((id: string, newName: string) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: newName.trim() } : c))
    )
  }, [])

  const deleteCollection = useCallback((id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const addToCollection = useCallback((collectionId: string, entryId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id !== collectionId) return c
        if (c.entryIds.includes(entryId)) return c
        return { ...c, entryIds: [...c.entryIds, entryId] }
      })
    )
  }, [])

  const removeFromCollection = useCallback((collectionId: string, entryId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id !== collectionId) return c
        return { ...c, entryIds: c.entryIds.filter((id) => id !== entryId) }
      })
    )
  }, [])

  const isInCollection = useCallback(
    (collectionId: string, entryId: string) => {
      const col = collections.find((c) => c.id === collectionId)
      return col ? col.entryIds.includes(entryId) : false
    },
    [collections]
  )

  return {
    collections,
    createCollection,
    renameCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    isInCollection,
  } as const
}
