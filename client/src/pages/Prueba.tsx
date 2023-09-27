import BackGroundGlobal from "../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components'
import ButtonFilter from "../features/Cards/navBarFilter/BottonFilter";


function Prueba(){

  return <ContinerHomePage>
    <h1>hola</h1>
    <BackGroundGlobal></BackGroundGlobal> 
    <ButtonFilter text="hola" ></ButtonFilter>
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
    width: 100%;
  /* height: 100vh; */
  padding-top: calc(100vh * (0.1));
`

export default Prueba;