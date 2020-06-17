import React from 'react'
import { Card } from './card'

export const NoClientIdView = () => {
  return (
    <Card.Container>
      <Card>
        <Card.Header>No 'clientId' supplied to the spotify api hook.</Card.Header>
        <Card.Copy>
          If you <b>are not</b> the developer of this app please go tell them that they messed up.
        </Card.Copy>
        <Card.Copy>
          If you <b>are</b> the developer, you messed up. Please fix this.
        </Card.Copy>
      </Card>
    </Card.Container>
  )
}
