import React from "react";
import LinkButton from "./LinkButton";
import AccesButton from "./AccesButton";
import { Layout, Menu } from 'antd';
import { styled } from 'styled-components';
const { Header } = Layout;

const NavBarNavigation: React.FC = () => {
    return (
        <StyleContainerNav>
            <Layout style={{width:'100%', height:'10%', position:'fixed', top: 0, left:0, zIndex:9999, margin:0, padding: 0, minHeight: '63px'}}>
                <Header style={{ background: '#1F2551', width: '100%', height: '100%', margin:0, padding: 0}}>
                    <Menu 
                     mode="inline"
                    style={{ background: '#1F2551', height: '100%', display:'flex', flexWrap:'nowrap' , alignItems:'center', justifyContent:'center'}}>
                        <span style={{ color: 'white', marginRight: '16px',  }}>Sinergia Cowork</span>
                        <LinkButton text='Inicio' path='/' />
                        <LinkButton text='Oficinas' path='/oficinas' />
                        <LinkButton text='Nosotros' path='/nosotros' />
                        <LinkButton text='Ubicaciones' path='/ubicaciones' />
                        <AccesButton text='ACCEDER' path='/login'/>
                    </Menu>
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

export default NavBarNavigation;
