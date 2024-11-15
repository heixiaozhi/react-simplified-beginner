import { baseApi } from "./base.js";

export function getTodos(options) {
  return baseApi.get("todos", options).then((response) => response.data);
}
