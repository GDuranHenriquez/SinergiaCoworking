import { useEffect, useState } from "react";
import Card from "./CardBuilding";
import styles from "./Cards.module.css";
import { useSelector } from "react-redux";
import CardBuilding from "./CardBuilding";
import axios from "axios";
import React from "react";
import { Pagination } from "antd";

function Cards() {

  const DEFAULT_PAGE_SIZE = 4;
  const [buildings, setBuildings] = useState<
    { name: string; address: string; imageUrl: string }[]
  >([]);

  const [buildingsToShow, setBuildingsToShow] = useState<
  { name: string; address: string; imageUrl: string }[]
>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/building`)
      .then((response) => {
        let builds = response.data;
        setBuildings(builds);
        setBuildingsToShow(getBuildingsToShow(builds, 1, DEFAULT_PAGE_SIZE))
      })
      .catch((error) => {
        console.error("Error al cargar los edificios:", error);
      });
  }, []);

  const getBuildingsToShow = (buildings: { name: string; address: string; imageUrl: string }[], page: number, size: number) => {
    let var1 = page * size - size;
    let var2 = page * size;
   return buildings.slice(var1, var2);
  }

  const onChange = (page: number, pageSize: number) => {
    setBuildingsToShow(getBuildingsToShow(buildings, page, pageSize));
  }

  return (
    <div>
      <Pagination style={{marginTop: '10px'}} defaultCurrent={1} total={buildings.length} defaultPageSize={DEFAULT_PAGE_SIZE} onChange={onChange} />
      <div className={styles.cardsContainer}>
        {buildingsToShow.map((building) => (
          <CardBuilding
            title={building.name}
            description={building.address}
            image={building.imageUrl}
          ></CardBuilding>
        ))}
        {/* <CardBuilding title="Espacio Corrientes" description="Avenida Corrientes, 800, Buenos Aires/Argentina" image="https://static.tokkobroker.com/dev_pictures/50645281054519342406175624321544031416949822117230289009928915949515266953152.jpg"></CardBuilding>
      <CardBuilding title="Espacio Blas Perera" description="Blas Parera, 3551 -Olivos, Buenos Aires/Argentina" image="https://i.pinimg.com/236x/53/53/6e/53536e86a692cf5ac4b645783791d756.jpg"></CardBuilding>
      <CardBuilding title="Espacio Santa Fe" description="Av. Santa Fé 1183, Rosario, Santa Fe, Argentina" image="https://www.skyscrapercity.com/cdn-cgi/image/format=auto,onerror=redirect,width=1920,height=1920,fit=scale-down/https://www.skyscrapercity.com/attachments/20210501_195825-jpg.1443100/"></CardBuilding>
      <CardBuilding title="Espacio Guitierrez" description="Gutiérrez 760, Mendoza, Mendoza, Argentina" image="https://www.skyscrapercity.com/attachments/1643630540377-png.2712952/"></CardBuilding>
      <CardBuilding title="Espacio San Martin" description="Av. San Martín 322, Mendoza, Mendoza, Argentina" image="https://static.tokkobroker.com/dev_pictures/43507088975919021983689748692932984050902616205356982491523047802371180415847.jpg"></CardBuilding>
      <CardBuilding title="Espacio Mitre" description="Av. Bartolomé Mitre 870, Mendoza, Mendoza, Argentina" image="https://static.tokkobroker.com/dev_pictures/50645281054519342406175624321544031416949822117230289009928915949515266953152.jpg"></CardBuilding> */}
      </div>
    </div>
  );
}

export default Cards;
