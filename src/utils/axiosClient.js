import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/api", // base url
});

// Tự động gắn token nếu có
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
