import { useState } from 'react';
import { Modal } from '../modalLogin/ModalStyle';
import { useAuth } from '../../../Authenticator/AuthPro';
import Loading from "../../Loading/Loading";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { loginGoogleUser, loginUser } from '../../../utils/FunctionSessionsGoogle';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { AuthResponse } from '../../protecterRoute/typesProtecterRoute';


interface Props {
  isOpen: boolean | (() => void);
  closeModal: (() => void);
  switModalRegister: (()=> void);
} 

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function ModalLogin({ isOpen, closeModal, switModalRegister }: Props) {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();


  const handleModalContainerClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = async () => {
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
          const authResponse: AuthResponse = {
            user: loginResponse.user,
            accessToken: loginResponse.accessToken,
            refreshToken: loginResponse.refreshToken
          }
          handleReset();
          clearImp();
          auth.saveUser(authResponse);
        }
        messageSuccess("Inicio de sesión exitoso")
        setTimeout(() => {
          auth.getAccess();
          closeModal();
        }, 0.7);
      } else if (loginResponse.response.status === 403) {
        if (loginResponse.response.data.message) {
          messageError(loginResponse.response.data.message);
          
        } else {
          const message = loginResponse.response.data.error
          messageError(message);
          
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
      handleReset();
      clearImp();
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
        clearImp();
        handleReset();
        messageSuccess("Inicio de sesión exitoso")
        auth.getAccess();
        setTimeout(() => {
          closeModal();
        }, 800);
      } else if (loginResponse.status === 403) {
        if (loginResponse.data.message) {
          messageError(loginResponse.data.message);
          
        } else {
          messageError(loginResponse.data.error);
          
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
      clearImp();
      handleReset();
      setIsLoading(false);
    }
  }

  const googleResponseError = () => {
    messageError('Login faile');
  }

  const messageError = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
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
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onFinishFailed = () => {
    console.log('Ha ocurrido un error')
  }

  const handleReset = () => {
    form.resetFields(); 
  };
  const clearImp = () => {
    setEmail('');
    setPassword('');
  }

  const swithRegister = ()=> {
    closeModal();
    setTimeout(() => {
      switModalRegister();
    }, 300)    
  }


  return (<>
    {isOpen ? <Modal onClick={closeModal}>
      <div className='modalContainer' onClick={handleModalContainerClick}>
        <div className="containerForm">
          <button type="button" id='btnCloseModal'  style={{marginLeft:'500px', width:'32px', height:'28px'}} onClick={closeModal}>X</button>
          <h3 id='titleForm'>Inicio de sesión</h3>
          <div style={{ width: '100%',
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Form
            form={form}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: '80%', marginTop:'30px'}}
            layout="horizontal"
            name="normal_login"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item style={{padding:'7px'}}
              name="username"
              rules={[{ required: true, message: 'Introduce tu email' }]}          
              >
              <Input onChange={handleEmailChange} value={email} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" 
                   />
            </Form.Item>

            <Form.Item<FieldType>  style={{padding:'7px'}}
              name="password"
              rules={[{ required: true, message: 'Introduce tu contraseña' }]}              
              >
                <Input.Password onChange={handlePasswordChange} value={password} prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"/>
            </Form.Item>

            <Form.Item >
              <Button  type="primary" htmlType="submit" className="login-form-button">
                Acceder
              </Button>
            </Form.Item>
          </Form>
          </div>
          <div className="linkRegistro">
            <span>Si no tienes cuenta registrate <button onClick={swithRegister}>aquí</button></span>
          </div>
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