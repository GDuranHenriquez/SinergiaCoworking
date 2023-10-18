import style from "./NavbarFilter.module.css";
import { Select, Input } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBuildingFilters } from "../../../redux/slices/building/actionsBuilding";
import { useCustomDispatch } from "../../../hooks/redux";
import React from "react";

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
          const allLocations = [{  name: "Todas las ubicaciones" }, ...response.data];
       setLocations(allLocations);
        })
        .catch((error) => {
          console.error("Error al cargar las ciudades:", error);
        });
        axios
        .get(import.meta.env.VITE_BASENDPOINT_BACK + `/category`)
        .then((response) => {
          const allCategories = [{ name: "Todas las oficinas" }, ...response.data];
       setCategory(allCategories);
        })
        .catch((error) => {
          console.error("Error al cargar las categorias:", error);
        });
  }, []);

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
    if(e.target.value === ''){
      getBuildingFilters(dispatch, filterCity, filterCategory, e.target.value)
    }
  }

  const onSearch = (value: string) => {
    setFilterName(value)
    getBuildingFilters(dispatch, filterCity, filterCategory, value)
  };

  const handleOficinasChange = (value: string) => {
    if (value === "Oficinas") {
      setFilterCategory("");
    } else {
    setFilterCategory(value);
    }
    getBuildingFilters(dispatch, filterCity, value, filterName)
  };

  const handleLocationChange = (value: string) => {
    if (value === "Ubicaciones") {
      setFilterCity("");
    } else {
    setFilterCity(value);
    }
    getBuildingFilters(dispatch, value, filterCategory, filterName)
  };
  return (
    <div className={style.container}>
      <Select
        style={{ width: 180 }}
        onChange={handleLocationChange}
        // defaultValue={"Ubicación"}
        value={filterCity || "Ubicaciones"}
      >
        {locations.map((l) => (
          <Option value={l.id}>{l.name}</Option>
        ))}
      </Select>

      <Select
        className={style.filter}
        style={{ width: 180 }}
        onChange={handleOficinasChange}
        // defaultValue={"Oficinas"}
        value={filterCategory || "Oficinas"}
      >
        {category.map((c) => (
          <Option value={c.id}>{c.name}</Option>
        ))}
      </Select>

      <Search
        className={style.search}
        placeholder="Búsqueda" 
        onSearch={onSearch}
        style={{ width: 250, height: 30,}}
        onChange={searchOnChange}
        
      />
    </div>
  );
}

export default NavbarFilter;