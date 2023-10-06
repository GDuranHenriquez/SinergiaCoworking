import { useEffect, useState } from "react";
import Card from "./CardBuilding";
import styles from "./Cards.module.css";
import CardBuilding from "./CardBuilding";
import axios, { all } from "axios";
import React from "react";
import { Pagination } from "antd";
import { useCustomSelector } from "../../hooks/redux";
import { ObjectBuilding } from "../../redux/slices/building/typesBuilding";

function Cards() {
  const { allBuildings } = useCustomSelector((state) => state.buildin);
 
  const DEFAULT_PAGE_SIZE = 4;

  const [buildingsToShow, setBuildingsToShow] = useState<ObjectBuilding[]>([]);

   useEffect(() => {
    setBuildingsToShow(getBuildingsToShow(allBuildings, 1, DEFAULT_PAGE_SIZE))
  }, [allBuildings]); 

  const getBuildingsToShow = (buildings: ObjectBuilding[], page: number, size: number) => {
    let var1 = page * size - size;
    let var2 = page * size;
   return buildings.slice(var1, var2);
  }

  const onChange = (page: number, pageSize: number) => {
    setBuildingsToShow(getBuildingsToShow(allBuildings, page, pageSize));
  }

  return (
    <div>
      
      <Pagination style={{marginTop: '10px'}} defaultCurrent={1} total={allBuildings.length} defaultPageSize={DEFAULT_PAGE_SIZE} onChange={onChange} />
      <div className={styles.cardsContainer}>
        {buildingsToShow.map((building) => (
          <CardBuilding
          id={building.id}
            title={building.name}
            description={building.address}
            image={building.imageUrl}
          ></CardBuilding>
        ))}
       
        </div>
        {buildingsToShow.length == 0 && <div className={styles.msj}> No se han encontrado resultados para esta búsqueda. </div>}
    </div>
  );
}

export default Cards;
