
export interface OfficeState{
  detatilOffice: Office | object;
}

export type Office = {
  id: string,
  name: string,
  area: number,
  capacity: number,
  price: number,
  category: number,
  building: string,
  services: Array<number>,
  office_officeImage:  Array<object>,
  office_reservation: Array<object>,
  office_score: Array<object>
}
  