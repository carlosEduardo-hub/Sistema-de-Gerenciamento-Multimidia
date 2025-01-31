import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { InicialPageLogin } from "./pages/inicialpagelogin";
import { DashboardPage } from "./pages/dashboardpage";
import { PerfilPage } from "./pages/perfilpage";
import { PasswordRecuperation } from "./pages/password_recuperation";
import { InicialPageRegister } from "./pages/inicialpageregister";
import { PasswordRedefinition } from "./pages/password_redefinition";
import { InicialPage } from "./pages/inicialpage";

const isAuthenticated = () => {
  return sessionStorage.getItem("token") !== null;
};

// Componente para proteger rotas
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <InicialPage />,
  },
  {
    path: "/login",
    element: <InicialPageLogin />,
  },
  {
    path: "/register",
    element: <InicialPageRegister />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<DashboardPage />} />,
  },
  {
    path: "/perfil",
    element: <ProtectedRoute element={<PerfilPage />} />,
  },
  {
    path: "/password_recuperation",
    element: <PasswordRecuperation />,
  },
  {
    path: "/password_redefinition/:token",
    element: <PasswordRedefinition />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
