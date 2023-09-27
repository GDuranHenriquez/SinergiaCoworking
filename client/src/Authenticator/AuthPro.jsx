import { useContext, createContext, useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";
import axios from "axios";


const AuthContext = createContext({
  isAuthenticated: false,
  getAccess: () => {},
  getAccessToken: () => {},
  saveUser: (AuthResponse) => {},
  getRefreshToken: () => {},
  signOut: () => {},
});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    checkAuth();
  }, []);

  async function requestNewAccessToken(refreshToken) {
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

  async function checkAuth() {
    if (accessToken) {
      //This user is autenticated
      const  userInfo = await getUserInfo(accessToken);
      if(userInfo){
        saveSessionInfo(userInfo, accessToken, getRefreshToken());
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

  function saveSessionInfo(userInfo, accessToken, refreshToken){
    setAccessToken(accessToken);
    setUser(userInfo);
    localStorage.setItem("token", refreshToken);
    setIsAuthenticated(true);
  }

  async function getUserInfo(accessToken){
    try {
      const endpoint =
        import.meta.env.VITE_BASENDPOINT_BACK + "/data-userClient/";
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

  function getRefreshToken() {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return null;
  }

  function saveUser(AuthResponse) {
    saveSessionInfo(AuthResponse.data.user, AuthResponse.data.accessToken, AuthResponse.data.refreshToken);
  }

  function getAccess() {
    setIsAuthenticated(true);
  }

  function signOut(){
    setAccessToken('');
    setUser('');
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }


  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, checkAuth, signOut, user }}>
      {isLoading? <Loading/> : children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
