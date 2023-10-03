import { ActionType } from "../action/type";

export interface BuildingAction {
type: ActionType.GET_ALL_BUILDINGS,
payload: ObjectBuilding[]
}

export type ObjectBuilding = {
    id: string;
    name: string;
    address: string;
    lat: string;
    lng: string;
    deleted: boolean;
    imageUrl: string;
    city: number;
    building_city: BuildingCity;
    office_building: OfficeBuilding
}

export type InitialState = {
    allBuildings: ObjectBuilding[] | []
}

type BuildingCity = {
    id: number;
    name: string
}

type OfficeBuilding = {
      category: number;
      office_category: {
        id: number;
        name: string;
      };
  }[];
  
  export type DispatchType = (args: BuildingAction) => BuildingAction;

  export type Action = BuildingAction