import React,{useEffect} from "react";
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import { styled } from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import SliderCarousel from "../../features/Navigation/Carrousel/Slider";
import NavbarFilter from "../../features/Cards/navBarFilter/NavbarFilter";
import Cards from "../../features/Cards/Cards";
import FooterSection from "../../components/Footer/Footer";
import { useCustomDispatch, useCustomSelector } from "../../hooks/redux";
import { getAllBuildings } from "../../redux/slices/building/actionsBuilding";
import MapStatic from "../../components/Map/MapStatic"
import ImgExtra from "../../features/ImgExtra";

function HomePages() {

  const dispatch = useCustomDispatch();
  const allBuildings = useCustomSelector((state) => state.buildin.allBuildings);
  const noDeletedBuildings = useCustomSelector((state) => state.buildin.noDeletedBuildings);
  
  useEffect(() => {
    AOS.init({delay: 250, duration: 1000,});
    getAllBuildings(dispatch)
  },[])

  return (
    <ContinerHomePage>
      <BackGroundGlobal></BackGroundGlobal>
      <NavBarNavigation></NavBarNavigation>
      <div data-aos="fade-up" data-aos-duration="1000" className="firstPage">
        <SliderCarousel
          imageOne='https://res.cloudinary.com/dbapuszll/image/upload/v1697064480/SinergiaCowork/portada_ifddff.png'
          imageTwo='https://res.cloudinary.com/dbapuszll/image/upload/v1697064852/SinergiaCowork/notebook_tfrp6k.jpg'
          imageThree='https://res.cloudinary.com/dbapuszll/image/upload/v1697064904/SinergiaCowork/oficina_q4gc7p.jpg'
          ></SliderCarousel>
      </div>
      <div id="sucursales" data-aos="fade-up" className="secondPage">
        <NavbarFilter></NavbarFilter>
        <Cards></Cards>   
      </div>
        <div id="ubicaciones" data-aos="fade-up" className="thirdPage">
          <MapStatic buildings={noDeletedBuildings}/>
        </div>
      <div data-aos="fade-up" style={{width:'100%'}}>
        <ImgExtra></ImgExtra>
      </div>
      <Footer>
     <FooterSection></FooterSection>
     </Footer>  
    </ContinerHomePage>
  );
}

const ContinerHomePage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: calc(100vh * (1 - 0.1));
  width: 100%;
  padding: 0;
  margin: 0;
  padding-top: calc(100vh * 0.16);
  .firstPage{
    width: 100%;
  
    /* min-height: calc(100vh * (1 - 0.1)); */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .secondPage{
    /* background-color: rgba(31, 37, 81, 0.6); */
    width: 100%;
    margin-top:50px;
    height: max-content;
  
  }
  .thirdPage{
    padding-top: calc(100vh * 0.1);
    width: 100%;
    max-width: 100%;    
  }
`;

const Footer = styled.div`

  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-top: 50px;
  `

export default HomePages;
