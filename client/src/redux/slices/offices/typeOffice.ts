
export interface OfficeState{
  detatilOffice: Office | object;
}

export type Office = {
  name: string,
  area: number,
  capacity: number,
  price: number,
  category: number,
  building: string,
  services: Array<number>,
  images: string
}
  