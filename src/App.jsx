import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home title="Home" />,
  },
  {
    path: "/users",
    element: <Users title="Users" />,
  },
  // {
  //   path: "users/:id",
  //   element: <SerieDetailsLayout title="User Detail" />,
  // },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
