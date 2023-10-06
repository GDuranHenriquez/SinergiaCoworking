import {WifiOutlined, CoffeeOutlined, TrophyOutlined,  } from '@ant-design/icons';
import {ReactNode} from "react";

type Data = {
    icon: JSX.Element;
    description: string;
  };

const DataServicios : Record<string, Data> = {
    wifi: {
        icon: <WifiOutlined/>,
        description: "wifi de alta calidad",
    },
    cocina: {
        icon: <CoffeeOutlined/>,
        description: "Cocina con comida gratis",
    },
    juegos: {
        icon: <TrophyOutlined/>,
        description: "juegos de mesa para los momentos de descanso",
    }

}

const getInfoDataServicios =(name: string): Data | undefined=> {
    switch (name) {
        case "wifi":
        return DataServicios.wifi

        case "cocina":
        return DataServicios.cocina

        case "juegos":
        return DataServicios.juegos

        default:
      return undefined;
    }
}

export default getInfoDataServicios;














//🛋//