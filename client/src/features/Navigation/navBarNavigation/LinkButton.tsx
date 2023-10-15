
import { Button } from 'antd';

interface Props{
  text: string,
  path: string
}

function LinkBotton({text, path} : Props){
  return  <Button type='link' style={{ marginLeft: '70px', color:"#FFFF", fontSize:'16px' }} href={path} >{text}</Button> 
}



export default LinkBotton