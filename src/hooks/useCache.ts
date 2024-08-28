import { useState } from 'react'
import type { PlaylistInfo, PlaylistItem } from '../interfaces'

export type CacheEntry = {
  info: PlaylistInfo
  items: PlaylistItem[]
}

export const useCache = () => {
  const [cache, setCache] = useState<{
    [key: string]: CacheEntry
  }>(() => {
    const storedCache = localStorage.getItem('playlistCache')
    return storedCache ? JSON.parse(storedCache) : {}
  })

  const updateCache = (id: string, info: PlaylistInfo, items: PlaylistItem[]) => {
    const updatedCache = {
      ...cache,
      [id]: { info, items }
    }
    setCache(updatedCache)
    localStorage.setItem('playlistCache', JSON.stringify(updatedCache))
  }

  const deleteCache = (id: string) => {
    const updatedCache = { ...cache }
    delete updatedCache[id]
    setCache(updatedCache)
    localStorage.setItem('playlistCache', JSON.stringify(updatedCache))
  }

  return {
    cache,
    updateCache,
    deleteCache
  }
}
