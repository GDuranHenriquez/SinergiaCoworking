import MyProfile from "../../features/Profile/MyProfile";
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import FooterSection from "../../components/Footer/Footer";
import styled from "styled-components";



function ProfilePage() {

    return (
        <div>
            <ContinerHomePage>
              <BackGroundGlobal></BackGroundGlobal>
              <NavBarNavigation></NavBarNavigation>
              <MyProfile />
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
  padding-top: calc(100vh * 0.1 + 30px);
  width: 100%;`

const Footer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  `

export default ProfilePage;