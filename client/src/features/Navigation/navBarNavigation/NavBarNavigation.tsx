import React from "react";
import LinkButton from "./LinkButton";
import AccesButton from "./AccesButton";
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const NavBarNavigation: React.FC = () => {
    return (
        <div>
            <Layout>
                <Header style={{ background: '#1F2551', width: '100%' }}>
                    <Menu 
                     mode="inline"
                    style={{ background: '#1F2551' }}>
                        <span style={{ color: 'white', marginRight: '16px',  }}>Sinergia Cowork</span>
                        <LinkButton text='Inicio' path='/' />
                        <LinkButton text='Oficinas' path='/oficinas' />
                        <LinkButton text='Nosotros' path='/nosotros' />
                        <LinkButton text='Ubicaciones' path='/ubicaciones' />
                        <AccesButton text='ACCEDER' path='/login'/>
                    </Menu>
                </Header>
            </Layout>
        </div>
    );
};

export default NavBarNavigation;
