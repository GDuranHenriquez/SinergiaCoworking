import axios from "axios";
import { setAllBuilding } from ".";
import { Dispatch } from "../../store/store";


export const getAllBuildings = async (dispatch: Dispatch) => {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/building`;
    const { data } = await axios.get(endpoint); 
    const newData = [{
      id: '1',
      name: '1',
      address: 'string',
      lat: 'string',
      lng: 'string',
      deleted: true,
      imageUrl: 'string',
      city: 2,
      building_city: {
        id: 2,
        name: 'string',
      },
      office_building: [{
        category: 2,
        office_category: {
          id: 2,
          name: 'string'
        }
    }]}];

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