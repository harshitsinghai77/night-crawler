import axios from "axios";

const baseURL = "http://127.0.0.1:8000/query";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
