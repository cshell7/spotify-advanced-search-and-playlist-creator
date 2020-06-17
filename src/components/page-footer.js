import React from 'react'
import styled from 'styled-components'
import { colors, createdByLink, gitHubLink } from '../consts'
import gitHubIcon from '../img/github-icon.png'

const StyledPageFooter = styled.footer`
  display: flex;
  width: 100vw;
  height: 24px;
  border-top: 1px solid ${colors.gray};
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
  background-color: ${colors.spotifyBlack};
`

const CreatedBy = styled.a.attrs(() => ({
  href: createdByLink,
  target: '_blank',
}))`
  margin: 0;
  font-size: 8px;
  padding-right: 8px;
  color: ${colors.white};
  text-decoration: none;
`
const GitHubLink = styled.a.attrs(() => ({
  href: gitHubLink,
  target: '_blank',
}))`
  height: 16px;
  width: 16px;
  margin-bottom: 4px;
`

const GitHubLogo = styled.img.attrs(() => ({
  src: gitHubIcon,
}))`
  height: 100%;
`

export const PageFooter = () => {
  return (
    <StyledPageFooter>
      <CreatedBy>Created by Calvin Shell</CreatedBy>
      <GitHubLink>
        <GitHubLogo />
      </GitHubLink>
    </StyledPageFooter>
  )
}
