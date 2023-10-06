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

const FormBuilding = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false)


  const handleChange = (value)=>{
    console.log(value)
  }

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await axios.post('http://localhost:3001/building', values);
      form.resetFields();
    } catch (error) {
      console.error('Error al crear el edificio:', error);
    }
  };

  return (
      <Form
        form={form}
        labelCol={{ span: 4 }}
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

        onChange={handleChange}
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
        <Form.Item
          label="Imagen"
          name="imageUrl"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Por favor sube una imagen' }]}
        >
          <Upload
            action="/upload.do"
            listType="picture-card"
            maxCount={1} // Establece el máximo de archivos permitidos a 1
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Subir imagen</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Ciudad"
          name="city"
          rules={[{ required: true, message: 'Por favor selecciona una ciudad' }]}
        >
          <Select>
            <Select.Option value={1}>Ciudad A</Select.Option>
            <Select.Option value={2}>Ciudad B</Select.Option>
            <Select.Option value={3}>Ciudad C</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Estado" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Guardar">
          <Button type="primary" htmlType="submit">
            Guardar Edificio
          </Button>
        </Form.Item>
      </Form>
  );
};

export default FormBuilding;
