//Librarys
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//Components
import { AuthProvider } from './Authenticator/AuthPro.jsx';
import ProtectedRoute from './components/protecterRoute/ProtectedRoute.jsx';
import HomePages from "./pages/Home/Home.jsx";
import Prueba from './pages/Prueba.tsx'
import PruebaDos from "./pages/PruebaDos.tsx";
import Detail from "../src/pages/Detail.tsx"

import './App.css'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePages></HomePages>,
    },
    {
      path: "/prueba",
      element: <Prueba></Prueba>,
    },
    {
      path: "/pruebados",
      element: <PruebaDos></PruebaDos>,
    },
    {
      path: "/detail",
      element: <Detail></Detail>,
    },
    {
      path: "/",
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: "/protected",
          element: <></>,
        }
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>    
  )
}

export default App
