import styled, { css } from 'styled-components'

import { colors } from '../consts'

const baseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 8px 12px;
  border: none;
  border-radius: 2px;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  white-space: 'nowrap';
  cursor: pointer;
  outline: none;
  font-weight: 100;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:hover:not([disabled]) {
    opacity: 0.8;
  }
`

const baseStylesFilled = css`
  ${baseStyles}
  color: ${colors.white};
  background-color: ${colors.spotifyGreen};

  &:active {
    opacity: 0.9;
  }

  &:focus {
    border: 1px solid ${colors.spotifyBlack};
    outline: 1px solid ${colors.white};
    outline-offset: 1px;
  }

  &[disabled] {
    background-color: ${colors.gray};
  }
`

const baseStylesOutlined = css`
  ${baseStyles}
  color: ${colors.white};
  background-color: ${colors.spotifyBlack};
  border: 1px solid ${colors.spotifyGreen};
  
  &:active {
    border: 1px solid ${colors.spotifyGreen};
  }

  &:focus {
    border: 1px solid ${colors.spotifyGreen};
    outline: 1px solid ${colors.gray};
    outline-offset: 1px;
  }

  &[disabled] {
    background-color: ${colors.gray};
  }
`

const grayedUntilFilled = css`
  border: 1px solid ${({ value, isSelected }) => (value || isSelected ? colors.spotifyGreen : colors.gray)};
  &:active {
    border: 1px solid ${({ value, isSelected }) => (value || isSelected ? colors.spotifyGreen : colors.gray)};
  }

  &:focus {
    border: 1px solid ${({ value, isSelected }) => (value || isSelected ? colors.spotifyGreen : colors.gray)};
  }
`

export const Input = styled.input`
  ${({ outline }) => (outline ? baseStylesOutlined : baseStylesFilled)}
  ${({ highlightFilled, outline }) => outline && highlightFilled && grayedUntilFilled}
`

export const Select = styled.select`
  ${({ outline }) => (outline ? baseStylesOutlined : baseStylesFilled)}
  ${({ highlightFilled, outline }) => outline && highlightFilled && grayedUntilFilled}
`

export const Button = styled.button`
  ${({ outline }) => (outline ? baseStylesOutlined : baseStylesFilled)}
  ${({ highlightFilled, outline }) => outline && highlightFilled && grayedUntilFilled}
`
