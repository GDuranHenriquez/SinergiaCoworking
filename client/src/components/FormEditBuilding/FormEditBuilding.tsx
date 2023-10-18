import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getAllCities } from "../../redux/slices/city/actionsCity";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useLocation } from "react-router";
import { useCustomSelector, useCustomDispatch } from "../../hooks/redux";
import axios from "axios";
import { uploadImageToCloudinary } from "../../utils/configCloudinary";
import MapDinamic from "../Map/MapDinamic";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import Link from "antd/es/typography/Link";


const FormEditBuilding = () => {
  const { state } = useLocation();
  const dispatch = useCustomDispatch();
  const cities = useCustomSelector((state) => state.city.allCities);
  const [form] = Form.useForm();

  const [address, setAddress] = useState(state.address);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(state.name);
  const [city, setCity] = useState(state.city);
  const [formPosition, setFormPosition] = useState({ lat: "", lng: "" });
  const [formAddress, setFormAddress] = useState("");
  const [finish, setFinish] = useState(false);
  const [defaultListImage, setDefaultListImage] = useState<UploadFile<any>[] | undefined>(undefined);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [_errorIsModalContent, setIsErrorModalContent] = useState("");

  useEffect(() => {
    getAllCities(dispatch);
  }, [dispatch]);

  const handleAddress = (address: any) => {
    setFormAddress(address);
  };
  const handlePosition = (position: any) => {
    setFormPosition({ lat: position.lat, lng: position.lng });
  };
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (value: number) => {
    setCity(cities[value - 1].name);
  };

  
  const save = async (values: any) => {
    try {
      let newImage = values.imageUrl;
      if (image) {
        newImage = image;
      }
      const data = { ...values, id: state.id, imageUrl: newImage };
      await axios.put("https://sinergia-coworking.onrender.com/building", data);
      setIsSuccessModalVisible(true);
    } catch (error) {
      if(typeof error === 'string'){
        setIsErrorModalContent(error || "Error al modificar la sucursal");
      }else if(error instanceof Error){
        const message = error.message
        setIsErrorModalContent(message || "Error al modificar la sucursal");
      } else {
        console.log(error)
      }         
      setIsErrorModalVisible(true);
    }
  };

  useEffect(() => {
    setAddress(state.address);
    setDefaultListImage([
      {
        uid: "-1",
        name: "imagen.png",
        status: "done",
        url: state.imageUrl,
      },
    ]);
    setImage(state.imageUrl);
    setFormPosition({ lat: state.lat, lng: state.lng });
    setFinish(true);
  }, []);

  useEffect(() => {
    form.setFieldValue("name", state.name);
    form.setFieldValue("city", state.city);
    form.setFieldValue("lat", state.lat);
    form.setFieldValue("lng", state.lng);
    form.setFieldValue("address", state.address);
    form.setFieldValue("imageUrl", state.imageUrl);
  }, [finish]);

  useEffect(() => {
    form.setFieldsValue({
      lat: formPosition.lat ? formPosition.lat.toString() : "",
      lng: formPosition.lng ? formPosition.lng.toString() : "",
      address: formAddress,
    });
  }, [formAddress]);


  const handleImageRemove = () => {
    setImage(null);
    setDefaultListImage(undefined);
  };

  const customRequest = async ({
    file,
    onSuccess,
  }: {
    file: File;
    onSuccess: (response: any) => void;
  }) => {
    try {
      const response = await uploadImageToCloudinary(file);
      setDefaultListImage(undefined);
      setImage(response);
      onSuccess(response);
      return null;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  const handleModalOk = () => {
    setIsSuccessModalVisible(false);
    setIsErrorModalVisible(false);
  };
  return (<>
    {finish? 
    <div
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "65px",
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
        <h2 style={{ color: "black", textAlign: "center" }}>Editar sucursal</h2>
        <Form
          style={{ width: "100%" }}
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          onFinish={save}
        >
          <Modal
            title="Acción exitosa"
            open={isSuccessModalVisible}
            onOk={handleModalOk}
            cancelButtonProps={{ style: { display: "none" } }}
          >
            La sucursal ha sido modificada con éxito.
          </Modal>
          <Modal
            title="Error"
            open={isErrorModalVisible}
            onOk={handleModalOk}
            cancelButtonProps={{ style: { display: "none" } }}
          >
            No se pudo modificar la sucursal.
          </Modal>
         
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor ingresa un nombre",
              },
            ]}
          >
            <Input value={name} onChange={handleNameChange} />
          </Form.Item>
          <Form.Item
            label="Dirección"
            name="address"
            rules={[
              {
                required: true,
                message: "Por favor ingresa una dirección",
              },
            ]}
          >
            <Input value={address} onChange={handleAddressChange} />
          </Form.Item>
          <Form.Item
            hidden={true}
            label="Latitud"
            name="lat"
            rules={[
              { required: true, message: "Por favor ingresa la latitud" },
            ]}
          >
            <Input value={formPosition.lat} />
          </Form.Item>
          <Form.Item
            hidden={true}
            label="Longitud"
            name="lng"
            rules={[
              { required: true, message: "Por favor ingresa la longitud" },
            ]}
          >
            <Input value={formPosition.lng} />
          </Form.Item>
          {/* <Form.Item
            label="Imagen"
            name="imageUrl"
           
          >
            {!image && (
              <img
                style={{ alignSelf: "center", width: "70px", height: "70px" }}
                src={state.imageUrl}
              ></img>
            )}
          </Form.Item> */}
          <Form.Item label="Imagen"
            name="imageUrl" style={{ width: "100%" }}
            rules={[
              { required: true, message: "Por favor carga una imagen" },
            ]}>
            <Upload
              defaultFileList={defaultListImage}
              customRequest={customRequest as any}
              maxCount={1}
              listType="picture"
              accept="image/*"
              onRemove={handleImageRemove}
            >
              {!image && (
                <Button icon={<UploadOutlined />}>Cargar imagen</Button>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Ciudad"
            name="city"
            rules={[
              {
                required: true,
                message: "Por favor ingresa una ciudad",
              },
            ]}
          >
            <Select style={{textAlign: 'left'}}
              value={city}
              options={cities.map((c) => ({ value: c.id, label: c.name }))}
              onChange={handleCityChange}
            />
          </Form.Item>
          <MapDinamic
            handleAddress={handleAddress}
            handlePosition={handlePosition}
            positionForm={formPosition}
          />
          <Form.Item style={{marginTop: "30px" }}>
            <Link style={{marginRight:'40px',padding:'0px'}} href="/editar-sucursal" >
          <Button type="primary">Volver</Button>
        </Link>
            <Button  type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>: null}
  </>
  );
};

export default FormEditBuilding;
