import React from "react";
import LinkButton from "./LinkButton";
import AccesButton from "./AccesButton";
import LogoPrincipal from "../../../../src/assets/LogoSc.png";
import { Layout, Menu } from 'antd';
import { styled } from 'styled-components';
import { useModal } from "../../../utils/useModal";
import ModalRegister from "../../../components/login/modalStatusRegister/Register";
import ModalLogin from "../../../components/login/modalStatusRegister/Login";
import UserDropdownMenu from "../../../components/NavBarAdmin/UserDropdownMenu";
import { useAuth } from "../../../Authenticator/AuthPro";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const NavBarNavigation: React.FC = () => {
  const auth = useAuth()
  const isRoot = auth.getUser()?.type
  const authenticated = auth.isAuthenticated;
  const [isOpenModalRegister, openModalRegister, closeModalRegister] = useModal(false);
  const [isOpenModalLogin, openModalLogin, closeModalLogin] = useModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setIsLoading(true);
    try {
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + "/sign-in-out/sign-out";
      const refreshToken = auth.getRefreshToken();
      const response = await axios.delete(endPoint, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        data: null,
      });
      if (response.status === 200) {
        auth.signOut();
      }
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      if (typeof error === 'string') {
        messageError(error)
        setIsLoading(false);
      } else if (error instanceof Error) {
        const message = error.message
        messageError(message)
        setIsLoading(false);
      } else {
        console.log(error)
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getItemMenu = (typeRoot: string | undefined) => {
    if (typeRoot === 'root' || typeRoot === 'admin') {
      return [
        { text: 'Perfil', path: '/perfil' },
        { text: 'Mis reservas', path: '/reservas' },
        { text: 'Crear oficina', path: '/crear-oficina' },
        { text: 'Crear sucursal', path: '/crear-sucursal' },
        { text: 'Editar oficina', path: '/editar-oficina' },
        { text: 'Editar sucursal', path: '/editar-sucursal' },
        { text: 'Gráficas informativas', path: '/charts' },
        { text: 'Cerrar sesión', path: '#' }
      ]
    } else {
      return [
        { text: 'Perfil', path: '/perfil' },
        { text: 'Mis reservas', path: '/reservas' },
        { text: 'Cerrar sesión', path: '#' },
      ]
    }
  }

    const messageError = (message: string) => {
        toast.error(message, {
          position: "bottom-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
    
      const switModalRegister = () =>{
        openModalRegister();
      }
      const switModalLogin = () =>{
        openModalLogin()
      }

  return (
    <StyleContainerNav>
      <Layout style={{ width: '100%', height: '10%', position: 'fixed', top: 0, left: 0, zIndex: 9999, margin: 0, padding: 0, minHeight: '63px' }}>
        <Header style={{ background: '#1F2551', width: '100%', height: '100%', margin: 0, padding: 0 }}>
          <Menu
            mode="inline"
            style={{ background: '#1F2551', height: '100%', display: 'flex', flexWrap:'nowrap', alignItems: 'center', justifyContent: 'center', }}>
            {/* <div>  <span style={{ color: 'white', marginRight: '16px',  }}>Sinergia Cowork</span></div> */}

            <img style={{ width: '4.8%', height: '57%',  marginRight:'4%' }} src={LogoPrincipal} />

            <div style={{display:'flex', flexDirection:'row', textAlign:'center', justifyItems:'center', marginLeft:'5%', marginRight:'13%', gap:'70px'}}>
              <LinkButton text='Inicio' path='/' />
              <LinkButton text='Sucursales' path='/#sucursales' />
              <LinkButton text='Ubicaciones' path='/#ubicaciones' />
              <LinkButton text='Nosotros' path='/nosotros' />
              </div>

            <div className="accesLogin">
              {authenticated ? (
                <div>
                  <UserDropdownMenu LogoutFunction={logout} menuItems={getItemMenu(isRoot)} />
                  <span style={{ color: 'white', marginLeft: '16px' }}>
                    {auth.getUser()?.name || 'Usuario'}
                  </span>
                </div>
              ) : (
                <>
                  <AccesButton name="register" text="REGISTRO" click={openModalRegister} />
                  <AccesButton name="login" text="ACCEDER" click={openModalLogin} />
                </>
              )}
            </div>

                    </Menu>
                </Header>
            </Layout>
            <ModalRegister isOpen={isOpenModalRegister} closeModal={closeModalRegister} switModalLogin={switModalLogin}></ModalRegister>
            <ModalLogin isOpen={isOpenModalLogin} closeModal={closeModalLogin} switModalRegister={switModalRegister}></ModalLogin>
            {isLoading && <Loading />}
            <ToastContainer></ToastContainer>
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
