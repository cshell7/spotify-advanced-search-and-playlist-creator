import React from 'react'
import styled, { keyframes } from 'styled-components'

import { colors } from '../consts'

const bounce = keyframes`
  0%, 50%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  75% {
    transform: scale(1.4);
    opacity: 1;

  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Dot = styled.div`
  width: 3vw;
  height: 3vw;
  border-radius: 100%;
  margin: 2vw;
  background-color: ${colors.spotifyGreen};
  animation: ${bounce} 1.5s 0.5s linear infinite;
  animation-delay: ${({ animationDelay }) => animationDelay}s;
`

export const Loader = () => {
  return (
    <Container>
      <Dot animationDelay={0} />
      <Dot animationDelay={0.2} />
      <Dot animationDelay={0.3} />
    </Container>
  )
}
