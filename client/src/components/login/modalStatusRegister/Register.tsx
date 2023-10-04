import { useState, useContext } from 'react';
import { Modal } from '../modalLogin/ModalStyle';
import { useAuth } from '../../../Authenticator/AuthPro';
import Loading from "../../Loading/Loading";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { registerGoogleUser } from '../../../utils/FunctionSessionsGoogle';

interface Props {
  isOpen: any;
  closeModal: any;
} 


function ModalRegister({ isOpen, closeModal}: Props) {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);  
  const handleModalContainerClick = (e) => e.stopPropagation();

  const googleResponse = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      const registerResponse = await registerGoogleUser(credentialResponse.credential)
      
      if (registerResponse.status == 200 && registerResponse.data.pass) {
        if (registerResponse.data.accessToken && registerResponse.data.refreshToken) {
          auth.saveUser(registerResponse);
        }
        messageSuccess("Su cuenta ha sido creada correctamente!");
        setTimeout(() => {
          closeModal();
        }, 2000);        
        
      } else if (registerResponse.status == 403) {
          messageError(registerResponse.data.error);
          setTimeout(() => {
            closeModal();
          }, 2000);
      } else {
        const message = registerResponse.data.message;
        if (!message) {
          messageError(registerResponse.data.error);
          setTimeout(() => {
            closeModal();
          }, 2000);
        }else{
          messageError(message);
          setTimeout(() => {
            closeModal();
          }, 2000);
        }        
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      messageError(error);
      setTimeout(() => {
        closeModal();
      }, 2000);
    } finally {
      setIsLoading(false);
      closeModal();
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

  const googleResponseError = () => {
    messageError('Register faile');
  }

  
  return (<>
    {isOpen? <Modal  onClick={closeModal}>
    <div className='modalContainer' onClick={handleModalContainerClick}>
      <div className="containerForm">
        <button type="button" id='btnCloseModal' onClick={closeModal}>X</button>
        <form action="">
          
        </form>
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
    </Modal> : ''}
    {isLoading && <Loading/>}
    <ToastContainer></ToastContainer>
  </>
  );
}

export default ModalRegister;




