import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const RootLayout = lazy(() => import("../layouts/RootLayout"));

import UserLogin from "../pages/auth/login";
import Home from "../pages/home";

export const nonAuthRoutes: RouteObject[] = [
  {
    path: "/",
    element: <UserLogin />,
    index: true,
  },
  {
    path: "*",
    element: <UserLogin />,
  },
];

export const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];
