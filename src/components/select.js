import styled from 'styled-components'
import { colors } from '../consts'

import { Button } from './button'

export const Select = styled(Button).attrs(() => ({
  as: 'select',
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 8px;
  border: none;
  border-radius: 2px;
  background-color: ${colors.spotifyGreen};
  color: ${colors.white};
  font-size: 14px;
  line-height: 1;
  text-align: center;
  white-space: 'nowrap';
  cursor: pointer;
  outline: none;
  font-weight: 600;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:hover:not([disabled]) {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.9;
  }

  &:focus {
    border: 1px solid ${colors.spotifyBlack};
  }

  &[disabled] {
    background-color: ${colors.gray};
  }
`
