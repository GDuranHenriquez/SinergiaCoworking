import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components'
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import SliderCarousel from "../../features/Navigation/Carrousel/Slider";

import portada from '../../assets/portada.jpg';
import notebook from '../../assets/notebook.jpg';
import oficina from '../../assets/oficina.jpg';

function HomePages(){

  return <ContinerHomePage>
    <BackGroundGlobal></BackGroundGlobal> 
    <NavBarNavigation></NavBarNavigation>
    <SliderCarousel imageOne={portada} imageTwo={notebook} imageThree={oficina} ></SliderCarousel>
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: calc(100vh * (1 - 0.1));;
  width: 100%;    
  padding-top: calc(100vh*0.1);

`

export default HomePages;