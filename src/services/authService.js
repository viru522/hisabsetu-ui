
import API from "./api";
import { jwtDecode } from "jwt-decode";

// LOGIN
export const login = async (data) => {
  const res = await API.post("/auth/login", data);

  const { accessToken, refreshToken } = res.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  const decoded = jwtDecode(accessToken);
  localStorage.setItem("role", decoded.role);

  return res.data;
};

// LOGOUT
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};