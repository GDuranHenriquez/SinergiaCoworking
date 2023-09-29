import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import { styled } from "styled-components";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import SliderCarousel from "../../features/Navigation/Carrousel/Slider";

import portada from "../../assets/portada.jpg";
import notebook from "../../assets/notebook.jpg";
import oficina from "../../assets/oficina.jpg";
import NavbarFilter from "../../features/Cards/NavbarFilter/NavbarFilter";
import Cards from "../../features/Cards/Cards";

function HomePages() {
  return (
    <ContinerHomePage>
      <BackGroundGlobal></BackGroundGlobal>
      <NavBarNavigation></NavBarNavigation>
      <div className="firstPage">
        <SliderCarousel
          imageOne={portada}
          imageTwo={notebook}
          imageThree={oficina}
        ></SliderCarousel>
      </div>
      <div className="secondPage">
        <NavbarFilter></NavbarFilter>
        <Cards></Cards>   
      </div>
    </ContinerHomePage>
  );
}

const ContinerHomePage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: calc(100vh * (1 - 0.1));
  width: 100%;
  /* padding-top: calc(100vh * 0.1); */
  .firstPage{
    width: 100%;
    min-height: calc(100vh * (1 - 0.1));
    display: flex;
  flex-wrap: wrap;
  align-items: center;
  }
  .secondPage{
    /* background-color: rgba(31, 37, 81, 0.6); */
    width: 100%;
    height: max-content;
  
  }
`;

export default HomePages;
