import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';

const FormCategory = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await axios.post('https://sinergia-coworking.onrender.com/category', { name: values.name });
      form.resetFields();
      setModalVisible(true); // Mostrar el modal cuando la categoría se crea con éxito
    } catch (error) {
      console.error('Error al crear la categoría:', error);
    }
  };

  const handleModalOk = () => {
    setModalVisible(false); // Ocultar el modal cuando se hace clic en "OK"
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
        labelCol={{ span: 6 }}
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
         <Form.Item>
          <h2 style={{ textAlign: 'center' }}>Crear Categoría</h2>
        </Form.Item>
        <Form.Item
          label="Nombre"
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

      <Modal
        title="Categoría cargada con éxito"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        La categoría se ha cargado con éxito.
      </Modal>
    </div>
  );
};

export default FormCategory;
