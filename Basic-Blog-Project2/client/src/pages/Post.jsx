import { getPost } from "../api/posts.js";
import { Link, useLoaderData } from "react-router-dom";
import { getUser } from "../api/users.js";
import { getComments } from "../api/comments.js";

function Post() {
  // 对象解构
  const { post, user, comments } = useLoaderData();
  return (
    <>
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="card">
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// 嵌套解构，params路由动态参数
async function loader({ request: { signal }, params: { postId } }) {
  // async await 解析 promise
  // 不在这里连续3个await的原因是想异步请求，而不是一个等一个
  const comments = getComments(postId, { signal });
  const post = await getPost(postId, { signal });
  const user = getUser(post.userId, { signal });
  return { post, user: await user, comments: await comments };
}

export const postRoute = {
  loader,
  element: <Post />,
};
