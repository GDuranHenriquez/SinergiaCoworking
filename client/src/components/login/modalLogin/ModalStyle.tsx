import { styled } from "styled-components";

export const Modal = styled.div`  
  position: fixed;
  z-index: 100;
  top:0;
  left: 0%;
  width: 100%;
  height: 100vh;
  justify-content: center;
  display: grid;
  place-items: center;
  background-color: rgba(0,0,0, 0.5);
  padding-top: calc(100vh * 0.08);
  color: white;
  font-weight: bold;
  .modalContainer{
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 400px;
    border: 1px solid rgb(241, 240, 240) ;
    background-color: rgba(255,255,255);;
    border-radius: 5px;
    perspective: 1000px;
    box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 1);
    .containerForm{
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
      font-weight: bold;
      width: 80%;
      height: 100%;
      #btnCloseModal{
        position: absolute;
        top: 5px;
        left: 5px;
        height: 20px;
        width: 20px;
        border: none;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 5px;
        justify-items: center;
        align-content: center;
        &:hover{
          cursor: pointer;
        }
      }
      form{
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: white;
        font-weight: bold;      
      }
    }
  } 
  
` 