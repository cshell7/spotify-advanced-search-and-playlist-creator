import styled from 'styled-components'

export const DynamicFontSize = styled.p`
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
