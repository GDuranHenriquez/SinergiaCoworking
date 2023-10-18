import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NavBarNavigation from "../Navigation/navBarNavigation/NavBarNavigation";
import { Descriptions, Calendar, Button } from "antd";
import styles from "./Detail.module.css";
import axios from "axios";
import CardOffice from "./CardOffice";
import getInfoDataServicios from "./Utils/DataServicios";
import IconDescription from "./ComponentServices/IconDescription";
import { Rate } from "antd";
import { Card, Space, Avatar, Modal } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../../Authenticator/AuthPro";
import { useModal } from "../../utils/useModal";
import ModalLogin from "../../components/login/modalStatusRegister/Login";
import ModalRegister from "../../components/login/modalStatusRegister/Register";
import FormCheckout from "./ComponentSheckout/FormCheckout";
import Loading from "../../components/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Office } from "../../redux/slices/offices/typeOffice";
/* import { ObjectBuilding } from "../../redux/slices/building/typesBuilding"; */
interface BuildingObject {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  office_building: Office[] | [];
}



type Reservation = {
  id: string;
  date: Date;
  amount: number;
  purchase: string;
  office: string
};


type OfficeCategory = {
  id: number;
  name: string
}

export type OfficeInfo = {
  id?: string;
  name?: string;
  capacity?: number;
  price?: number;
  ratingAverage?: number;
  office_officeImage?: ImageOffice[];
  services?: ServicesOffice[];
  office_score?: ScoreOffice[];
  office_reservation?: Reservation[] | [];
  office_category: OfficeCategory
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

export type ItentPaiment = {
  id_itent: string,
  client_secret: string
}

const { Meta } = Card;

function Detail() {
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); //Modal aviso
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false)//Modal Detail
  const [isOpenModalRegister, openModalRegister, closeModalRegister] = useModal(false);//Modal Register    
  const [isOpenModalLogin, openModalLogin, closeModalLogin] = useModal(false);//Modal Login
  const [calendarDate, SetCalendarDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [itentPaiment, setItentPaiment] = useState<ItentPaiment | null>(null);
  const [priceQuery, setPriceQuery] = useState<number>(0);
  const [avalibleOpenSpace, setAvalibleOpenSpace] = useState<number  | null>(null)
  const user = auth.getUser();
  const [arrayScore, setArrayScore] = useState<Array<number>| null>(null);
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

  const ref = useRef<null | HTMLDivElement>(null);

  const messageError = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
    setIsLoading(true)
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: 'center', inline: 'start' });
    }
    setOfficeId("");
    axios
      .get(import.meta.env.VITE_BASENDPOINT_BACK + `/office/${id}`)
      .then((response) => {
        setOfficeId(id);
        /* selectedOffice?.office_score? */
        setSelectedOffice(response.data);
        const officeDetail = response.data.office_score;
        const randomScore = [];
        if(officeDetail.length <= 4){
          for(let i = 0; i < officeDetail.length; i++){
            const index = i;
            randomScore.push(index)
          }
        }else{
          for(let i = officeDetail.length - 1; i >= officeDetail.length -4 ; i--){
            const index = i;
            randomScore.push(index)
          }
        }
        
        setArrayScore(randomScore);
        const typeOffice = selectedOffice?.office_category.name
        if (typeOffice !== "Open space") {
          setAmount(1);
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error al cargar la oficina:", error);
        setIsLoading(false)
      });
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (!current) {
      return false;
    }

    if (!selectedOffice) {
      return false;
    }
    let currentDate = current.format('YYYY-MM-DD');
    currentDate = currentDate.substring(0, 10);

    let numberReserve = 0;
    if(selectedOffice.office_category.name === 'Open space'){
      if(selectedOffice.office_reservation){
        for (
          let index = 0;
          index < selectedOffice.office_reservation.length;
          index++
          ) {
            const element = selectedOffice.office_reservation[index];
            let date = "" + element.date;
            date = date.substring(0, 10);

          if (date  === currentDate) {
            numberReserve = numberReserve + element.amount;
          }
        }
        if( numberReserve === selectedOffice.capacity){
          return true;
        }
      }
      

    }else{
        if( selectedOffice.office_reservation){
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
        }    
      }     

    return current && current < dayjs().endOf("day");
  };

  const disponibilityOffice = async (description: string | undefined, amount: number | undefined, amountPrice: number | undefined, date: string, office: string) => {
    try {
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + `/office/availability-check/?office=${office}&date=${date}&amount=${amount}`;

      const dataSend = {
        amount: amountPrice,
        description: description
      }
      const { data } = await axios.post(endPoint, dataSend);
      return data;

    } catch (error) {
      if (typeof error === 'string') {
        console.log(error)
      } else if (error instanceof Error) {
        const message = error.message
        console.log(message)
      } else {
        console.log(error)
      }
      setIsLoading(false);
    }


  }

  const disponibilitiOpenSpace = async (office: string, date:string) => {
    try {
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + `/office/check-space/?office=${office}&date=${date}`;
      const { data } = await axios.get(endPoint);      
      return data.availableSpaces
    } catch (error) {
      if (typeof error === 'string') {
        console.log(error)
      } else if (error instanceof Error) {
        const message = error.message
        console.log(message)
      } else {
        console.log(error)
      }
    }
  }

  const reservarButton = async () => {
    if (auth.isAuthenticated) {
      setIsLoading(true);

      const sendQuery = {
        description: selectedOffice?.name,
        amount: amount,
        amountPrice: selectedOffice?.price ? selectedOffice.price * amount : undefined,
        date: calendarDate,
        office: officeId
      }
      
      const data = await disponibilityOffice(sendQuery.description, sendQuery.amount, sendQuery.amountPrice, sendQuery.date, sendQuery.office);
      if (!data.available) {
        messageError('El espacio a reservar no se encuentra disponible en este horario.')
        setIsLoading(false);
      } else {
        setItentPaiment(data.itentPaiment);
        setPriceQuery(data.price)
        setIsLoading(false);
        setIsModalOpenDetail(true);
      }

    } else {
      setIsModalOpen(true);
    }
  }

  //Modal aviso authenticacion 
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      openModalLogin();
    }, 300)
  };


  //Modal login
  const switModalRegister = () => {
    openModalRegister();
  }

  //Modal Register
  const switModalLogin = () => {
    openModalLogin()
  }

  //Modal Checkout Detail
  const handleCancelDetal = () => {
    setIsModalOpenDetail(false);
  };

  const handlePanelChange = (date: Dayjs) => {
    const dateSelec = date.format('YYYY-MM-DD')
    if(selectedOffice){
      if(selectedOffice.office_category.name === "Open space"){
        setIsLoading(true);
        disponibilitiOpenSpace(officeId, dateSelec).then((res) =>{
          setAvalibleOpenSpace(res);
          setIsLoading(false);
        }).catch((error) => {
          console.error("Error al cargar la oficina:", error);
          setIsLoading(false)
        });
      }
    }
    
    SetCalendarDate(dateSelec);
    setIsLoading(false)
  };

  const handleAmount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    const target = e.target as HTMLButtonElement;
    if(target.name === 'iconsMinus'){
      const newAmount = amount -1
      if(newAmount >= 1){
        setAmount(newAmount);
      }
    }else if(target.name === 'iconsPlus'){
      const newAmount = amount + 1
      if(avalibleOpenSpace){
        if(newAmount <= avalibleOpenSpace){
          setAmount(newAmount);
        }
      }
      
    }
  }

  const returnCounter = () =>{
    if(selectedOffice){
      if(selectedOffice.office_category.name === "Open space"){
        return <div className={styles.counter}>                      
          <div className={styles.iconsMinus}>
            <button id={styles.iconsMinus} name="iconsMinus" onClick={handleAmount}>➖</button>
          </div>
          <div className={styles.amount}>
            <input type="text" inputMode="none" value={amount} />
          </div>
          <div className= {styles.iconsPlus}>
            <button id={styles.iconsPlus} name="iconsPlus" onClick={handleAmount}>➕</button>
          </div>
        </div>  
      }else{
        return null
      }
    }
    return null; 

  }


  return (
    <div className={styles.containerMayor}>
      <NavBarNavigation />
      <div className={styles.containerMayor}>
        <div className={styles.container}>
          <div className={styles.containerInfoBuild}>
            <img
              id={styles.imagenn}
              style={{
                height: "245px",
                width: "45%",
              }}
              alt="example"
              src={building.imageUrl}
            />

            <div className={styles.nombreDireccion}>
              <h2 className={styles.nameBuilding}> {building.name}</h2>
              <Descriptions.Item label="Dirección">
                <p className={styles.addresss}>{building.address}</p>
              </Descriptions.Item>

              {/* {isRoot && useAuthenticator ? <Button
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
              </Button> : null} */}
            </div>
          </div>
        </div>

        <div className={styles.containerInfoOffices}>
          {building.office_building.map((office) => (
            <div
              className={styles.officeDetailContainer}
              onClick={() => getOfficeInfo(office.id? office.id:'')}             
            >
             <CardOffice
                id={office.id? office.id : ''}
                name={office.name? office.name:''}
                capacity={office.capacity? Number(office.capacity): 0}
                ratingAverage={office.ratingAverage}
                office_officeImage={office.office_officeImage? office.office_officeImage: []}
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
                      }}
                      fullscreen={false}
                      disabledDate={disabledDate}
                      onSelect={handlePanelChange}
                    ></Calendar>
                    {returnCounter()}
                    <Button
                      style={{
                        backgroundColor: "#E47F36",
                        color: "black",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                      type="primary"
                      htmlType="submit"
                      onClick={reservarButton}
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
                        borderRadius: "0px 7px 0px 7px",
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
                    {selectedOffice.office_category.name === "Open space" && avalibleOpenSpace !== null ? <h4 style={{ margin: "5px" }}>
                      {" "}
                      Cantidad de espacios disponibles: {avalibleOpenSpace}
                    </h4>: null}
                    
                    <h4 style={{ margin: "3px" }}>
                      {" "}
                      USD {selectedOffice.price}
                    </h4>
                  </div>
                  <Rate disabled defaultValue={selectedOffice.ratingAverage} />
                  <br></br>
                  {/* {auth.isRoot? <Button
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
                  </Button>: null} */}
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
                </div>

                <div className={styles.capacityoffice}> </div>

              </div>
            )}

            {officeId && selectedOffice && (
              <div className={styles.abajo}>
                <div>
                  <Space direction="vertical" size={15}>
                    <div className={styles.scoreoffice}>
                      {" "}
                      {selectedOffice?.office_score? arrayScore?.map((sc, index) => (
                        // <div style={{width:'100%'}}>
                        <Card
                          key={index}
                          size="small"
                          bodyStyle={{width:'100%'}}
                          style={{ width: '100%', margin: "6px"}}
                        >
                          {selectedOffice?.office_score? <Meta
                            avatar={<Avatar src={selectedOffice?.office_score[sc].user_score?.imgUrl? selectedOffice?.office_score[sc].user_score.imgUrl: null} />}
                            title={selectedOffice?.office_score[sc].user_score?.name}
                            description={
                              <div>
                                {" "}
                                <Rate disabled defaultValue={selectedOffice?.office_score[sc].score} />
                                <br></br>
                                <div className={styles.comment}>
                                  {selectedOffice?.office_score[sc].comment}
                                </div>
                              </div>
                            }
                          />: null}
                        </Card>
                        // </div>
                      )) : null}
                    </div>
                  </Space>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal title="Aviso de autenticación" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Gracias por preferirnos al elegir nuestros espacios.</p>
        <p>Para continuar debe autenticarse.</p>
      </Modal>

      <FormCheckout open={isModalOpenDetail} onCancel={handleCancelDetal} user={user} office={selectedOffice} date={calendarDate} itentPaiment={itentPaiment} address={building.address}
        amount={amount} price={priceQuery}></FormCheckout>

      <ModalLogin isOpen={isOpenModalLogin} closeModal={closeModalLogin} switModalRegister={switModalRegister}></ModalLogin>

      <ModalRegister isOpen={isOpenModalRegister} closeModal={closeModalRegister} switModalLogin={switModalLogin}></ModalRegister>

      <ToastContainer></ToastContainer>
      {isLoading && <Loading />}
    </div>
  );
}

export default Detail;
