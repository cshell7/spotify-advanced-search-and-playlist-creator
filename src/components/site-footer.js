import React from 'react'
import styled from 'styled-components'

import { colors, createdByLink, gitHubLink, feedbackLink, FOOTER_HEIGHT } from '../consts'

import gitHubIcon from '../img/github-icon.png'

const StyledSiteFooter = styled.footer`
  display: flex;
  width: 100vw;
  height: ${FOOTER_HEIGHT}px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
  border-top: 1px solid ${colors.gray};
  background-color: ${colors.spotifyBlack};
`

const CreatedBy = styled.a.attrs(() => ({
  href: createdByLink,
  target: '_blank',
}))`
  margin: 0;
  padding-right: 8px;
  color: ${colors.white};
  font-size: 12px;
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

const FeedbackLink = styled.a.attrs(() => ({
  target: '_blank',
  href: feedbackLink,
}))`
  font-size: 12px;
  color: ${colors.spotifyGreen};
  margin-right: auto;
  text-decoration: none;
`

export const SiteFooter = () => {
  return (
    <StyledSiteFooter>
      <FeedbackLink>Have feedback?</FeedbackLink>
      <CreatedBy>Created by Calvin Shell</CreatedBy>
      <GitHubLink>
        <GitHubLogo />
      </GitHubLink>
    </StyledSiteFooter>
  )
}
