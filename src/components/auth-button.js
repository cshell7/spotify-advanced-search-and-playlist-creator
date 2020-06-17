import React from 'react'
import { useSpotityAPI } from '@c-shell/spotify-api-hook'
import styled from 'styled-components'

import { SCOPE } from '../consts'

import { Button } from './button'

const redirectUri = process.env.REACT_APP_REDIRECT_URL

export const AuthButton = styled(({ className }) => {
  const { getUserAccessToken, isAuthed } = useSpotityAPI()

  return (
    <Button onClick={() => getUserAccessToken({ redirectUri, scope: SCOPE })} className={className}>
      {isAuthed ? 'Reauth' : 'Auth'}
    </Button>
  )
})``
