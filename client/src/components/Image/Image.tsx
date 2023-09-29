import React from 'react';
import { Image } from 'antd';
import style from './Image.module.css'

interface Props {
  img: string;
}

const ImageZoom: React.FC<Props> = ({ img }) => (
  <Image
    className={style.image}
    src={img} 
  />
);

export default ImageZoom;
