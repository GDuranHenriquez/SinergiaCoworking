import {  UploadOutlined } from "@ant-design/icons";
import  { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useLocation } from "react-router";
import axios from "axios";
import { uploadImageToCloudinary } from "../../utils/configCloudinary";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import { Office } from "../../redux/slices/offices/typeOffice";
import { fetchCategories, fetchServices } from "../Forms/FormOffice/Utils";
import Link from "antd/es/typography/Link";

const FormEditOffice = () => {
  const [form] = Form.useForm();
  const { state } = useLocation();

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [_errorIsModalContent, setIsErrorModalContent] = useState("");
  const [finish, setFinish] = useState(false);
  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState([]);
  const [services, setServices] = useState([]);
  const [image, setImage] = useState(null);
  const [office, setOffice] =  useState<Office>();
  const [defaultListImage, setDefaultListImage] = useState<UploadFile<any>[] | undefined>(undefined);



  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleCapacityChange = (e: any) => {
    setCapacity(e.target.value);
  };
  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };

  const handleModalOk = () => {
    setIsSuccessModalVisible(false);
    setIsErrorModalVisible(false);
  };
  const fetchData = async () => {
    try {
      const services = await fetchServices();
      const categories = await fetchCategories();

      setServices(services);
      setCategory(categories);
    } catch (error) {
      if(typeof error === 'string'){
        console.error("Error al realizar la acción:", error);
      }else if(error instanceof Error){
        const message = error.message
        console.error("Error al realizar la acción:", message);
      } else {
        console.log(error)
      }    
    }
  };
  useEffect(() => {
    fetchData();

    axios
      .get(import.meta.env.VITE_BASENDPOINT_BACK + `/office/${state.id}`)
      .then((response) => {
        setOffice(response.data);
        
        if(response.data && response.data.office_officeImage && response.data.office_officeImage.length > 0){
          setDefaultListImage([
            {
              uid: "-1",
              name: "imagen.png",
              status: "done",
              url: response.data.office_officeImage[0].imageUrl,
            },
          ])
        }
      })
      .catch((error) => {
        if(typeof error === 'string'){
          console.error("Error al realizar la acción:", error);
        }else if(error instanceof Error){
          const message = error.message
          console.error("Error al realizar la acción:", message);
        } else {
          console.log(error)
        }    
        
      });
  }, []);

  useEffect(() => {
    form.setFieldValue("name", office?.name);
    form.setFieldValue("capacity", office?.capacity);
    form.setFieldValue("price", office?.price);
    form.setFieldValue("category", office?.category);
    const svcs: number[]=[];
    office?.services?.map((s) => {
      svcs.push(s.id)
    })
    form.setFieldValue("services", svcs);    
    setFinish(true);
    // form.setFieldValue("imageUrl", office?.office_officeImage);
  }, [office]);

 

  const save = async (values: any) => {
    try {
      
      let newImage = "";
      if (office && office.office_officeImage && office.office_officeImage.length >0) {
        newImage = office.office_officeImage[0].imageUrl;
      }
      if (image) {
        newImage = image;
      }
      const imgArray = [];
      imgArray.push(newImage);
      const data = { ...values, id: state.id, images: imgArray};
     
      await axios.put("https://sinergia-coworking.onrender.com/office", data);
      setIsSuccessModalVisible(true);
    } catch (error) {
      if(typeof error === 'string'){
        console.error("Error al modificar la oficina:", error);
        setIsErrorModalContent(error || "Error al modificar la oficina");
        setIsErrorModalVisible(true);
      }else if(error instanceof Error){
        const message = error.message
        console.error("Error al modificar la oficina:", message);
        setIsErrorModalContent(message || "Error al modificar la oficina");
        setIsErrorModalVisible(true);
      } else {
        console.log(error)
      }  
      
    }
  };

  const handleImageRemove = () => {
    setImage(null);
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
      setImage(response);
      onSuccess(response);
      return null;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  const customRequestUp = (_options: any ) =>{
    const { file, onSuccess } = _options;
    customRequest({file, onSuccess})
  }
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
        <h2 style={{ color: "black", textAlign: "center" }}>Editar oficina</h2>
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
            La oficina ha sido modificada con éxito.
          </Modal>
          <Modal
            title="Error"
            open={isErrorModalVisible}
            onOk={handleModalOk}
            cancelButtonProps={{ style: { display: "none" } }}
          >
            No se pudo modificar la oficina.
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
            label="Capacidad"
            name="capacity"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la capacidad",
              },
            ]}
          >
            <Input value={capacity} onChange={handleCapacityChange} />
          </Form.Item>
          <Form.Item
            label="Precio"
            name="price"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el precio",
              },
            ]}
          >
            <Input value={price} onChange={handlePriceChange} />
          </Form.Item>
          <Form.Item
            label="Categoría"
            name="category"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la categoría",
              },
            ]}
          >
            <Select style={{textAlign:'left'}} >
              {category.map((c: any) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Servicios"
            name="services"
            rules={[
              {
                required: true,
                message: "Por favor ingresa al menos un servicio",
              },
            ]}
          >
            <Select mode="multiple">
              {services.map((s: any) => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item style={{width:'90%'}}
            label="Imagen"
            name="image"
          >
            {office && office.office_officeImage && office.office_officeImage.length > 0 && (
              <img
                style={{ alignSelf: "center", width: "130px", height: "110px" }}
                src={office.office_officeImage[0].imageUrl}
              ></img>
            )}
          </Form.Item>
          <Form.Item style={{ marginLeft: "0%", width: "100%" }}>
            <Upload
              defaultFileList={defaultListImage}
              customRequest={customRequestUp}
              maxCount={1}
              listType="picture"
              accept="image/*"
              onRemove={handleImageRemove}
            >
              {(
                <Button icon={<UploadOutlined />}>Cargar imagen</Button>
              )}
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginTop: "30px" }}>
          <Link style={{marginRight:'40px',padding:'0px'}} href="/editar-oficina" >
          <Button type="primary"> Volver</Button>
        </Link>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>:null}
    </>
  );
};

export default FormEditOffice;
