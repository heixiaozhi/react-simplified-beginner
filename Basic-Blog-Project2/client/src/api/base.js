import axios from "axios";

// axios.create创建Axios实例
export const baseApi = axios.create({ baseURL: import.meta.env.VITE_API_URL });
