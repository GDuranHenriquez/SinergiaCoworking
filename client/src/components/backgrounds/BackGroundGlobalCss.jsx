import styled from 'styled-components'

export const BackgrounContainer = styled.div`
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -10;
  padding: 0;
  margin: 0;
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: brightness(90%);
  }
`