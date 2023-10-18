import { useState } from "react";
import {  Form, Modal } from "antd";
import { UserInfo } from "../../../components/protecterRoute/typesProtecterRoute";
import { useNavigate  } from 'react-router-dom';
import { Stripe, StripeElements  } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe, } from '@stripe/react-stripe-js';
import axios from 'axios';
import { ItentPaiment, OfficeInfo } from "../Detail";
import styled from './FormCheckout.module.css';
import Loading from "../../../components/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  user: UserInfo | undefined;
  office: OfficeInfo | undefined;
  date: string;
  open: boolean | undefined;
  onCancel: () => void;
  itentPaiment: ItentPaiment | null;
  address: string,
  amount: number,
  price: number
}



function FormCheckout({ user, office, date, open, onCancel, itentPaiment, address, amount, price }: Props) {
  const [form] = Form.useForm();
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOk = async () =>{
    try {
      setIsLoading(true);
      if(itentPaiment){
        const result = await confirmPayment(itentPaiment.client_secret);
        if(result?.paymentIntent && result?.paymentIntent?.status === 'succeeded'){
          const query = `/purchase/?user=${user?.id}&office=${office?.id}&date=${date}&stripe=${result.paymentIntent.id}&price=${price}&amount=${amount}&typeOffice=${office?.office_category.name}&address=${address}`
          const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + query;
          const sale = await axios.post(endPoint);
          if(sale.status === 200){
            messageSuccess('El pago ha sido procesado con éxito');
            setTimeout(() =>{
              navigate('/reservas');
              setIsLoading(false);
              handleCancel();
            }, 2000)
            
          }else{
            if(sale.data.error){
              messageError(sale.data.error)
            }
          }
            
        }else{
          if(result?.error?.message){
            messageError(result?.error?.message);
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      if(typeof error === 'string'){
        messageError(error)
      }else if(error instanceof Error){
        const message = error.message
        messageError(message)
      } else {
        console.log(error)
      }         
      setIsLoading(false);
    }
    
  }

  const handleCancel = () =>{
    form.resetFields();
    onCancel();
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'black',
        '::placeholder': {
          color: 'rgba(39, 53, 68,0.7)',
        },
        border: '1px solid #000000',
        borderRadius: '5px',
        padding: '10px',
        margin: '0 auto',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  const confirmPayment = async (paymentIntentSecret: string) => {
    if(paymentIntentSecret){
      if(stripe){
        const cardElement = elements?.getElement(CardElement);
        if(cardElement){
          const resul = await stripe.confirmCardPayment(paymentIntentSecret, {
            payment_method:{
              card: cardElement,
              billing_details:{
                name: user?.name,
                email: user?.email
              }
            }
          })
          return resul;
        }            
      }
    }
    
  }

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

  const messageSuccess = (message: string) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  
  const returConditionaloffice = () =>{
    if(office){
      if(office.office_category.name === 'Open space'){
        return <><div className={styled.infoUser}>
          <label>Espacios a reservar: </label> <span>{amount}</span>
          </div> 
          <div className={styled.infoUser}>
            <label>Precio: </label> <span>${office?.price} /u</span>
          </div>
          <div className={styled.infoUser}>
            <label>Total precio: </label> <span>${office?.price?  office?.price * amount: 0}</span>
          </div></>
      }else{
        <><div className={styled.infoUser}>
          <label>Precio: </label> <span>${office?.price && office?.price * amount}</span>
        </div></>
      }
    }
  }

  return <Modal centered={true} cancelText='Cancelar' okText='Aceptar' title="" open={open} onOk={handleOk} onCancel={handleCancel} 
  width="60%">
    <div className={styled.containerModal}>
      <div className={styled.containerForm}>
        <h2>Datos del usuario:</h2>
        <div className={styled.infoUser}>
          <label>Usuario: </label> <span>{user?.name}</span>
        </div>
        <div className={styled.infoUser}>
          <label>Correo: </label> <span>{user?.email}</span>
        </div>
        <div className={styled.infoUser}>
          <label>Fecha: </label> <span>{date}</span>
        </div>
      </div>

      <div className={styled.containerDetail}>
        <h2>Resumen de la reserva:</h2>
        <div className={styled.infoUser}>
          <label>Oficina: </label> <span>{office?.name}</span>
        </div>
        <div className={styled.infoUser}>
          <label>Capacidad: </label> <span>{office?.capacity} personas</span>
        </div>
        {returConditionaloffice()}
      <div className={styled.address}>
        <label>Dirección: </label> <span>{address}</span>
      </div>
        
      </div> 
    </div>

    <div className={styled.centerCard}>
      <div className={styled.cardPay}>
        <label>Datos de la tarjeta: </label>
        <CardElement id={styled.cardElement} options={cardElementOptions} />
        
      </div>
    </div>
    {isLoading && <Loading />}
    <ToastContainer></ToastContainer>
  </Modal>
  


}

export default FormCheckout;