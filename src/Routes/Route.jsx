import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "../pages/MasterLayout.jsx";
import AuthLayout from "../Authentication/AuthLayout.jsx";
import Login from "../Authentication/Login.jsx";
import NotFound from "../Authentication/NotFound.jsx";
import Register from "../Authentication/Register.jsx";
import ForgetPassword from "../Authentication/ForgetPassword.jsx";
import ResetPassword from "../Authentication/ResetPassword.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import RecipesList from "../component/RecipesList.jsx";
import CategoriesList from "../component/CategoriesList.jsx";
import RecipeData from "../component/RecipeData.jsx";
import UsersList from "../component/UsersList.jsx";
import FavList from "../component/FavList.jsx";
import VerifyAccount from "../Authentication/VerifyAccount.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement:<NotFound/>,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-account",
        element: <VerifyAccount />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MasterLayout />,
    errorElement:<NotFound/>,
    children: [
      {
        index: true,
        element:<ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: '',
        element:<ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: 'recipes',
        element: <ProtectedRoute><RecipesList /></ProtectedRoute>,
      },
      {
        path: 'recipe-data',
        element: <ProtectedRoute><RecipeData /></ProtectedRoute>,
      },
      {
        path: 'categories',
        element: <ProtectedRoute><CategoriesList /></ProtectedRoute>,
      },
      {
        path: 'users',
        element: <ProtectedRoute><UsersList /></ProtectedRoute>,
      },
      {
        path: 'favorites',
        element: <ProtectedRoute><FavList /></ProtectedRoute>,
      },
    ],
  },
]);

const Route = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Route;
