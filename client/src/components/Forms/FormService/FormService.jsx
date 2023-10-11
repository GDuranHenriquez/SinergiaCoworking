import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';

const FormService = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState({ name: { status: false, message: '' } });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const onChange = (event) => {
    const value = form.getFieldValue(event.target.id);
    const regest = /^[a-zA-Z]+$/;
    switch (event.target.id) {
      case 'name':
        if (!regest.test(value)) {
          const newError = { ...error, name: { status: true, message: 'El nombre no puede contener números' } };
          setError(newError);
        } else if (value === '') {
          const newError = { ...error, name: { status: true, message: 'Se necesita un nombre' } };
          setError(newError);
        } else {
          const newError = { ...error, name: { status: false, message: '' } };
          setError(newError);
        }
        break;
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://sinergia-coworking.onrender.com/service', { name: values.name });
      form.resetFields();
      setModalVisible(true);
    } catch (error) {
      console.error('Error al crear el servicio:', error);
    }
  };

  const handleModalOk = () => {
    setModalVisible(false);
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
        <h2 style={{ textAlign: 'center' }}>Crear un nuevo servicio</h2>
        <Form.Item
          label="Nombre del Servicio"
          name="name"
          help={error?.name.status ? error.name.message : undefined}
        >
          <Input onChange={onChange} id="name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar Servicio
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Servicio creado con éxito"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        <p>El servicio se ha creado con éxito.</p>
      </Modal>
    </div>
  );
};

export default FormService;
