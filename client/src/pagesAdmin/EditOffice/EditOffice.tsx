import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Modal, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
const { Column } = Table;
import {
  Office,
} from "../../redux/slices/offices/typeOffice";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  area: number;
  capacity: number;
  price: number;
  ratingAverage: number;
  services: service[];
  images: string[];
  category: string;
  building: string;
  deleted: boolean;
}

interface service {
  name: string;
}

function EditOfficePage() {

  const [bottom, _setBottom] = useState<TablePaginationPosition>("bottomCenter");
  const [offices, setOffices] = useState<Office[]>([]);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [_errorIsModalContent, setIsErrorModalContent] = useState("");
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    setShouldRefresh(false);
    const token = localStorage.getItem("token");
    
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios

        .get(import.meta.env.VITE_BASENDPOINT_BACK + `/office`, config)
        .then((response) => {
          setOffices(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar las oficinas:", error);
        });
    }
  }, [shouldRefresh]);

  const deleteFunction = (id: string) => {
    axios
      .post(
        import.meta.env.VITE_BASENDPOINT_BACK + `/office/change-status/${id}`
      )
      .then((_response) => {
        setIsSuccessModalVisible(true);
      })
      .catch((error) => {
        if(typeof error === 'string'){
          console.error("Error al realizar la acción:", error);
        }else if(error instanceof Error){
          setIsErrorModalContent(error.message || "Error al realizar la acción");
          setIsErrorModalVisible(true);
        } else {
          setIsErrorModalContent(error.message || "Error al realizar la acción");
        }       
        
      });
  };

  type TablePaginationPosition = "bottomCenter";

  const handleModalOk = () => {
    setIsSuccessModalVisible(false);
    setIsErrorModalVisible(false);
    setShouldRefresh(true);
  };
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        marginTop: "65px",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "30px",
      }}
    >
      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          background: "white",
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.3)",
          boxShadow: "0px 0px 10px 1px rgb(0,0,0)",
          flexWrap: "wrap",
        }}
      >
        <NavBarNavigation />
        <Modal
          title="Acción exitosa"
          open={isSuccessModalVisible}
          onOk={handleModalOk}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          Su operación ha sido realizada con éxito.
        </Modal>
        <Modal
          title="Error"
          open={isErrorModalVisible}
          onOk={handleModalOk}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          No se pudo realizar la acción deseada.
        </Modal>
        <Table
          style={{ textAlign: "center" }}
          pagination={{ position: [bottom] }}
          dataSource={offices}
        >
       
          <Column align="center" title="Nombre" dataIndex="name" key="name" />
          <Column
            align="center"
            title="Capacidad"
            dataIndex="capacity"
            key="capacity"
          />
          <Column align="center" title="Precio" dataIndex="price" key="price" />
          <Column
            align="center"
            title="Promedio puntuación"
            dataIndex="ratingAverage"
            key="ratingAverage"
          />
          <Column
            align="center"
            title="Categoria"
            dataIndex={["office_category", "name"]}
            key="category"
          />
          <Column
            align="center"
            title="Servicios"
            dataIndex={["services"]}
            key="services"
            render={(services: service[]) => (
              <>
                {services.map((service) => (
                  <Tag color="blue" key={service.name}>
                    {service.name}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            align="center"
            title="Sucursal"
            dataIndex={["office_building", "name"]}
            key="building"
          />
          <Column
            align="center"
            title="Acción"
            key="action"
            render={(_: any, record: DataType) => (
              <Space size="middle">
                <Link
                  to={`/office/${record.id}/edit`}
                  state={{
                    id: record.id,
                    name: record.name,
                    capacity: record.capacity,
                    price: record.price,
                    category: record.category,
                    servicesoffice: record.services,
                    images: record.images,
                  }}
                >
                  Editar
                </Link>

                <a onClick={() => deleteFunction(record.id)}>
                  {" "}
                  {record.deleted ? "Restaurar" : "Eliminar"}{" "}
                </a>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default EditOfficePage;
