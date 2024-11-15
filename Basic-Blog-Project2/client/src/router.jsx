import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "./App.jsx";
import { postListRoute } from "./pages/PostList.jsx";
import { userListRoute } from "./pages/UserList.jsx";
import { todoListRoute } from "./pages/TodoList.jsx";
import { postRoute } from "./pages/Post.jsx";
import { userRoute } from "./pages/User.jsx";
import { PageNotFound } from "./pages/404.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // 因内部错误而显示的组件
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            // 重定向，让首页展示内容
            element: <Navigate to="/posts" />,
          },
          {
            // 父路由未定义组件，说明子路由的路由会一直向上找到所在的父组件
            path: "posts",
            children: [
              {
                index: true,
                ...postListRoute,
              },
              {
                path: ":postId",
                ...postRoute,
              },
            ],
          },
          {
            path: "users",
            children: [
              {
                path: "",
                ...userListRoute,
              },
              {
                path: ":userId",
                ...userRoute,
              },
            ],
          },
          {
            path: "todos",
            ...todoListRoute,
          },
          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
    ],
  },
]);
