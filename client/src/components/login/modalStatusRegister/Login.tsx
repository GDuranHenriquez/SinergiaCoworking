import { useState, useEffect } from 'react';
import { Modal } from '../modalLogin/ModalStyle';
import { useAuth } from '../../../Authenticator/AuthPro';
import Loading from "../../Loading/Loading";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { loginGoogleUser } from '../../../utils/FunctionSessionsGoogle';


interface Props {
  isOpen: any;
  closeModal: any;
}
interface responseGoogle {
  credential: string
}


function ModalLogin({ isOpen, closeModal}: Props) {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleModalContainerClick = (e) => e.stopPropagation();

  const googleResponse = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      const data = {
        token: credentialResponse.credential
      }
      const loginResponse = await loginGoogleUser(data);      
      if (loginResponse.pass) {
        if (loginResponse.accessToken && loginResponse.refreshToken) {
          auth.saveUser(loginResponse);
        }
        messageSuccess("Inicio de sesión exitoso")
        auth.getAccess();
        setTimeout(() => {
          closeModal();
        }, 1000);
      } else if (loginResponse.status === 403) {
        if (loginResponse.data.message) {
          messageError(loginResponse.data.message);
          setTimeout(() => {
            closeModal();
          }, 2000);
        } else {
          messageError(loginResponse.data.error);
          setTimeout(() => {
            closeModal();
          }, 2000);
        }
      } else {
        messageError(loginResponse.data.error);
        setTimeout(() => {
          closeModal();
        }, 2000);
      }
    } catch (error: any) {
      setIsLoading(false);
      messageError('Error al iniciar session');
      setTimeout(() => {
        closeModal();
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }

  const googleResponseError = () => {
    messageError('Login faile');
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

  const messageSuccess = (message: string) => {
    toast.success(message, {
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

  
  return (<>
    {isOpen? <Modal  onClick={closeModal}>
    <div className='modalContainer' onClick={handleModalContainerClick}>
      <div className="containerForm">
        <button type="button" id='btnCloseModal' onClick={closeModal}>X</button>
        <form action="">
          
        </form>
        <div className="loginGoogle">
          <GoogleLogin
            useOneTap
            onSuccess={googleResponse}
            onError={googleResponseError}
            text = "signin"
            shape = 'circle'
            logo_alignment = "center"
          />
           
        </div>
      </div>
        
      </div>
    </Modal> : ''}
    {isLoading && <Loading/>}
    <ToastContainer></ToastContainer>
  </>
  );
}

export default ModalLogin;