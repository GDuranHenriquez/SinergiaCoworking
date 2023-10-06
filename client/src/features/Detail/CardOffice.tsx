import { Card } from "antd";
import styles from "./CardOffice.module.css";
import { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

interface Props {
  id: string;
  name: string;
  capacity: number;
  ratingAverage: number;
  image: string;
}

function CardOffice({id, name, capacity, ratingAverage, image}: Props) {
  return (
    <div style={{padding:'10px'}}className={styles.container}>
      <Card 
      hoverable  
      className={styles.cardContainer}
      cover={  <img className={styles.imgCard} 
      src={"https://unitedco.com.au/wp-content/uploads/tokyo-day-office-hire-melbourne.jpg"} 
      />} >
      {/* <img id={styles.imgCard} alt="example" src={image} /> */}
        <Meta title={name} description={ratingAverage}  />
      <div className={styles.capacidad}><img style={{height:'20px', width:'20px', marginRight:'8px'}} src='https://icon-library.com/images/users-icon/users-icon-23.jpg'></img> <p style={{margin:'0px'}}>{capacity}</p></div>
      </Card>
    </div>
  );
}

export default CardOffice;