import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'
import styled from 'styled-components'
import cookies from 'js-cookie'
import { InfoPanel, InfoPanelButton } from './info-panel'
import { SearchResults } from './search-results'
import { Card } from './card'
import { Button } from './button'
import { Select } from './select'
import { colors } from '../consts'
import { SearchByNameForm } from './search-by-name-form'
import { SearchByParamsForm } from './search-by-params-form'
import { CloseButton } from './close-button'
import { Loader } from './loader'
import { Input } from './input'

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
  max-height: calc(100vh - 64px - 64px);
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

const StyledSelect = styled(Select)`
  ${({ value }) =>
    !!value &&
    `
  border: 1px solid ${colors.spotifyGreen};
  background-color: ${colors.spotifyBlack};

  &:focus {
    border: 1px solid ${colors.spotifyGreen};
  }
`}
  &&& {
    margin-left: 0;
  }
`

const AddAllButton = styled(Button)`
  color: ${colors.white};
  background-color: ${colors.spotifyBlack};
  border: 1px solid ${colors.spotifyGreen};
  font-size: 14px;
  font-weight: 100;
  padding: 6px 8px;

  &:active {
    border: 1px solid ${colors.spotifyGreen};
  }

  &:focus {
    border: 1px solid ${colors.spotifyGreen};
    outline: 1px solid ${colors.white};
    outline-offset: 1px;
  }

  &[disabled] {
    border: 1px solid ${colors.gray};
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
    height: 24px;
  }

  ${AddAllButton} {
    margin-left: 16px;
  }
`

const NoResultsMessage = styled.p`
  text-align: center;
`

const PrivacySelect = styled(Select)`
  &&& {
    color: ${({ value }) => (!!value ? colors.white : colors.gray)};
  }
`

const CreatePlaylistForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  ${Input}, ${PrivacySelect} {
    color: ${colors.white};
    margin-bottom: 16px;
    width: 300px;
    border: 1px solid ${colors.spotifyGreen};
    background-color: ${colors.spotifyBlack};

    &:focus {
      border: 1px solid ${colors.spotifyGreen};
    }
  }
