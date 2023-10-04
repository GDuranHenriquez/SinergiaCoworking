//Librarys
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//Components
import { AuthProvider } from './Authenticator/AuthPro.jsx';
import ProtectedRoute from './components/protecterRoute/ProtectedRoute.jsx';
import HomePages from "./pages/Home/Home.jsx";
import Prueba from './pages/Prueba.tsx'
import PruebaDos from "./pages/PruebaDos.tsx";
import PruebaTres from "./pages/PruebaTres.tsx";
import Detail from "../src/pages/Detail.tsx";
import Nosotros from "./pages/Nosotros/Nosotros.tsx";
import HomeAdmin from "./pagesAdmin/Home/Home.jsx";
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
      path: "/prueba3",
      element: <PruebaTres></PruebaTres>,
    },
    {
      path: "/pruebados",
      element: <PruebaDos/>,
    },
    {
      path: "/detail",
      element: <Detail/>,
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
