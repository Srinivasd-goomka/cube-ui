import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const RootLayout = lazy(() => import("../layouts/RootLayout"));

import UserLogin from "../pages/auth/login";
import { HomePage } from "../pages/home";


export const nonAuthRoutes: RouteObject[] = [
  {
    path: "/",
    // path: "/login",
    element: <UserLogin />,
    index: true,
  },
  {
    path: "*",
    element: <UserLogin />,
    // element: <Navigate to="/login" />,
  },
];

export const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/home",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];
