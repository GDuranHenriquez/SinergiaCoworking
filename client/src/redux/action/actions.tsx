import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "../reducer/typeActions.js";
import { ActionType } from "./type.js";

export const getAllBuildings = () => async (dispatch: Dispatch) => {
  console.log("here");
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/building`;
    const { data } = await axios.get(endpoint);
    console.log(data);
    return dispatch<Action>({
      type: ActionType.GET_ALL_BUILDINGS,
      payload: data,
    });
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

// export const filterByCity = (payload) => {
//   return {
//       type: "FILTER_BY_CITY",
//       payload,
//     };
//   };
