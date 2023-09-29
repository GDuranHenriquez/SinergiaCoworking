import style from "./NavbarFilter.module.css";
import { Select, Input } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import ButtonFilter from "./BottonFilter";

function NavbarFilter() {
  const { Search } = Input;

  const [locations, setLocations] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    // ir al back a buscar locations, y nutrir la variable locations
    const loc = ["Punta", "Paloma"];
    setLocations(loc);
    const cat = ["Open space", "Oficina privada", "Sala de reuniones"];
    setCategory(cat);
  }, []);

  const onClick = (value: string) => {
    console.log(`selected ${value}`);
    //filtrar por ubicacion pegada al backend
  };

  const onSearch = (value: string) => {
    console.log(`selected ${value}`);
    //filtrar por ubicacion pegada al backend
  };

  const handleCategoryChange = (value: string) => {
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
        onChange={handleCategoryChange}
        defaultValue={"Categoría"}
      >
        {category.map((c) => (
          <Option value={c}>{c}</Option>
        ))}
      </Select>

      <ButtonFilter
        text="Puntuación (min-max)"
        myFunction={onClick}
      ></ButtonFilter>

      <Search
        className={style.search}
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
}

export default NavbarFilter;
