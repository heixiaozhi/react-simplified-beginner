import { baseApi } from "./base.js";

export function getUsers(options) {
  return baseApi.get("users", options).then((response) => response.data);
}

export function getUser(id, options) {
  return baseApi.get(`users/${id}`, options).then((response) => response.data);
}
