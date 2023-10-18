import { Card } from "antd";
import styles from "./CardOffice.module.css";
import { Rate } from "antd";
import { Image } from "../../redux/slices/offices/typeOffice";

const { Meta } = Card;

interface Props {
  id: string;
  name: string;
  capacity: number;
  ratingAverage: number;
  office_officeImage: Image[] | [];
}

function CardOffice({ id, name, capacity, ratingAverage, office_officeImage }: Props) {
  return (
    <div style={{ padding: "0px"}} className={styles.containerCard}>
      <Card 
        hoverable
        className={styles.cardContainer}
        bodyStyle={{padding:'0px'}}
        cover={
          <div>{office_officeImage?.map((img) => <img className={styles.imgCard}  src={img.imageUrl}></img>)}</div>
        }
        id={id}
      >
   {/* <div className={styles.infocard}> */}
        <Meta title ={name} description={   <Rate disabled defaultValue={ratingAverage} />} /> 
        <div className={styles.capacidad}>
          <img
            style={{ padding:'0px', height: "20px", width: "20px", marginRight: "10px", marginBottom:'10px' }}
            src="https://icon-library.com/images/users-icon/users-icon-23.jpg"
          ></img>{" "}
          <p style={{ margin: "0px" }}>{capacity}</p>
        </div>
        {/* </div> */}
     
      </Card>
    </div>
  );
}

export default CardOffice;
