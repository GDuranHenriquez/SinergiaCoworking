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