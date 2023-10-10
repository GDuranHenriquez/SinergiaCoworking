import axios from "axios";

type DataRegisterUser ={
  email: string,
  password: string,
  name: string
}
type DataLoginUser = {
  password?: string,
  email?: string,
  token?: string
}

export async function registerGoogleUser(token:string | undefined) {
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


export async  function loginGoogleUser(data:DataLoginUser) {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/sign-in-out/login`;
    const response = await axios.post(endpoint, data);
    const apiResponse = response.data;
    return apiResponse;
  } catch (error: any) {
    return error;
  }
}
export async  function loginUser(data: DataLoginUser) {
  try {
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/sign-in-out/login`;
    const response = await axios.post(endpoint, data);
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

export async function registerUser(data: DataRegisterUser) {
  try {    
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/sign-in-out/register-user`;
    const response = await axios.post(endpoint, data);
    const apiResponse = response.data;
    return apiResponse;
  } catch (error: any) {
    return error;
  }
}


