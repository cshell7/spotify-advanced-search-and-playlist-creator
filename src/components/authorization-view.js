import React from 'react'
import styled from 'styled-components'

import { Card } from './card'
import { AuthButton } from './auth-button'

const StyledCard = styled(Card)`
  align-self: flex-start;

  ${AuthButton} {
    margin: 0 auto;
  }
`

export const AuthorizationView = () => {
  return (
    <Card.Container>
      <StyledCard>
        <Card.Header>Please link your Spotify account to continue</Card.Header>
        <Card.Copy>
          This authorization is temporary and allows spotify to search for songs and save them to your playlists. You
          will be taken to Spotify's site to login then redirected back here. I don't collect any of your data. Best of
          luck finding new songs and creating that perfect playlist!
        </Card.Copy>
        <AuthButton />
      </StyledCard>
    </Card.Container>
  )
}
