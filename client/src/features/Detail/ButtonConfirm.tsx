
import { Button } from 'antd';

interface Props{
  text: string,
  path: string
}

function AccesButton({text, path} : Props){
  return  <Button type='primary' style={{ marginLeft: '70px', background: '#E47F36', color:"black" }} href={path} >{text}</Button> 
}



export default AccesButton