export const extractPlaylistId = (urlOrId: string): string | null => {
  const playlistIdPattern = /[?&]list=([^&]+)/
  const match = urlOrId.match(playlistIdPattern)
  return match ? match[1] : urlOrId
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`
  }
  return text
}
