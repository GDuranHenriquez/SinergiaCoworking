import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

const FormCategory = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await axios.post('http://localhost:3001/category', { name: values.name });
      form.resetFields();
    } catch (error) {
      console.error('Error al crear la categoría:', error);
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
          label="Nombre de la Categoría"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre de la categoría' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Guardar">
          <Button type="primary" htmlType="submit">
            Guardar Categoría
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCategory;
