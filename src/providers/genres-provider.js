import React, { useState, useEffect, createContext, useContext } from 'react'
import cookies from 'js-cookie'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'

const SpotityGenresContext = createContext({})

export const SpotifyGenresProvider = ({ children }) => {
  const { fetchData, isAuthed } = useSpotityAPI()

  const cachedGenres = cookies.get('genres')
  const [isLoading, setIsLoading] = useState(!cachedGenres && cachedGenres !== 'undefined')
  const [genres, setGenres] = useState(cachedGenres && cachedGenres !== 'undefined' && JSON.parse(cachedGenres))
  const [error, setError] = useState()
  useEffect(() => {
    if (isAuthed && !genres?.length && !error) {
      setIsLoading(true)
      fetchData('recommendations/available-genre-seeds')
        .then(({ genres }) => {
          cookies.set('genres', JSON.stringify(genres), { expires: 7 })
          setGenres(genres)
        })
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false))
    }
  }, [isAuthed, genres, error, fetchData])

  return (
    <SpotityGenresContext.Provider
      value={{
        genres,
        error,
        isLoading,
      }}
    >
      {children}
    </SpotityGenresContext.Provider>
  )
}

export const useSpotityGenres = () => {
  const { genres, error, isLoading } = useContext(SpotityGenresContext)
  return {
    genres,
    error,
    isLoading,
  }
}
