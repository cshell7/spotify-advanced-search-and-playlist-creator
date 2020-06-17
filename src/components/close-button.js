import styled from 'styled-components'
import closeIcon from '../img/close-icon.png'
import closeIconWhite from '../img/close-icon-white.png'

export const CloseButton = styled.img.attrs(({ isWhite }) => ({
  src: isWhite ? closeIconWhite : closeIcon,
}))`
  position: absolute;
  top: 12px;
  right: 12px;
  height: 24px;
  width: 24px;
  cursor: pointer;
`
