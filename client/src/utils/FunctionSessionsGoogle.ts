import axios from "axios";
import { useAuth } from "../Authenticator/AuthPro";



export async function registerGoogleUser(token:any) {
  try {
    const data = {
      token: token
    }
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/sign-in-out/register-user`;
    const response = await axios.post(endpoint, data);
    const apiResponse = response.data;
    return apiResponse;
  } catch (error: any) {
    return error;
  }
}

export async  function loginGoogleUser(token:any) {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/sign-in-out/login`;
    const response = await axios.post(endpoint, token);
    const apiResponse = response.data;
    return apiResponse;
  } catch (error: any) {
    return error;
  }
}

export async function logoutUser(refreshToken: string, signOut: () => void){
  try {
    const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + "/sign-in-out/sing-out";
    const response = await axios.delete(endPoint, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      data: null,
    });
    if (response.status === 200) {
      signOut();
    }
  } catch (error: any) {
    return error;
  } 
}

