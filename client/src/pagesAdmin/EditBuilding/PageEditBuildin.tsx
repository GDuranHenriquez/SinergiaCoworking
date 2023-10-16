import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import EditBuildingPage from "./EditBuilding";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
function PageEditBuilding (){
  
  return <>
    <BackGroundGlobal/>
    <NavBarNavigation />
    <EditBuildingPage></EditBuildingPage>
  </> 
}

export default PageEditBuilding;