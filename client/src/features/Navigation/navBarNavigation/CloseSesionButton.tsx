import { Button } from 'antd';


interface Props{
  text: string,
  path: string,
  LogoutFunction: () => Promise<void>,
}

function CloseSeionButton({text, path, LogoutFunction} : Props){

  return  <Button type='link' style={{color:"#FFFF" }} href={path} onClick={LogoutFunction}>{text}</Button> 
}



export default CloseSeionButton;