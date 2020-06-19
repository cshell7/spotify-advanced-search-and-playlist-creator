import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'

import { getCleanedTracks } from '../utils'

import { Input, Button } from './form-elements'

const SearchByName = styled.div`
  display: grid;
  grid-gap: 24px;
  padding: 24px;
  justify-content: center;

  ${Input}, ${Button} {
    width: 220px;
  }
`

export const SearchByNameForm = ({ setAreSongsLoading, setView, setSearchResults, setSongError }) => {
  const { fetchData } = useSpotityAPI()
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleSearchByName = () => {
    setAreSongsLoading(true)
    return fetchData(`search?q=${encodeURIComponent(searchInputValue)}&type=track&limit=50`)
      .then(({ tracks }) => {
        const songIds = tracks.items.map(({ id }) => id)
        return fetchData(`audio-features?ids=${songIds}`).then(({ audio_features: audioFeatures }) => {
          const results = [
            ...tracks.items.map((item, i) => ({
              ...item,
              audioFeatures: audioFeatures[i],
            })),
          ]
          setSearchResults(getCleanedTracks(results))
          localStorage.setItem('results', JSON.stringify(results))
        })
      })
      .catch((error) => {
        console.error('Fetch songs by name error', error)
        setSongError(error)
      })
      .finally(() => setAreSongsLoading(false))
  }

  return (
    <SearchByName>
      <Input
        outline
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
  )
}
