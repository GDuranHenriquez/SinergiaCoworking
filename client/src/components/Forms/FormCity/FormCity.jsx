import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

const FormCity = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await axios.post('https://sinergia-coworking.onrender.com/city', { name: values.name });
      form.resetFields();
    } catch (error) {
      console.error('Error al crear la ciudad:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1F2551',
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{
          width: '400px',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nombre de la Ciudad"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre de la ciudad' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Guardar">
          <Button type="primary" htmlType="submit">
            Guardar Ciudad
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCity;
