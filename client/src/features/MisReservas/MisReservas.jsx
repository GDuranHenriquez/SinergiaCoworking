/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Card, List, Modal, Rate, Button, Form, Input } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useAuth } from '../../Authenticator/AuthPro';
import axios from 'axios';
import { postReviews } from '../../redux/slices/reviews/actionReviews';
import { useCustomDispatch } from '../../hooks/redux';

const MyReservations = () => {
    const auth = useAuth();
    const dispatch = useCustomDispatch();

    const [form, setForm] = useState({
      stars: 0,
      comment: '',
      user: auth.getUser()?.id,
      office: '',
    });
  
    const [reservations, setReservations] = useState([
      {
        id: 1,
        officeName: 'Oficina A',
        reservationDate: '2023-09-01',
      },
      {
        id: 2,
        officeName: 'Oficina B',
        reservationDate: '2023-09-05',
      },
      {
        id: 3,
        officeName: 'Oficina C',
        reservationDate: '2023-09-10',
      },
      {
        id: 4,
        officeName: 'Oficina D',
        reservationDate: '2023-09-15',
      },
      {
        id: 5,
        officeName: 'Oficina E',
        reservationDate: '2023-09-20',
      },
    ]);
  
    const [ratingVisible, setRatingVisible] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState(''); 
  
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
    
        if (response && response.status === 200) {
          const updatedReservations = reservations.map((reservation) => {
            if (reservation.id === selectedReservation.id) {
              return {
                ...reservation,
                rated: true,
              };
            }
            return reservation;
          });
    
          setReservations(updatedReservations);
          setRatingVisible(false);
        } else {
          console.error('Error al enviar la calificación y el comentario.');
        }
      } catch (error) {
        console.error('Error al enviar la calificación y el comentario:', error);
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
                title={reservation.officeName}
                extra={
                  !reservation.rated && (
                    <Button onClick={() => showRatingModal(reservation)}>
                      Calificar
                    </Button>
                  )
                }
              >
                Fecha de reserva: {reservation.reservationDate}
                <br />
                {reservation.rated && (
                  <div>
                    Calificación: <Rate allowHalf defaultValue={4.5} disabled />
                    Comentario: {userComment} 
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
            value={form.office}
            onChange={(e) => setForm({ ...form, office: e.target.value })}
          />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };
  
  export default MyReservations;
