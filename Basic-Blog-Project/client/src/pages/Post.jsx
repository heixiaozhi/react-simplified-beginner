import { Link, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  //后端API支持查询参数来过滤数据
  // 或者前端进行过滤
  const answer = [];
  try {
    const postData = await fetch(`http://127.0.0.1:3000/posts?id=${params.id}`);
    const postJson = await postData.json();
    answer.push(postJson);
    // 用户id = 帖子里的用户id
    const userData = await fetch(
      `http://127.0.0.1:3000/users?id=${postJson[0].userId}`,
    );
    answer.push(await userData.json());
    // 帖子id = 评论的帖子id
    const commentsData = await fetch(
      `http://127.0.0.1:3000/comments?postId=${params.id}`,
    );
    answer.push(await commentsData.json());
  } catch (e) {
    console.log("post error: ", e);
  }
  return answer;
}

export function Post() {
  const [posts, users, comments] = useLoaderData();

  return (
    <>
      <h1 className="page-title">{posts[0].title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${users[0].id}`}>{users[0].name}</Link>
      </span>
      <div>{posts[0].body}</div>
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
