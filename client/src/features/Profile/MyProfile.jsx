import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Button, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../Authenticator/AuthPro';
import { uploadImageToCloudinary } from '../../utils/configCloudinary';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

const MyProfile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [_changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [changeImageVisible, setChangeImageVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const token = auth.getAccessToken();
    setAccessToken(token);
    if(!auth.getUser()){
      navigate('/');
    }
  }, []);

  const handlePasswordChange = async (values) => {
    try {
      setIsLoading(true);
      const newPassword = values.password;
      await axios.put('https://sinergia-coworking.onrender.com/update-user/', { password: newPassword }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsLoading(false);
      message.success('Contraseña actualizada con éxito');
      setChangePasswordVisible(false);
      form.resetFields();
      setSuccessModalVisible(true);
    } catch (error) {
      setIsLoading(false);
      console.error('Error al cambiar la contraseña:', error);
      message.error('Error al cambiar la contraseña');
      setErrorModalVisible(true);
    }
  };

  const handleImageChange = async (info) => {
    if (info.file.status === 'done') {
      message.success('Imagen de perfil actualizada con éxito');
      setChangeImageVisible(false);
      setSuccessModalVisible(true);
    } else if (info.file.status === 'error') {
      message.error('Error al cargar la imagen de perfil');
      setErrorModalVisible(true);
    }
  };

  const showConfirm = () => {
    Modal.confirm({
      title: 'Cambiar contraseña',
      content: (
        <Form form={form} onFinish={handlePasswordChange}>
          <Form.Item
            name="password"
            label="Nueva Contraseña"
            rules={[{ required: true, message: 'Por favor ingresa una nueva contraseña' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirmar Contraseña"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Por favor confirma la nueva contraseña' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Las contraseñas no coinciden');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      ),
      onOk() {
        form.submit();
      },
    });
  };

  const handleModalOk = () => {
    setSuccessModalVisible(false);
    setErrorModalVisible(false);
  };

  const customRequest = async ({ file, onSuccess }) => {
    try {
      setIsLoading(true);
      const response = await uploadImageToCloudinary(file);
      console.log(response)
      // Actualiza la imagen de perfil en Cloudinary
      const data = await axios.put('https://sinergia-coworking.onrender.com/update-user/', { imgUrl: response }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if(data.status === 200){
        const updateUser = data.data.userUpdate;
        auth.saveDataUser(updateUser);
      }
      setIsLoading(false);
      onSuccess(response);
    } catch (error) {
      console.error("Error al cargar la imagen en Cloudinary:", error);
      setErrorModalVisible(true);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {auth.getUser() ? <Card style={{ width: '100%', padding:'5px', boxShadow: '0px 0px 10px 1px rgb(0,0,0)', }}>
        <Avatar size={100} src={auth.getUser().imgUrl || <UserOutlined />} style={{ margin: '0 auto', marginBottom:'10px' }} />
        <Title level={4} style={{ textAlign: 'center' }}>Mi Perfil</Title>
        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          <Text strong >Nombre: <Text>{auth.getUser().name}</Text></Text>
          <Text strong>Email: <Text>{auth.getUser().email}</Text></Text>
        </div>
        <div style={{display:'flex', flexWrap:'nowrap', gap:'20px', marginTop:'30px'}}>
          <Button type="primary" onClick={showConfirm}>Cambiar contraseña</Button>
          <Button style={{  }} onClick={() => setChangeImageVisible(true)}>Cambiar imagen</Button>
        </div>
        
      </Card>: null}

      <Modal
        title="Cambiar Imagen de Perfil"
        open={changeImageVisible}
        onCancel={() => setChangeImageVisible(false)}
        footer={null}
      >
        <Upload
          action="https://sinergia-coworking.onrender.com/update-user/"
          name="imgUrl"
          accept="image/*"
          showUploadList={false}
          headers={{
            Authorization: `Bearer ${accessToken}`,
          }}
          customRequest={customRequest}
          onChange={handleImageChange}
        >
          <Button icon={<UploadOutlined />}>Cargar Imagen</Button>
        </Upload>
      </Modal>

      <Modal
        title="Éxito"
        open={successModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        Operación exitosa.
      </Modal>

      <Modal
        title="Error"
        open={errorModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        Hubo un error al procesar la solicitud.
      </Modal>
      {isLoading && <Loading />}
    </div>
  );
};

export default MyProfile;
