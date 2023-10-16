import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Button, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../Authenticator/AuthPro';
import { uploadImageToCloudinary } from '../../utils/configCloudinary';
import axios from 'axios';

const { Title, Text } = Typography;

const MyProfile = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [changeImageVisible, setChangeImageVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const token = auth.getAccessToken();
    setAccessToken(token);
  }, []);

  const handlePasswordChange = async (values) => {
    try {
      const newPassword = values.password;
      await axios.put('https://sinergia-coworking.onrender.com/update-user/', { password: newPassword }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      message.success('Contraseña actualizada con éxito');
      setChangePasswordVisible(false);
      form.resetFields();
      setSuccessModalVisible(true);
    } catch (error) {
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
      const response = await uploadImageToCloudinary(file);
      // Actualiza la imagen de perfil en Cloudinary
      await axios.put('https://sinergia-coworking.onrender.com/update-user/', { imgUrl: response }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onSuccess(response);
    } catch (error) {
      console.error("Error al cargar la imagen en Cloudinary:", error);
      setErrorModalVisible(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card style={{ width: '100%' }}>
        <Avatar size={100} src={user.imgUrl || <UserOutlined />} style={{ margin: '0 auto' }} />
        <Title level={4} style={{ textAlign: 'center' }}>Mi Perfil</Title>
        <Text strong>Nombre: </Text>
        <Text>{user.name}</Text>
        <br />
        <Text strong>Email: </Text>
        <Text>{user.email}</Text>
        <br />
        <Button type="primary" onClick={showConfirm}>Cambiar Contraseña</Button>
        <Button style={{ marginLeft: 10 }} onClick={() => setChangeImageVisible(true)}>Cambiar Imagen</Button>
      </Card>

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
    </div>
  );
};

export default MyProfile;
