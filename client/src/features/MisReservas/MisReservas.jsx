/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, List, Modal, Rate, Button, Form, Input, Empty } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useAuth } from '../../Authenticator/AuthPro';
import axios from 'axios';
import { postReviews } from '../../redux/slices/reviews/actionReviews';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';
import styles from './misReservas.module.css';

const MyReservations = () => {
  const auth = useAuth();
  const dispatch = useCustomDispatch();
  const { Purchase } = useCustomSelector((state) => state.purchase);
  const user = auth.getUser()?.id
  const [reservations, setReservations] = useState([])
  const [ratingVisible, setRatingVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [formu] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/purchase/${user}`;
    axios.get(endpoint)
      .then(data => {
        setReservations(data.data)
        if (data.data.length === 0) {
          // Si no hay reservas, abrir el modal automáticamente
          setModalVisible(true);
        }
        console.log(data.data);
      })
  }, [ratingVisible])

  const [form, setForm] = useState({
    stars: 0,
    comment: '',
    user,
    reservation: ""
  });

  const handleRate = (value) => {
    setUserRating(value);
  };

  const showRatingModal = (reservation) => {
    setSelectedReservation(reservation);
    setRatingVisible(true);
    formu.setFieldValue("idOffice", reservation.id)
  };


  const handleRatingOk = async () => {
    try {
      const updatedForm = {
        ...form,
        stars: userRating,
        reservation: formu.getFieldValue("idOffice")
      };

      const response = await postReviews(dispatch, updatedForm);
      formu.resetFields();
      setUserRating(0);
      setRatingVisible(false);

    } catch (error) {
      console.error(error);
    }
  };


  const handleRatingCancel = () => {
    formu.resetFields();
    setUserRating(0);
    setRatingVisible(false);
  };

  const resetForm = () => {
    setForm({ ...form, comment: '' })
  };

  if (reservations.length === 0) {
    return (
      <div>
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              No tienes ninguna reserva realizada.
            </span>
          }
        >
          <Button type="primary" onClick={() => window.location.href = '/'}>Ir al inicio</Button>
        </Empty>
        <Modal
          okText='Ir al inicio'
          cancelText='Cancelar'
          open={modalVisible}
          onOk={() => window.location.href = '/'}
          onCancel={() => setModalVisible(false)}
        >
          <p>No tienes ninguna reserva realizada.</p>
          {/* <Button type="primary" onClick={() => window.location.href = '/'}>Ir al inicio</Button> */}
        </Modal>
      </div>
    );
  }

  return (
    <div className={styles.containerList}>
      <List
        itemLayout="horizontal"
        dataSource={reservations}
        renderItem={(reservation) => (
          <List.Item>
          <Card
              style={{
                width: "70%",
                margin: "0 auto",
                boxShadow: "0px 0px 10px 0px rgb(0, 0, 0)",
                maxHeight:"40%",
                padding:'0px',
             
                
              }}
              bodyStyle={{padding:'0px', paddingRight:'30px', height:'160%', display:'flex', flexWrap:'nowrap', justifyItems:'center'}}
              title={reservation.office.name}
              headStyle={{ background: " rgba(228, 127, 54, 0.874)" }}
              extra={
                !reservation.score && (
                  <Button textHoverBg=	'rgba(255, 255, 255, 1)'  className={styles.btnReview} 
                    id={reservation.id}
                    onClick={() => showRatingModal(reservation)}
                  >
                    Calificar
                  </Button>
                )
              }
            >
              <div className={styles.ContainerinfoReserva}>
                <div className={styles.imageReserva}>
                  <img 
                    src={reservation.office.office_officeImage[0].imageUrl}
                    alt={reservation.office.office_officeImage.imageUrl}
                  ></img>
                </div>
                <div className={styles.infoReserva}>
                  <div className={styles.reserva}>
                    <label>Total: </label>{" "}
                    <span>{reservation.totalPrice} USD</span>
                  </div>
                  <div className={styles.reserva}>
                    <label>Sucursal: </label>{" "}
                    <span> {reservation.office.office_building.name}</span>
                  </div>


                  <div className={styles.reserva}>
                    <label>Categoría: </label>{" "}
                    <span> {reservation.office.office_category.name}</span>
                  </div>

                  <div className={styles.reserva}>
                    <label>Fecha de reserva: </label>{" "}
                    <span>{reservation.date}</span>
                  </div>
              {reservation.score && (
                <div className={styles.review}>
                  <p>
                     
                    <Rate value={reservation.score.score} disabled />
                  </p>
                  <p> {reservation.score.comment}</p>
                </div>
              )}
                </div>
              </div>
              <br />
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Calificar Oficina"
        open={ratingVisible}
        onOk={handleRatingOk}
        onCancel={handleRatingCancel}
        width="30%"
      >
        <div className={styles.modal}>
          <p>Califica la oficina</p>
          <Rate value={userRating} onChange={handleRate} />
          <p>Deja tu comentario</p>
          <Form form={formu} style={{  width:  "80%"  }}>
            <Form.Item name="textTarea">
                <textarea
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    style={{
                   background:  "white",
                  color:  "black",
                  padding:  "3px",
                  width:  "100%",
                  borderRadius:  "5px",
                  border:  "1px solid rgba(0,0,0,0.4)",
                 }}
                    className={styles.textarea}
                    rows={5}
                  />
            </Form.Item>
           
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default MyReservations;
