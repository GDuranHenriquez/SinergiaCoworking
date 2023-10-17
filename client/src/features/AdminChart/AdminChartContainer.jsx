import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import AdminChart from "./AdminChart"
import axios from 'axios';

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
        <div>
            <Row gutter={40}>
                {data.cities?.map((city) => {
                    return <Col span={8}>
                        <Card title={city.cityName} bordered={false}>
                            <AdminChart categories={data.categories} series={city.series}/>
                        </Card>
                    </Col>
                })}
            </Row>
        </div>
        
    )
  
};
export default AdminChartContainer;