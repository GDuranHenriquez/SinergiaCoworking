import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NavBarNavigation from "../Navigation/navBarNavigation/NavBarNavigation";
import { Descriptions, Calendar, Button } from "antd";
import styles from "./Detail.module.css";
import axios from "axios";
import CardOffice from "./CardOffice";
import getInfoDataServicios from "./Utils/DataServicios";
import IconDescription from "./ComponentServices/IconDescription";
import { Rate } from "antd";
import { Card, Space, Avatar } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { current } from "@reduxjs/toolkit";
import { useAuth } from "../../Authenticator/AuthPro";


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
};

type Reservation = {
  id: string;
  date: Date;
};

type Imagen = {
  id?: string;
  imageUrl?: string;
  office?: string;
};

type OfficeInfo = {
  id?: string;
  name?: string;
  capacity?: number;
  price?: number;
  ratingAverage?: number;
  office_officeImage?: ImageOffice[];
  services?: ServicesOffice[];
  office_score?: ScoreOffice[];
  office_reservation?: Reservation[] | [];
};

type ImageOffice = {
  id: string;
  imageUrl: string;
  office: string;
};

type ServicesOffice = {
  id: number;
  name: string;
};

type ScoreOffice = {
  id: string;
  comment: string;
  score: number;
  date: string;
  user: string;
  office: string;
  user_score: OfficeData;
};

type OfficeData = {
  name: string;
  imgUrl: string;
};

const { Meta } = Card;

function Detail() {
  const auth = useAuth();
  const useAuthenticator = auth.isAuthenticated;
  const isRoot = auth.isRoot;
  const { id } = useParams<{ id: string }>();
  const [building, setBuilding] = useState<BuildingObject>({
    name: "",
    id: "",
    address: "",
    imageUrl: "",
    office_building: [],
  });
  /* const [officeId, setOfficeId] = useState<string>(""); */
  const [selectedOffice, setSelectedOffice] = useState<OfficeInfo>();

  const ref = useRef<null | HTMLDivElement>(null); 



  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASENDPOINT_BACK + `/building/${id}`)
      .then((response) => {
        setBuilding(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las sucursales:", error);
      });
  }, []);

  const getOfficeInfo = (id: string) => {
    if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: 'center', inline: 'start'  });
    }
    setOfficeId("");
    axios
      .get(import.meta.env.VITE_BASENDPOINT_BACK + `/office/${id}`)
      .then((response) => {
        setOfficeId(id);
        setSelectedOffice(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar la oficina:", error);
      });
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (!current) {
      return false;
    }

    if (!selectedOffice) {
      return false;
    }
    let currentDate = current.toISOString();
    currentDate = currentDate.substring(0, 10);
    for (
      let index = 0;
      index < selectedOffice.office_reservation.length;
      index++
    ) {
      const element = selectedOffice.office_reservation[index];

      let date = "" + element.date;
      date = date.substring(0, 10);

      if (date == currentDate) {
        return true;
      }
    }

    return current && current < dayjs().endOf("day");
  };

  return (
    <div>
      <NavBarNavigation />
      <div className={styles.containerMayor}>
        <div className={styles.container}>
          <div className={styles.containerInfoBuild}>
            <img
              id={styles.imagenn}
              style={{
                maxHeight: "400px",
                width: "100%",
                borderRadius: "7px",
                border: "1px solid #25252570",
              }}
              alt="example"
              src={building.imageUrl}
            />

            <div className={styles.nombreDireccion}>
              <h2 className={styles.nameBuilding}> {building.name}</h2>
              <Descriptions.Item label="Dirección">
                <p className={styles.addresss}>{building.address}</p>
              </Descriptions.Item>
            
              {isRoot && useAuthenticator? <Button
                      style={{
                        backgroundColor: "#E47F36",
                        color: "black",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                      type="primary"
                      htmlType="submit"
                      // disabled={Object.keys(disabledDate) ? true : false}
                    >
                      Editar sucursal
                    </Button> : null }
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
          <div className={styles.todoContenedor}>
            {/* <div className={styles.arriba}> */}

            {officeId && selectedOffice && (
              <div className={styles.msj}>
                <div className={styles.izquierda}>
                  {/* <br></br> */}
                  <div className={styles.calendario}>
                    <h2>Agendá tu visita</h2>
                    <div id={'ref'} ref={ref}></div>
                    <Calendar
                      style={{
                        border: "1px solid rgba(0,0,0,0.3)",
                        borderColor: "black",
                        width: "50%",
                        marginLeft: "180px",
                      }}
                      fullscreen={false}
                      disabledDate={disabledDate}
                    ></Calendar>
                    <Button
                      style={{
                        backgroundColor: "#E47F36",
                        color: "black",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                      type="primary"
                      htmlType="submit"
                      // disabled={Object.keys(disabledDate) ? true : false}
                    >
                      RESERVAR
                    </Button>
                  </div>
                </div>

                <br></br>

                <div className={styles.derecha}>
                  {" "}
                  {selectedOffice.office_officeImage?.map((img) => (
                    <img
                      style={{
                        width: "100%",
                        height: "80%",
                        border: "1px solid #dfe1e2",
                        borderRadius: "7px",
                      }}
                      src={img.imageUrl}
                    ></img>
                  ))}
                  <div className={styles.averageoffice}>
                    {" "}
                    <h4 style={{ margin: "5px" }}>
                      {" "}
                      Capacidad máxima: {selectedOffice.capacity} personas
                    </h4>
                    <h4 style={{ margin: "3px" }}>
                      {" "}
                      USD {selectedOffice.price}
                    </h4>
                  </div>
                  <Rate disabled defaultValue={selectedOffice.ratingAverage} />
                  <br></br>
                  <Button
                      style={{
                        backgroundColor: "#E47F36",
                        color: "black",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                      type="primary"
                      htmlType="submit"
                      // disabled={Object.keys(disabledDate) ? true : false}
                    >
                      Editar oficina
                    </Button>
                </div>
                
                <div className={styles.capacityoffice}> </div>
            
              </div>
            )}

            {officeId && selectedOffice && (
              <div className={styles.abajo}>
                <div className={styles.servicesoffice}>
                  <h5>
                    {/* <h2>¿Por qué elegir Sinergia?</h2> */}
                    <div className={styles.servicio}>
                      {selectedOffice?.services?.map((service) => (
                        <IconDescription
                          data={getInfoDataServicios(
                            service.name.toLowerCase()
                          )}
                        ></IconDescription>
                      ))}
                    </div>
                  </h5>
                </div>
                <div>
                  <Space direction="vertical" size={15}>
                    <div className={styles.scoreoffice}>
                      {" "}
                      {selectedOffice?.office_score?.map((sc) => (
                        <Card
                          size="small"
                          style={{ width: 290, margin: "6px" }}
                        >
                          <Meta
                            avatar={<Avatar src={sc.user_score.imgUrl} />}
                            title={sc.user_score.name}
                            description={
                              <div>
                                {" "}
                                <Rate disabled defaultValue={sc.score} />
                                <br></br>
                                <div className={styles.comment}>
                                  {sc.comment}
                                </div>
                              </div>
                            }
                          />
                        </Card>
                      ))}
                    </div>
                  </Space>
                </div>
              </div>
            )}
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
