import React, { useState } from 'react';
import { Card, List, Modal, Rate, Button, Form, Input } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useAuth } from '../../Authenticator/AuthPro';
import axios from 'axios';

const MyReservations = () => {
    const auth = useAuth();
    const user = auth.getUser();
  
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
    const [officeId, setOfficeId] = useState('');
  
    const handleRate = (value) => {
      setUserRating(value);
    };
  
    const handleCommentChange = (e) => {
      setUserComment(e.target.value);
    };
  
    const handleOfficeIdChange = (e) => {
      setOfficeId(e.target.value);
    };
  
    const showRatingModal = (reservation) => {
      setSelectedReservation(reservation);
      setRatingVisible(true);
    };
  
    const handleRatingOk = async () => {
      try {
        const response = await axios.post('https://sinergia-coworking.onrender.com/score', {
          stars: userRating,
          comment: userComment,
          user: user.id,
          office: officeId,
        });
  
        if (response.status === 200) {
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
              <Input.TextArea
                value={userComment}
                onChange={handleCommentChange}
                rows={4}
              />
            </Form.Item>
            <p>Ingresa el ID de la oficina:</p>
            <Form.Item>
              <Input
                value={officeId}
                onChange={handleOfficeIdChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };
  
  export default MyReservations;
