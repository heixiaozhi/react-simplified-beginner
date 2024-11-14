import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  // RESTful API规范
  const postsData = await fetch("http://127.0.0.1:3000/posts?_limit=10");
  return postsData.json();
}

export function Posts() {
  const postsData = useLoaderData();
  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {postsData.map((post) => {
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
    </>
  );
}
