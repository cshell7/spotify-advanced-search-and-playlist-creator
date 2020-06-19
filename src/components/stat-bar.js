import React from 'react'
import styled from 'styled-components'

import { colors } from '../consts'

const BAR_HEIGHT = 12

const StatBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 64px;
`
const Bar = styled.div.attrs(({ percentage }) => ({
  style: {
    width: `${percentage}%`,
  },
}))`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  min-width: 4px;
  height: ${BAR_HEIGHT}px;
  background-color: ${({ lowValueColor }) => lowValueColor};
`

const BarColor = styled.div.attrs(({ percentage }) => ({
  style: {
    opacity: (percentage - (110 - percentage) * 0.1) / 100,
  },
}))`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${({ highValueColor }) => highValueColor};
`

const Borders = styled.div.attrs(({ percentage }) => ({
  style: {
    width: `${100 - percentage}%`,
  },
}))`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  height: ${BAR_HEIGHT}px;
  border-top: 1px solid ${colors.gray};
  border-right: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
  box-sizing: border-box;
  opacity: 0.4;
`

export const StatBar = ({ percentage, lowValueColor = colors.gray, highValueColor = colors.spotifyGreen }) => {
  return (
    <StatBarContainer>
      <Bar percentage={percentage} lowValueColor={lowValueColor}>
        <BarColor percentage={percentage} highValueColor={highValueColor} />
      </Bar>
      <Borders percentage={percentage} />
    </StatBarContainer>
  )
}
