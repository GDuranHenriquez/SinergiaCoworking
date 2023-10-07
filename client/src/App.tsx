//Librarys
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//Components
import { AuthProvider } from './Authenticator/AuthPro.jsx';
import ProtectedRoute from './components/protecterRoute/ProtectedRoute.jsx';
import HomePages from "./pages/Home/Home.jsx";
import Prueba from './pages/Prueba.tsx'
import PruebaDos from "./pages/PruebaDos.tsx";
import Review from "./pages/ReviewOffice/Review.tsx";
import Detail from "../src/pages/Detail.tsx";
import Nosotros from "./pages/Nosotros/Nosotros.tsx";
import OfficeDetail from "./features/Detail/Detail2.tsx";
import './App.css'
import CreateBuilding from "./pagesAdmin/createBuilding/CreateBuildingPage.tsx";
import CreateOfficePage from "./pagesAdmin/createOffice/CreateOffice.tsx";



function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePages/>,
    },
    {
      path: "/nosotros",
      element: <Nosotros/>,
    },
    {
      path: "/prueba",
      element: <Prueba/>,
    },
    {
      path: "/review",
      element: <Review/>,
    },
    {
      path: "/pruebados",
      element: <PruebaDos/>,
    },
    {
      path: "/detail/:id",
      element: <Detail/>,
    },
    {
      path: "/office/:id",
      element: <OfficeDetail/>
    },
    {
      path: "/",
      element: <ProtectedRoute/>,
      children: [
        {
          path:'/crear-edificio',
          element: <CreateBuilding/>
        },
        {
          path: '/crear-oficina',
          element: <CreateOfficePage/>
        }
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}/> 
    </AuthProvider>    
  )
}

export default App
