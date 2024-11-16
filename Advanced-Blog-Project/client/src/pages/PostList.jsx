import { Form, Link, useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import { PostCard } from "../components/PostCard";
import { useEffect, useRef } from "react";

function PostList() {
  const {
    posts,
    searchParams: { query, userId },
  } = useLoaderData();

  const queryRef = useRef();
  const userIdRef = useRef();

  // 当发生变化的时候，映射到ref上
  useEffect(() => {
    queryRef.current.value = query || "";
    userIdRef.current.value = userId || "";
  }, [query, userId]);

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="/posts/new">
            New
          </Link>
        </div>
      </h1>
      <Form className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId" ref={userIdRef}>
              <option value="">Any</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  // null 表示不带这个参数，""表示查询为空的，因此都为""是查询不到值的
  const query = searchParams.get("query") || null;
  const userId = searchParams.get("userId") || null;

  const obj = { q: query, userId: userId };
  console.log(obj);
  const posts = getPosts({
    signal,
    params: obj,
  });
  // console.log("posts", posts);

  return {
    searchParams: { query, userId },
    posts: await posts,
  };
}

export const postListRoute = {
  loader,
  element: <PostList />,
};
