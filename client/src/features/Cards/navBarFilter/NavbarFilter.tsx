import style from "./NavbarFilter.module.css";
import { Select, Input } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import ButtonFilter from "./BottonFilter";
import axios from "axios";

function NavbarFilter() {
  const { Search } = Input;

  const [category, setCategory] =useState<
  { id: string; name: string }[]
>([]);
  const [locations, setLocations] =useState<
  { id: string; name: string }[]
>([]);
  // const [oficinas, setOficinas] = useState<string[]>([]);


    // ir al back a buscar locations, y nutrir la variable locations
    useEffect(() => {
      axios
        .get(`http://localhost:3001/city`)
        .then((response) => {
       setLocations(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar las ciudades:", error);
        });
        axios
        .get(`http://localhost:3001/category`)
        .then((response) => {
       setCategory(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar las categorias:", error);
        });
  }, []);

  const onClick = (value: string) => {
    console.log(`selected ${value}`);
    //filtrar por ubicacion pegada al backend
  };

  const onSearch = (value: string) => {
    console.log(`selected ${value}`);
    //filtrar por ubicacion pegada al backend
  };

  const handleOficinasChange = (value: string) => {
    console.log(`selected ${value}`);
    //filtrar por ubicacion pegada al backend
  };

  const handleLocationChange = (value: string) => {
    console.log(`selected ${value}`);
    //filtrar por ubicacion pegada al backend
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
{/* 
      <ButtonFilter
        text="Capacidad (min-max)"
        myFunction={onClick}
      ></ButtonFilter> */}

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