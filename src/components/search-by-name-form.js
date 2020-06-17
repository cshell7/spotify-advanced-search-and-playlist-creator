import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'

import { Button } from './button'
import { Input } from './input'

const SearchByName = styled.div`
  display: grid;
  grid-gap: 24px;
  padding: 24px;
  justify-content: center;

  ${Input}, ${Button} {
    width: 220px;
  }
`

export const SearchByNameForm = ({ setAreSongsLoading, setView, setSearchResults }) => {
  const { fetchData } = useSpotityAPI()
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleSearchByName = () => {
    setAreSongsLoading(true)
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
      .finally(() => setAreSongsLoading(false))
  }

  return (
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
  )
}
