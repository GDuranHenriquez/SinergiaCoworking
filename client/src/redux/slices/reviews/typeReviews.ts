export interface ReviewState{
    Reviews: Review | object;
  }
  
  export type Review = {
    stars: number,
    comment: string,
    user: string,
    office: string
  }

  export interface ReviewFormData {
    stars: number;
    comment: string;
    user: string;
    office: string;
  }
    