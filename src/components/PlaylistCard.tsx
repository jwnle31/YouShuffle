import React from 'react'
import type { PlaylistInfo } from '../interfaces'
import Logo from '../assets/logo.svg?react'
import { FaArrowsRotate, FaTrashCan } from 'react-icons/fa6'
import { getThumbnailUrl } from '../utils'

export type PlaylistCardProps = {
  id: string
  info: PlaylistInfo
  onCachedPlaylistClick: (id: string) => void
  onUpdatePlaylist: (id: string) => void
  onDeletePlaylist: (id: string) => void
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  info,
  onCachedPlaylistClick,
  onUpdatePlaylist,
  onDeletePlaylist
}) => {
  return (
    <div className="relative flex flex-col flex-shrink-0 w-48 p-3 transition-transform transform bg-white border rounded shadow-md dark:border-slate-700 dark:bg-gray-800 hover:scale-105 hover:shadow-lg hover:border-yt-red">
      {/* Thumbnail */}
      <button
        onClick={() => onCachedPlaylistClick(id)}
        className="relative w-full h-24 mb-2 overflow-hidden transition-transform transform bg-gray-200 rounded hover:scale-105">
        {info.thumbnails?.default?.url ? (
          <img
            src={getThumbnailUrl(info.thumbnails)}
            alt={info.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded">
            No Thumbnail
          </div>
        )}
      </button>
      {/* Title Button */}
      <button
        onClick={() => onCachedPlaylistClick(id)}
        className="block w-full mb-2 overflow-hidden font-semibold transition-colors dark:text-slate-300 text-slate-700 text-ellipsis whitespace-nowrap hover:text-red-500"
        title={info.title} // Native tooltip
      >
        {info.title}
      </button>
      {/* Spacer to push buttons to the bottom */}
      <div className="flex-grow"></div>
      {/* Action Buttons */}
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onUpdatePlaylist(id)}
          className="p-1 text-green-600 transition-colors bg-transparent border-none hover:text-green-800"
          aria-label="Update playlist">
          <FaArrowsRotate className="text-md" />
        </button>
        <button
          onClick={() => onCachedPlaylistClick(id)}
          className="p-1 transition-colors bg-transparent border-none text-yt-red hover:text-red-600"
          aria-label="Cached playlist">
          <Logo className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeletePlaylist(id)}
          className="p-1 transition-colors bg-transparent border-none text-slate-500 hover:text-slate-700"
          aria-label="Delete playlist">
          <FaTrashCan className="text-md" />
        </button>
      </div>
    </div>
  )
}
