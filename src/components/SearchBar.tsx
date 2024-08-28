import React from 'react'
import Spinner from '../assets/spinner.svg?react'
import { FaCircleInfo, FaMagnifyingGlass } from 'react-icons/fa6'

export type SearchBarProps = {
  onFetch: () => void
  loading: boolean
  error: string | null
  inputRef: React.RefObject<HTMLInputElement>
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onFetch,
  loading,
  error,
  inputRef
}) => {
  return (
    <>
      <div className="flex flex-col max-w-4xl gap-2 mx-auto mb-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 flex items-center pointer-events-none dark:text-slate-300 start-0 ps-3 sm:ps-4">
            <FaMagnifyingGlass className="w-3 h-3 sm:w-6 sm:h-6" />
          </div>
          <input
            type="text"
            id="simple-search"
            ref={inputRef}
            className="playlist-input bg-slate-50 border shadow-inner text-gray-900 text-xs sm:text-xl rounded-lg block w-full ps-8 sm:ps-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="https://www.youtube.com/playlist?list=⭐"
            required
          />
        </div>
        <button
          onClick={onFetch}
          disabled={loading}
          className="shine-effect p-2.5 text-xl flex items-center transform transition-transform hover:scale-105 justify-center shadow-md hover:shadow-lg font-bold text-white bg-gradient-to-r from-yt-red to-red-800 rounded-lg hover:bg-red-700 hover:border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 w-full sm:w-40 sm:mt-0 mt-2">
          {loading ? <Spinner className="w-7 h-7 animate-spin" /> : 'Search'}
        </button>
      </div>
      {error && (
        <div
          className="flex items-center max-w-4xl p-4 mx-auto mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert">
          <FaCircleInfo className="flex-shrink-0 w-6 h-6 me-4" />
          <div>
            <span className="font-bold">Uh-oh!</span> We couldn’t find the playlist. Make
            sure you’re using a <span className="font-bold">Valid URL or ID</span>, then
            give it another go.
          </div>
        </div>
      )}
    </>
  )
}
