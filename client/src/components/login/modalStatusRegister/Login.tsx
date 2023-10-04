import { useEffect, useState } from 'react';
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
import { Button, Form, Input, message } from 'antd';
import { validation } from '../utils/validations';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
  isOpen: any;
  closeModal: any;
}

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function ModalLogin({ isOpen, closeModal }: Props) {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string }>({});
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
  useEffect(() =>{
    if(email!== '' || password !==''){
      const errors = validation({ email, password });
      setError(errors);
    }else{
      setError({});
    }
  }, [email, password])

  const handleSubmit = async (e) => {
    /* e.preventDefault(); */
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
        messageError(loginResponse.response.data.error);
      }
    } catch (error: unknown) {      
      if(typeof error === 'string'){
        messageError(error)
      }else if(error instanceof Error){
        const message = error.message
        messageError(message)
      } else {
        console.log(error)
      }         
      setIsLoading(false);
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
        messageError(loginResponse.response.data.error);
      }
    } catch (error) {
      if(typeof error === 'string'){
        messageError(error)
      }else if(error instanceof Error){
        const message = error.message
        messageError(message)
      } else {
        console.log(error)
      }         
      setIsLoading(false);
      
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

  const onFinishFailed = (value: any) => {
    console.log('Ha ocurrido un error')
  }


  return (<>
    {isOpen ? <Modal onClick={closeModal}>
      <div className='modalContainer' onClick={handleModalContainerClick}>
        <div className="containerForm">
          <button type="button" id='btnCloseModal' onClick={closeModal}>X</button>
          <h3 id='titleForm'>Sign in</h3>
          <Form
            name="normal_login"
            className="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            /* onSubmitCapture={handleSubmit} */
            initialValues={{ username: email }}
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: 'Por favor introduce tu email!' }]} 
              help={error?.email ? error.email : undefined}            
              >
              <Input onChange={handleEmailChange} value={email} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: 'Por favor introduce tu contraseña!' }]}
              help={error?.password ? error.password : undefined}              
              >
                <Input.Password onChange={handlePasswordChange} value={password} prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"/>
            </Form.Item>

            <Form.Item >
              <Button  type="primary" htmlType="submit" disabled={(Object.keys(error).length > 0 || email==='' || password==='')? true: false} className="login-form-button">
                Acceder
              </Button>
            </Form.Item>
          </Form>
          <div className="loginGoogle">
            <GoogleLogin
              useOneTap
              onSuccess={googleResponse}
              onError={googleResponseError}
              text="signin"
              shape='circle'
              logo_alignment="center"
            />

          </div>
        </div>

      </div>
    </Modal> : ''}
    {isLoading && <Loading />}
    <ToastContainer></ToastContainer>
  </>
  );
}

export default ModalLogin;