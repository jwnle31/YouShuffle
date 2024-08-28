import { useState, useRef, useEffect, MutableRefObject } from 'react'
import type { Player, PlaylistItem } from '../interfaces'

export type UseYTPlayerParams = {
  playlistData: PlaylistItem[]
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

export type UseYTPlayerReturn = MutableRefObject<Player | null>

export const useYTPlayer = ({
  playlistData,
  setCurrentIndex
}: UseYTPlayerParams): UseYTPlayerReturn => {
  const [playerReady, setPlayerReady] = useState<boolean>(false)
  const playerRef = useRef<Player | null>(null)

  const handleVideoChange = (event: { data: number }) => {
    if (
      event.data === window.YT.PlayerState.ENDED ||
      event.data === window.YT.PlayerState.ERROR
    ) {
      setCurrentIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % playlistData.length
        playerRef.current?.loadVideoById(
          playlistData[newIndex].snippet.resourceId.videoId
        )
        return newIndex
      })
    }
  }

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setPlayerReady(true)
      return
    }

    window.onYouTubeIframeAPIReady = () => {
      setPlayerReady(true)
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (playerReady && playlistData.length > 0) {
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: playlistData[0].snippet.resourceId.videoId,
        events: {
          onReady: () => {
            setCurrentIndex(0)
            playerRef.current?.playVideo()
          },
          onStateChange: handleVideoChange,
          onError: handleVideoChange
        },
        playerVars: {
          origin: window.location.origin,
          modestbranding: 1, // Minimize YouTube branding
          rel: 0 // Disable related videos at the end
        }
      })
    }
  }, [playlistData, playerReady])

  return playerRef
}
