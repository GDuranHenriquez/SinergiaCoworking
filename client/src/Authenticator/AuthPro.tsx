import React, { useState, useEffect, createContext, useContext } from "react";
import Loading from "../components/Loading/Loading";
import axios from "axios";
import { UserInfo, AuthResponse } from "../components/protecterRoute/typesProtecterRoute"; 


interface AuthProviderProps{
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  isRoot: false,
  getAccessToken: () => {},
  saveUser: (_authResponse: AuthResponse) => {},  
  getRefreshToken: () => {},
  getUser: () => ({} as UserInfo | undefined),
  getAccess: () => {},
  signOut: () => {},
  saveDataUser: (_user: UserInfo) => {},
});



export function AuthProvider({ children }: AuthProviderProps) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRoot, setIsRoot] = useState(false);
  const [user, setUser] = useState<UserInfo>()
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true); 
 

  async function requestNewAccessToken(refreshToken: string) {
    try {
      const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + "/token/refresh-token";
      
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const response = await axios.post(endpoint, null ,config);
      if (response.status === 200) {
        if(response.data.error){
          throw new Error(response.data.error)
        }
        return response.data.accessToken;
      }
    } catch (error) {
      return null;
    }
  }

  const saveDataUser = (user: UserInfo) => {
    setUser(user);
  };

  async function checkAuth() {
    if (accessToken) {
      //This user is autenticated
      const  userInfo = await getUserInfo(accessToken);
      if(userInfo){
        saveSessionInfo(userInfo, accessToken, getRefreshToken() ?? '');
        setIsLoading(false);
        return;
      }
    } else {
      const token = getRefreshToken();

      if (token) {
        const newAccessToken = await requestNewAccessToken(token)
        if (newAccessToken) {
          const  userInfo = await getUserInfo(newAccessToken);
          
          if(userInfo){
            saveSessionInfo(userInfo, newAccessToken, token);
            setIsLoading(false);
            return;
          }
        }
      }
    }
    setIsLoading(false);
  }

  function saveSessionInfo(userInfo: UserInfo, accessToken:string, refreshToken:string){
    setAccessToken(accessToken);
    setUser(userInfo);
    localStorage.setItem("token", refreshToken); 
    if(userInfo.type === 'root'){
      setIsRoot(true);
    }
    setIsAuthenticated(true);
    /* console.log(userInfo)
    console.log(isAuthenticated) */   
  }

  async function getUserInfo(accessToken:string){
    try {
      const endpoint =
        import.meta.env.VITE_BASENDPOINT_BACK + "/data-user";
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(endpoint, config);
      if (response.status === 200) {
        if(response.data.error){
          throw new Error(response.data.error)
        }
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken():string|null {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return null;
  }

  function saveUser(authResponse: AuthResponse) {
    const user = authResponse.user;
    const accessTokens = authResponse.accessToken;
    const refreshTokens = authResponse.refreshToken;
    saveSessionInfo(user, accessTokens, refreshTokens);
  }

  function getAccess() {
    setIsAuthenticated(true);
  }

  function signOut(){
    setAccessToken('');
    setUser(undefined);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  function getUser(){
    return user;
  }

  
  useEffect(() => {    
    checkAuth();
  }, []);

  /* useEffect(() => {    
    console.log(isRoot)
  }, [isRoot]); */
  
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, signOut, getUser, getAccess, isRoot, saveDataUser }}>
      {isLoading? <Loading/> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)
