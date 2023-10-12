export interface PurchaseState{
    Purchase: Purchase | object;
  }
  
  export type Purchase = {
    user: string,
    office: string,
    date: string,
    stripe: string,
    price: number,
    amount: number
  }
    