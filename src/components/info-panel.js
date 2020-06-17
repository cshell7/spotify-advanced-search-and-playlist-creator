import React, { Fragment } from 'react'
import styled from 'styled-components'

import { AuthButton } from './auth-button'
import { colors, audioFeaturesDescriptions } from '../consts'
import infoIcon from '../img/info-icon.png'
import { CloseButton } from './close-button'
const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
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
  font-size: 24px;
  font-weight: 400;
  margin: 0;
`

const Label = styled.h2`
  font-size: 14px;
  margin: 0;
  font-weight: 600;
`

const Description = styled.p`
  font-size: 12px;
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

export const InfoPanel = ({ isOpen, close = () => {} }) => {
  return (
    <>
      <Panel isOpen={isOpen}>
        <CloseButton onClick={close} />
        <PanelHeader>Info</PanelHeader>
        <AuthButton />
        <Label>How to use:</Label>
        <Description>
          Find the perfect song for you playlist by searching by any number of params. The only required param is
          'genre' and you can pick up to three of those. You can click on the column headers to sort the results. Select
          a playlist(if you don't have any listed go created on in your spotify app) and then press the '+' button on
          the right of the table to add that song to your playlist.
        </Description>
        <Divider />
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
