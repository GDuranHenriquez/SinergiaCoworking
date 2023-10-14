//Librarys
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//Components
import { AuthProvider } from './Authenticator/AuthPro.jsx';
import ProtectedRoute from './components/protecterRoute/ProtectedRoute.jsx';
import HomePages from "./pages/Home/Home.jsx";
import Prueba from './pages/Prueba.tsx'
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import Review from "./pages/ReviewOffice/Review.tsx";
import Detail from "../src/pages/Detail.tsx";
import Nosotros from "./pages/Nosotros/Nosotros.tsx";
import OfficeDetail from "./features/Detail/Detail2.tsx";
import ReservasPage from "./pages/MisReservas/ReservasPage.jsx"
import './App.css'
import CreateBuilding from "./pagesAdmin/createBuilding/CreateBuildingPage.tsx";
import CreateOfficePage from "./pagesAdmin/createOffice/CreateOffice.tsx";
import EditBuildingPage from "./pagesAdmin/EditBuilding/EditBuilding.tsx";
import EditOfficePage from "./pagesAdmin/EditOffice/EditOffice.tsx";
import FormEditBuilding from "./components/FormEditBuilding/FormEditBuilding.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";



function App() {
  
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PASSWORD);  
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
      path: "/perfil",
      element: <ProfilePage/>,
    },
    {
      path: "/reservas",
      element: <ReservasPage/>,
    },
    {
      path: "/detail/:id",
      element: <Detail/>,
    }/* ,
    {
      path: "/office/:id",
      element: <OfficeDetail/>
    } */,
    {
      path: "/",
      element: <ProtectedRoute/>,
      children: [
        {
          path:'/crear-sucursal',
          element: <CreateBuilding/>
        },
        {
          path: '/crear-oficina',
          element: <CreateOfficePage/>
        },
        {
          path: '/editar-sucursal',
          element: <EditBuildingPage/>
        },
        {
          path: '/editar-oficina',
          element: <EditOfficePage/>
        },
        {
          path: '/building/:id/edit',
          element: <FormEditBuilding/>
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router}/> 
      </Elements>      
    </AuthProvider>    
  )
}

export default App
