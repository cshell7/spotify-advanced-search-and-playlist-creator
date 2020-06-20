import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'
import { objectToQueryParamString } from '@c-shell/utils-url-query-params'

import { colors, pitches } from '../consts'

import { capitalizeFirstLetter, getCleanedTracks } from '../utils'

import { Select, Input, Button } from './form-elements'

const inputsWithZeroOneRange = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence',
]

const StyledSearchByParamsForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding-top: 16px;
`

const GenreContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
`
const Genre = styled.div`
  flex: 1 1 auto;
  padding: 4px;
  max-width: 150px;
`

const GenreButton = styled(Button).attrs(() => ({
  outline: true,
  highlightFilled: true,
}))`
  width: 100%;
  padding: 6px 8px;
`

const SectionDescription = styled.p`
  display: inline-flex;
  width: 100%;
  margin: 8px 0 4px;
  border-bottom: 1px solid ${colors.gray};

  em {
    margin-left: auto;
    font-size: 12px;
  }

  span {
    color: ${colors.spotifyGreen};
    cursor: pointer;
    padding: 0 3px;
  }
`

const Note = styled.p`
  margin: 0 0 16px;
  font-size: 12px;
`

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: -8px -16px;
`

const InputContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  margin: 8px 16px;

  ${Input}, ${Select} {
    flex: 1 1 auto;
  }
`
const Label = styled.label`
  padding-right: 8px;
`

const ButtonContainer = styled.div`
  display: grid;
  margin-top: 32px;
  grid-template-columns: 50% 50%;
  grid-gap: 8px;
  width: 100%;
`

export const SearchByParamsForm = ({
  setAreSongsLoading,
  setView,
  setSearchResults,
  genres,
  setIsInfoPanelOpen,
  setSongError,
}) => {
  const { fetchData } = useSpotityAPI()

  const [genreSeeds, setGenreSeeds] = useState([])
  const handleSelectGenre = (newGenra) => {
    if (genreSeeds.find((seed) => seed === newGenra)) setGenreSeeds(genreSeeds.filter((seed) => seed !== newGenra))
    else if (genreSeeds.length < 3) setGenreSeeds([...genreSeeds, newGenra])
  }

  const [advancedSearchInput, setAvancedSearchInput] = useState({})
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
    setAreSongsLoading(true)
    // TODO add some sort of validation
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
      limit: 25,
      market: 'US',
    }
    return fetchData(`recommendations${objectToQueryParamString(params)}`)
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
        console.error('Fetch recommendation error', error)
        setSongError(error)
      })
      .finally(() => setAreSongsLoading(false))
  }

  const handleReset = () => {
    setGenreSeeds([])
    setAvancedSearchInput({})
  }

  return (
    <StyledSearchByParamsForm
      id="form"
      onSubmit={(event) => {
        event.preventDefault()
        handleSearchByParams()
        setView('results')
      }}
    >
      {genres?.length && (
        <GenreContainer>
          <SectionDescription>
            Step 1: Select 1-3 genres. <em>*Required</em>
          </SectionDescription>
          {genres.map((genre, i) => {
            return (
              <Genre key={i}>
                <GenreButton
                  isSelected={genreSeeds.find((seed) => seed === genre)}
                  type="button"
                  onClick={() => handleSelectGenre(genre)}
                >
                  {genre}
                </GenreButton>
              </Genre>
            )
          })}
        </GenreContainer>
      )}
      <SectionDescription>
        Step 2: Select <span onClick={() => setIsInfoPanelOpen(true)}>attributes</span> to search by
      </SectionDescription>
      <Note>
        Note: These are all optional. Leave the field blank if you don't want that attribute to affect your search. Have
        fun and best of luck creating that perfect playlist!
      </Note>
      <Section>
        {inputsWithZeroOneRange.map((item, i) => (
          <InputContainer key={i}>
            <Label>{capitalizeFirstLetter(item)}</Label>
            <Select
              highlightFilled
              outline
              id={item}
              name={item}
              onChange={({ target }) =>
                setAvancedSearchInput({
                  ...advancedSearchInput,
                  [item]: target.value,
                })
              }
              value={advancedSearchInput[item] || ''}
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
            </Select>
          </InputContainer>
        ))}
        <InputContainer>
          <Label>Popularity (0-100)</Label>
          <Input
            highlightFilled
            outline
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
            min="0"
            max="100"
          />
        </InputContainer>
        <InputContainer>
          <Label>Time Signature</Label>
          <Input
            highlightFilled
            outline
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
            min="1"
            max="12"
          />
        </InputContainer>
        <InputContainer>
          <Label>Tempo</Label>
          <Input
            highlightFilled
            outline
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
          <Select
            highlightFilled
            outline
            id="mode"
            name="mode"
            onChange={({ target }) =>
              setAvancedSearchInput({
                ...advancedSearchInput,
                mode: target.value,
              })
            }
            value={advancedSearchInput.mode || ''}
          >
            <option value={null}></option>
            <option value="1">Major</option>
            <option value="0">Minor</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Key</Label>
          <Select
            highlightFilled
            outline
            id="key"
            name="key"
            onChange={({ target }) =>
              setAvancedSearchInput({
                ...advancedSearchInput,
                key: target.value,
              })
            }
            value={advancedSearchInput.key || ''}
          >
            <option value=""></option>
            {Object.entries(pitches).map(([value, label], i) => (
              <option key={i} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </InputContainer>
      </Section>
      <ButtonContainer>
        <Button type="submit" disabled={!genreSeeds.length}>
          Search
        </Button>
        <Button type="button" outline onClick={handleReset}>
          Reset
        </Button>
      </ButtonContainer>
    </StyledSearchByParamsForm>
  )
}
