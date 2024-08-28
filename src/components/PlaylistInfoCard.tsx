import React from 'react'
import { Foldable, ReadMoreToggle } from '.'
import type { PlaylistInfo } from '../interfaces'
import { FaYoutube } from 'react-icons/fa6'
import { getThumbnailUrl } from '../utils'

export type PlaylistInfoCardProps = {
  playlistInfo: PlaylistInfo
  playlistId: string | null
}

export const PlaylistInfoCard: React.FC<PlaylistInfoCardProps> = ({
  playlistInfo,
  playlistId
}) => {
  const maxDescriptionLength = 150

  return (
    <Foldable title="Playlist Info" className="mb-12 sm:px-4">
      <div className="max-w-3xl p-4 mx-auto my-5 transform bg-white border rounded-lg shadow-lg cursor-default dark:bg-gray-800 dark:border-slate-700">
        <div className="flex flex-col items-start md:flex-row">
          <img
            src={getThumbnailUrl(playlistInfo.thumbnails)}
            alt={playlistInfo.title}
            className="object-cover w-full h-48 rounded-lg md:w-48 md:h-48 md:mr-6"
          />
          <div className="w-full mt-4 md:mt-0">
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-slate-300 md:text-2xl overflow-wrap-anywhere">
              {playlistInfo.title}
            </h2>

            {playlistInfo.description.length > 0 && (
              <ReadMoreToggle
                description={playlistInfo.description}
                maxDescriptionLength={maxDescriptionLength}
              />
            )}

            <p className="mb-1 text-gray-700 break-normal dark:text-slate-300">
              <strong>Channel:</strong> {playlistInfo.channelTitle}
            </p>
            <p className="mb-1 text-gray-700 break-normal dark:text-slate-300">
              <strong>Published At:</strong>{' '}
              {new Date(playlistInfo.publishedAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 break-normal dark:text-slate-300">
              <strong>Video Count:</strong> {playlistInfo.itemCount}
            </p>

            <a
              href={`https://www.youtube.com/playlist?list=${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute p-2 bg-transparent bottom-2 right-2">
              <FaYoutube className="text-xl text-yt-red hover:text-red-600" />
            </a>
          </div>
        </div>
      </div>
    </Foldable>
  )
}
