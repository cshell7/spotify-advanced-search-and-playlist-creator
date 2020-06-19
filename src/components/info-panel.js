import React, { Fragment } from 'react'
import styled from 'styled-components'

import { AuthButton } from './auth-button'
import { colors, audioFeaturesDescriptions } from '../consts'
import infoIcon from '../img/info-icon.png'
import { CloseButton } from './close-button'
import { PlayPauseButton, AddButton, SimilarsButton, ExplicitIcon } from './row'
import playIcon from '../img//play-icon.png'

const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  max-width: calc(100vw - 80px);
  height: 100%;
  padding: 32px 16px;
  color: ${colors.spotifyBlack};
  background: ${colors.white};
  border-left: 4px solid ${colors.gray};
  z-index: 1;
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.2s;
  overflow: auto;

  ${AuthButton} {
    margin: 8px auto;
  }
`

const PanelHeader = styled.h4`
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  margin: 0;
`

const Label = styled.h2`
  display: flex;
  font-size: 16px;
  margin: 0;
  margin-top: 16px;
  font-weight: 600;
  align-items: center;
`

const Description = styled.p`
  font-size: ${({ large }) => (large ? 16 : 14)}px;
  margin: 0;
`

const Divider = styled.div`
  height: 4px;
  width: 100%;
  margin: 16px 0;
  background-color: ${colors.spotifyGreen};
`

const Background = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.spotifyBlack};
  opacity: ${({ isOpen }) => (isOpen ? 0.7 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  transition: opacity 0.2s;
  cursor: pointer;
`

const ReAuthContainer = styled.div`
  display: flex;
`

const Control = styled.span`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  background-color: ${colors.spotifyBlack};
`

const ControlsContainer = styled.span`
  display: flex;
  padding: 4px;
  align-items: center;

  span {
    margin: 0;
    padding-left: 8px;
    align-self: center;
  }

  ${Control} {
    padding: 0;
  }
`

const ExplicitIconContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  background-color: ${colors.spotifyBlack};
  margin-right: 8px;
`

export const InfoPanel = ({ isOpen, close = () => {} }) => {
  return (
    <>
      <Panel isOpen={isOpen}>
        <CloseButton onClick={close} />
        <PanelHeader>Info</PanelHeader>
        <Label>How to use:</Label>
        <Description large>
          Find the perfect song for you playlist by searching by any number of params. The only required parameters is
          'genre' and you can pick up to three of those. You can click on the column headers to sort the results. Select
          a playlist (if you don't have any listed go create one in the Spotify app then refresh this page) and then
          press the '+' button to add that song to your playlist. The results table is scrollable both horizontally and
          vertically.
        </Description>
        <Divider />
        <ReAuthContainer>
          <p>If your auth expires click here:</p>
          <AuthButton />
        </ReAuthContainer>
        <Divider />
        <Label>Controls</Label>
        <Description>
          <ControlsContainer>
            <Control>
              <PlayPauseButton src={playIcon} />
            </Control>
            <span>Play/Pause a 30s preview of the song if one is available.</span>
          </ControlsContainer>
          <ControlsContainer>
            <Control>
              <AddButton />
            </Control>
            <span>Add this song to your selected playlist.</span>
          </ControlsContainer>
          <ControlsContainer>
            <Control>
              <SimilarsButton>S</SimilarsButton>
            </Control>
            <span>Search for song similar to this song.</span>
          </ControlsContainer>
        </Description>
        <Divider />
        <Label>Name</Label>
        <Description>The name of the song. Click this to open the song in the Spotify app.</Description>
        <Label>
          <ExplicitIconContainer>
            <ExplicitIcon />
          </ExplicitIconContainer>
          Explicit
        </Label>
        <Description>Whether or not the track has explicit lyrics</Description>
        {Object.values(audioFeaturesDescriptions).map(({ label, description }, i) => (
          <Fragment key={i}>
            <Label>{label}</Label>
            <Description>{description}</Description>
          </Fragment>
        ))}
      </Panel>
      <Background isOpen={isOpen} onClick={close} />
    </>
  )
}

const InfoIcon = styled.img.attrs(() => ({
  src: infoIcon,
}))`
  height: 32px;
  width: 32px;
  cursor: pointer;
`

export const InfoPanelButton = ({ onClick, className }) => {
  return <InfoIcon onClick={onClick} className={className} />
}
