import { useState, useEffect } from 'react';
import { Modal } from '../modalLogin/ModalStyle';
import { useAuth } from '../../../Authenticator/AuthPro';
import Loading from "../../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { loginGoogleUser, loginUser } from '../../../utils/FunctionSessionsGoogle';


interface Props {
  isOpen: any;
  closeModal: any;
}

function ModalLogin({ isOpen, closeModal}: Props) {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleModalContainerClick = (e) => e.stopPropagation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        email: email,
        password: password
      }
      const loginResponse = await loginUser(data);  

      if (loginResponse.pass) {
        if (loginResponse.accessToken && loginResponse.refreshToken) {
          auth.saveUser(loginResponse);
        }
        messageSuccess("Inicio de sesión exitoso")
        setTimeout(() => {
          auth.getAccess();
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
      console.log(error)
      messageError('error');
      setTimeout(() => {
        closeModal();
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

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
        <h3 id='titleForm'>Sign in</h3>
            <form className='Form' onSubmit={handleSubmit}>
              <div className='form'>
                <div>
                  {" "}
                  <label className='label'>Email address</label>
                </div>
                <input
                  type="text"
                  className='input'
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                {" "}
                <div>
                  <label className='label'>Password </label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className='input'
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button className='toggle' type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </button>
              </div>{" "}
              <button className='button' type="submit">
                Submit
              </button>
              {error && <p className='error'>{error}</p>}
              <h4>
                Don't have an account?{" "}
                {/* <a
                  className='signup'
                  href="/checkUser"
                  onClick={() => navigate("/checkUser")}
                >
                  Register
                </a> */}
              </h4>
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