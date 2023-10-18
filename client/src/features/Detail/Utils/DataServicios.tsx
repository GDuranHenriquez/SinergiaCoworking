import {WifiOutlined, CoffeeOutlined, DribbbleOutlined, KeyOutlined  } from '@ant-design/icons';

type Data = {
    icon: JSX.Element;
    description: string;
  };

const DataServicios : Record<string, Data> = {
    wifi: {
        icon: <WifiOutlined style={{fontSize:'200%',  marginLeft:'10px', marginRight:'10px', marginTop:'10px', justifyItems:'center'}}/>,
        description: "Cobertura WiFi de alta velocidad",
    },
    cocina: {
        icon: <CoffeeOutlined style={{fontSize:'200%',  marginLeft:'10px', marginRight:'10px', marginTop:'10px', justifyItems:'center'}}/>,
        description: "Cocina totalmente equipada",
    },
    juegos: {
        icon: <DribbbleOutlined style={{fontSize:'200%', marginLeft:'10px', marginRight:'10px', marginTop:'10px', justifyItems:'center'}}/>,
        description: "Entretenimiento para momentos de descanso",
    },
    seguridad: {
        icon: <KeyOutlined style={{fontSize:'200%', marginLeft:'10px', marginRight:'10px', marginTop:'10px', justifyItems:'center'}}/>,
        description: "Seguridad con respuesta 24/7",
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

        case "seguridad":
            return DataServicios.seguridad

        default:
      return undefined;
    }
}

export default getInfoDataServicios;














//🛋//