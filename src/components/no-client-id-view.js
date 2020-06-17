import React from 'react'
import { Card } from './card'

export const NoClientIdView = () => {
  return (
    <Card>
      <Card.Header>No clientId supplied to the spotify api hook.</Card.Header>
      <Card.Copy>
        If you <bold>are not</bold> the developer of this app please go tell them that they messed up. If you{' '}
        <bold>are</bold> the developer, you messed up. Please fix this.
      </Card.Copy>
    </Card>
  )
}
