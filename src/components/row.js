import React from 'react'
import styled from 'styled-components'
import { StatBar } from './stat-bar'
import { pitches, colors } from '../consts'
import addIcon from '../img/add-icon.png'
import checkIcon from '../img/check-icon.png'
import explicitIcon from '../img/explicit-icon.png'
import playIcon from '../img//play-icon.png'
import pauseIcon from '../img/pause-icon.png'
import { Button } from './button'

export const SimilarsButton = styled(Button)`
  color: ${colors.white};
  background-color: ${colors.spotifyBlack};
  border: 1px solid ${colors.spotifyGreen};
  font-size: 12px;
  font-weight: 100;
  padding: 4px;
  height: 22px;
  width: 22px;

  &:active {
    border: 1px solid ${colors.spotifyGreen};
  }

  &:focus {
    border: 1px solid ${colors.spotifyGreen};
    outline: 1px solid ${colors.white};
    outline-offset: 1px;
  }
`

export const PlayPauseButton = styled.img.attrs(() => ({
  alt: 'Play/Pause preview',
}))`
  height: 24px;
  width: 24px;
  cursor: pointer;
`

export const AddButton = styled.img.attrs(() => ({
  alt: 'Add to playlist',
  src: addIcon,
}))`
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: transform 1s;
  transform: rotate(0);
  ${({ isLoading }) => isLoading && `transform: rotate(180deg);`}

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const AddedIcon = styled.img.attrs(() => ({
  alt: 'Added to playlist',
  src: checkIcon,
}))`
  height: 24px;
  width: 24px;
`

export const ExplicitIcon = styled.img.attrs(() => ({
  alt: 'Explicit',
  src: explicitIcon,
  label: 'Explicit',
}))`
  height: 16px;
  width: 16px;
`

const TableCell = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  ${({ isOdd }) => isOdd && 'background-color: #ffffff0f;'}
  font-size: ${({ size }) => (size ? `${size}px` : 'inherit')};
  a, p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`

const Link = styled.a`
  color: ${colors.spotifyGreen};
  text-decoration: none;
`

export const Row = ({
  song,
  handlePlayPauseSong,
  isPlaying,
  handleSaveSongToPlaylist,
  activePlaylistId,
  index,
  isSavingToPlaylist,
  isSaved,
  handleSearchSimilarSong,
}) => {
  const { name, id, artists, explicit, duration_ms, popularity, audioFeatures, preview_url, uri } = song
  const {
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
  } = audioFeatures

  const isOdd = (num) => num % 2 === 1

  const getDuration = (milliseconds) => {
    let seconds, minutes, hours
    seconds = Math.round(milliseconds / 1000)
    minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
    hours = Math.floor(minutes / 60)
    minutes = minutes % 60
    return {
      seconds,
      minutes,
      hours,
    }
  }

  const duration = getDuration(duration_ms)

  const getFormattedDurationString = (durationObject) => {
    const { hours, minutes, seconds } = durationObject
    return `${!!hours ? `${hours}:` : ''}${minutes}:${`${seconds}`.length === 1 ? '0' : ''}${seconds}`
  }

  if (isSavingToPlaylist) console.log({ isSavingToPlaylist })

  return (
    <>
      <TableCell isOdd={isOdd(index)} onClick={() => handlePlayPauseSong(song)} centered>
        {preview_url ? <PlayPauseButton src={isPlaying ? pauseIcon : playIcon} /> : ''}
      </TableCell>
      <TableCell isOdd={isOdd(index)} centered>
        {isSaved ? (
          <AddedIcon />
        ) : (
          <AddButton
            isLoading={isSavingToPlaylist}
            disabled={!activePlaylistId}
            onClick={() => !!activePlaylistId && handleSaveSongToPlaylist(uri, id)}
          />
        )}
      </TableCell>
      <TableCell isOdd={isOdd(index)} centered>
        <SimilarsButton onClick={() => handleSearchSimilarSong(id)}>S</SimilarsButton>
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <Link href={uri}>{name}</Link>
      </TableCell>
      <TableCell isOdd={isOdd(index)}>{explicit && <ExplicitIcon />}</TableCell>
      <TableCell isOdd={isOdd(index)} size={14}>
        <p>{artists.map(({ name }) => name).join(', ')}</p>
      </TableCell>
      <TableCell isOdd={isOdd(index)}>{getFormattedDurationString(duration)}</TableCell>
      <TableCell isOdd={isOdd(index)} size={14}>
        {Math.round(tempo)}
        <small>BPM</small>
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <StatBar percentage={popularity} fadeRate={0.9} />
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <StatBar percentage={valence * 100} />
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <StatBar percentage={danceability * 100} />
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <StatBar percentage={energy * 100} />
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <StatBar percentage={acousticness * 100} />
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <StatBar percentage={instrumentalness * 100} />
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <StatBar percentage={liveness * 100} />
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <StatBar percentage={speechiness * 100} />
      </TableCell>
      <TableCell isOdd={isOdd(index)} size={14}>
        {pitches[key] || '?'}
      </TableCell>
      <TableCell isOdd={isOdd(index)}>{Math.round(loudness)}dB</TableCell>
      <TableCell isOdd={isOdd(index)} size={14}>
        {mode ? 'Major' : 'Minor'}
      </TableCell>
      <TableCell isOdd={isOdd(index)} size={14}>
        {time_signature}
      </TableCell>
    </>
  )
}
