
export interface OfficeState{
  detatilOffice: Office | object;
}

export type Office = {
  id?: string;
  name?: string;
  area?: number;
  capacity?: number;
  ratingAverage:number;
  price?: number;
  category?: number;
  building?: string;
  address?: string;
  services?: Services[];
  office_officeImage?:  Image[]|[];
  office_reservation?: Array<object>;
  office_score?: Array<object>;
  office_category?: Categories[]|[];
  office_building?: Building[]|[];
}

export type Services = {
  id: number;
  name: string
}
export type Categories = {
  id: number;
  name: string
}
 
export type Image = {
  id:number;
  imageUrl: string;
  office?: string;
}

export type Building = {
  id:number;
  name: string
}
 