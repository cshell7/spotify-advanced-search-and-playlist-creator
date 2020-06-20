import React, { useState, useEffect, createContext, useContext } from 'react'
import cookies from 'js-cookie'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'

const SpotityUserDataContext = createContext({})

export const SpotifyUserDataProvider = ({ children }) => {
  const { fetchData, isAuthed } = useSpotityAPI()

  const cachedUser = cookies.get('spotifyUser')
  const [isLoading, setIsLoading] = useState(!cachedUser && cachedUser !== 'undefined')
  const [user, setUser] = useState(cachedUser && cachedUser !== 'undefined' && JSON.parse(cachedUser))
  const [error, setError] = useState()
  useEffect(() => {
    if (isAuthed && !user && !error) {
      setIsLoading(true)
      fetchData('me')
        .then((user) => {
          setUser(user)
          cookies.set('spotifyUser', JSON.stringify(user), { expires: 7 })
        })
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false))
    }
  }, [user, error, isAuthed, fetchData])

  return (
    <SpotityUserDataContext.Provider
      value={{
        user,
        error,
        isLoading,
      }}
    >
      {children}
    </SpotityUserDataContext.Provider>
  )
}

export const useSpotityUserData = () => {
  const { user, error, isLoading } = useContext(SpotityUserDataContext)
  return {
    user,
    error,
    isLoading,
  }
}
