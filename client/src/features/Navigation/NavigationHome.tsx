import SliderCarousel from "./Carrousel/Slider"
import NavBarNavigation from "./navBarNavigation/NavBarNavigation";
import portada from '../../assets/portada.jpg'
import notebook from '../../assets/notebook.jpg'
import oficina from '../../assets/oficina.jpg'

import style from "./NavigationHome.module.css"



function NavigationHome(){

  return(
  <div className={style.container}>
    <NavBarNavigation></NavBarNavigation> 
    <SliderCarousel imageOne={portada} imageTwo={notebook} imageThree={oficina}></SliderCarousel>
  </div>
)
}




export default NavigationHome;