// actionsServices.js

import axios from "axios";
import { setAllServices } from ".";
import { Dispatch } from "../../store/store";

export const getAllServices = async (dispatch: Dispatch) => {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK_RES + "/services";
    const { data } = await axios.get(endpoint);
    
    dispatch(setAllServices(data));
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

// Puedes agregar más acciones relacionadas con Services si es necesario
