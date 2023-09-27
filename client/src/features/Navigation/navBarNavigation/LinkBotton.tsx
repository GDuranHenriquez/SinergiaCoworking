import style from './LinkBotton.module.css'
import { Button } from 'antd';

interface Props{
  text: string,
  path: string
}

function LinkBotton({text, path} : Props){
  return  <Button type='link' className={style.LinkBotton} href={path} >{text}</Button> 
}



export default LinkBotton