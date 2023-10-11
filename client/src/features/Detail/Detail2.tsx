import { useParams } from "react-router-dom";
import NavBarNavigation from "../Navigation/navBarNavigation/NavBarNavigation";
import { Descriptions, DatePicker } from "antd";
import ButtonConfirm from "./ButtonConfirm";
import ImageZoom from "../../components/Image/Image";
import style from './Detail.module.css'
import { getDetailOffice } from "../../redux/slices/offices/actionOffice";
import { useCustomDispatch } from "../../hooks/redux";
import { useEffect } from "react";
import { useCustomSelector } from "../../hooks/redux";

function OfficeDetail() {
  const { id } = useParams<{ id: string }>();

  const detatilOffice = useCustomSelector((state) => state.office.detatilOffice);

  const dispatch = useCustomDispatch();

  useEffect(() => {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/office/${id}`;
    getDetailOffice(dispatch, endpoint);
  }, [dispatch, id]);


  return (
    <div>
      <NavBarNavigation />
      <div className={style.container}>
        <ImageZoom img={detatilOffice.office_officeImage} />
        <div className={style.descripcion}>
          <h2 className={style.title}>{detatilOffice.name}</h2>
          <Descriptions layout="vertical" column={1}>
            <Descriptions.Item label="Dirección">
              {detatilOffice.address}
            </Descriptions.Item>
            <Descriptions.Item label="Categoría">
              {detatilOffice.category}
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
