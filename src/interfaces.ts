declare global {
  interface Window {
    YT: YT
    onYouTubeIframeAPIReady?: () => void
  }
}

export interface YT {
  Player: {
    new (elementId: string, options: PlayerOptions): Player
  }
  PlayerState: {
    UNSTARTED: number
    ENDED: number
    PLAYING: number
    PAUSED: number
    BUFFERING: number
    CUED: number
    ERROR: number // Add the ERROR state
  }
}

export interface PlayerOptions {
  height?: string
  width?: string
  videoId?: string
  playerVars?: { [key: string]: string | number }
  events?: { [key: string]: (event: PlayerEvent) => void } // Use PlayerEvent instead of Event
}

export interface Player {
  playVideo(): void
  pauseVideo(): void
  stopVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  setVolume(volume: number): void
  getVolume(): number
  getVideoUrl(): string
  getPlayerState(): number
  destroy(): void
  loadVideoById(videoId: string): void
}

export interface PlayerEvent {
  data: number
}

export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: {
    [key: string]: Thumbnail
  }
  channelTitle: string
  videoOwnerChannelTitle: string
  videoOwnerChannelId: string
  playlistId: string
  position: number
  resourceId: {
    kind: string
    videoId: string
  }
}

export interface ContentDetails {
  videoId: string
  startAt?: string
  endAt?: string
  note?: string
  videoPublishedAt: string
}

export interface Status {
  privacyStatus: string
}

export interface PlaylistItem {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  contentDetails: ContentDetails
  status: Status
}

export interface PlaylistResponse {
  items: PlaylistItem[]
  nextPageToken?: string
}

export interface PlaylistInfo {
  title: string
  description: string
  channelTitle: string
  publishedAt: string
  itemCount: number
  thumbnails: {
    [key: string]: Thumbnail
  }
}

export interface FetchResponse<T> {
  data?: T
  error?: string
}
