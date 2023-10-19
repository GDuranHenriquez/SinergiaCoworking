
export interface BuildingState{
  allBuildings: ObjectBuilding[] | [];
  noDeletedBuildings: ObjectBuilding[] | [];
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

type BuildingCity = {
  id: number;
  name: string;
}

type OfficeBuilding = {
    category: number;
    office_category: {
      id: number;
      name: string;
    }
}[];