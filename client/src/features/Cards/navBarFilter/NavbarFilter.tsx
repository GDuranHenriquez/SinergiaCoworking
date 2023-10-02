import style from "./NavbarFilter.module.css";
import { Select, Input } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import ButtonFilter from "./BottonFilter";

function NavbarFilter() {
  const { Search } = Input;

  const [locations, setLocations] = useState<string[]>([]);
  const [oficinas, setOficinas] = useState<string[]>([]);

  useEffect(() => {
    // ir al back a buscar locations, y nutrir la variable locations
    const loc = ["Punta", "Paloma"];
    setLocations(loc);
    const cat = ["Open space", "Oficina privada", "Sala de reuniones"];
    setOficinas(cat);
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
          <Option value={l}>{l}</Option>
        ))}
      </Select>

      <Select
        className={style.filter}
        style={{ width: 120 }}
        onChange={handleOficinasChange}
        defaultValue={"Oficinas"}
      >
        {oficinas.map((o) => (
          <Option value={o}>{o}</Option>
        ))}
      </Select>

      <ButtonFilter
        text="Capacidad (min-max)"
        myFunction={onClick}
      ></ButtonFilter>

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