import React from 'react'
import { Foldable } from '.'
import type { PlaylistInfo, PlaylistItem } from '../interfaces'
import { PlaylistCard } from '.'

export type SavedPlaylistsProps = {
  cache: { [key: string]: { info: PlaylistInfo; items: PlaylistItem[] } }
  handleCachedPlaylistClick: (id: string) => void
  handleUpdatePlaylist: (id: string) => void
  handleDeletePlaylist: (id: string) => void
}

export const SavedPlaylists: React.FC<SavedPlaylistsProps> = ({
  cache,
  handleCachedPlaylistClick,
  handleUpdatePlaylist,
  handleDeletePlaylist
}) => {
  return (
    <div className="mt-10">
      <Foldable title="Saved Playlists" className="mb-10">
        <div className="flex p-4 pb-5 mb-2 space-x-4 overflow-x-auto custom-scrollbar">
          {Object.keys(cache).map(id => (
            <PlaylistCard
              key={id}
              id={id}
              info={cache[id].info}
              onCachedPlaylistClick={handleCachedPlaylistClick}
              onUpdatePlaylist={handleUpdatePlaylist}
              onDeletePlaylist={handleDeletePlaylist}
            />
          ))}
        </div>
      </Foldable>
    </div>
  )
}
