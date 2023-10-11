import BackGroundGlobal from "../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components'
import NavbarFilter from "../features/Cards/navBarFilter/NavbarFilter";
import Cards from "../features/Cards/Cards";



function Prueba(){

  return <ContinerHomePage>
    <h1>hola</h1>
    <BackGroundGlobal></BackGroundGlobal> 
    <NavbarFilter></NavbarFilter>
    <Cards></Cards>    
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
    width: 100%;
  /* height: 100vh; */
  padding-top: calc(100vh * (0.1));
`

export default Prueba;