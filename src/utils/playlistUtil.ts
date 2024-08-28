import type { PlaylistInfo } from '../interfaces'

export const getThumbnailUrl = (thumbnails: PlaylistInfo['thumbnails']) => {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url
  )
}
