import React, { useState, useRef, useEffect } from 'react'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'
import cookies from 'js-cookie'
import styled from 'styled-components'

import { useSpotityUserData } from '../providers/user-data-provider'
import { useUserPlaylists } from '../providers/playlists-provider'
import { useSpotityGenres } from '../providers/genres-provider'

import { colors, breakpoints, HEADER_HEIGHT } from '../consts'

import { getCleanedTracks } from '../utils'

import { InfoPanel, InfoPanelButton } from './info-panel'
import { SearchByNameForm } from './search-by-name-form'
import { SearchByParamsForm } from './search-by-params-form'
import { SearchResults } from './search-results'
import { CreatePlaylistView } from './create-playlist-view'
import { Card } from './card'
import { CloseButton } from './close-button'
import { Select, Button } from './form-elements'
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
  z-index: 10;
`

export const StyledCard = styled(Card)`
  position: relative;
  width: 800px;
  max-width: calc(100vw - 32px);
  margin-top: 24px;
  overflow-y: scroll;
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

const PlaylistSelect = styled(Select)`
  min-width: 168px;
  ${({ value }) =>
    !!value &&
    `
  border: 1px solid ${colors.spotifyGreen};
  background-color: ${colors.spotifyBlack};

  &:focus {
    border: 1px solid ${colors.spotifyGreen};
  }
`}
`

const AddAllButton = styled(Button)``

const ResultsContainer = styled.div`
  width: 100%;
  padding-top: 40px;
`

const ResultsHeader = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  padding: 0 16px;
  background-color: ${colors.spotifyBlack};
  border-bottom: 1px solid ${colors.gray};
  z-index:1;

  ${Button}, ${AddAllButton}, ${PlaylistSelect} {
    height: 24px;
    padding: 4px 8px;

    @media (max-width: ${breakpoints.sm}px) {
      font-size: 12px;
      padding: 4px;
    }
  }

  ${Button} {
    margin-left: auto;
  }

  ${AddAllButton} {
    margin-left: 16px;
  }
`

const NoResultsMessage = styled.p`
  text-align: center;
`

export const AdvancedSearchView = () => {
  const { fetchData, isLoading } = useSpotityAPI()
  const { error: userError, isLoading: isUserLoading } = useSpotityUserData()
  const {
    playlists,
    error: playlistsError,
    isLoading: isPlaylistsLoading,
    activePlaylistId,
    isUpdatingPlaylist,
    activePlaylist,
    setActivePlaylistId,
    saveSongToPlaylist,
    removeSongFromPlaylist,
  } = useUserPlaylists()
  const { genres, isLoading: isGenresLoading, error: genresError } = useSpotityGenres()
  const savedTracks = activePlaylist?.items.map(({ id }) => id) || []

  const handleSetActivePlaylistId = (id) => {
    if (id === '_new_') setView('createPlaylist')
    else setActivePlaylistId(id)
  }

  const [areSongsLoading, setAreSongsLoading] = useState(false)
  const [songError, setSongError] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(!cookies.get('hasViewedInfoPanel'))
  const [view, setView] = useState('search')
  const [searchView, setSearchView] = useState('byParams')

  useEffect(() => {
    if (isInfoPanelOpen) document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    else document.getElementsByTagName('body')[0].style.overflow = null
  }, [isInfoPanelOpen])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  const isInitialLoad = [isLoading, isUserLoading, isGenresLoading, isPlaylistsLoading].some(Boolean)
  // TODO handle sad paths
  const hasError = [userError, playlistsError, genresError, songError].some(Boolean)
  if (hasError) console.error({ hasError })

  const songsNotInPlaylist = searchResults
    .map(({ uri }) => uri)
    .filter((song) => {
      return !activePlaylist?.items.some((track) => {
        return track?.uri === song
      })
    })

  const [currentFilter, setCurrentFilter] = useState()
  useEffect(() => {
    setCurrentFilter(null)
  }, [areSongsLoading])

  const handleSortSongs = (filter) => {
    let filteredSongs = [...searchResults]
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
    setSearchResults(filteredSongs)
  }

  const audioObj = useRef(new Audio())
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
  useEffect(() => {
    if (areSongsLoading) audioObj.current.pause()
  }, [areSongsLoading])

  const handleSearchSimilarSong = (songId) => {
    setAreSongsLoading(true)
    fetchData(`recommendations?seed_tracks=${songId}`)
      .then((data) => {
        const tracks = data?.tracks?.items || data?.tracks || [] // The payload structure is differnt for the tracks api vs the recommendations api
        const songIds = tracks.map(({ id }) => id)
        return fetchData(`audio-features?ids=${songIds}`).then(({ audio_features }) => {
          const results = [
            ...tracks.map((item, i) => ({
              ...item,
              audioFeatures: audio_features[i],
            })),
          ]

          setSearchResults(getCleanedTracks(results))
        })
      })
      .catch((error) => {
        setSongError(error)
        console.error('Fetch similar song error', error)
      })
      .finally(() => setAreSongsLoading(false))
  }

  return (
    <Container>
      <StyledInfoPannelButton onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)} />
      {isInitialLoad ? (
        <Loader />
      ) : (
        <>
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
                  setSongError={setSongError}
                />
              )}
              {searchView === 'byName' && (
                <SearchByNameForm
                  setAreSongsLoading={setAreSongsLoading}
                  setView={setView}
                  setSearchResults={setSearchResults}
                  setSongError={setSongError}
                />
              )}
            </StyledCard>
          )}
          {view === 'results' && (
            <ResultsContainer>
              <ResultsHeader>
                <PlaylistSelect
                  id="playlists"
                  name="playlists"
                  onChange={({ target }) => handleSetActivePlaylistId(target.value)}
                  value={activePlaylistId || ''}
                >
                  <option disabled value="">
                    Select a playlist
                  </option>
                  {!!playlists &&
                    playlists.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  <option value="_new_">-New playlist-</option>
                </PlaylistSelect>
                <AddAllButton
                  disabled={!searchResults?.length || !activePlaylistId || !songsNotInPlaylist?.length}
                  onClick={() => {
                    saveSongToPlaylist(songsNotInPlaylist.join(','))
                  }}
                >
                  Add all songs
                </AddAllButton>
                <Button onClick={() => setView('search')}>Search Again</Button>
              </ResultsHeader>
              {areSongsLoading ? (
                <Loader />
              ) : !!searchResults?.length ? (
                <>
                  <SearchResults
                    searchResults={searchResults}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    handleSortSongs={handleSortSongs}
                    saveSongToPlaylist={saveSongToPlaylist}
                    handlePlayPauseSong={handlePlayPauseSong}
                    activePlaylistId={activePlaylistId}
                    isUpdatingPlaylist={isUpdatingPlaylist}
                    savedTracks={savedTracks}
                    setView={setView}
                    handleSearchSimilarSong={handleSearchSimilarSong}
                    removeSongFromPlaylist={removeSongFromPlaylist}
                  />
                </>
              ) : (
                <NoResultsMessage>No Results. Please modify your search criteria and try again.</NoResultsMessage>
              )}
            </ResultsContainer>
          )}
          {view === 'createPlaylist' && <CreatePlaylistView setView={setView} />}
        </>
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
