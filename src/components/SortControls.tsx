import React from 'react'
import { FaRandom, FaSortAlphaDown, FaSortAlphaUp, FaList } from 'react-icons/fa'

interface SortControlsProps {
  sortMethod: 'original' | 'random' | 'title' | 'publishDate' | 'owner'
  isAscending: boolean
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onShuffle: () => void
  onToggleSortOrder: () => void
  sortRef: React.RefObject<HTMLSelectElement>
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortMethod,
  isAscending,
  onSortChange,
  onShuffle,
  onToggleSortOrder,
  sortRef
}) => {
  return (
    <div className="flex gap-2 mb-4">
      <div className="flex items-center px-2 bg-white border border-gray-300 rounded-lg shadow-sm dark:border-slate-700 dark:bg-gray-800">
        <FaList className="text-gray-600 dark:text-slate-300" />
        <select
          ref={sortRef}
          value={sortMethod}
          onChange={onSortChange}
          className="w-full p-2 text-gray-700 bg-transparent border-none dark:focus:bg-gray-800 dark:text-slate-300 dark:focus:border-slate-700">
          <option value="original">Default</option>
          <option value="random">Random</option>
          <option value="title">Title</option>
          <option value="publishDate">Publish Date</option>
          <option value="owner">Owner</option>
        </select>
      </div>
      <button
        onClick={onShuffle}
        title="Shuffle"
        className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-lg shadow-lg dark:border dark:border-slate-700 dark:bg-gray-800 text-yt-red hover:shadow-md hover:text-red-600">
        <FaRandom />
      </button>
      <button
        onClick={onToggleSortOrder}
        title={isAscending ? 'Ascending' : 'Descending'}
        className={`flex items-center justify-center dark:border dark:border-slate-700 dark:bg-gray-800 w-10 h-10 p-2 rounded-lg hover:shadow-md shadow-lg transition-colors ${
          sortMethod === 'random'
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-yt-red hover:text-red-600 dark:border dark:border-slate-700 dark:bg-gray-800'
        }`}
        disabled={sortMethod === 'random'}>
        {isAscending ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
      </button>
    </div>
  )
}
