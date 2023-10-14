import { styled } from "styled-components";

export const Modal = styled.div`  
  position: fixed;
  z-index: 9999;
  top:0;
  left: 0%;
  width: 100%;
  height: 100vh;
  justify-content: center;
  display: grid;
  place-items: center;
  background-color: rgba(0,0,0, 0.5);
  /* padding-top: calc(100vh * 0.08); */
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
    height: max-content;
    padding: 20px;
    border: 1px solid rgb(241, 240, 240) ;
    background-color: rgba(255,255,255);;
    border-radius: 5px;
    perspective: 1000px;
    box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 1);
    .containerForm{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      justify-content: center;
      align-items: center;
      justify-items: center;
      width: 100%;
      font-weight: bold;
      width: 80%;
      height: 100%;
      gap: 20px;
      font-size: 16px;
      .linkRegistro{
        color: black;
        font-size: 12px;
        button{
          color: blue;
          background: transparent;
          border: none;
        }
        button:hover{
          cursor: pointer;
          
        }
      }
      #normal_login{
        width: 100%;
        margin: 0 auto;
                  
      }
      h3{
          font-size: 24px;
          color: black;
          padding: 0;
          margin-bottom: 0px;
      }
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
      
    }
  } 
  
` 