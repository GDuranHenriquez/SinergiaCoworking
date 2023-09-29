import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBarNavigation from "../Navigation/navBarNavigation/NavBarNavigation";
import style from './Detail.module.css';
import ImageZoom from "../../components/Image/Image";
import { DatePicker } from "antd";
import ButtonConfirm from './ButtonConfirm'

interface OfficeDetailProps {
  name: string;
  address: string;
  imageUrl: string;
  category: string;
}

function OfficeDetail() {
  const { id } = useParams<{ id: string }>(); 

  const [officeData, setOfficeData] = useState<OfficeDetailProps>({
    name: "OFICINA BLAS PARERA",
    address: "Blas Parera 1555, Buenos Aires",
    imageUrl: "https://services-admin.stationwe.com.br/bucket/1680525943194-44fd8d03-04da-4ff6-b838-b496fbfa3cfbWeWorkCorrientes800foto4.jpeg",
    category:"Open Space"
  });

//   useEffect(() => {
//     axios
//       .get(`/api/getOfficeById/${id}`)
//       .then((response) => {
//         const { name, address, imageUrl } = response.data;
//         setOfficeData({ name, address, imageUrl });
//       })
//       .catch((error) => {
//         console.error("Error al cargar los detalles de la oficina", error);
//       });
//   }, [id]);

  return (
      <div>
        <NavBarNavigation></NavBarNavigation>
    <div className={style.container}>
    <div  className={style.descripcion}>
      <h2 className={style.title}>{officeData.name}</h2>
      <p className={style.subtitle}> {officeData.address}</p>
      <p className={style.subtitle}>{officeData.category}</p>
      <span className={style.span}> Comprueba la disponibilidad:<DatePicker></DatePicker></span>
      <br />
      <ButtonConfirm text='Confirmar compra' path='/login'></ButtonConfirm>
      </div>
      <ImageZoom img={officeData.imageUrl}></ImageZoom>
    </div>
    </div>
  );
}

export default OfficeDetail;
