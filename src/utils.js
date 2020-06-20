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
  tracks.map((artists, duration_ms, explicit, id, name, popularity, preview_url, uri, audioFeatures) => ({
    artists: getCleanedArtists(artists),
    duration_ms,
    explicit,
    id,
    name,
    popularity,
    preview_url,
    uri,
    audioFeatures: getCleanedAudioFeatures(audioFeatures),
  }))

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
  playlistTracks.map(({ track = {} }) => {
    const { name, id, uri } = track
    return {
      name,
      id,
      uri,
    }
  })
export const getCleanedPlaylistObject = ({ items, next, total }) => ({
  items: getCleanedPlaylistTracks(items),
  next,
  total,
})
