import React, { MutableRefObject } from 'react'
import type { Player, PlaylistItem } from '../interfaces'
import { FaYoutube } from 'react-icons/fa6'
import { getThumbnailUrl } from '../utils'

export type VideoListProps = {
  playlistData: PlaylistItem[]
  currentIndex: number
  onVideoClick: (index: number) => void
  playerRef: MutableRefObject<Player | null>
}

export const VideoList: React.FC<VideoListProps> = ({
  playlistData,
  currentIndex,
  onVideoClick,
  playerRef
}) => {
  return (
    <div className="overflow-y-auto max-h-[80vh] custom-scrollbar rounded-lg shadow-md">
      <ul>
        {playlistData.map((item, index) => (
          <li
            key={index}
            className={`relative flex items-center p-4 border-b dark:bg-gray-800 border-gray-300 dark:border-slate-700 ${
              index === currentIndex
                ? 'bg-gray-200 dark:bg-slate-700'
                : 'bg-white dark:hover:bg-slate-900 hover:bg-gray-100'
            } transition-colors duration-200 cursor-pointer rounded-lg`}
            onClick={() => {
              onVideoClick(index)
              playerRef.current?.loadVideoById(item.snippet.resourceId.videoId)
            }}>
            <span className="flex-shrink-0 w-16 h-16 overflow-hidden bg-white border border-gray-300 rounded-lg">
              <img
                src={getThumbnailUrl(item.snippet.thumbnails)}
                alt={item.snippet.title}
                className="object-cover w-full h-full"
              />
            </span>
            <div className="flex-grow ml-4">
              <h3 className="overflow-hidden text-sm font-semibold text-gray-700 dark:text-slate-300 line-clamp-2">
                {item.snippet.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 line-clamp-1">
                {item.snippet.videoOwnerChannelTitle}
              </p>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute text-red-500 transition-colors duration-200 bottom-2 right-2 hover:text-red-600">
              <FaYoutube size={20} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
