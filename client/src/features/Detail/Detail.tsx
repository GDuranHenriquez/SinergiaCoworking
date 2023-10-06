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

interface BuildingObject {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  office_building: Offices[];
}

type Offices = {
  id: string;
  name: string;
  capacity: number;
  ratingAverage: number;
  image: string;
};


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
  const [selectedOffice, setSelectedOffice] = useState<OfficeInfo>({});

  useEffect(() => {
    console.log("hola");
    
    axios
      .get(import.meta.env.VITE_BASENDPOINT_BACK + `/building/${id}`)
      .then((response) => {
        setBuilding(response.data);
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
      <div className={styles.container}>
        <div className={styles.containerInfoBuild}>
          <img
            id={styles.imagenn}
            style={{ height: "200px", width: "50%" }}
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
              image={office.image}
            ></CardOffice>
          </div>
        ))}
      </div>
      <div className={styles.containerTernario}>
      {selectedOffice && (
        <div className={styles.msj}>
        <div className={styles.nameoffice}> <h1>{selectedOffice.name}</h1></div>
        <div className={styles.capacityoffice}> <h2> Capacidad máxima: {selectedOffice.capacity} personas</h2></div>
        <div>   {selectedOffice.office_officeImage?.map((img) => <img style={{width:'300px', height:'300px'}}  src={img.imageUrl}></img>)}</div>
        <div className={styles.averageoffice}>  <p>Puntaje promedio: {selectedOffice.ratingAverage}</p></div>
        <div className={styles.servicesoffice}><p>Extras: {selectedOffice.services?.map((service) => <IconDescription data={getInfoDataServicios(service.name.toLowerCase())}></IconDescription>)}</p></div>
        <div className={styles.scoreoffice}>    {selectedOffice.office_score?.map((sc) => <div> Puntaje: {sc.score}<br></br>{sc.comment}<br></br> {sc.user}</div>)}</div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Detail;
