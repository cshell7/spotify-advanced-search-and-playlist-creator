export const SCOPE = 'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private' // https://developer.spotify.com/documentation/general/guides/scopes
export const HEADER_HEIGHT = 64
export const FOOTER_HEIGHT = 24

export const createdByLink = 'https://www.linkedin.com/in/calvinshell/'
export const gitHubLink = 'https://github.com/cshell7/spotify-advanced-search-and-playlist-creator'
export const feedbackLink = 'https://forms.gle/15NVFsHshuJxV2u9A'

export const colors = {
  spotifyGreen: '#1DB954',
  spotifyBlack: '#191414',
  white: '#FFFFFF',
  blue: '#4C819E',
  red: '#DA494A',
  gray: '#707070',
}

export const breakpoints = {
  sm: 600,
  lg: 900,
}

export const pitches = {
  0: 'C',
  1: 'C♯/D♭',
  2: 'D',
  3: 'D♯/E♭',
  4: 'E',
  5: 'F',
  6: 'F♯/G♭',
  7: 'G',
  8: 'G♯/A♭',
  9: 'A',
  10: 'A♯/B♭',
  11: 'B',
}

export const audioFeaturesDescriptions = {
  tempo: {
    label: 'Tempo',
    description:
      'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
  },
  popularity: {
    label: 'Popularity',
    description:
      'The popularity of the track. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time.',
  },
  valence: {
    label: 'Valence',
    description:
      'A measure describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
  },
  danceability: {
    label: 'Danceability',
    description:
      'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.',
  },
  energy: {
    label: 'Energy',
    description:
      'Energy is a measure that represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',
  },
  acousticness: {
    label: 'Acousticness',
    description: 'A confidence measure whether the track is acoustic.',
  },
  instrumental: {
    label: 'Instrumental',
    description:
      'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.',
  },
  liveness: {
    label: 'Liveness',
    description:
      'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.',
  },
  speechiness: {
    label: 'Speechiness',
    description:
      'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.',
  },
  key: {
    label: 'Key',
    description: 'The key the track is in.',
  },
  loudness: {
    label: 'Loudness',
    description:
      'The overall loudness of a track in decibels dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.',
  },
  mode: {
    label: 'Mode',
    description:
      'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived.',
  },
  time_signature: {
    label: 'Meter',
    description:
      'An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).',
  },
}
