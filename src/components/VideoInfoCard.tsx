import React from 'react'
import type { PlaylistItem } from '../interfaces'
import { ReadMoreToggle } from './ReadMoreToggle'

interface VideoInfoCardProps {
  video: PlaylistItem
}

export const VideoInfoCard: React.FC<VideoInfoCardProps> = ({ video }) => {
  const maxDescriptionLength = 150

  return (
    <div className="p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow-md dark:border-slate-700 dark:bg-gray-800">
      <h2 className="mb-2 text-2xl font-bold text-gray-700 dark:text-slate-300 overflow-wrap-anywhere">
        {video.snippet.title}
      </h2>
      <p className="mb-2 text-sm text-gray-600 dark:text-slate-300">
        <strong>Published on:</strong>{' '}
        {new Date(video.snippet.publishedAt).toLocaleDateString()}
      </p>
      {video.snippet.videoOwnerChannelTitle && (
        <p className="mb-2 text-sm text-gray-600 dark:text-slate-300">
          <strong>Video Owner:</strong> {video.snippet.videoOwnerChannelTitle}
        </p>
      )}
      {video.snippet.description && (
        <div className="mt-10 text-sm text-gray-700">
          <ReadMoreToggle
            key={video.id}
            description={video.snippet.description}
            maxDescriptionLength={maxDescriptionLength}
          />
        </div>
      )}
    </div>
  )
}
