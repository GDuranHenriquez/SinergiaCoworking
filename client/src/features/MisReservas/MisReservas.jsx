/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, List, Modal, Rate, Button, Form, Input } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useAuth } from '../../Authenticator/AuthPro';
import axios from 'axios';
import { postReviews } from '../../redux/slices/reviews/actionReviews';
import { useCustomDispatch, useCustomSelector } from '../../hooks/redux';


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
  

    useEffect(() => {
        const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/purchase/${user}`;
        axios.get(endpoint)
        .then(data => {
          setReservations(data.data)
        })
    }, [ratingVisible])

    const [form, setForm] = useState({
      stars: 0,
      comment: '',
      user,
      reservation: '',
    });
  
    const handleRate = (value) => {
      setUserRating(value);
    };
  
    const showRatingModal = (reservation) => {
      setSelectedReservation(reservation);
      setRatingVisible(true);
    };
  
    const handleRatingOk = async () => {
      try {
        const updatedForm = {
          ...form,
          stars: userRating,
        };
    
        const response = await postReviews(dispatch, updatedForm);
        setRatingVisible(false);
    
      } catch (error) {
        console.error(error);
      }
    };
    
  
    const handleRatingCancel = () => {
      setRatingVisible(false);
    };
  
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <List
          itemLayout="horizontal"
          dataSource={reservations}
          renderItem={(reservation) => (
            <List.Item>
              <Card
                style={{ width: '80%', margin: '0 auto' }}
                title={reservation.office.name}

                extra={
                  !reservation.score && (
                    <Button onClick={() => showRatingModal(reservation)}>
                      Calificar
                    </Button>
                  )
                }
              >
                Fecha de reserva: {reservation.date}
                <br />
                {reservation.score && (
                  <div>
                    Calificación: <Rate value={reservation.score.score} disabled />
                    Comentario: {reservation.score.comment} 
                  </div>
                )}
              </Card>
            </List.Item>
          )}
        />
        <Modal
          title="Calificar Oficina"
          open={ratingVisible}
          onOk={handleRatingOk}
          onCancel={handleRatingCancel}
        >
          <p>Califica esta oficina:</p>
          <Rate value={userRating} onChange={handleRate} />
          <p>Deja un comentario:</p>
          <Form>
            <Form.Item>
            <textarea
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
          />
            </Form.Item>
            <p>Ingresa el ID de la oficina:</p>
            <Form.Item>
            <input
            type="text"
            value={form.reservation}
            onChange={(e) => setForm({ ...form, reservation: e.target.value })}
          />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };
  
  export default MyReservations;
