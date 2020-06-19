import React from 'react'
import styled from 'styled-components'

import { breakpoints, colors, HEADER_HEIGHT } from '../consts'

import spotifyLogo from '../img/spotify-logo.png'
import { DynamicFontSize } from './dynamic-font-size'

const StyledSiteHeader = styled.header`
  display: flex;
  width: 100vw;
  height: ${HEADER_HEIGHT}px;
  padding: 0 48px 0 16px;
  border-bottom: 8px solid ${colors.spotifyGreen};
  background-color: ${colors.spotifyBlack};
`

const SpotifyLogo = styled.img.attrs(() => ({
  src: spotifyLogo,
}))`
  height: 32px;
  align-self: center;

  @media (max-width: ${breakpoints.sm}px) {
    height: 20px;
  }
`

const Title = styled(DynamicFontSize).attrs(() => ({
  as: 'h1',
  min: 14,
  max: 32,
  screenMin: breakpoints.sm,
  screenMax: breakpoints.lg,
}))`
  font-weight: 400;
  margin: auto;
  padding: 0 8px;
  text-align: center;
`

export const SiteHeader = () => {
  return (
    <StyledSiteHeader>
      <SpotifyLogo />
      <Title>Advanced Search and Playlist Creator for Spotify</Title>
    </StyledSiteHeader>
  )
}
