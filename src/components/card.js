import styled from 'styled-components'
import { colors } from '../consts'

export const Card = styled.div`
  margin: auto;
  padding: 24px;
  border: 1px solid ${colors.white};
  border-radius: 4px;
  width: 480px;
  background-color: ${colors.spotifyBlack};
`

const CardHeader = styled.h3`
  margin: 0;
  padding-bottom: 4px;
  text-align: center;
  font-weight: 100;
  border-bottom: 4px solid ${colors.gray};
`

const CardCopy = styled.p`
  color: ${colors.white};
  text-align: center;
  font-weight: 100;
`

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  overflow: auto;
`

Card.Header = CardHeader
Card.Copy = CardCopy
Card.Container = CardContainer
