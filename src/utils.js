export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const getOwnedPlaylists = (playlists, userId) => playlists.filter(({ owner }) => owner.id === userId)

// getCleanedTracks
const getCleanedAudioFeatures = ({
  acousticness,
  danceability,
  energy,
  instrumentalness,
  key,
  liveness,
  loudness,
  mode,
  speechiness,
  tempo,
  time_signature,
  valence,
}) => ({
  acousticness,
  danceability,
  energy,
  instrumentalness,
  key,
  liveness,
  loudness,
  mode,
  speechiness,
  tempo,
  time_signature,
  valence,
})
const getCleanedArtists = (artists) =>
  artists.map(({ name }) => ({
    name,
  }))
export const getCleanedTracks = (tracks) =>
  tracks.map((track) => {
    // console.log({ track })
    const { artists, duration_ms, explicit, id, name, popularity, preview_url, uri, audioFeatures, ...rest } = track
    return {
      artists: getCleanedArtists(artists),
      duration_ms,
      explicit,
      id,
      name,
      popularity,
      preview_url,
      uri,
      audioFeatures: getCleanedAudioFeatures(audioFeatures),
    }
  })

// getCleanPlaylistsObject
const getCleanedPlaylists = (rawPlaylists) =>
  rawPlaylists.map(({ id, name, owner }) => ({
    id,
    name,
    owner: { id: owner?.id },
    // tracks: { total: tracks?.total },
  }))
export const getCleanPlaylistsObject = ({ total, next, items }) => ({
  total,
  next,
  items: getCleanedPlaylists(items),
})

// getCleanedPlaylistObject
const getCleanedPlaylistTracks = (playlistTracks) =>
  playlistTracks.map(({ name, id, uri }) => ({
    name,
    id,
    uri,
  }))
export const getCleanedPlaylistObject = ({ items, next, total }) => ({
  items,
  next,
  total,
})
