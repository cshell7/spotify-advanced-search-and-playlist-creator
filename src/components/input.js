import styled from 'styled-components'
import { colors } from '../consts'

export const Input = styled.input`
  padding: 8px;
  border: 1px solid ${colors.gray};

  &:active,
  &:focus {
    border: 1px solid ${colors.spotifyGreen};
    outline: none;
  }
`
