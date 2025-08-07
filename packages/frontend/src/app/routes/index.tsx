import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "../../pages/home";
import NotFound from "../../pages/notfound";
import HomeLayout from "../layouts/homeLayout";
import ProjectsPage from "@/pages/projects";


const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      }
    ]
  },
  {
    path: "*",
    id: "not-found",
    element: <NotFound />,
  },
]

const router = createBrowserRouter(routes);

export default router;