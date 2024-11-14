import { Link, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  //后端API支持查询参数来过滤数据
  // 或者前端进行过滤
  // 或者前端进行过滤
  const answer = [];
  try {
    // 用户数据
    const userData = await fetch(`http://127.0.0.1:3000/users?id=${params.id}`);
    answer.push(await userData.json());

    // 帖子数据
    const postData = await fetch(
      `http://127.0.0.1:3000/posts?userId=${params.id}`,
    );
    answer.push(await postData.json());

    // todo待办事项
    const todosData = await fetch(
      `http://127.0.0.1:3000/todos?userId=${params.id}`,
    );
    answer.push(await todosData.json());
  } catch (e) {
    console.log("user error: ", e);
  }
  return answer;
}

export function User() {
  const [users, posts, todos] = useLoaderData();
  return (
    <>
      <h1 className="page-title">{users[0].name}</h1>
      <div className="page-subtitle">Sincere@april.biz</div>
      <div>
        <b>Company:</b> {users[0].company.name}
      </div>
      <div>
        <b>Website:</b> {users[0].website}
      </div>
      <div>
        <b>Address:</b>{" "}
        {`${users[0].address.street} ${users[0].address.suite},${users[0].address.city},${users[0].address.zipcode}`}
        {/*{Object.values(userData.address).join(",")}*/}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map((post) => {
          return (
            <div key={post.id} className="card">
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/posts/${post.id}`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => {
          return todo.completed ? (
            <li className="strike-through" key={todo.id}>
              {todo.title}
            </li>
          ) : (
            <li key={todo.id}>{todo.title}</li>
          );
        })}
      </ul>
    </>
  );
}
