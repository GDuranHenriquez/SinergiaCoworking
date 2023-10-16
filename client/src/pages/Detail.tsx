
import { styled } from "styled-components";
import OfficeDetail from "../features/Detail/Detail";
import BackGroundGlobal from "../components/backgrounds/BackgroundGlobal";


function PruebaDos() {

    return (
        <ContainerDetailPage>
            <BackGroundGlobal></BackGroundGlobal>
            <OfficeDetail></OfficeDetail>
        </ContainerDetailPage>
    )
}

const ContainerDetailPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: calc(100vh * (1 - 0.1));
  width: 100%;
  padding-top: calc(100vh * 0.1);
  
`;


export default PruebaDos;