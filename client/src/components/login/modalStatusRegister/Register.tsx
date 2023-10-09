import { useState, useEffect } from 'react';
import { Modal } from '../modalLogin/ModalStyle';
import { useAuth } from '../../../Authenticator/AuthPro';
import Loading from "../../Loading/Loading";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { registerGoogleUser, registerUser } from '../../../utils/FunctionSessionsGoogle';
import { Button, Form, Input } from 'antd';
import { validation } from '../utils/validations';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { AuthResponse } from '../../protecterRoute/typesProtecterRoute';

interface Props {
  isOpen: boolean | (() => void);
  closeModal: (() => void);
} 


function ModalRegister({ isOpen, closeModal}: Props) {
  const [form] = Form.useForm();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<{ email?: string; password?: string ; 
    name?: string}>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [name, setName] = useState('');
  const handleModalContainerClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  const googleResponse = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      const registerResponse = await registerGoogleUser(credentialResponse.credential)
      
      if (registerResponse.pass) {
        if (registerResponse.accessToken && registerResponse.refreshToken) {
          messageSuccess("Su cuenta ha sido creada correctamente!");
          clearImp();
          handleReset();
          auth.saveUser(registerResponse);
        }
        setTimeout(() => {
          closeModal();
        }, 800);        
        
      } else if (registerResponse.response.status == 403) {
        const message = registerResponse.response.data.error;
        messageError(message);
        
      } else {
        const message = registerResponse.response.data.error;
        if (!message) {
          messageError('Ha ocurrido un error interno');
          
        }else{
          messageError(message);
          
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
      clearImp();
      handleReset();
      setTimeout(() => {
        closeModal();
      }, 800);
    }
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

  const googleResponseError = () => {
    messageError('Register faile');
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleEmailName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
        password: password,
        name: name
      }
      const registerResponse = await registerUser(data);
      
      if (registerResponse.pass) {
        if (registerResponse.accessToken && registerResponse.refreshToken) {
          const userInfo: AuthResponse = {
            user: registerResponse.user,
            accessToken: registerResponse.accessToken,
            refreshToken: registerResponse.refreshToken
          }
          handleReset()
          clearImp();
          auth.saveUser(userInfo);
        }
        messageSuccess("Registro de usuario exitoso")
        setTimeout(() => {
          auth.getAccess();
          closeModal();
        }, 800);
      } else if (registerResponse.status === 403) {
        if (registerResponse.data.message) {
          messageError(registerResponse.data.message);
          
        } else {
          messageError(registerResponse.data.error);
          
        }
      } else {
        messageError(registerResponse.response.data.error);
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

  const onFinishFailed = () => {
    console.log('Ha ocurrido un error')
  }

  const handleReset = () => {
    form.resetFields(); // Esto limpiará todos los campos del formulario
  };

  const clearImp = () => {
    setName('');
    setEmail('');
    setPassword('');
  }

  useEffect(() =>{
    if(email!== '' || password !==''){
      const errors = validation({ email, password });
      setError(errors);
    }else{
      setError({});
    }
  }, [email, password])
  
  return (<>
    {isOpen? <Modal  onClick={closeModal}>
    <div className='modalContainer' onClick={handleModalContainerClick}>
      <div className="containerForm">
        <h3 id='titleForm'>Registro</h3>
        <button type="button" id='btnCloseModal' onClick={closeModal}>X</button>
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
            style={{ maxWidth: '80%'}}
            layout="horizontal"
            name="normal_login"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Por favor introduce tu nombre!' }]} 
              help={error?.name ? error.name : undefined}          
              >
              <Input onChange={handleEmailName} value={name} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" 
                   />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Por favor introduce tu email!' }]} 
              help={error?.email ? error.email : undefined}          
              >
              <Input onChange={handleEmailChange} value={email} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" 
                   />
            </Form.Item>

            <Form.Item
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
                Registro
              </Button>
            </Form.Item>
          </Form>
          </div>
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




