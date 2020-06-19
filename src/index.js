import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { SpotifyAPIProvider } from '@c-shell/spotify-api-hook'
import styled from 'styled-components'

import * as serviceWorker from './serviceWorker'
import { GlobalStyles } from './global-styles'
import { Page } from './page'
import { PageHeader } from './components/page-header'
import { PageFooter } from './components/page-footer'

const clientId = process.env.REACT_APP_CLIENT_ID

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  display: flex;
  flex: 1 0 auto;
  overflow: hidden;
  max-height: calc(100vh - 64px - 24px);
`

// TODO add tracking all the places

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AppContainer>
      <BrowserRouter>
        <SpotifyAPIProvider clientId={clientId}>
          <PageHeader />
          <Main>
            <Page />
          </Main>
          <PageFooter />
        </SpotifyAPIProvider>
      </BrowserRouter>
    </AppContainer>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
