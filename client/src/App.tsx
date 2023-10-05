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
import HomeAdmin from "./pagesAdmin/Home/Home.jsx";
import OfficeDetail from "./features/Detail/Detail2.tsx";
import './App.css'


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
      element: <Review></Review>,
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
          path: "/homeAdmin",
          element: <HomeAdmin/>,
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
