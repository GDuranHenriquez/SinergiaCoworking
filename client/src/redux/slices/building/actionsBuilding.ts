import axios from "axios";
import { setAllBuilding, setNoDeletedBuildings } from ".";
import { Dispatch } from "../../store/store";
import { ObjectBuilding } from "./typesBuilding";


export const getAllBuildings = async (dispatch: Dispatch) => {
  try {
    
    const token = localStorage.getItem("token");
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/building`;
    if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(endpoint, config); 
    const dataFiltered: Array<ObjectBuilding> = []
    await data.forEach((building: ObjectBuilding) => {
      if(!building.deleted){
        dataFiltered.push(building)
      } 
    })
    dispatch(setAllBuilding(data));
    dispatch(setNoDeletedBuildings(dataFiltered));
  } else {
    const { data } = await axios.get(endpoint); 
    const dataFiltered: Array<ObjectBuilding> = []
    await data.forEach((building: ObjectBuilding) => {
      if(!building.deleted){
        dataFiltered.push(building)
      } 
    })
    dispatch(setAllBuilding(data));
    dispatch(setNoDeletedBuildings(dataFiltered));

  }
  } catch (error) {
    if (typeof error === "string") {
      console.log(error);
    } else if (error instanceof Error) {
      const message = error.message;
      console.log(message);
    } else {
      console.log(error);
    }
  }
  
};

export const getBuildingFilters = async (dispatch: Dispatch, city: string, category: string, name: string) => {

  try{
  let endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/building?`;
  if (city) {
    endpoint = endpoint + `&city=${city}`;
  }
  if (category) {
    endpoint = endpoint + `&category=${category}`;
  }
  if (name) {
    endpoint = endpoint + `&name=${name}`;
  }

  const { data } = await axios.get(endpoint); 
  
  dispatch(setAllBuilding(data));

} catch (error) {
  if (typeof error === "string") {
    console.log(error);
  } else if (error instanceof Error) {
    const message = error.message;
    console.log(message);
  } else {
    console.log(error);
  }
}
}



