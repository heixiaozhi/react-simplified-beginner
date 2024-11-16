import { postPosts } from "../api/posts.js";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

function NewPost() {
  const errorMessage = useActionData();
  const { state } = useNavigation();
  const isLoading = state === "loading" || state === "submitting";

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <div className={`form-group ${errorMessage?.title ? "error" : ""}`}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            {errorMessage?.title && (
              <div className="error-message">Required</div>
            )}
          </div>
          <div className={`form-group ${errorMessage?.userId ? "error" : ""}`}>
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
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
            {errorMessage?.userId && (
              <div className="error-message">Required</div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className={`form-group ${errorMessage?.body ? "error" : ""}`}>
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
            {errorMessage?.body && (
              <div className="error-message">Required</div>
            )}
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button disabled={isLoading} className="btn">
            Save
          </button>
        </div>
      </Form>
    </>
  );
}

const action = async ({ request }) => {
  const formData = await request.formData();
  //title userId body
  const title = formData.get("title");
  const userId = formData.get("userId");
  const body = formData.get("body");

  let obj = {
    title: title === "",
    userId: userId === "",
    body: body === "",
  };
  if (title === "" || userId === "" || body === "") {
    return obj;
  }

  // post 直接 {data}
  const post = await postPosts(
    {
      title,
      userId,
      body,
    },
    { signal: request.signal },
  );

  return redirect(`/posts/${post.id}`);
};

export const NewPostRoute = {
  action,
  element: <NewPost />,
};
