import { baseApi } from "./base";

export function getPosts(options) {
  return baseApi.get("posts", options).then((res) => res.data);
}

export function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options).then((res) => res.data);
}

export function postPosts(data, options) {
  return baseApi.post("posts", data, options).then((res) => res.data);
}

export function putPost(postId, data, options) {
  return baseApi.put(`posts/${postId}`, data, options).then((res) => res.data);
}
