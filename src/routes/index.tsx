import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const RootLayout = lazy(() => import("../layouts/RootLayout"));
const UserLogin = lazy(() => import("../pages/auth/login"));

// Lazy load the HomePage component
const HomePage = lazy(() => import("../pages/home"));

// Lazy load the SitesPage component
const SitesPage = lazy(() => import("../pages/sites"));

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
  {
    path: "/sites",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SitesPage />,
      },
    ],
  },
];
