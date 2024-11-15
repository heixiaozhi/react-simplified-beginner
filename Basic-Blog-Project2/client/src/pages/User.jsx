import { useLoaderData } from "react-router-dom";
import { getUser } from "../api/users.js";
import { getPosts } from "../api/posts.js";
import { getTodos } from "../api/todos.js";
import { PostCard } from "../components/PostCard.jsx";
import { TodoItem } from "../components/TodoItem.jsx";

function User() {
  const { user, posts, todos } = useLoaderData();
  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b>
        {`${user.address.street} ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </ul>
    </>
  );
}

async function loader({ request: { signal }, params: { userId } }) {
  const user = await getUser(userId, { signal });
  const posts = await getPosts({ signal, params: { userId } });
  const todos = await getTodos({ signal, params: { userId } });
  return { user, posts, todos };
}

export const userRoute = {
  loader,
  element: <User />,
};
