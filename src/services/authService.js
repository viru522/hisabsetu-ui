import API from "./api";
import { jwtDecode } from "jwt-decode";

// 🔥 LOGIN
export const login = async (data) => {
  const res = await API.post("/auth/login", data);

  const accessToken = res.data.accessToken;
  const refreshToken = res.data.refreshToken;

  // 🔥 STORE TOKENS
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  // 🔥 STORE ROLE
  const decoded = jwtDecode(accessToken);
  localStorage.setItem("role", decoded.role);

  return res.data;
};

// 🔥 LOGOUT
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
};