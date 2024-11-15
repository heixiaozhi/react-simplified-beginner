import { useLoaderData } from "react-router-dom";
import { PostCard } from "../components/PostCard.jsx";
import { getPosts } from "../api/posts.js";

function PostList() {
  // useLoaderData可以解析Promise
  const posts = useLoaderData();
  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
      </div>
    </>
  );
}

// signal 网络请求中断控制，从 request 中解构（嵌套解构）
function loader({ request: { signal } }) {
  // fetch的返回结果任然是promise
  // 1、用回调函数处理promise的值
  // 2、在.then中获取值
  // 3、使用 async await
  // return fetch(" http://127.0.0.1:3000/posts").then((response) => response.json());
  return getPosts({ signal });
}

export const postListRoute = {
  loader,
  element: <PostList />,
};
