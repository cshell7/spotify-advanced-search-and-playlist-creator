import { createGlobalStyle } from 'styled-components'

import { colors } from './consts'

export const GlobalStyles = createGlobalStyle`
  body {
    color: ${colors.white};
    background-color: ${colors.spotifyBlack};
    font-family: Helvetica,Arial,sans-serif;
    font-size: 16px;
    line-height: 1.4;
    margin: 0;
    font-weight: 100;
  }
  *  {
    box-sizing: border-box;
  }
  html, body, #root {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
`