`

export const AdvancedSearchView = () => {
  const { fetchData } = useSpotityAPI()
  const audioObj = useRef(new Audio())

  const [areSongsLoading, setAreSongsLoading] = useState(false)

  const [searchResults, setSearchResults] = useState()

  const [user, setUser] = useState()
  const [userError, setUserError] = useState()
  useEffect(() => {
    if (!user && !userError) {
      fetchData('me')
        .then((user) => setUser(user))
        .catch((error) => setUserError(error))
    }
  }, [user, userError, fetchData])

  const [playlists, setPlaylists] = useState()
  const [playlistsError, setPlaylistsError] = useState()
  useEffect(() => {
    if (!playlists && !playlistsError) {
      fetchData('me/playlists')
        .then((playlists) => setPlaylists(playlists))
        .catch((error) => setPlaylistsError(error))
    }
  }, [playlists, playlistsError, fetchData])

  const cachedGenres = cookies.get('genres')
  const [genres, setGenres] = useState(cachedGenres && cachedGenres !== 'undefined' && JSON.parse(cachedGenres))
  const [genresError, setGenresError] = useState()
  useEffect(() => {
    if (!genres?.length && !genresError) {
      fetchData('recommendations/available-genre-seeds')
        .then(({ genres }) => {
          cookies.set('genres', JSON.stringify(genres), { expires: 7 })
          setGenres(genres)
        })
        .catch((error) => setGenresError(error))
    }
  }, [genres, genresError, fetchData])

  const [ownedPlaylists, setOwnedPlaylists] = useState([])
  useEffect(() => {
    if (user && playlists?.items) {
      const filteredPlaylists = playlists?.items.filter(({ owner }) => owner.id === user.id)
      setOwnedPlaylists(filteredPlaylists)
    }
  }, [user, playlists, fetchData])

  const [currentFilter, setCurrentFilter] = useState()

  useEffect(() => {
    setCurrentFilter(null)
  }, [areSongsLoading])

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

  const handleSetActivePlaylistId = (id) => {
    if (id === '_new_') setView('createPlaylist')
    else setActivePlaylistId(id)
  }

  const [createPlaylistFormInput, setCreatePlaylistFormInput] = useState({})
  const handleCreatePlaylistSubmit = () => {
    fetchData(`users/${user.id}/playlists`, 'POST', JSON.stringify(createPlaylistFormInput))
      .then(({ id }) => {
        setActivePlaylistId(id)
        return fetchData('me/playlists')
          .then((playlists) => setPlaylists(playlists))
          .catch((error) => setPlaylistsError(error))
      })
      .catch((error) => console.error(error))
      .finally(() => setView('results'))
  }

  const handleFetchActivePlaylist = useCallback(() => {
    fetchData(`playlists/${activePlaylistId}/tracks`).then((data) => {
      setActivePlaylist(data)
      if (data?.next) handleFetchActivePlaylistRemaining(data)
      else setActivePlaylist(data)
    })
  }, [activePlaylistId, fetchData, setActivePlaylist])

  const handleFetchActivePlaylistRemaining = (data) => {
    const { next, items: previousItems } = data
    fetchData(`playlists/${activePlaylistId}/tracks?${next.replace(/.*[?|#]/, '')}`).then((newData) => {
      if (newData?.next)
        handleFetchActivePlaylistRemaining({
          ...newData,
          items: [...previousItems, ...newData?.items],
        })
      else
        setActivePlaylist({
          ...newData,
          items: [...previousItems, ...newData?.items],
        })
    })
  }

  useEffect(() => {
    if (activePlaylistId) handleFetchActivePlaylist()
  }, [activePlaylistId, handleFetchActivePlaylist])

  const handleSaveSongToPlaylist = (uri, id) => {
    setIsSavingToPlaylist(id)
    fetchData(`playlists/${activePlaylistId}/tracks?uris=${uri}`, 'POST')
      .then(() => {
        return handleFetchActivePlaylist()
      })
      .catch((error) => console.log(error))
      .finally(() => setIsSavingToPlaylist(false))
  }

  const handleRemoveSongFromPlaylist = (uri, id) => {
    const body = {
      tracks: [{ uri }],
    }
    setIsSavingToPlaylist(id)
    fetchData(`playlists/${activePlaylistId}/tracks`, 'DELETE', JSON.stringify(body))
      .then(() => {
        return handleFetchActivePlaylist()
      })
      .catch((error) => console.log(error))
      .finally(() => setIsSavingToPlaylist(false))
  }

  const handleSearchSimilarSong = (songId) => {
    setAreSongsLoading(true)
    fetchData(`recommendations?seed_tracks=${songId}`)
      .then((data) => {
        const tracks = data?.tracks?.items || data?.tracks || [] // The payload structure is differnt for the tracks api vs the recommendations api
        const songIds = tracks.map(({ id }) => id)
        return fetchData(`audio-features?ids=${songIds}`).then(({ audio_features }) => {
          const results = {
            ...data,
            items: [
              ...tracks.map((item, i) => ({
                ...item,
                audioFeatures: audio_features[i],
              })),
            ],
          }
          setSearchResults(results)
        })
      })
      .catch((error) => {
        // TODO add better error handling
        console.error('Fetch similar song error', error)
      })
      .finally(() => setAreSongsLoading(false))
  }

  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(!cookies.get('hasViewedInfoPanel'))
  const [view, setView] = useState('search')
  const [searchView, setSearchView] = useState('byParams')

  const savedTracks = activePlaylist?.items.map(({ track }) => track.id) || []

  return (
    <Container>
      <StyledInfoPannelButton onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)} />
      {view === 'search' && (
        <StyledCard>
          <CloseButton onClick={() => setView('results')} isWhite />
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
            <SearchByParamsForm
              setAreSongsLoading={setAreSongsLoading}
              setView={setView}
              setSearchResults={setSearchResults}
              genres={genres}
              setIsInfoPanelOpen={setIsInfoPanelOpen}
            />
          )}
          {searchView === 'byName' && (
            <SearchByNameForm
              setAreSongsLoading={setAreSongsLoading}
              setView={setView}
              setSearchResults={setSearchResults}
            />
          )}
        </StyledCard>
      )}
      {view === 'results' && (
        <ResultsContainer>
          <ResultsHeader>
            <StyledSelect
              id="playlists"
              name="playlists"
              onChange={({ target }) => handleSetActivePlaylistId(target.value)}
              value={activePlaylistId || ''}
            >
              <option disabled value="">
                Select a playlist
              </option>
              {!!ownedPlaylists &&
                ownedPlaylists.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              <option value="_new_">-New playlist-</option>
            </StyledSelect>
            <AddAllButton
              disabled={!searchResults?.items || !activePlaylistId}
              onClick={() => {
                const songs = searchResults?.items
                  .map(({ uri }) => uri)
                  .filter((song) => {
                    return !activePlaylist.items.some(({ track }) => track?.uri === song)
                  })
                handleSaveSongToPlaylist(songs.join(','))
              }}
            >
              Add all songs
            </AddAllButton>
            <Button onClick={() => setView('search')}>Search Again</Button>
          </ResultsHeader>
          {areSongsLoading ? (
            <Loader />
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
                savedTracks={savedTracks}
                setView={setView}
                handleSearchSimilarSong={handleSearchSimilarSong}
                handleRemoveSongFromPlaylist={handleRemoveSongFromPlaylist}
              />
            </>
          ) : (
            <NoResultsMessage>No Results. Please modify your search criteria and try again.</NoResultsMessage>
          )}
        </ResultsContainer>
      )}
      {view === 'createPlaylist' && (
        <StyledCard>
          <CloseButton onClick={() => setView('results')} isWhite />
          <Card.Header>Create new playlist</Card.Header>
          <CreatePlaylistForm>
            <Input
              placeholder="Playlist name"
              value={createPlaylistFormInput?.name || ''}
              onChange={({ target }) => setCreatePlaylistFormInput({ ...createPlaylistFormInput, name: target.value })}
              name="name"
            />
            <Input
              placeholder="Playlist description"
              value={createPlaylistFormInput?.description || ''}
              onChange={({ target }) =>
                setCreatePlaylistFormInput({ ...createPlaylistFormInput, description: target.value })
              }
              name="description"
            />
            <PrivacySelect
              value={createPlaylistFormInput?.public || ''}
              onChange={({ target }) =>
                setCreatePlaylistFormInput({ ...createPlaylistFormInput, public: target.value })
              }
              name="public"
            >
              <option disabled value="">
                Privacy
              </option>
              <option value={false}>Public</option>
              <option value={true}>Private</option>
            </PrivacySelect>
            <Button disabled={!createPlaylistFormInput?.name} onClick={() => handleCreatePlaylistSubmit()}>
              Create
            </Button>
          </CreatePlaylistForm>
        </StyledCard>
      )}
      <InfoPanel
        isOpen={isInfoPanelOpen}
        close={() => {
          cookies.set('hasViewedInfoPanel', 'true')
          setIsInfoPanelOpen(false)
        }}
      />
    </Container>
  )
}
