import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Upload, Modal, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '../../../redux/slices/city/actionsCity';
import MapDinamic from '../../Map/MapDinamic';
import axios from 'axios';
import { uploadImageToCloudinary } from '../../../utils/configCloudinary';
import styles from './styleFormBuilding.module.css';

/* const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}; */

const FormBuilding = () => {
  const { Meta } = Card;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.city.allCities);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState('');
  const [image, setImage] = useState(null); 
  const [name , setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [formPosition, setFormPosition] = useState({lat:'', lng: ''})
  const [formAddress, setFormAddress] = useState('')

  useEffect(() => {
    getAllCities(dispatch);
  }, [dispatch]);

  const handleAddress = (address) => {
    setFormAddress(address)
  }
  const handlePosition = (position) => {
    setFormPosition({lat: position.lat, lng: position.lng})
  }
  const handleSubmit = async (values) => {
    try {

      const data = {...values, imageUrl: image}
      // const data = {address: form.getFieldsValue('addres'), lat: form.getFieldValue(lat), lng: form.getFieldValue(),}

      console.log(data);
      await axios.post('https://sinergia-coworking.onrender.com/building', data);
      form.resetFields();
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.error('Error al crear la sucursal:', error);
      setErrorModalContent(error.message || 'Error al crear la sucursal');
      setIsErrorModalVisible(true);
    }
  };

  const handleModalOk = () => {
    setIsSuccessModalVisible(false);
    setIsErrorModalVisible(false);
  };
  useEffect(() => {
    form.setFieldsValue({
      lat: formPosition.lat ? formPosition.lat.toString() : "",
      lng: formPosition.lng ? formPosition.lng.toString() : "",
      address: formAddress
    })
  }, [formAddress])
  const customRequest = async ({ file, onSuccess }) => {
    try {
      const response = await uploadImageToCloudinary(file);
      setImage(response);
      onSuccess(response);
      return null;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  const handleChangeImputs = (e) => {
    console.log(e.target.id)
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;    
      default:
        break;
    }
  }

  const handleSelectChange = (value) => {
    setCity(cities[value - 1].name)
  }

  const handleImageRemove = () => {
    setImage(null);
  };



  return (<div style={{
    width: '80%',   
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
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
      <h2 style={{ color: "black" }}>Guardar nueva sucursal</h2>
      <Form
        style={{width: '100%'}}
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"

        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
        >
          <Input onChange={handleChangeImputs}/>
        </Form.Item>
        <Form.Item
          label="Dirección"
          name="address"
          rules={[{ required: true, message: 'Por favor ingresa la dirección' }]}
        >
          <Input onChange={handleChangeImputs}/>
        </Form.Item>
        <Form.Item
          hidden={true}
          label="Latitud"
          name="lat"
          rules={[{ required: true, message: 'Por favor ingresa la latitud' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          hidden={true}
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
          label="Imagen"
          name="imageUrl"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa una imagen correcta',
            }
          ]}
        >
          <Upload
            customRequest={customRequest}
            maxCount={1}
            listType="picture"
            accept="image/*"
            onRemove={handleImageRemove}
          >
            {!image && <Button icon={<UploadOutlined />}>Cargar imagen</Button>}
          </Upload>
        </Form.Item>
        <Form.Item label="Ciudad" name="city" rules={[{ required: true, message: 'Por favor selecciona una ciudad' }]}>
          <Select options={cities.map(city => ({ value: city.id, label: city.name }))} onChange={handleSelectChange}/>
        </Form.Item>
        <MapDinamic handleAddress={handleAddress} handlePosition={handlePosition}/>
        <Form.Item style={{ marginTop: '30px'}}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>

      {/* Modal de éxito */}
      <Modal
        title="Acción exitosa"
        open={isSuccessModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        La sucursal ha sido creada con éxito.
      </Modal>

      {/* Modal de error */}
      <Modal
        title="Error"
        open={isErrorModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
     No se pudo crear la sucursal.
      </Modal>
    </div>
    <div className={styles.container}>
      {image && <Card hoverable  className={styles.cardContainer} cover={  <img className={styles.imgCard} alt="example" src={image} />} >
      {/* <img id={styles.imgCard} alt="example" src={image} /> */}
        <Meta title={name} description={formAddress} />
      </Card>}
    </div>
  </div>

  );
};

export default FormBuilding;