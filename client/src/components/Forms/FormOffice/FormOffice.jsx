import React, { useState } from 'react';
import { Button, Form, Input, Select, Switch, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const FormOffice = () => {
  const [form] = Form.useForm();

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

  return (
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{
          width: '50%',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid rgba(0,0,0,0.3)',
          boxShadow: '0px 0px 10px 1px rgb(0,0,0)',
          
        }}
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
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Por favor sube imágenes' }]}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Subir imágenes</div>
            </div>
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
  );
};

export default FormOffice;
