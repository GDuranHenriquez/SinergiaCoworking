import style from './buttons.module.css'
import { Button } from 'antd';

interface Props{
  text: string,
}

function ButtonFilter({text} : Props){
  return  <Button className={style.BottonFilter} >{text}</Button>
 
}

export default ButtonFilter