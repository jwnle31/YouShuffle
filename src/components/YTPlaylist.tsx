import React, { useState, useRef } from 'react'
import type { PlaylistItem, PlaylistInfo } from '../interfaces'
import {
  PlaylistInfoCard,
  SavedPlaylists,
  SearchBar,
  SortControls,
  VideoInfoCard,
  VideoList
} from '.'
import { useCache, useSort, useToggle, useYTPlayer } from '../hooks'
import { extractPlaylistId, fetchPlaylistInfo, fetchAllPlaylistItems } from '../utils'

export const YTPlaylist: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const sortRef = useRef<HTMLSelectElement>(null)
  const [playlistId, setPlaylistId] = useState<string>('')
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | null>(null)
  const [playlistData, setPlaylistData] = useState<PlaylistItem[]>([])
  const { cache, updateCache, deleteCache } = useCache()
  const [loading, toggleLoading] = useToggle()
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const playerRef = useYTPlayer({
    playlistData,
    setCurrentIndex
  })
  const {
    sortMethod,
    setSortMethod,
    isAscending,
    setIsAscending,
    toggleSortOrder,
    handleSortChange,
    handleShuffle
  } = useSort(setPlaylistData, playerRef, currentIndex, cache, playlistId, sortRef)

  const handleFetch = async () => {
    const id = extractPlaylistId(inputRef.current?.value.trim() || '')
    if (id) {
      setPlaylistId(id)
      setPlaylistInfo(null)
      setPlaylistData([])
      toggleLoading()
      setError(null)

      const cachedData = cache[id]
      if (cachedData) {
        setSortMethod('original')
        setIsAscending(true)
        setPlaylistInfo(cachedData.info)
        setPlaylistData(cachedData.items)
        toggleLoading()
        return
      }
      handleUpdatePlaylist(id)
    }
  }

  const handleCachedPlaylistClick = (id: string) => {
    inputRef.current!.value = id
    handleFetch()
  }

  const handleUpdatePlaylist = async (id: string) => {
    setSortMethod('original')
    try {
      const [infoResponse, itemsResponse] = await Promise.all([
        fetchPlaylistInfo(id),
        fetchAllPlaylistItems(id)
      ])

      if (infoResponse.error || itemsResponse.error) {
        setError(infoResponse.error || itemsResponse.error || 'Unknown error')
      } else {
        if (infoResponse.data && itemsResponse.data) {
          updateCache(id, infoResponse.data, itemsResponse.data)
          setPlaylistInfo(infoResponse.data)
          setPlaylistData(itemsResponse.data)
        }
      }
    } catch (err) {
      console.error('Error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      toggleLoading()
    }
  }

  return (
    <>
      <div className="p-4 sm:p-10">
        <div className="flex justify-end">
          <a
            href="https://www.buymeacoffee.com/YouShuffle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1 font-semibold text-gray-800 transition-transform transform bg-yellow-400 rounded-full shadow-md shine-effect sm:px-4 sm:py-2 text-nowrap w-min hover:bg-yellow-300 hover:scale-105">
            <span className="mr-2">☕</span>
            <span className="inline text-xs sm:text-md">Buy me a coffee!</span>
          </a>
        </div>

        <p className="mt-8 mb-4 font-light text-center text-gray-700 md:text-2xl dark:text-slate-300">
          It’s easy! Just enter the <span className="font-black">Playlist URL</span>, and
          you’re all set.
        </p>
        <p className="mt-4 mb-12 font-light text-center text-gray-700 md:text-2xl dark:text-slate-300">
          You can <span className="font-black">Shuffle, Sort, and Play</span> your
          playlist with just a few clicks!
        </p>
        <SearchBar
          onFetch={handleFetch}
          loading={loading}
          error={error}
          inputRef={inputRef}
        />
        {Object.keys(cache).length > 0 && (
          <SavedPlaylists
            cache={cache}
            handleCachedPlaylistClick={handleCachedPlaylistClick}
            handleUpdatePlaylist={handleUpdatePlaylist}
            handleDeletePlaylist={deleteCache}
          />
        )}
      </div>
      {playlistInfo && (
        <div className="px-3 pt-8 pb-24 mx-3 bg-opacity-50 shadow-md rounded-t-3xl rounded-b-md dark:bg-slate-300 dark:bg-opacity-5 bg-gray-50">
          <h1 className="my-10 text-3xl font-extrabold text-center text-gray-700 dark:text-slate-300 sm:text-5xl">
            Now Playing
          </h1>

          <PlaylistInfoCard playlistInfo={playlistInfo} playlistId={playlistId} />
          {playlistData.length > 0 && (
            <div className="flex flex-col gap-3 md:flex-row">
              {/* Video Player */}
              <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5">
                <div className="relative w-full pb-[56.25%] bg-transparent rounded-lg shadow-md overflow-hidden">
                  <div
                    id="youtube-player"
                    className="absolute top-0 left-0 w-full h-full"></div>
                </div>
                {/* Currently Playing Video Info */}
                {playlistData[currentIndex] && (
                  <VideoInfoCard video={playlistData[currentIndex]} />
                )}
              </div>
              {/* Dropdown and Video List */}
              <div className="flex-grow w-full rounded-lg md:w-1/3 lg:w-1/4 xl:w-1/5">
                <SortControls
                  sortMethod={sortMethod}
                  isAscending={isAscending}
                  onSortChange={handleSortChange}
                  onShuffle={handleShuffle}
                  onToggleSortOrder={toggleSortOrder}
                  sortRef={sortRef}
                />
                <VideoList
                  playlistData={playlistData}
                  currentIndex={currentIndex}
                  onVideoClick={setCurrentIndex}
                  playerRef={playerRef}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
