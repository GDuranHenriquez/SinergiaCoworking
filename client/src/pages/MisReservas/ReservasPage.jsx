import MyReservations from "../../features/MisReservas/MisReservas";
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import FooterSection from "../../components/Footer/Footer";
import { Row, Col } from 'antd';
import styled from "styled-components";



function ProfilePage() {

    return (
        <div>
            <ContinerHomePage>
            <BackGroundGlobal></BackGroundGlobal>
            <NavBarNavigation></NavBarNavigation>
            <MyReservations/>
            </ContinerHomePage>
            <Footer>
                <FooterSection></FooterSection>
            </Footer>
        </div>
    )
}

const ContinerHomePage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: calc(100vh * 0.1 + 25px);
  /* min-height: calc(100vh * (1 - 0.1)); */
  width: 100%;`

const Footer = styled.div`
  position:relative;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-top: 50px;
  `

export default ProfilePage;