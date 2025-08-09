import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "../../pages/home";
import NotFound from "../../pages/notfound";
import HomeLayout from "../layouts/HomeLayout";
import ProjectsPage from "@/pages/projects";
import { Suspense } from "react";
import ChatLayout from "../layouts/ChatLayout";
import ChatPage from "@/pages/chat";


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
      },
      {
        path: "/c",
        element: <ChatLayout />,
        children: [
          {
            path: "/c/:id",
            element: (
              <Suspense>
                <ChatPage />
              </Suspense>
            )
          }
        ]
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