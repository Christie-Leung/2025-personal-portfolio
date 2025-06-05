import Home from "@/pages/home";
import NotFound from "@/pages/notFound";
import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const DeveloperPage = lazy(() => import("@/pages/dev"));

const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/developer",
        id: "developer",
        element: <DeveloperPage />,
      }
    ]
  },
  {
    path: "*",
    id: "not-found",
    element: <NotFound />,
  }
]

const router = createBrowserRouter(routes);

export default router;