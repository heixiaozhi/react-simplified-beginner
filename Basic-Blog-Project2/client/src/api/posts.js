import { baseApi } from "./base.js";

export function getPosts(options) {
  // axios 是 response.data 获取数据
  // fetch 是 response.json() 需要解析成json数据
  // options 是axios携带参数的方法，其中{params}可以携带请求参数
  return baseApi.get("posts", options).then((response) => response.data);
}

export function getPost(id, options) {
  return baseApi.get(`posts/${id}`, options).then((response) => response.data);
}
