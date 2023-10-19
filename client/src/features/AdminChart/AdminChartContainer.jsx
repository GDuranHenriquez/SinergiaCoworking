import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import AdminChart from "./AdminChart"
import axios from 'axios';
import styles from './chart.module.css';

const AdminChartContainer = () => {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get(`${endpoint}/admin-chart`)
        .then((response) => {
            console.log(response.data)
            setData(response.data)
        })
    }, [])
    return (
        <div className={styles.containerChartData}>
            <h1>Estadísticas de reservas por ciudad</h1>
            <Row gutter={10}>
                {data.cities?.map((city) => {
                    return <Col span={8}>
                        <Card title={city.cityName} bordered={false} bodyStyle={{padding:'0px'}}>
                            <AdminChart categories={data.categories} series={city.series}/>
                        </Card>
                    </Col>
                })}
            </Row>
            <div className={styles.description}>
                <span>Histograma de frecuencia de reservas realizadas en los últimos seis meses en las ciudades de { data.cities?.map((city, index) => <span>{city.cityName}{index < data.cities.length -1? <span>, </span>:<span>.</span>}</span>) } </span>
            </div>
        </div>
        
    )
  
};
export default AdminChartContainer;