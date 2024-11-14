import { createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root.jsx";
import { Posts } from "./pages/Posts.jsx";
import { Todos } from "./pages/Todos.jsx";
import { Users } from "./pages/Users.jsx";
import { Post } from "./pages/Post.jsx";
import { loader as postsLoader } from "./pages/Posts.jsx";
import { loader as postLoader } from "./pages/Post.jsx";
import { loader as usersLoader } from "./pages/Users.jsx";
import { loader as todosLoader } from "./pages/Todos.jsx";
import { loader as userLoader, User } from "./pages/User.jsx";
import { Error } from "./pages/Error.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Error...</h1>,
    children: [
      {
        path: "*",
        element: <Error />,
      },
      {
        index: true,
        element: <Posts />,
        loader: postsLoader,
      },
      {
        path: "posts",
        element: <Posts />,
        loader: postsLoader,
      },
      {
        path: "posts/:id",
        element: <Post />,
        loader: postLoader,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: "users/:id",
        element: <User />,
        loader: userLoader,
      },
      {
        path: "todos",
        element: <Todos />,
        loader: todosLoader,
      },
    ],
  },
]);
