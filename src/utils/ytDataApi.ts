import axios, { AxiosResponse } from 'axios'
import type {
  PlaylistItem,
  PlaylistResponse,
  PlaylistInfo,
  FetchResponse
} from '../interfaces'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export const fetchPlaylistInfo = async (
  id: string
): Promise<FetchResponse<PlaylistInfo>> => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlists`, {
      params: {
        part: 'snippet,contentDetails,player',
        id: id,
        key: API_KEY
      }
    })
    const playlist = response.data.items[0]
    const newPlaylistInfo: PlaylistInfo = {
      title: playlist.snippet.title,
      description: playlist.snippet.description,
      channelTitle: playlist.snippet.channelTitle,
      publishedAt: playlist.snippet.publishedAt,
      itemCount: playlist.contentDetails.itemCount,
      thumbnails: playlist.snippet.thumbnails
    }
    return { data: newPlaylistInfo }
  } catch (err) {
    console.error('Error fetching playlist info:', err)
    return {
      error:
        'Failed to fetch playlist information. Please check the playlist ID and try again.'
    }
  }
}

export const fetchAllPlaylistItems = async (
  id: string
): Promise<FetchResponse<PlaylistItem[]>> => {
  let allItems: PlaylistItem[] = []
  let pageToken: string | undefined = undefined

  try {
    do {
      const response: AxiosResponse<PlaylistResponse> = await axios.get<PlaylistResponse>(
        `https://www.googleapis.com/youtube/v3/playlistItems`,
        {
          params: {
            part: 'snippet,contentDetails,status',
            playlistId: id,
            maxResults: 50,
            pageToken: pageToken,
            key: API_KEY
          }
        }
      )

      const filteredItems = response.data.items.filter(item => {
        // Exclude videos where the title is 'Deleted video' or 'Private video'
        return (
          item.status.privacyStatus !== 'private' &&
          item.status.privacyStatus !== 'privacyStatusUnspecified'
        )
      })

      allItems = allItems.concat(filteredItems)
      pageToken = response.data.nextPageToken
    } while (pageToken)
    return { data: allItems }
  } catch (err) {
    console.error('Error fetching playlist items:', err)
    return {
      error: 'Failed to fetch playlist items. Please check the playlist ID and try again.'
    }
  }
}
