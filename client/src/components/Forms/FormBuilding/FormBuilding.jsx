import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Switch, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '../../../redux/slices/city/actionsCity';
import { getAllServices } from '../../../redux/slices/services/actionsServices';
import axios from 'axios';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const FormBuilding = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.city.allCities);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');

  useEffect(() => {
    getAllCities(dispatch);
  }, [dispatch]);

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await axios.post('https://sinergia-coworking.onrender.com/building', values);
      form.resetFields();
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.error('Error al crear el edificio:', error);
      setErrorModalContent(error.message || 'Error al crear el edificio');
      setIsErrorModalVisible(true);
    }
  };

  const handleModalOk = () => {
    setIsSuccessModalVisible(false);
    setIsErrorModalVisible(false);
  };

  return (
    <div style={{
      width: '50%',
      padding: '20px',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid rgba(0,0,0,0.3)',
      boxShadow: '0px 0px 10px 1px rgb(0,0,0)',
    }}>
      <h2 style={{color:"black"}}>Guarda un nuevo edificio</h2>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Dirección"
          name="address"
          rules={[{ required: true, message: 'Por favor ingresa la dirección' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Latitud"
          name="lat"
          rules={[{ required: true, message: 'Por favor ingresa la latitud' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Longitud"
          name="lng"
          rules={[{ required: true, message: 'Por favor ingresa la longitud' }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Imagen"
          name="imageUrl"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Por favor sube una imagen' }]}
        >
          <Upload
            action="/upload.do"
            listType="picture-card"
            maxCount={1} 
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Subir imagen</div>
            </div>
          </Upload>
        </Form.Item> */}
        <Form.Item
          label="Imagen (URL)"
          name="imageUrl"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa la URL de la imagen',
            },
            {
              type: 'url',
              message: 'Ingresa una URL válida',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ciudad" name="city" rules={[{ required: true, message: 'Por favor selecciona una ciudad' }]}>
          <Select options={cities.map(city => ({ value: city.id, label: city.name }))} />
        </Form.Item>
        <Form.Item label="Guardar">
          <Button type="primary" htmlType="submit">
            Guardar Edificio
          </Button>
        </Form.Item>
      </Form>

      {/* Modal de éxito */}
      <Modal
        title="Edificio creado con éxito"
        open={isSuccessModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        El edificio se ha creado con éxito.
      </Modal>

      {/* Modal de error */}
      <Modal
        title="Error al crear el edificio"
        open={isErrorModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        {errorModalContent}
      </Modal>
    </div>
  );
};

export default FormBuilding;
