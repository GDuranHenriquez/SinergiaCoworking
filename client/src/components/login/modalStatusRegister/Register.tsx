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
      console.log(registerResponse)
      if (registerResponse.pass) {
        if (registerResponse.accessToken && registerResponse.refreshToken) {
          messageSuccess("Su cuenta ha sido creada correctamente!");
          auth.saveUser(registerResponse);
        }
        setTimeout(() => {
          closeModal();
        }, 800);        
        
      } else if (registerResponse.response.status == 403) {
        const message = registerResponse.response.data.error;
        messageError(message);
        setTimeout(() => {
          closeModal();
        }, 800);
      } else {
        const message = registerResponse.response.data.error;
        if (!message) {
          messageError('Ha ocurrido un error interno');
          setTimeout(() => {
            closeModal();
          }, 800);
        }else{
          messageError(message);
          setTimeout(() => {
            closeModal();
          }, 800);
        }        
      }
      setIsLoading(false);
    } catch (error) {
      if(typeof error === 'string'){
        messageError(error)
      }else if(error instanceof Error){
        console.log(error)
        const message = error.message
        messageError(message)
      } else {
        console.log(error)
      }         
      setIsLoading(false);
      
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        closeModal();
      }, 800);
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




