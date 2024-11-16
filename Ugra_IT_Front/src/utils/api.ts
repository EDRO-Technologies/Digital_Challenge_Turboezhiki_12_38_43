import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
