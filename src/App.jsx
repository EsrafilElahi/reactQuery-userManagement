import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Detail from './pages/Detail';
import Edit from './pages/Edit'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home title="Home" />,
  },
  {
    path: "/users",
    element: <Users title="Users" />,
  },
  {
    path: "users/:id",
    element: <Detail title="User Detail" />,
  },
  {
    path: "users/:id",
    element: <Edit title="User Edit" />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
