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

const StyledSelect = styled(Select)`
  &&& {
    margin-left: 16px;
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

const PlaylistLabel = styled.label``

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

  const [genres, setGenres] = useState(JSON.parse(cookies.get('genres') || '[]'))
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
    if (user && playlists) {
      const filteredPlaylists = playlists.items.filter(({ owner }) => owner.id === user.id)
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

  const handleFetchActivePlaylist = useCallback(() => {
    fetchData(`playlists/${activePlaylistId}/tracks`).then((data) => {
      setActivePlaylist(data)
    })
  }, [activePlaylistId, fetchData, setActivePlaylist])

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

  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false)
  const [view, setView] = useState('search')
  const [searchView, setSearchView] = useState('byParams')

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
            <PlaylistLabel for="playlists">Playlist: </PlaylistLabel>
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
