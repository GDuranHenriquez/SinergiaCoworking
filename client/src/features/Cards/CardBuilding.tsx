import { Card } from "antd";
import styles from "./CardBuilding.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

interface Props {
  image: string;
  title: string;
  description: string;
}

function CardBuilding({ image, title, description }: Props) {
  return (
    <div className={styles.container}>
      <Card hoverable  className={styles.cardContainer} cover={  <img className={styles.imgCard} alt="example" src={image} />} >
      {/* <img id={styles.imgCard} alt="example" src={image} /> */}
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
}

export default CardBuilding;


// 