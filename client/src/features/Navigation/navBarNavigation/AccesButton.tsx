
import { Button } from 'antd';

interface Props{
  text: string,
  click: any,
  name: string
}

function AccesButton({text, click , name} : Props){
  if(name=== 'login'){
    return  <Button type='primary' style={{ marginLeft: '10px', background: 'transparent', color:'#E47F36', fontWeight:'600', borderColor:'#E47F36' }} onClick={click}>{text}</Button> 
  }else if(name=== 'register'){
    return  <Button type='primary' style={{ marginLeft: '10px', background: '#E47F36', color:"black" }} onClick={click}>{text}</Button> 
  }else{
    return  <Button type='primary' style={{ marginLeft: '10px', background: '#E47F36', color:"black" }} onClick={click}>{text}</Button> 
  }
 
}



export default AccesButton