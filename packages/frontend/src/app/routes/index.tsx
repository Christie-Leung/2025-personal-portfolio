import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "../../pages/home";
import NotFound from "../../pages/notfound";
import HomeLayout from "../layouts/HomeLayout";
import { Suspense } from "react";
import ChatLayout from "../layouts/ChatLayout";
import React from "react";

const ProjectsPage = React.lazy(() => import("~/pages/projects"));
const ChatPage = React.lazy(() => import("~/pages/chat"));



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
            path: "/c/:chatId",
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