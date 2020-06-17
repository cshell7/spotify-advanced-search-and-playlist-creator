import React from 'react'
import styled from 'styled-components'

import { Card } from './card'
import { AuthButton } from './auth-button'

const StyledCard = styled(Card)`
  ${AuthButton} {
    margin: 0 auto;
  }
`

export const AuthorizationView = () => {
  return (
    <StyledCard>
      <Card.Header>Please link your Spotify account to continue</Card.Header>
      <Card.Copy>
        This authorization is temporary and allows spotify to search for songs for your and save them to a playlist. You
        will be taken to Spotify's site to login then redirected back here. I don't store any of your data.
      </Card.Copy>
      <AuthButton />
    </StyledCard>
  )
}
