import React from 'react'
import styled from 'styled-components'
import { colors } from '../consts'

const StyledPageHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 64px;
  padding: 0 40px 0 16px;
  background-color: ${colors.spotifyBlack};
  border-bottom: 8px solid ${colors.spotifyGreen};
`

const SpotifyLogo = styled.img.attrs(() => ({
  src: '/spotify-logo.png',
}))`
  height: 32px;
  align-self: center;
  @media (max-width: 600px) {
    height: 24px;
  }
`

const DynamicFontSize = styled.p`
  font-size: ${({ max, min }) => (max + min) / 2}px;
  font-size: calc(
    ${({ min }) => min}px + (${({ max, min }) => max - min}) *
      ((100vw - ${({ screenMin }) => screenMin}px) / (${({ screenMax, screenMin }) => screenMax - screenMin}))
  );
  @media (min-width: ${({ screenMax }) => screenMax}px) {
    font-size: ${({ max }) => max}px;
  }
  @media (max-width: ${({ screenMin }) => screenMin}px) {
    font-size: ${({ min }) => min}px;
  }
`

const Title = styled(DynamicFontSize).attrs(() => ({
  as: 'h1',
  min: 16,
  max: 32,
  screenMin: 500,
  screenMax: 900,
}))`
  font-weight: 400;
  margin: auto;
`

export const PageHeader = () => {
  return (
    <StyledPageHeader>
      <SpotifyLogo />
      <Title>Advanced Search and Playlist Creator for Spotify</Title>
    </StyledPageHeader>
  )
}
