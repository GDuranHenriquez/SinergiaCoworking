import styled from 'styled-components';
import { FcApproval } from 'react-icons/fc';
// Define una animación para el checkmark



// Estilo del contenedor del checkmark
const CheckmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgb(241, 240, 240) ;
  background-color: rgba(255,255,255);;
  border-radius: 5px;
  perspective: 1000px;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 1);
  color: black;
  padding: 30px;
  p{
    padding: 2px;
    margin: 5px 0 0 0;
  }
  .CheckmarkLogo{
    height: 100px;
    width: 100px;
    pointer-events: none;
  }

`;



// Componente Checkmark animado
const AnimatedCheckmark = () => {
  return (
    <CheckmarkContainer>
      <FcApproval className='CheckmarkLogo'></FcApproval>
      <p>Successful purchase</p>
      <p>Thank you for choosing us</p>
    </CheckmarkContainer>
  );
};

export default AnimatedCheckmark;