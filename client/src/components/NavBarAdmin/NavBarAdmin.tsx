import React from "react";
import { Layout, } from 'antd';
import { styled } from 'styled-components';
import UserDropdownMenu from "./UserDropdownMenu";
import Review from "../../pages/ReviewOffice/Review";

const { Header } = Layout;

const NavBarAdmin: React.FC = () => {


    const menuItems = [
        { text: 'Perfil', path: '/perfil' },
        { text: 'Mis reservas', path: '/review'},
        { text: 'Cerrar sesión', path: '/logout' },
      ];

    return (
        <StyleContainerNav>
            <Layout style={{width:'100%', height:'10%', position:'fixed', top: 0, left:0, zIndex:9999, margin:0, padding: 0, minHeight: '63px'}}>
                <Header style={{ background: '#1F2551', width: '100%', height: '100%', margin:0, padding: 0, zIndex:9998}}>
                <UserDropdownMenu menuItems={menuItems} />
                </Header>
            </Layout>
        </StyleContainerNav>
    );
};

const StyleContainerNav = styled.div`
    width: 100%;
    height: 10%;
    min-height: 63px;
    position: fixed;
    top: 0;
    left:0;
    z-index:9999
`

export default NavBarAdmin;
