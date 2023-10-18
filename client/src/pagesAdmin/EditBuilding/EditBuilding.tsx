import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useCustomSelector, useCustomDispatch } from "../../hooks/redux";
import { getAllBuildings } from "../../redux/slices/building/actionsBuilding";
const { Column } = Table;

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  city: string;
  lat: string;
  lng: string;
  deleted: boolean;
}

function EditBuildingPage() {
  const dispatch = useCustomDispatch();
  const listBuildings = useCustomSelector(
    (state) => state.buildin.allBuildings
  );
  const [bottom, _setBottom] = useState<TablePaginationPosition>("bottomCenter");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [_errorIsModalContent, setIsErrorModalContent] = useState("");

  useEffect(() => {
    getAllBuildings(dispatch);
  }, [dispatch]);

  const deleteFunction = (id: any) => {
    console.log(id);
    axios
      .post(
        import.meta.env.VITE_BASENDPOINT_BACK + `/building/change-status/${id}`
      )
      .then((_response) => {
        setIsSuccessModalVisible(true);
      })
      .catch((error) => {
        console.error("Error al realizar la acción:", error);
        setIsErrorModalContent(
          error.message || "Error al realizar la acción"
        );
        setIsErrorModalVisible(true);
      });
  };
  type TablePaginationPosition = "bottomCenter";

  const handleModalOk = () => {
    setIsSuccessModalVisible(false);
    setIsErrorModalVisible(false);
    getAllBuildings(dispatch);
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
          dataSource={listBuildings}
        >
          <Column
            align="center"
            render={(_: any, record: DataType) => (
              <img
                style={{ height: "80px", width: "80px" }}
                alt={"sucursal"}
                src={record.imageUrl}
              ></img>
            )}
            title="Imagen"
            dataIndex="imageUrl"
            key="imageUrl"
          />
          <Column align="center" title="Nombre" dataIndex="name" key="name" />
          <Column
            align="center"
            title="Dirección"
            dataIndex="address"
            key="address"
          />
          <Column
            align="center"
            title="Ciudad"
            dataIndex={["building_city", "name"]}
            key="city"
          />
          <Column
            align="center"
            title="Acción"
            key="action"
            render={(_: any, record: DataType) => (
              <Space size="middle">
                <Link
                  to={`/building/${record.id}/edit`}
                  state={{
                    id: record.id,
                    name: record.name,
                    address: record.address,
                    city: record.city,
                    lat: record.lat,
                    lng: record.lng,
                    imageUrl: record.imageUrl,
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

export default EditBuildingPage;
