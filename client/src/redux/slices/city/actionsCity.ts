// actionsCity.ts
import axios from "axios";
import { setAllCities } from "."; 
import { Dispatch } from "../../store/store";

export const getAllCities = async (dispatch: Dispatch) => {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + "/city";
    const { data } = await axios.get(endpoint);

    dispatch(setAllCities(data));
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
