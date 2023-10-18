import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import styled from "styled-components";
import AdminChartContainer from "../../features/AdminChart/AdminChartContainer";



function DataAdmin() {

    return (
        <div>
            <ContinerHomePage>
              <BackGroundGlobal></BackGroundGlobal>
              <NavBarNavigation></NavBarNavigation>
              <AdminChartContainer/>
            </ContinerHomePage>
            {/* <Footer>
                <FooterSection></FooterSection>
            </Footer> */}
        </div>
    )
}

const ContinerHomePage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding-top: calc(100vh * 0.1);
  min-height: calc(100vh * (1 - 0.34));
  max-width: 100%;
  width: 100%;
`

/* const Footer = styled.div`

  left: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  ` */
export default DataAdmin;