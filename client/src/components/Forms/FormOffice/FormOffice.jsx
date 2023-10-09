import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Switch, Upload, Image  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { uploadImageToCloudinary } from '../../../utils/configCloudinary';
import styled from './formOffice.module.css'

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const FormOffice = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [idListImage, setIdListImage] = useState([]);

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await axios.post('http://localhost:3001/office', values); // Cambia la URL si es necesario
      form.resetFields();
    } catch (error) {
      console.error('Error al crear la oficina:', error);
    }
  };

  const categoryOptions = ['Categoria A', 'Categoria B', 'Categoria C']; // Reemplaza con tus categorías
  const serviceOptions = ['Servicio 1', 'Servicio 2', 'Servicio 3']; // Reemplaza con tus servicios
  const priceOptions = ['Precio 1', 'Precio 2', 'Precio 3']; // Reemplaza con tus precios

  const customRequest = async ({ file, onSuccess }) => {
    try {
      /* const response = await uploadImageToCloudinary(file);
      setImage(response); */
      const response = await uploadImageToCloudinary(file);

      const newImage = {
        id: file.uid,
        name: file.name,
        url: response
      }
      
      setIdListImage((prevList) => [...prevList, newImage]);
      onSuccess(file);
      return null;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  useEffect(() => {
    console.log(idListImage);
  }, [idListImage])
  

  const handleImageRemove = (file) => {
    console.log(file)
    const newList = idListImage.filter((data) => data.id !== file.uid)
    setIdListImage(newList);
  };

  return (<div style={{
    width: '100%',
    padding: '20px',
    display: 'flex',
    flexWrap: 'nowrap',
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
      <h2 style={{ color: "black" }}>Guarda una nueva oficina</h2>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{width: '100%'}}
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
          label="Área"
          name="area"
          rules={[{ required: true, message: 'Por favor ingresa el área' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Capacidad"
          name="capacity"
          rules={[{ required: true, message: 'Por favor ingresa la capacidad' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Precio"
          name="price"
          rules={[{ required: true, message: 'Por favor ingresa el precio' }]}
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
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Edificio"
          name="building"
          rules={[{ required: true, message: 'Por favor selecciona un edificio' }]}
        >
          <Select>
            <Select.Option value="edificio1">Edificio 1</Select.Option>
            <Select.Option value="edificio2">Edificio 2</Select.Option>
            {/* Agrega más opciones según tus edificios */}
          </Select>
        </Form.Item>
        <Form.Item
          label="Servicios"
          name="services"
          rules={[{ required: true, message: 'Por favor selecciona los servicios' }]}
        >
          <Select mode="multiple">
            {serviceOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
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

        <Form.Item label="Estado" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Guardar">
          <Button type="primary" htmlType="submit">
            Guardar Oficina
          </Button>
        </Form.Item>
      </Form>
    </div>
    <div className={styled.carouselContainer}>
        {idListImage.map((data, index) => (
          <div key={index} className={styled.imgContainer}>
            <img  className={styled.img}  src={data.url} alt={data.name} />
          </div>
        ))}
    </div>
  </div>
      
  );
};

export default FormOffice;
