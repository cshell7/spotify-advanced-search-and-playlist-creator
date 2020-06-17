import React, { useState, useRef, useEffect } from 'react'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'
import styled from 'styled-components'
import cookies from 'js-cookie'
import { objectToQueryParamString } from '@c-shell/utils-url-query-params'

import { InfoPanel, InfoPanelButton } from './info-panel'
import { SearchResults } from './search-results'
import { Card } from './card'
import { Button } from './button'
import { Select } from './select'
import { colors, pitches } from '../consts'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const StyledInfoPannelButton = styled(InfoPanelButton)`
  position: fixed;
  top: 12px;
  right: 12px;
`

const StyledCard = styled(Card)`
  position: relative;
  width: 800px;
  max-width: calc(100vw - 32px);
  margin-top: 24px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 64px - 64px);
`

const Tabs = styled.div`
  width: 100%;
  display: flex;
`

const Tab = styled.div`
  flex: 1 1 auto;
  text-align: center;
  border-bottom: 1px solid ${({ isActive }) => (isActive ? colors.spotifyGreen : colors.gray)};
  font-weight: ${({ isActive }) => (isActive ? 400 : 100)};
  padding: 16px 8px 2px;
  cursor: pointer;
`

const InputContainer = styled.div`
  display: flex;
`

const Label = styled.label``

const Input = styled.input`
  padding: 8px;
  border: 1px solid ${colors.gray};

  &:active,
  &:focus {
    border: 1px solid ${colors.spotifyGreen};
    outline: none;
  }
`

const StyledSelect = styled(Select)`
  &&& {
    margin-left: 16px;
  }
`

const SearchContainer = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 64px - 64px - 40px);
`

const SearchByName = styled.div`
  display: grid;
  grid-gap: 24px;
  padding: 24px;
  justify-content: center;

  ${Input}, ${Button} {
    width: 220px;
  }
`

const ResultsContainer = styled.div`
  width: 100%;
`

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  padding: 0 16px;
  background-color: ${colors.spotifyBlack};
  border-bottom: 1px solid ${colors.gray};

  ${Button} {
    padding: 4px 8px;
    font-size: 12px;
    margin-left: auto;
    height: 22px;
  }
`

const NoResultsMessage = styled.p``

const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-weight: 900;
  font-size: 20px;
  cursor: pointer;
