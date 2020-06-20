import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { SpotifyAPIProvider } from '@c-shell/spotify-api-hook'
import { SpotifyUserDataProvider } from './providers/user-data-provider'
import { UserPlaylistsProvider } from './providers/playlists-provider'
import { SpotifyGenresProvider } from './providers/genres-provider'

import * as serviceWorker from './serviceWorker'

import { HEADER_HEIGHT, FOOTER_HEIGHT } from './consts'

import { GlobalStyles } from './global-styles'
import { App } from './app'
import { SiteHeader } from './components/site-header'
import { SiteFooter } from './components/site-footer'

const clientId = process.env.REACT_APP_CLIENT_ID

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  padding: 64px 0 24px;
  display: flex;
  flex: 1 0 auto;
  // max-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AppContainer>
      <BrowserRouter>
        <SpotifyAPIProvider clientId={clientId}>
          <SpotifyUserDataProvider>
            <UserPlaylistsProvider>
              <SpotifyGenresProvider>
                <SiteHeader />
                <Main>
                  <App />
                </Main>
                <SiteFooter />
              </SpotifyGenresProvider>
            </UserPlaylistsProvider>
          </SpotifyUserDataProvider>
        </SpotifyAPIProvider>
      </BrowserRouter>
    </AppContainer>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
