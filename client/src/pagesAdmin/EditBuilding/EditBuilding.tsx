import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Avatar, Space, Table, Tag } from 'antd';
import { Link } from "react-router-dom";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import { Footer } from "antd/es/layout/layout";
import FooterSection from "../../components/Footer/Footer";
import { useCustomSelector, useCustomDispatch } from "../../hooks/redux";
import { getAllBuildings } from "../../redux/slices/building/actionsBuilding";
const { Column, ColumnGroup } = Table;


interface BuildingObject {
    id: string;
    name: string;
    address: string;
    imageUrl: string;
    building_city: City;
    office_building: Offices[] | [];
  }

  type City = {
    id: string;
    name: string
  }
  
  type Offices = {
    id: string;
    name: string;
    capacity: number;
    ratingAverage: number;
    office_officeImage: Imagen[] | [];
  };

  type Imagen = {
    id?: string;
    imageUrl?: string;
    office?: string;
  };

  
interface DataType {
    key: React.Key;
    id: string;
    name: string;
    address: string;
    imageUrl: string;
    city: string;
    lat: string;
    lng: string;
    
  }

function EditBuildingPage() {
  const dispatch = useCustomDispatch();
  const listBuildings = useCustomSelector((state) => state.buildin.allBuildings);
    // const [listBuildings, setListBuildings] = useState<BuildingObject[]>([]);
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');

    useEffect(() => {
      getAllBuildings(dispatch);
    }, [dispatch]);

      type TablePaginationPosition =
     
      | 'bottomCenter'
      

    return(
     
      <div style={{
        width: '100%',
        padding: '20px',
        display: 'flex',
        marginTop: "65px",
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: '30px'
      }}>
      <div style={{
        width: '70%',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.3)',
        boxShadow: '0px 0px 10px 1px rgb(0,0,0)',
        flexWrap:'wrap'
      }}>

 <NavBarNavigation />
        
        <Table style={{textAlign:'center'}}  pagination={{ position: [ bottom] }} dataSource={listBuildings}>

        <Column align='center' render={(_: any, record: DataType)=><img style={{height:'80px', width:'80px'}} alt={"sucursal"} src={record.imageUrl}></img>} title="Imagen" dataIndex="imageUrl" key="imageUrl" />
        <Column align='center' title="Nombre" dataIndex="name" key="name" />
        <Column align='center' title="Dirección" dataIndex="address" key="address" />
        <Column align='center' title="Ciudad" dataIndex={["building_city","name"]} key="city" />       
        <Column align='center'
          title="Acción"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
                <Link  to={`/building/${record.id}/edit`} state={{name: record.name, address: record.address, city: record.city, lat: record.lat, lng: record.lng,  imageUrl: record.imageUrl}}>Editar</Link>
              <a>Eliminar</a>
            </Space>
          )}
        />
      </Table>
      </div>     
      </div>
      
    )
}


export default EditBuildingPage;