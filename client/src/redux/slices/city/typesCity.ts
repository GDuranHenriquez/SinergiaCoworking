export interface CityState {
    allCities: City[] | []
  }

  export type City = {
    id: string;
    name: string;
  };