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
    <Card.Container>
      <Card>
        <Card.Header>We're doomed!!! Well probably not but something did go wrong with this app</Card.Header>
        <Card.Copy>{error?.message || 'Try refreshing the page'}</Card.Copy>
        <Card.Copy>{error?.link ? <Link href={error.link}>{error.code}</Link> : error?.code}</Card.Copy>
      </Card>
    </Card.Container>
  )
}
