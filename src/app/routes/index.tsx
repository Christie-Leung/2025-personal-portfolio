import Home from "@/pages/home";
import NotFound from "@/pages/notFound";
import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const DeveloperPage = lazy(() => import("@/pages/dev"));
const CreatorPage = lazy(() => import("@/pages/creator"));

const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: <Home />,
  },
  {
    path: "/creator",
    id: "creator",
    element: <CreatorPage />,
  },
  {
    path: "/developer",
    id: "developer",
    element: <DeveloperPage />,
  },
  {
    path: "*",
    id: "not-found",
    element: <NotFound />,
  },
]

const router = createBrowserRouter(routes);

export default router;