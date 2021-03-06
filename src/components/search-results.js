import React from 'react'
import styled from 'styled-components'

import { colors } from '../consts'
import { Row, ExplicitIcon } from './row'

const TABLE_WIDTH = 40 * 3 + 216 + 24 + 148 + 60 + 60 + 78 * 8 + 48 + 60 + 60 + 40

const TableHeader = styled.div`
  height: 40px;
  margin-bottom: 8px;
  background-color: ${colors.spotifyBlack};
`
const TableBody = styled.div`
  width: ${TABLE_WIDTH}px;
  font-size: 16px;

  & > div {
    height: 40px;
    padding: 4px 6px;
  }
`

const Table = styled.div`
  position: relative;
  overflow-x: scroll;
  width: ${TABLE_WIDTH + 2}px;
  max-width: calc(100vw - 4px);
  margin: 0 auto;
  border-right: 1px solid ${colors.gray};
  border-left: 1px solid ${colors.gray};

  ${TableHeader}, ${TableBody} {
    display: grid;
    grid-template-columns:
      repeat(3, 40px [controls])
      [name] 216px [explicit] 24px [artist] 148px [duration] 60px [bpm] 60px repeat(8, 78px [stats])
      [key] 48px [db] 60px [mod] 60px [time] 40px;
  }
`

const HeaderItem = styled.div`
  position: relative;
  border-bottom: 1px solid ${colors.gray};
  cursor: pointer;

  p {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    margin: 0;
    position: absolute;
    bottom: 4px;
    left: 0;
    transform-origin: bottom left;
    transform: rotate(-13deg);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 8px;
    height: 4px;
    width: 1px;
    background-color: ${colors.gray};
  }
`

const HeaderItemControls = styled(HeaderItem)`
  grid-column: span 3;

  p {
    bottom: 8px;
    margin: 0;
    left: 50%;
    transform: rotate(-13deg) translateX(-50%);
  }

  &::before {
    left: 50%;
  }
`

const StyledExplicitIcon = styled(ExplicitIcon)`
  cursor: pointer;
  position: absolute;
  bottom: 4px;
`

const ResultsEnd = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  height: 32px;

  span {
    color: ${colors.spotifyGreen};
    cursor: pointer;
  }
`

export const SearchResults = ({
  searchResults,
  activeSong,
  isPlaying,
  handleSortSongs,
  saveSongToPlaylist,
  handlePlayPauseSong,
  activePlaylistId,
  isUpdatingPlaylist,
  setView,
  handleSearchSimilarSong,
  removeSongFromPlaylist,
  savedTracks,
}) => {
  return (
    <Table>
      <TableHeader>
        <HeaderItemControls>
          {' '}
          <p>Controls</p>
        </HeaderItemControls>

        <HeaderItem onClick={() => handleSortSongs('name')}>
          <p>Name</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('explicit')}>
          <StyledExplicitIcon />
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('artists')}>
          <p>Artist</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('duration_ms')}>
          <p>Duration</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('tempo')}>
          <p>Tempo</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('popularity')}>
          <p>Popularity</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('valence')}>
          <p>Valence</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('danceability')}>
          <p>Danceability</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('energy')}>
          <p>Energy</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('acousticness')}>
          <p>Acousticness</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('instrumentalness')}>
          <p>Instrumental</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('liveness')}>
          <p>Liveness</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('speechiness')}>
          <p>Speechiness</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('key')}>
          <p>Key</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('loudness')}>
          <p>Loudness</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('mode')}>
          <p>Modality</p>
        </HeaderItem>
        <HeaderItem onClick={() => handleSortSongs('time-signature')}>
          <p>Meter</p>
        </HeaderItem>
      </TableHeader>
      <TableBody>
        {!!searchResults?.length &&
          searchResults.map((song, i) => (
            <Row
              key={song.id}
              song={song}
              index={i}
              handlePlayPauseSong={handlePlayPauseSong}
              activeSong={activeSong}
              isPlaying={isPlaying && song.id === activeSong?.id}
              saveSongToPlaylist={saveSongToPlaylist}
              activePlaylistId={activePlaylistId}
              isUpdatingPlaylist={isUpdatingPlaylist === song.id}
              isSaved={savedTracks.some((id) => id === song.id)}
              handleSearchSimilarSong={handleSearchSimilarSong}
              removeSongFromPlaylist={removeSongFromPlaylist}
            />
          ))}
        <ResultsEnd>
          That's all! <span onClick={() => setView('search')}>Search again</span>
        </ResultsEnd>
      </TableBody>
    </Table>
  )
}
