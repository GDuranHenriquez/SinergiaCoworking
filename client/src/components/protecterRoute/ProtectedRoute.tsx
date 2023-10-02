import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Authenticator/AuthPro";

interface Props {
  children: {
    path: string,
    element: React.ReactNode,
  }
}

const ProtectedRoute = () => {
  const isAuth = useAuth();
  const typeUser = isAuth.getTypeUser();

  return (
    <>
      {/* {isAuth.isAuthenticated && <NavBar />} */}
      {isAuth.isAuthenticated && typeUser === 'root' ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
};



export default ProtectedRoute;
