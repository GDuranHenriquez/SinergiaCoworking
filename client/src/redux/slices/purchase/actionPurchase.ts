import axios from "axios";
import { setPurchase } from "./index";
import { Dispatch } from "../../store/store";

interface Purchase {
    user: string,
    office: string,
    date: string,
    stripe: string,
    price: number,
    amount: number
}


export const postPurchase = async (dispatch: Dispatch, formData: Purchase) => {
    try {
      const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/purchase`;
      const { data } = await axios.post(endpoint, formData); 
  
      dispatch(setPurchase(data)); 
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

  export const getPurchase = async (dispatch: Dispatch, user: string | undefined) => {

    // const auth = useAuth();

    try {
      // const user = auth.getUser()?.id
      const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/purchase/${user}`;
      const { data } = await axios.get(endpoint);
      console.log(data)

      dispatch(setPurchase(data));
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
  }