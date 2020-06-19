import React from 'react'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'

import { NoClientIdView } from './components/no-client-id-view'
import { ErrorView } from './components/error-view'
import { AuthorizationView } from './components/authorization-view'
import { AdvancedSearchView } from './components/advanced-search-view'

const clientId = process.env.REACT_APP_CLIENT_ID

export const App = () => {
  const { isAuthed, error } = useSpotityAPI()

  if (!clientId) return <NoClientIdView />
  else if (error) return <ErrorView />
  else if (!isAuthed) return <AuthorizationView />
  else return <AdvancedSearchView />
}
