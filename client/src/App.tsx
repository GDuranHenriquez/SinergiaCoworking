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
import ReservasPage from "./pages/MisReservas/ReservasPage.jsx"
import './App.css'
import CreateBuilding from "./pagesAdmin/createBuilding/CreateBuildingPage.tsx";
import CreateOfficePage from "./pagesAdmin/createOffice/CreateOffice.tsx";
import PageFormEditBuilding from "./pagesAdmin/pagesFormEditBuilding/PagesFormEditBuilding.tsx";
import DataAdmin from "./pages/DataAdmin/DataAdmin.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PageEditBuilding from "./pagesAdmin/EditBuilding/PageEditBuildin.tsx";
import PagesFormEditOffice from "./pagesAdmin/pagesFormEditOffice/PagesFormEditOffice.tsx";
import PagesEditOffice from "./pagesAdmin/EditOffice/PagesEditOffice.tsx";

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
          path: "/charts",
          element: <DataAdmin/>
        },
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
          element: <PageEditBuilding/>
        },
        {
          path: '/editar-oficina',
          element: <PagesEditOffice/>
        },
        {
          path: '/building/:id/edit',
          element: <PageFormEditBuilding/>
        },
        {
          path: '/office/:id/edit',
          element: <PagesFormEditOffice/>
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
