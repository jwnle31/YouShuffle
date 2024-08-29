import { useState } from 'react'
import type { Player, PlaylistItem } from '../interfaces'
import type { CacheEntry } from '.'

export type SortMethod = 'default' | 'random' | 'title' | 'publishDate' | 'owner'

export const useSort = (
  setPlaylistData: React.Dispatch<React.SetStateAction<PlaylistItem[]>>,
  playerRef: React.RefObject<Player>,
  currentIndex: number,
  cache: { [key: string]: CacheEntry },
  updateCache: (
    id: string,
    sort: SortMethod,
    isAscending: boolean,
    items: PlaylistItem[]
  ) => void,
  playlistId: string,
  sortRef: React.RefObject<HTMLSelectElement>
) => {
  const [sortMethod, setSortMethod] = useState<SortMethod>('default')
  const [isAscending, setIsAscending] = useState(true)

  const sortPlaylistData = (method: SortMethod, ascending: boolean): PlaylistItem[] => {
    let sortedItems = [...cache[playlistId].items]
    switch (method) {
      case 'random':
        sortedItems = sortedItems.sort(() => Math.random() - 0.5)
        break
      case 'title':
        sortedItems = sortedItems.sort((a, b) => {
          const titleA = a.snippet.title.trim().toLowerCase()
          const titleB = b.snippet.title.trim().toLowerCase()
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0
        })
        break
      case 'publishDate':
        sortedItems = sortedItems.sort(
          (a, b) =>
            new Date(a.snippet.publishedAt).getTime() -
            new Date(b.snippet.publishedAt).getTime()
        )
        break
      case 'owner':
        sortedItems = sortedItems.sort((a, b) => {
          const ownerA = a.snippet.videoOwnerChannelTitle.trim().toLowerCase() || ''
          const ownerB = b.snippet.videoOwnerChannelTitle.trim().toLowerCase() || ''
          return ownerA < ownerB ? -1 : ownerA > ownerB ? 1 : 0
        })
        break
      case 'default':
      default:
    }
    sortedItems = ascending ? sortedItems : sortedItems.reverse()
    updateCache(playlistId, method, ascending, sortedItems)
    return sortedItems
  }

  const toggleSortOrder = () => {
    const newAscending = !isAscending
    setIsAscending(newAscending)
    const orderedData = sortPlaylistData(sortMethod, newAscending)
    setPlaylistData(orderedData)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortMethod = event.target.value as
      | 'default'
      | 'random'
      | 'title'
      | 'publishDate'
      | 'owner'

    const sortedData = sortPlaylistData(newSortMethod, isAscending)
    setSortMethod(newSortMethod)
    setPlaylistData(sortedData)

    if (playerRef.current && sortedData.length > 0) {
      playerRef.current.loadVideoById(sortedData[currentIndex].snippet.resourceId.videoId)
    }
  }

  const handleShuffle = () => {
    const shuffledData = sortPlaylistData('random', isAscending)
    setSortMethod('random')
    setPlaylistData(shuffledData)
    if (sortRef.current) {
      sortRef.current.value = 'random' // Set the dropdown value to 'Random'
    }
  }

  return {
    sortMethod,
    setSortMethod,
    isAscending,
    setIsAscending,
    sortPlaylistData,
    toggleSortOrder,
    handleSortChange,
    handleShuffle
  }
}
