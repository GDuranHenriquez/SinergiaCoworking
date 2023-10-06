import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBarNavigation from "../Navigation/navBarNavigation/NavBarNavigation";
import { Descriptions, DatePicker } from "antd";
import ButtonConfirm from "./ButtonConfirm";
import ImageZoom from "../../components/Image/Image";
import styles from "./Detail.module.css";
import axios from "axios";
import CardOffice from "./CardOffice";
import getInfoDataServicios from "./Utils/DataServicios";
import IconDescription from "./ComponentServices/IconDescription";
import type { DatePickerProps } from 'antd';
import { Rate } from 'antd';

interface BuildingObject {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  office_building: Offices[] | [];
}

type Offices = {
  id: string;
  name: string;
  capacity: number;
  ratingAverage: number;
  office_officeImage: Imagen[] | [];
}

type Imagen = {
  id?: string;
  imageUrl?: string;
  office?: string;
}


type OfficeInfo = {
  id?: string;
  name?: string;
  capacity?: number;
  ratingAverage?: number;
  office_officeImage?: imageOffice[];
  services: servicesOffice[];
  office_score?: scoreOffice[];
};

type imageOffice = {
  id: string;
  imageUrl: string;
  office: string;
};

type servicesOffice = {
  id: number;
  name: string;
};

type scoreOffice = {
  id: string;
  comment: string;
  score: number;
  date: string;
  user: string;
  office: string;
};

function Detail() {

  const { id } = useParams<{ id: string }>();
  const [building, setBuilding] = useState<BuildingObject>({
    name: "",
    id: "",
    address: "",
    imageUrl: "",
    office_building: [],
  });
  const [officeId, setOfficeId] = useState<string>("");
  const [selectedOffice, setSelectedOffice] = useState<OfficeInfo>();

  useEffect(() => {
    
    axios
      .get(import.meta.env.VITE_BASENDPOINT_BACK + `/building/${id}`)
      .then((response) => {
        setBuilding(response.data)
      })
      .catch((error) => {
        console.error("Error al cargar las sucursales:", error);
      });
  },[])

  const getOfficeInfo = (id: string) => {
    setOfficeId(id);
    axios
      .get(import.meta.env.VITE_BASENDPOINT_BACK + `/office/${id}`)
      .then((response) => {
        setSelectedOffice(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar la oficina:", error);
      });
  };

  return (
    <div>
      <NavBarNavigation />
      <div className={styles.containerMayor}>
      <div className={styles.container}>
        <div className={styles.containerInfoBuild}>
          <img
            id={styles.imagenn}
            style={{ height: "400px", width: "100%" }}
            alt="example"
            src={building.imageUrl}
          />

          <div className={styles.descripcion}>
            <h2 className={styles.title}> {building.name}</h2>
            <Descriptions.Item label="Dirección">
              <p className={styles.addresss}>{building.address}</p>
            </Descriptions.Item>
          </div>
        </div>
      </div>
  
      <div className={styles.containerInfoOffices}>
        {building.office_building.map((office) => (
          <div
            className={styles.officeDetailContainer}
            onClick={() => getOfficeInfo(office.id)}
          >
            <CardOffice 
              id={office.id}
              name={office.name}
              capacity={office.capacity}
              ratingAverage={office.ratingAverage}
              office_officeImage={office.office_officeImage}
            ></CardOffice>
          </div>
        ))}
      </div>
      <div className={styles.containerTernario}>
      {selectedOffice && (
        <div className={styles.msj}>
          <div className={styles.izquierda}>
        <div className={styles.nameoffice}> <h1>{selectedOffice.name}</h1></div>
        <div className={styles.capacityoffice}> <h4> Capacidad máxima: {selectedOffice.capacity} personas</h4></div>
        
        <br></br>
       <br></br>
       <DatePicker />
       <br></br>
       <br></br>
        <div className={styles.scoreoffice}>    {selectedOffice.office_score?.map((sc) => <div> <Rate disabled defaultValue={sc.score}/><br></br><div className={styles.comment}>{sc.comment}</div><br></br><p>Usuario: {sc.user} </p></div>)}</div>
        </div>

        <div className={styles.derecha}>
        <div>   {selectedOffice.office_officeImage?.map((img) => <img style={{width:'100%', height:'80%'}}  src={img.imageUrl}></img>)}</div>
        <div className={styles.averageoffice}> <Rate disabled defaultValue={selectedOffice.ratingAverage}/></div>
        <div className={styles.servicesoffice}><h5><h2>¿Por qué elegir Sinergia?</h2>{selectedOffice.services?.map((service) => <IconDescription data={getInfoDataServicios(service.name.toLowerCase())}></IconDescription>)}</h5></div>



        
        </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default Detail;
