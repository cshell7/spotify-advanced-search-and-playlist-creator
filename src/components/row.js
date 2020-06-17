import React from 'react'
import styled from 'styled-components'
import { StatBar } from './stat-bar'
import { pitches, colors } from '../consts'
import addIcon from '../img/add-icon.png'
import checkIcon from '../img/check-icon.png'
import explicitIcon from '../img/explicit-icon.png'
import playIcon from '../img//play-icon.png'
import pauseIcon from '../img/pause-icon.png'

const PlayPauseButton = styled.img.attrs(() => ({
  alt: 'Play/Pause preview',
}))`
  height: 24px;
  width: 24px;
  cursor: pointer;
`

const AddButton = styled.img.attrs(() => ({
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
  ${({ isOdd }) => isOdd && 'background-color: #ffffff0f;'}
  font-size: ${({ size }) => (size ? `${size}px` : 'inherit')};
  a, p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
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
      <TableCell isOdd={isOdd(index)} onClick={() => handlePlayPauseSong(song)}>
        {preview_url ? <PlayPauseButton src={isPlaying ? pauseIcon : playIcon} /> : ''}
      </TableCell>
      <TableCell isOdd={isOdd(index)}>
        <Link href={uri}>{name}</Link>
      </TableCell>
      <TableCell isOdd={isOdd(index)}>{explicit && <ExplicitIcon />}</TableCell>
      <TableCell isOdd={isOdd(index)} size={14}>
        {artists.map(({ name }) => name).join(', ')}
      </TableCell>
      <TableCell isOdd={isOdd(index)}>{getFormattedDurationString(duration)}</TableCell>
      <TableCell isOdd={isOdd(index)} size={14}>
        {Math.round(tempo)}BPM
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

      <TableCell isOdd={isOdd(index)}>
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
    </>
  )
}
