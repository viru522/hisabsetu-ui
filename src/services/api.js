import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

// REQUEST INTERCEPTOR
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (res) => res,
  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        logout();
        return;
      }

      try {
        const res = await API.post("/auth/refresh", { refreshToken });

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        const decoded = jwtDecode(newAccessToken);
        localStorage.setItem("role", decoded.role);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest);

      } catch (err) {
        logout();
      }
    }

    return Promise.reject(error);
  }
);

const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export default API;