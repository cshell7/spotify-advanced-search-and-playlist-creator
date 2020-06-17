import React from 'react'
import styled from 'styled-components'
import { colors } from '../consts'

const StatBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 64px;
  display: flex;
  align-content: center;
`
const Bar = styled.div`
  position: relative;
  width: ${({ percentage }) => percentage}%;
  min-width: 4px;
  height: 12px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
  }
  &::before {
    background-color: ${({ lowValueColor }) => lowValueColor};
  }
  &::after {
    background-color: ${({ highValueColor }) => highValueColor};
    opacity: ${({ percentage, fadeRate }) => (percentage - (110 - percentage) * fadeRate) / 100};
  }
`

const Background = styled.div.attrs(({ percentage }) => ({
  style: {
    width: `${100 - percentage}%`,
  },
}))`
  position: absolute;
  right: 0;
  height: 100%;
  border-top: 1px solid ${colors.gray};
  border-right: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
  box-sizing: border-box;
  opacity: 0.4;
`

export const StatBar = ({
  percentage,
  lowValueColor = colors.gray,
  highValueColor = colors.spotifyGreen,
  fadeRate = 0.1,
}) => {
  return (
    <StatBarContainer>
      <Bar percentage={percentage} lowValueColor={lowValueColor} highValueColor={highValueColor} fadeRate={fadeRate} />
      <Background percentage={percentage} />
    </StatBarContainer>
  )
}
