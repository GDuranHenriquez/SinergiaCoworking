import axios from "axios";
import { setAllBuilding } from ".";
import { Dispatch } from "../../store/store";


export const getAllBuildings = async (dispatch: Dispatch) => {
  try {
  
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/building`;
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



