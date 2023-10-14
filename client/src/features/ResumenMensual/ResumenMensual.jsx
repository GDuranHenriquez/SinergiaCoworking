import React from 'react';
import { Table, Card, Row, Col } from 'antd';
import Chart from 'react-apexcharts';

const ResumenMensual = () => {
  const monthlyData = {
    month: 'Septiembre 2023',
    totalReservations: 750,
    totalIncome: 45000,
    dailyData: [
      { day: '01', reservations: 20, income: 1200 },
      { day: '02', reservations: 15, income: 900 },
      { day: '03', reservations: 25, income: 1500 },
      // ... Otros datos diarios ...
    ],
  };

  const citiesData = [
    { city: 'Ciudad A', reservations: 250, income: 15000 },
    { city: 'Ciudad B', reservations: 180, income: 10800 },
    { city: 'Ciudad C', reservations: 320, income: 19200 },
    // ... Otros datos de ciudades ...
  ];

  const topCustomers = [
    { name: 'Cliente 1', reservations: 12, income: 720 },
    { name: 'Cliente 2', reservations: 10, income: 600 },
    { name: 'Cliente 3', reservations: 8, income: 480 },
    // ... Otros datos de clientes ...
  ];

  const columns = [
    { title: 'Día', dataIndex: 'day', key: 'day' },
    { title: 'Reservas', dataIndex: 'reservations', key: 'reservations' },
    { title: 'Ingresos', dataIndex: 'income', key: 'income' },
  ];

  const options = {
    chart: {
      id: 'monthly-summary-chart',
    },
    xaxis: {
      categories: monthlyData.dailyData.map((data) => data.day),
    },
  };

  const series = [
    {
      name: 'Reservas',
      data: monthlyData.dailyData.map((data) => data.reservations),
    },
    {
      name: 'Ingresos',
      data: monthlyData.dailyData.map((data) => data.income),
    },
  ];

  return (
    <div>
      <h2>Resumen Mensual - {monthlyData.month}</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total de Reservas" bordered={false}>
            {monthlyData.totalReservations}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Ingresos Mensuales" bordered={false}>
            {`$${monthlyData.totalIncome}`}
          </Card>
        </Col>
      </Row>
      <h3>Resumen Diario</h3>
      <Table columns={columns} dataSource={monthlyData.dailyData} />
      <h3>Resumen por Ciudad</h3>
      <Table
        columns={[
          { title: 'Ciudad', dataIndex: 'city', key: 'city' },
          { title: 'Reservas', dataIndex: 'reservations', key: 'reservations' },
          { title: 'Ingresos', dataIndex: 'income', key: 'income' },
        ]}
        dataSource={citiesData}
      />
      <h3>Clientes Principales</h3>
      <Table
        columns={[
          { title: 'Cliente', dataIndex: 'name', key: 'name' },
          { title: 'Reservas', dataIndex: 'reservations', key: 'reservations' },
          { title: 'Ingresos', dataIndex: 'income', key: 'income' },
        ]}
        dataSource={topCustomers}
      />
      <h3>Gráfico de Reservas e Ingresos Diarios</h3>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        height="300"
      />
    </div>
  );
};

export default ResumenMensual;
