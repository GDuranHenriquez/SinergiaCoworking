import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components'

function HomePages(){

  return <ContinerHomePage>
    <BackGroundGlobal></BackGroundGlobal>    
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
    width: 100%;
  /* height: 100vh; */
  padding-top: calc(100vh * (0.1));

`

export default HomePages;