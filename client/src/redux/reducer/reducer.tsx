/* eslint-disable no-unused-vars */

import { ActionType } from "../action/type";
import { Action } from "./typeActions";
import { ObjectBuilding } from "./typeActions";
import { InitialState } from "./typeActions";


const initialState: InitialState = {
  allBuildings: [],
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_ALL_BUILDINGS:
      return {
        ...state,
        allBuildings: action.payload,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
