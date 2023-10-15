import { Button, Form, Input, Modal } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { UserInfo } from "../../../components/protecterRoute/typesProtecterRoute";
import { useEffect }  from 'react';
import { Stripe, StripeElements  } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

interface Props {
  user: UserInfo | undefined;
  office: string;
  date: string;
  open: boolean | undefined;
  onCancel: () => void;
}



function FormCheckout({ user, office, date, open, onCancel }: Props) {
  const [form] = Form.useForm();
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();



  useEffect(() => {
    if(open){
      form.setFieldsValue({
        name: user?.name,
        date: date
      });
    }
    
  }, [open])

  const handleOk = () =>{
    console.log({
      user,
      office,
      date
    })
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

  const handleSubmit = async () => {
    try {
      if (!stripe || !elements) {

        return;
      }
      /* setIsLoading(true); */
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      });

      if (!error) {
        const { id } = paymentMethod;
        const dataPayment = {
          stripeId: id,
          cartId: idCart,
          user: auth.user.id
        }
        const refreshToken = localStorage.getItem("token");
        const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + "/sale";
        const config = {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        };
        const { data } = await axios.post(endPoint, dataPayment, config);
        setIsLoading(false);
        setSucessPayment(true)
        reset();
        setTimeout(() => {
          navigate("/my-orders");
        }, 2000)
        
      }
    } catch (error) {
      setIsLoading(false);
      if(error.response.data.message){
        messageError(error.response.data.message);
      }else{
        /* messageError(error.error); */
        messageError(error.response.data.error)
      }

    }
  }


  return <Modal title="Detail" open={open} onOk={handleOk} onCancel={handleCancel}>
      <div className="containerForm">
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: '80%', marginTop: '30px' }}
        layout="horizontal"
        name="normal_login"
        /* onFinish={handleSubmit}
        onFinishFailed={onFinishFailed} */
        autoComplete="off"
      >
        <Form.Item style={{ padding: '7px' }}
          name="name"
          rules={[{ required: true, message: 'Introduce tu email' }]}
          
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre"
          />
        </Form.Item>

        <Form.Item style={{ padding: '7px' }}
          name="date"
          rules={[{ required: true, message: 'Introduce tu contraseña' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Fecha"
          />
        </Form.Item>
        
        <Form.Item >
          <Button type="primary" htmlType="submit" className="login-form-button">
            Acceder
          </Button>
        </Form.Item>
      </Form>

      <div className='cardPay'>
        <CardElement id="cardElement" options={cardElementOptions} />
      </div>

    </div>
  </Modal>
  


}

export default FormCheckout;