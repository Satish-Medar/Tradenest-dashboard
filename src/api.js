import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:3002",
  withCredentials: true,
});

export default api;
