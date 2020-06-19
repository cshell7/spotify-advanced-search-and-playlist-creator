import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'
import cookies from 'js-cookie'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'
import { useSpotityUserData } from './user-data-provider'

import { getOwnedPlaylists, getCleanPlaylistsObject, getCleanedPlaylistObject } from '../utils'

const ONE_HOUR = 1 / 24

const UserPlaylistsContext = createContext({})

export const UserPlaylistsProvider = ({ children }) => {
  const { fetchData, isAuthed } = useSpotityAPI()
  const { user } = useSpotityUserData()

  // Get list of user's playlists
  const cachedPlaylistsObject = cookies.get('playlistsObject')
  const [isLoading, setIsLoading] = useState(!cachedPlaylistsObject && cachedPlaylistsObject !== 'undefined')
  const [playlistsObject, setPlaylistsObject] = useState(
    cachedPlaylistsObject && cachedPlaylistsObject !== 'undefined' && JSON.parse(cachedPlaylistsObject)
  )
  const [error, setError] = useState()
  const handleFetchPlaylists = useCallback(
    () =>
      fetchData('me/playlists?limit=50').then((playlistsObject) => {
        if (playlistsObject?.next) handleFetchRemainingPlaylists(playlistsObject)
        else {
          const filteredPlaylists = getOwnedPlaylists(playlistsObject?.items || [], user?.id)
          const newPlaylistsObject = getCleanPlaylistsObject({ ...playlistsObject, items: filteredPlaylists })
          cookies.set('playlistsObject', JSON.stringify(newPlaylistsObject), {
            expires: ONE_HOUR,
          })
          setPlaylistsObject(newPlaylistsObject)
        }
      }),
    [fetchData, setPlaylistsObject]
  )
  const handleFetchRemainingPlaylists = (playlistsObject) => {
    const { next, items: previousItems } = playlistsObject
    return fetchData(`me/playlists/?${next.replace(/.*[?|#]/, '')}`).then((newData) => {
      if (newData?.next)
        handleFetchRemainingPlaylists({
          ...newData,
          items: [...previousItems, ...newData?.items],
        })
      else {
        const newPlaylistsObject = getCleanPlaylistsObject({
          ...newData,
          items: getOwnedPlaylists([...previousItems, ...newData?.items], user?.id),
        })
        cookies.set('playlistsObject', JSON.stringify(newPlaylistsObject), {
          expires: ONE_HOUR,
        })
        setPlaylistsObject(newPlaylistsObject)
      }
    })
  }
  useEffect(() => {
    if (isAuthed && user && !playlistsObject && !error) {
      setIsLoading(true)
      handleFetchPlaylists()
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false))
    }
  }, [user, playlistsObject, error, isAuthed, fetchData])

  const [activePlaylistId, setActivePlaylistId] = useState()
  const [activePlaylist, setActivePlaylist] = useState()

  // Get contents of the active playlist
  const handleFetchActivePlaylist = useCallback(() => {
    fetchData(`playlists/${activePlaylistId}/tracks`).then((data) => {
      if (data?.next) handleFetchActivePlaylistRemaining(data)
      else setActivePlaylist(getCleanedPlaylistObject(data))
    })
  }, [activePlaylistId, fetchData, setActivePlaylist])
  const handleFetchActivePlaylistRemaining = (data) => {
    const { next, items: previousItems } = data
    fetchData(`playlists/${activePlaylistId}/tracks?${next.replace(/.*[?|#]/, '')}`).then((newData) => {
      if (newData?.next)
        handleFetchActivePlaylistRemaining({
          ...newData,
          items: [...previousItems, ...newData?.items],
        })
      else
        setActivePlaylist(
          getCleanedPlaylistObject({
            ...newData,
            items: [...previousItems, ...newData?.items],
          })
        )
    })
  }
  useEffect(() => {
    if (activePlaylistId) handleFetchActivePlaylist()
  }, [activePlaylistId, handleFetchActivePlaylist])

  // Save and remove songs from the active playlist
  const [isUpdatingPlaylist, setIsUpdatingPlaylist] = useState(false)
  const [updatingPlaylistError, setUpdatingPlaylistError] = useState()
  const saveSongToPlaylist = (uri, id) => {
    setIsUpdatingPlaylist(id)
    fetchData(`playlists/${activePlaylistId}/tracks?uris=${uri}`, 'POST')
      .then(() => {
        return handleFetchActivePlaylist()
      })
      .catch((error) => {
        setUpdatingPlaylistError(error)
        console.error('Saving song to playlist error:', error)
      })
      .finally(() => setIsUpdatingPlaylist(false))
  }
  const removeSongFromPlaylist = (uri, id) => {
    const body = {
      tracks: [{ uri }],
    }
    setIsUpdatingPlaylist(id)
    fetchData(`playlists/${activePlaylistId}/tracks`, 'DELETE', JSON.stringify(body))
      .then(() => {
        return handleFetchActivePlaylist()
      })
      .catch((error) => {
        setUpdatingPlaylistError(error)
        console.error('Removing song from playlist error:', error)
      })
      .finally(() => setIsUpdatingPlaylist(false))
  }

  // Create new playlist
  const [isCreatingNewPlaylistLoading, setIsCreatingNewPlaylistLoading] = useState(false)
  const [creatingNewPlaylistError, setCreatingNewPlaylistError] = useState()
  const createPlaylistSubmit = (createPlaylistFormInput) => {
    setIsCreatingNewPlaylistLoading(true)
    return fetchData(`users/${user.id}/playlists`, 'POST', JSON.stringify(createPlaylistFormInput))
      .then(({ id }) => {
        setActivePlaylistId(id)
        return handleFetchPlaylists()
      })
      .catch((error) => {
        setCreatingNewPlaylistError(error)
        console.error(error)
      })
      .finally(() => setIsCreatingNewPlaylistLoading(false))
  }

  return (
    <UserPlaylistsContext.Provider
      value={{
        playlists: playlistsObject?.items || [],
        activePlaylistId,
        error,
        isLoading,
        isUpdatingPlaylist,
        updatingPlaylistError,
        activePlaylist,
        setActivePlaylistId,
        saveSongToPlaylist,
        removeSongFromPlaylist,
        setPlaylistsObject,
        createPlaylistSubmit,
        isCreatingNewPlaylistLoading,
        creatingNewPlaylistError,
      }}
    >
      {children}
    </UserPlaylistsContext.Provider>
  )
}

// TODO this should probably be multiple hooks.
export const useUserPlaylists = () => {
  const {
    playlists,
    activePlaylistId,
    isLoading,
    isUpdatingPlaylist,
    updatingPlaylistError,
    activePlaylist,
    error,
    setActivePlaylistId,
    saveSongToPlaylist,
    removeSongFromPlaylist,
    setPlaylistsObject,
    createPlaylistSubmit,
    isCreatingNewPlaylistLoading,
    creatingNewPlaylistError,
  } = useContext(UserPlaylistsContext)
  return {
    playlists,
    activePlaylistId,
    isLoading,
    isUpdatingPlaylist,
    updatingPlaylistError,
    activePlaylist,
    error,
    setActivePlaylistId,
    saveSongToPlaylist,
    removeSongFromPlaylist,
    setPlaylistsObject,
    createPlaylistSubmit,
    isCreatingNewPlaylistLoading,
    creatingNewPlaylistError,
  }
}
