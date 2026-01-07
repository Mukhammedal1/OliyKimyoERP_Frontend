import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true, // refresh token cookiedan yuborish uchun
  // timeout:50000
});

// request interceptor
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// response interceptor
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token expired" &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/admin_auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const adminId = localStorage.getItem("adminId");
        const res = await instance.post(`/admin_auth/refresh/${adminId}`);

        localStorage.setItem("access_token", res.data.access_token);

        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;

        return instance(originalRequest);
      } catch (e) {
        localStorage.clear();
        window.location.href = "/";
      }
    }
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Refresh token expired" &&
      !originalRequest.retryRefresh &&
      !originalRequest.url.includes("/admin_auth/refresh")
    ) {
      originalRequest._retryRefresh = true;
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
