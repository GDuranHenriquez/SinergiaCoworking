import { Navigate, Outlet } from "react-router-dom";
//import NavBar from "./NavBar/NavBar";
import { useAuth } from "../../Authenticator/AuthPro";

const ProtectedRoute = ({ children }) => {
  const isAuth = useAuth(); 

  return (
    <>
      {/* {isAuth.isAuthenticated && <NavBar />} */}
      {isAuth.isAuthenticated ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
};

export default ProtectedRoute;
