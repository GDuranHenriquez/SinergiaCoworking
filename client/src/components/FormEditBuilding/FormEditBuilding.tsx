import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { getAllCities } from "../../redux/slices/city/actionsCity";
import { Button, Form, Input, Select, Upload } from "antd";
import {UploadFile, } from 'antd/lib/upload/interface'

import { useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useCustomSelector, useCustomDispatch } from "../../hooks/redux";
import axios from "axios";
import { uploadImageToCloudinary } from "../../utils/configCloudinary";
import MapDinamic from "../Map/MapDinamic";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import { City } from "../../redux/slices/city/typesCity";


interface BuildingObject {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  building_city: City[] | [];
}


const FormEditBuilding = () => {
  let { state } = useLocation();
  const dispatch = useCustomDispatch();
  const cities = useCustomSelector((state) => state.city.allCities);
  const [form] = Form.useForm();
  const [locations, setLocations] = useState<{ id: string; name: string }[]>(
    []
  );
  const [address, setAddress] = useState(state.address);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(state.name);
  const [city, setCity] = useState(state.city);
  const [formPosition, setFormPosition] = useState({lat:'', lng: ''})
  const [formAddress, setFormAddress] = useState('')
  const [finish, setFinish] = useState(false)
  const [defaultListImage, setDefaultListImage]= useState<UploadFile<any>[]|undefined>(undefined)
  

  useEffect(() => {
    getAllCities(dispatch);
  }, [dispatch]);
 
  const handleAddress = (address:any) => {
    setFormAddress(address)
  }
  const handlePosition = (position:any) => {
    setFormPosition({lat: position.lat, lng: position.lng})
  }
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (value: number) => {
    setCity(cities[value-1].name);
  };

  const handleImageChange = (e: any) => {
    setImage(e.target.value);
  };

  const save = (value) => {
    console.log(value);
  };

  useEffect(() => {
    console.log(state.lat);
    console.log(state.lng);
    setAddress(state.address)
    setDefaultListImage([
      {
        uid: '-1',
        name: 'imagen.png',
        status: 'done',
        url: state.imageUrl,
      },
    ]
    )
    setFormPosition({lat:state.lat, lng: state.lng})
    setFinish(true)
  }, []);

  useEffect(() => {
    form.setFieldValue('name', state.name);
    form.setFieldValue('city', state.city);
    form.setFieldValue('lat', state.lat);
     form.setFieldValue('lng', state.lng);
    form.setFieldValue('address', state.address);
    form.setFieldValue('imageUrl', state.imageUrl);

  },[finish])

  useEffect(() => {
    form.setFieldsValue({
      lat: formPosition.lat ? formPosition.lat.toString() : "",
      lng: formPosition.lng ? formPosition.lng.toString() : "",
      address: formAddress
    })
  }, [formAddress])

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const handleImageRemove = () => {
    setImage(null);
  };

  const customRequest = async ({ file, onSuccess }:{file: UploadFile, onSuccess: (response: any) => void }) => {
    try {
      const response = await uploadImageToCloudinary(file);
      setImage(response);
      onSuccess(response);
      return null;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  return (

    <div
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop:'65px',
        gap: "30px",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          background: "white",
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.3)",
          boxShadow: "0px 0px 10px 1px rgb(0,0,0)",
        }}
      >
         <NavBarNavigation />
        <h2 style={{ color: "black" }}>Editar sucursal</h2>
        <Form
          style={{ width: "100%" }}
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          onFinish={save}
        >
          <Form.Item label="Nombre" name="name">
            <Input value={name} onChange={handleNameChange} />
          </Form.Item>
          <Form.Item label="Direccion" name="address">
            <Input value={address} onChange={handleAddressChange} />
          </Form.Item>
          <Form.Item
          hidden={true}
          label="Latitud"
          name="lat"
          rules={[{ required: true, message: 'Por favor ingresa la latitud' }]}
        >
          <Input value={formPosition.lat} />
        </Form.Item>
        <Form.Item
          hidden={true}
          label="Longitud"
          name="lng"
          rules={[{ required: true, message: 'Por favor ingresa la longitud' }]}
        >
          <Input value={formPosition.lng} />
          </Form.Item>
          <Form.Item  label="Imagen"
          name="imageUrl"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa una imagen',
            }
          ]}>
          <Upload
          defaultFileList={defaultListImage}
            customRequest={customRequest as any}
            maxCount={1}
            listType="picture"
            accept="image/*"
            onRemove={handleImageRemove}
           
          >
            {!image && <Button icon={<UploadOutlined />}>Cargar imagen</Button>}
          </Upload>
          </Form.Item>
          
              <Form.Item label="Ciudad" name="city">
                <Select
                  value={city}
                  options={cities.map(c => ({ value: c.id, label: c.name }))}
                  onChange={handleCityChange}
                />
              </Form.Item>
              <MapDinamic handleAddress={handleAddress} handlePosition={handlePosition} positionForm={formPosition}/>
          <Form.Item style={{ marginTop: "30px" }}>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormEditBuilding;