import { useState } from 'react'
import type { PlaylistInfo, PlaylistItem } from '../interfaces'
import type { SortMethod } from '.'

export type CacheEntry = {
  info: PlaylistInfo
  items: PlaylistItem[]
  session: {
    sort: SortMethod
    isAscending: boolean
    items: PlaylistItem[]
  }
}

export const useCache = () => {
  const [cache, setCache] = useState<{
    [key: string]: CacheEntry
  }>(() => {
    const storedCache = localStorage.getItem('playlistCache')
    return storedCache ? JSON.parse(storedCache) : {}
  })

  const addCache = (id: string, info: PlaylistInfo, items: PlaylistItem[]) => {
    const newCache = {
      ...cache,
      [id]: {
        info,
        items,
        session: { sort: 'default' as SortMethod, isAscending: true, items }
      }
    }
    setCache(newCache)
    localStorage.setItem('playlistCache', JSON.stringify(newCache))
  }

  const updateCache = (
    id: string,
    sort: SortMethod,
    isAscending: boolean,
    items: PlaylistItem[]
  ) => {
    const newCache = {
      ...cache,
      [id]: {
        ...cache[id],
        session: {
          sort,
          isAscending,
          items
        }
      }
    }
    setCache(newCache)
    localStorage.setItem('playlistCache', JSON.stringify(newCache))
  }

  const deleteCache = (id: string) => {
    const updatedCache = { ...cache }
    delete updatedCache[id]
    setCache(updatedCache)
    localStorage.setItem('playlistCache', JSON.stringify(updatedCache))
  }

  return {
    cache,
    addCache,
    updateCache,
    deleteCache
  }
}
