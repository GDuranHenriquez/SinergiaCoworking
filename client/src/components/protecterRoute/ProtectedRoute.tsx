
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Authenticator/AuthPro";



function ProtectedRoute(){
  const auth = useAuth();
    
  return (<>
    {/* <NavBarNavigation></NavBarNavigation> */}
    {(auth.isAuthenticated && auth.isRoot) ? <Outlet/> : <Navigate to="/"></Navigate>}
  </>)

}

export default ProtectedRoute;
