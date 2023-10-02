import React from "react";
import { useParams } from "react-router-dom";
import NavBarNavigation from "../Navigation/navBarNavigation/NavBarNavigation";
import { Descriptions, DatePicker } from "antd";
import ButtonConfirm from "./ButtonConfirm";
import ImageZoom from "../../components/Image/Image";
import style from './Detail.module.css'

interface OfficeDetailProps {
  name: string;
  address: string;
  imageUrl: string;
  category: string;
}

function OfficeDetail() {
  const { id } = useParams<{ id: string }>();

  // Supongamos que obtienes los datos de la oficina desde algún servicio o API
  const officeData: OfficeDetailProps = {
    name: "Open Space Blas Parera",
    address: "Blas Parera 1555, Buenos Aires",
    imageUrl:
      "https://services-admin.stationwe.com.br/bucket/1680525943194-44fd8d03-04da-4ff6-b838-b496fbfa3cfbWeWorkCorrientes800foto4.jpeg",
    category: "Open Space",
  };

  return (
    <div>
      <NavBarNavigation />
      <div className={style.container}>
        <ImageZoom img={officeData.imageUrl} />
        <div className={style.descripcion}>
          <h2 className={style.title}>{officeData.name}</h2>
          <Descriptions layout="vertical" column={1}>
            <Descriptions.Item label="Dirección">
              {officeData.address}
            </Descriptions.Item>
            <Descriptions.Item label="Categoría">
              {officeData.category}
            </Descriptions.Item>
            <Descriptions.Item label="Comprueba la disponibilidad">
              <DatePicker />
            </Descriptions.Item>
          </Descriptions>
          <ButtonConfirm text="Confirmar compra" path="/login" />
        </div>
      </div>
    </div>
  );
}

export default OfficeDetail;
