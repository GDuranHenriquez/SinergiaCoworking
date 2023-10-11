import axios from "axios";
import { setDetailOffice } from ".";
import { Dispatch } from "../../store/store";


export const getDetailOffice = async (dispatch: Dispatch, id: string | undefined) => {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/office/${id}`;
    const { data } = await axios.get(endpoint);

    dispatch(setDetailOffice(data));

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