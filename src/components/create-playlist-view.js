import React, { useState } from 'react'
import styled from 'styled-components'
import { useUserPlaylists } from '../providers/playlists-provider'

import { colors } from '../consts'

import { StyledCard } from './advanced-search-view'
import { Input, Select, Button } from './form-elements'
import { CloseButton } from './close-button'

const PrivacySelect = styled(Select)`
  color: ${({ value }) => (!!value ? colors.white : colors.gray)};
`

const CreatePlaylistForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  ${Input}, ${PrivacySelect} {
    margin-bottom: 16px;
    width: 300px;
  }
`

export const CreatePlaylistView = ({ setView }) => {
  const {
    createPlaylistSubmit,
    isCreatingNewPlaylistLoading: isLoading,
    creatingNewPlaylistError: error,
  } = useUserPlaylists()

  const [createPlaylistFormInput, setCreatePlaylistFormInput] = useState({})
  const handleCreatePlaylistSubmit = () => {
    createPlaylistSubmit(createPlaylistFormInput).then(() => setView('results'))
  }
  return (
    <StyledCard>
      <CloseButton onClick={() => setView('results')} isWhite />
      <StyledCard.Header>Create new playlist</StyledCard.Header>
      {error && <StyledCard.Copy>{error}</StyledCard.Copy>}
      <CreatePlaylistForm>
        <Input
          outline
          placeholder="Playlist name"
          value={createPlaylistFormInput?.name || ''}
          onChange={({ target }) => setCreatePlaylistFormInput({ ...createPlaylistFormInput, name: target.value })}
          name="name"
        />
        <Input
          outline
          placeholder="Playlist description"
          value={createPlaylistFormInput?.description || ''}
          onChange={({ target }) =>
            setCreatePlaylistFormInput({ ...createPlaylistFormInput, description: target.value })
          }
          name="description"
        />
        <PrivacySelect
          outline
          value={createPlaylistFormInput?.public || ''}
          onChange={({ target }) => setCreatePlaylistFormInput({ ...createPlaylistFormInput, public: target.value })}
          name="public"
        >
          <option disabled value="">
            Privacy
          </option>
          <option value={false}>Public</option>
          <option value={true}>Private</option>
        </PrivacySelect>
        {console.log(createPlaylistFormInput.public)}
        <Button
          disabled={!createPlaylistFormInput?.name || createPlaylistFormInput?.public === undefined || isLoading}
          onClick={() => handleCreatePlaylistSubmit()}
        >
          Create
        </Button>
      </CreatePlaylistForm>
    </StyledCard>
  )
}
