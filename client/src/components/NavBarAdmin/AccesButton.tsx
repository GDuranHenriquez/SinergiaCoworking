
import { Button } from 'antd';

interface Props{
  text: string,
  click: any
}

function AccesButton({text, click} : Props){
  return  <Button type='primary' style={{ marginLeft: '10px', background: '#E47F36', color:"black" }} onClick={click}>{text}</Button> 
}



export default AccesButton