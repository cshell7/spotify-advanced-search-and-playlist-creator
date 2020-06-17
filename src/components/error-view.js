import React from 'react'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'
import styled from 'styled-components'

import { Card } from './card'
import { colors } from '../consts'

const Link = styled.a`
  color: ${colors.spotifyGreen};
  text-decoration: none;
`

export const ErrorView = () => {
  const { error } = useSpotityAPI()

  return (
    <Card>
      <Card.Header>Something Bad Happened!</Card.Header>
      <Card.Copy>{error.message}</Card.Copy>
      <Card.Copy>
        <Link href={error.link}>{error.code}</Link>
      </Card.Copy>
    </Card>
  )
}
