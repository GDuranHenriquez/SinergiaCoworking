import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCities } from "../../redux/slices/city/actionsCity";

const CityTable = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.city.allCities);

  console.log(cities)

  useEffect(() => {
    getAllCities(dispatch);
  }, [dispatch]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "100%", 
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={cities} pagination={false} />
    </div>
  );
};

export default CityTable;
