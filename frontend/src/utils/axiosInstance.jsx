// api.js or axiosInstance.js
import axios from "axios";

// Set base URL based on environment
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000" // local backend
    : "/"; // for production, backend is proxied or on same domain

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});
