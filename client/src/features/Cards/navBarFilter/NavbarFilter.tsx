import style from "./NavbarFilter.module.css";
import { Select, Input } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import ButtonFilter from "./BottonFilter";
import axios from "axios";
import { getBuildingFilters } from "../../../redux/slices/building/actionsBuilding";
import { useCustomDispatch } from "../../../hooks/redux";

function NavbarFilter() {

  const dispatch = useCustomDispatch();
  const { Search } = Input;
const [filterCity, setFilterCity] = useState<string>("");
const [filterCategory, setFilterCategory] = useState<string>("");
const [filterName, setFilterName] = useState<string>("");

  const [category, setCategory] =useState<
  { id: string; name: string }[]
>([]);
  const [locations, setLocations] =useState<
  { id: string; name: string }[]
>([]);

    useEffect(() => {
      axios
        .get(import.meta.env.VITE_BASENDPOINT_BACK + `/city`)
        .then((response) => {
       setLocations(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar las ciudades:", error);
        });
        axios
        .get(import.meta.env.VITE_BASENDPOINT_BACK + `/category`)
        .then((response) => {
       setCategory(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar las categorias:", error);
        });
  }, []);

  const onSearch = (value: string) => {
    setFilterName(value)
    getBuildingFilters(dispatch, filterCity, filterCategory, value)
  };

  const handleOficinasChange = (value: string) => {
    setFilterCategory(value)
    getBuildingFilters(dispatch, filterCity, value, filterName)
  };

  const handleLocationChange = (value: string) => {
    setFilterCity(value)
    getBuildingFilters(dispatch, value, filterCategory, filterName)
  };
  return (
    <div className={style.container}>
      <Select
        className={style.filter}
        style={{ width: 120 }}
        onChange={handleLocationChange}
        defaultValue={"Ubicación"}
      >
        {locations.map((l) => (
          <Option value={l.id}>{l.name}</Option>
        ))}
      </Select>

      <Select
        className={style.filter}
        style={{ width: 120 }}
        onChange={handleOficinasChange}
        defaultValue={"Oficinas"}
      >
        {category.map((c) => (
          <Option value={c.id}>{c.name}</Option>
        ))}
      </Select>

      <Search
        className={style.search}
        placeholder="Búsqueda"
        onSearch={onSearch}
        style={{ width: "200px" }}
      />
    </div>
  );
}

export default NavbarFilter;