import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const RootLayout = lazy(() => import("../layouts/RootLayout"));
const UserLogin = lazy(() => import("../pages/auth/login"));

// Lazy load the HomePage component
const HomePage = lazy(() => import("../pages/home"));

// Lazy load the SitesPage component
const SiteListPage = lazy(() => import("../pages/sites"));
const SiteDetailsPage = lazy(() => import("../pages/sites/site-details"));

// Lazy load the ProductInfoPage component
import ProductInfoPage from "../pages/product-info";

export const nonAuthRoutes: RouteObject[] = [
  {
    path: "/login",
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
        element: <SiteListPage />,
      },
    ],
  },
  {
    path: "/sites/site/:siteId",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SiteDetailsPage />,
      },
    ],
  },
  {
    path: "/sites/site/product/:siteId",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductInfoPage />,
      },
    ],
  },
];