`

export const AdvancedSearchView = () => {
  const { fetchData } = useSpotityAPI()
  const audioObj = useRef(new Audio())

  const [isLoading, setIsLoading] = useState(false)

  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem('results') || '{}'))

  const [user, setUser] = useState()
  const [userError, setUserError] = useState()
  useEffect(() => {
    if (!user && !userError) {
      fetchData('me')
        .then((user) => setUser(user))
        .catch((error) => setUserError(error))
    }
  }, [user, userError])

  const [playlists, setPlaylists] = useState()
  const [playlistsError, setPlaylistsError] = useState()
  useEffect(() => {
    if (!playlists && !playlistsError) {
      fetchData('me/playlists')
        .then((playlists) => setPlaylists(playlists))
        .catch((error) => setPlaylistsError(error))
    }
  }, [playlists, playlistsError])

  const [genres, setGenres] = useState()
  const [genresError, setGenresError] = useState()
  useEffect(() => {
    if (!genres && !genresError) {
      fetchData('recommendations/available-genre-seeds')
        .then(({ genres }) => setGenres(genres))
        .catch((error) => setGenresError(error))
    }
  }, [genres, genresError])

  const [ownedPlaylists, setOwnedPlaylists] = useState([])
  useEffect(() => {
    if (user && playlists) {
      const filteredPlaylists = playlists.items.filter(({ owner }) => owner.id === user.id)
      setOwnedPlaylists(filteredPlaylists)
    }
  }, [user, playlists])

  const handleSearchByName = () => {
    setIsLoading(true)
    fetchData(`search?q=${encodeURIComponent(searchInputValue)}&type=track&limit=20`)
      .then(({ tracks }) => {
        const songIds = tracks.items.map(({ id }) => id)
        fetchData(`audio-features?ids=${songIds}`).then(({ audio_features: audioFeatures }) => {
          const results = {
            ...tracks,
            items: [
              ...tracks.items.map((item, i) => ({
                ...item,
                audioFeatures: audioFeatures[i],
              })),
            ],
          }
          setSearchResults(results)
          localStorage.setItem('results', JSON.stringify(results))
        })
      })
      .finally(() => setIsLoading(false))
  }

  const [genreSeeds, setGenreSeeds] = useState([])
  const handleSelectGenre = (newGenra) => {
    if (genreSeeds.find((seed) => seed === newGenra)) setGenreSeeds(genreSeeds.filter((seed) => seed !== newGenra))
    else if (genreSeeds.length < 3) setGenreSeeds([...genreSeeds, newGenra])
  }

  const inputsWithZeroOneRange = [
    'acousticness',
    'danceability',
    'energy',
    'instrumentalness',
    'liveness',
    'speechiness',
    'valence',
  ]
  const [advancedSearchInput, setAvancedSearchInput] = useState({})
  console.log({ advancedSearchInput, genreSeeds })
  const handleSearchByParams = () => {
    const {
      acousticness,
      danceability,
      energy,
      instrumentalness,
      key,
      mode,
      liveness,
      popularity,
      speechiness,
      tempo,
      timeSignature,
      valence,
    } = advancedSearchInput
    setIsLoading(true)
    const params = {
      ...(!!genreSeeds?.length && { seed_genres: genreSeeds.join(',') }),
      ...(!!acousticness && { target_acousticness: acousticness }),
      ...(!!danceability && { target_danceability: danceability }),
      ...(!!energy && { target_energy: energy }),
      ...(!!instrumentalness && { target_instrumentalness: instrumentalness }),
      ...(!!liveness && { target_liveness: liveness }),
      ...(!!speechiness && { target_speechiness: speechiness }),
      ...(!!valence && { target_valence: valence }),
      ...(!!popularity && { target_popularity: popularity }),
      ...(!!timeSignature && { target_time_signature: timeSignature }),
      ...(!!tempo && { target_tempo: tempo }),
      ...(!!mode && { target_mode: mode }),
      ...(!!key && { target_key: key }),
      limit: 20,
      market: 'US',
    }
    fetchData(`recommendations${objectToQueryParamString(params)}`)
      .then((data) => {
        const tracks = data?.tracks?.items || data?.tracks || []
        const songIds = tracks.map(({ id }) => id)
        fetchData(`audio-features?ids=${songIds}`).then(({ audio_features: audioFeatures }) => {
          const results = {
            ...data,
            items: [
              ...tracks.map((item, i) => ({
                ...item,
                audioFeatures: audioFeatures[i],
              })),
            ],
          }
          setSearchResults(results)
          localStorage.setItem('results', JSON.stringify(results))
        })
      })
      .finally(() => setIsLoading(false))
  }

  const [currentFilter, setCurrentFilter] = useState()

  const handleSortSongs = (filter) => {
    let filteredSongs = searchResults?.items || []
    if (filter === currentFilter) {
      filteredSongs = filteredSongs.reverse()
    } else {
      filteredSongs = filteredSongs.sort((song, prevSong) => {
        let songFilter = song[filter] || song.audioFeatures[filter]
        let prevSongFilter = prevSong[filter] || prevSong.audioFeatures[filter]
        if (Array.isArray(songFilter)) songFilter = songFilter.map(({ name }) => `${name}`)
        if (Array.isArray(prevSongFilter)) prevSongFilter = prevSongFilter.map(({ name }) => `${name}`)
        if (typeof songFilter === 'string') songFilter = songFilter.toLowerCase()
        if (typeof prevSongFilter === 'string') prevSongFilter = prevSongFilter.toLowerCase()
        if (prevSongFilter === songFilter) return 0
        else return prevSongFilter < songFilter ? -1 : 1
      })
      setCurrentFilter(filter)
    }
    setSearchResults({
      ...searchResults,
      items: [...filteredSongs],
    })
  }

  const [activeSong, setActiveSong] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const handlePlayPauseSong = (song) => {
    if (activeSong && song.id === activeSong.id) {
      if (audioObj.current.paused) {
        audioObj.current.play()
      } else audioObj.current.pause()
    } else {
      audioObj.current.src = song.preview_url
      audioObj.current.play()
      setActiveSong(song)
    }
  }

  audioObj.current.addEventListener('playing', () => setIsPlaying(true))
  audioObj.current.addEventListener('pause', () => setIsPlaying(false))
  audioObj.current.addEventListener('ended', () => setIsPlaying(false))

  const [activePlaylistId, setActivePlaylistId] = useState()
  const [activePlaylist, setActivePlaylist] = useState()
  const [isSavingToPlaylist, setIsSavingToPlaylist] = useState(false)

  const handleFetchActivePlaylist = () => {
    fetchData(`playlists/${activePlaylistId}/tracks`).then((data) => {
      setActivePlaylist(data)
    })
  }

  useEffect(() => {
    if (activePlaylistId) handleFetchActivePlaylist()
  }, [activePlaylistId])

  const handleSaveSongToPlaylist = (uri, id) => {
    setIsSavingToPlaylist(id)
    fetchData(`playlists/${activePlaylistId}/tracks?uris=${uri}`, 'POST')
      .then(() => {
        return handleFetchActivePlaylist()
      })
      .catch((error) => console.log(error))
      .finally(() => setIsSavingToPlaylist(false))
  }

  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false)
  const [view, setView] = useState('search')
  const [searchView, setSearchView] = useState('byParams')

  return (
    <Container>
      <StyledInfoPannelButton onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)} />
      {view === 'search' && (
        <StyledCard>
          <CloseButton onClick={() => setView('results')}>X</CloseButton>
          <Card.Header>Search</Card.Header>
          <Tabs>
            <Tab isActive={searchView === 'byParams'} onClick={() => setSearchView('byParams')}>
              By song parameters
            </Tab>
            <Tab isActive={searchView === 'byName'} onClick={() => setSearchView('byName')}>
              By song name
            </Tab>
          </Tabs>
          {searchView === 'byParams' && (
            <>
              {genres?.length &&
                genres.map((genre) => {
                  return (
                    <button onClick={() => handleSelectGenre(genre)}>
                      {genreSeeds.find((seed) => seed === genre) && '++'}
                      {genre}
                    </button>
                  )
                })}
              {inputsWithZeroOneRange.map((item) => (
                <InputContainer>
                  <Label>{item}</Label>
                  <StyledSelect
                    id={item}
                    name={item}
                    onChange={({ target }) =>
                      setAvancedSearchInput({
                        ...advancedSearchInput,
                        [item]: target.value,
                      })
                    }
                    value={advancedSearchInput[item]}
                  >
                    <option value={null}></option>
                    <option value="1.0">1.0 High</option>
                    <option value="0.9">0.9</option>
                    <option value="0.8">0.8</option>
                    <option value="0.7">0.7</option>
                    <option value="0.6">0.6</option>
                    <option value="0.5">0.5</option>
                    <option value="0.4">0.4</option>
                    <option value="0.3">0.3</option>
                    <option value="0.2">0.2</option>
                    <option value="0.1">0.1</option>
                    <option value="0.0">0.0 Low</option>
                  </StyledSelect>
                </InputContainer>
              ))}
              <InputContainer>
                <Label>Popularity (0-8)</Label>
                <Input
                  id="popularity"
                  name="popularity"
                  onChange={({ target }) =>
                    setAvancedSearchInput({
                      ...advancedSearchInput,
                      popularity: target.value,
                    })
                  }
                  value={advancedSearchInput.popularity || ''}
                  type="number"
                  min="1"
                  max="8"
                />
              </InputContainer>
              <InputContainer>
                <Label>Time Signature (0-100)</Label>
                <Input
                  id="timeSignature"
                  name="timeSignature"
                  onChange={({ target }) =>
                    setAvancedSearchInput({
                      ...advancedSearchInput,
                      timeSignature: target.value,
                    })
                  }
                  value={advancedSearchInput.timeSignature || ''}
                  type="number"
                  min="0"
                  max="100"
                />
              </InputContainer>
              <InputContainer>
                <Label>Tempo</Label>
                <Input
                  id="tempo"
                  name="tempo"
                  onChange={({ target }) =>
                    setAvancedSearchInput({
                      ...advancedSearchInput,
                      tempo: target.value,
                    })
                  }
                  value={advancedSearchInput.tempo || ''}
                  type="number"
                  min="1"
                />
              </InputContainer>
              <InputContainer>
                <Label>Mode</Label>
                <StyledSelect
                  id="mode"
                  name="mode"
                  onChange={({ target }) =>
                    setAvancedSearchInput({
                      ...advancedSearchInput,
                      mode: target.value,
                    })
                  }
                  value={advancedSearchInput.mode}
                >
                  <option value={null}></option>
                  <option value="1">Major</option>
                  <option value="0">Minor</option>
                </StyledSelect>
              </InputContainer>
              <InputContainer>
                <Label>Key</Label>
                <StyledSelect
                  id="key"
                  name="key"
                  onChange={({ target }) =>
                    setAvancedSearchInput({
                      ...advancedSearchInput,
                      key: target.value,
                    })
                  }
                  value={advancedSearchInput.mode}
                >
                  <option value={null}></option>
                  {Object.entries(pitches).map(([value, label]) => (
                    <option value={value}>{label}</option>
                  ))}
                </StyledSelect>
              </InputContainer>
              <Button
                onClick={() => {
                  handleSearchByParams()
                  setView('results')
                }}
                disabled={!genreSeeds.length}
              >
                Search
              </Button>
            </>
          )}
          {searchView === 'byName' && (
            <SearchByName>
              <Input
                placeholder="Song name.."
                value={searchInputValue}
                onChange={({ target }) => setSearchInputValue(target.value)}
                name="byName"
              />
              <Button
                onClick={() => {
                  handleSearchByName()
                  setView('results')
                }}
                disabled={!searchInputValue}
              >
                Search
              </Button>
            </SearchByName>
          )}
        </StyledCard>
      )}
      {view === 'results' && (
        <ResultsContainer>
          <ResultsHeader>
            <Label for="playlists">Playlist: </Label>
            <StyledSelect
              id="playlists"
              name="playlists"
              onChange={({ target }) => setActivePlaylistId(target.value)}
              value={activePlaylistId}
            >
              <option disabled selected>
                Select a playlist
              </option>
              {!!ownedPlaylists &&
                ownedPlaylists.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </StyledSelect>
            <Button onClick={() => setView('search')}>Search Again</Button>
          </ResultsHeader>
          {isLoading ? (
            <div>Loading</div>
          ) : !!searchResults ? (
            <>
              <SearchResults
                searchResults={searchResults}
                activeSong={activeSong}
                isPlaying={isPlaying}
                handleSortSongs={handleSortSongs}
                handleSaveSongToPlaylist={handleSaveSongToPlaylist}
                handlePlayPauseSong={handlePlayPauseSong}
                activePlaylistId={activePlaylistId}
                isSavingToPlaylist={isSavingToPlaylist}
                activePlaylist={activePlaylist}
              />
            </>
          ) : (
            <NoResultsMessage>No Results. Please modify your search criteria and try again.</NoResultsMessage>
          )}
        </ResultsContainer>
      )}
      <InfoPanel isOpen={isInfoPanelOpen} close={() => setIsInfoPanelOpen(false)} />
    </Container>
  )
}
