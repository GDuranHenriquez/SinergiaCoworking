import { Card } from "antd";
import styles from "./CardBuilding.module.css"

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