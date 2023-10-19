import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { uploadImageToCloudinary } from '../../../utils/configCloudinary';
import { fetchServices, fetchCategories, fetchBuildings } from './Utils';

/* const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}; */

const FormOffice = () => {
  const endpoint = import.meta.env.VITE_BASENDPOINT_BACK
  const [form] = Form.useForm();
  const [idListImage, setIdListImage] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const urlArray = idListImage.map((img) => {
        return img.url;
      });

      const data = { ...values, images: urlArray };
      await axios.post(`${endpoint}/office`, data);
      form.resetFields();
      setIdListImage([]);
      setSuccessModalVisible(true);
      localStorage.removeItem('formOfficeData');
    } catch (error) {
      console.error('Error al crear la oficina:', error);
      setErrorModalVisible(true);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('formOfficeData');
  
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      form.setFieldsValue(parsedData);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = await fetchServices();
        const categories = await fetchCategories();
        const buildings = await fetchBuildings();

        setServiceOptions(services);
        setCategoryOptions(categories);
        setBuildingOptions(buildings);
      } catch (error) {
        console.error('Error al cargar opciones:', error);
      }
    };

    fetchData();
  }, []);

  const customRequest = async ({ file, onSuccess }) => {
    try {
      const response = await uploadImageToCloudinary(file);

      const newImage = {
        id: file.uid,
        name: file.name,
        url: response,
      };

      setIdListImage((prevList) => [...prevList, newImage]);
      onSuccess(file);
      return null;
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

  const handleImageRemove = (file) => {
    const newList = idListImage.filter((data) => data.id !== file.uid);
    setIdListImage(newList);
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    localStorage.setItem('formOfficeData', JSON.stringify(allValues));
  };

  const handleSuccessModalOk = () => {
    setSuccessModalVisible(false);
  };

  const handleErrorModalOk = () => {
    setErrorModalVisible(false);
  };
  

  return (<div style={{
    width: '100%',
    padding: '20px',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px'
  }}>
    <div style={{
      width: '50%',
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      padding: '20px',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid rgba(0,0,0,0.3)',
      boxShadow: '0px 0px 10px 1px rgb(0,0,0)',
    }}>
      <h2 style={{ color: "black" }}>Guardar nueva oficina</h2>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        style={{width: '100%'}}
        onFinish={handleSubmit}
        onValuesChange={handleFormValuesChange}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Área (m²)"
          name="area"
          rules={[{ required: true, message: 'Por favor ingresa el área' },
          {
            validator: async (_, value) => {
              if (isNaN(value)) {
                throw new Error('El área debe ser un valor numérico');
              }
            },
          },]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Capacidad"
          name="capacity"
          rules={[{ required: true, message: 'Por favor ingresa la capacidad' },
          {
            validator: async (_, value) => {
              if (isNaN(value)) {
                throw new Error('La capacidad debe ser un valor numérico');
              }
            },
          },]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Precio"
          name="price"
          rules={[{ required: true, message: 'Por favor ingresa el precio' },
          {
            validator: async (_, value) => {
              if (isNaN(value)) {
                throw new Error('El precio debe ser un valor numérico');
              }
            },
          },]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Categoría"
          name="category"
          rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
        >
          <Select>
            {categoryOptions.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Sucursal"
          name="building"
          rules={[{ required: true, message: 'Por favor selecciona una sucursal' }]}
        >
         <Select>
            {buildingOptions.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Servicios"
          name="services"
          rules={[{ required: true, message: 'Por favor selecciona los servicios' }]}
        >
         <Select mode="multiple">
            {serviceOptions.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
               
        <Form.Item
          label="Imágenes"
          name="images"
          rules={[{ required: true, message: 'Por favor sube al menos una imagen' }]}
        >
          <Upload
            customRequest={customRequest}
            maxCount={10}
            listType="picture"
            accept="image/*"
            multiple 
            onRemove={handleImageRemove}
          >
            {!idListImage.length <= 10 && <Button icon={<UploadOutlined />}>Cargar Imagen</Button>}
          </Upload>
        </Form.Item>

        <Form.Item style={{ marginTop: '30px'}}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
    
    <Modal
        title="Oficina creada con éxito"
        visible={successModalVisible}
        onOk={handleSuccessModalOk}
        onCancel={handleSuccessModalOk}
      >
        La oficina se ha creado con éxito.
      </Modal>
      <Modal
        title="Error al crear la oficina"
        visible={errorModalVisible}
        onOk={handleErrorModalOk}
        onCancel={handleErrorModalOk}
      >
        Ha ocurrido un error al crear la oficina.
      </Modal>
  </div>
      
  );
};

export default FormOffice;
