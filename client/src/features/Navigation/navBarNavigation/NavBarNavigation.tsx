import React from "react";
import LinkButton from "./LinkButton";
import AccesButton from "./AccesButton";
import { Layout, Menu } from 'antd';
import { styled } from 'styled-components';
import { useModal } from "../../../utils/useModal";
import ModalRegister from "../../../components/login/modalStatusRegister/register";
import ModalLogin from "../../../components/login/modalStatusRegister/Login";
import UserDropdownMenu from "../../../components/NavBarAdmin/UserDropdownMenu";
import { useAuth } from "../../../Authenticator/AuthPro";

const { Header } = Layout;

const NavBarNavigation: React.FC = () => {
    const auth = useAuth()
    const isRoot = auth.getUser()?.type
    const authenticated = auth.isAuthenticated;
    const [isOpenModalRegister, openModalRegister, closeModalRegister ] = useModal(false);    
    const [isOpenModalLogin, openModalLogin, closeModalLogin ] = useModal(false);

    const getItemMenu = (typeRoot : string | undefined) => {
        if(typeRoot === 'root' || typeRoot === 'admin' ){
            return  [
                { text: 'Perfil', path: '/perfil' },
                { text: 'Mis reservas', path: '/reservas' },
                { text: 'Crear oficina', path: '/crear-oficina' },
                { text: 'Crear Edificio', path: '/crear-edificio' },
                { text: 'Cerrar sesión', path: '/logout' }
            ]
        }else{
            return [
                { text: 'Perfil', path: '/perfil' },
                { text: 'Mis reservas', path: '/reservas' },
                { text: 'Cerrar sesión', path: '/logout' },
            ]
        }
    }
    
   

    return (
        <StyleContainerNav>
            <Layout style={{width:'100%', height:'10%', position:'fixed', top: 0, left:0, zIndex:9999, margin:0, padding: 0, minHeight: '63px'}}>
                <Header style={{ background: '#1F2551', width: '100%', height: '100%', margin:0, padding: 0}}>
                    <Menu 
                     mode="inline"
                    style={{ background: '#1F2551', height: '100%', display:'flex', flexWrap:'nowrap' , alignItems:'center', justifyContent:'space-between'}}>
                        <div>  <span style={{ color: 'white', marginRight: '16px',  }}>Sinergia Cowork</span></div>
                        <div>  <LinkButton text='Inicio' path='/' />
                        <LinkButton text='Oficinas' path='/oficinas' />
                        <LinkButton text='Nosotros' path='/nosotros' />
                        <LinkButton text='Ubicaciones' path='/ubicaciones' /></div>
                        
                        {!authenticated? <div className="accesLogin"> <AccesButton text='REGISTRO' click={openModalRegister}/>
                        <AccesButton text='ACCEDER' click={openModalLogin}/></div>:

                        <div className="accesLogin">
                            <UserDropdownMenu menuItems={getItemMenu(isRoot)}></UserDropdownMenu>
                        </div>}

                    </Menu>
                </Header>
            </Layout>
            <ModalRegister isOpen={isOpenModalRegister} closeModal={closeModalRegister}></ModalRegister>
            <ModalLogin isOpen={isOpenModalLogin} closeModal={closeModalLogin}></ModalLogin>
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
    z-index: 9999
`

export default NavBarNavigation;
