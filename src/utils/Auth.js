import { jwtDecode } from "jwt-decode";

// 🔥 CHECK LOGIN + EXPIRY
export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    return decoded.exp * 1000 > Date.now(); // expiry check

  } catch {
    return false;
  }
};

// 🔥 GET ROLE
export const getRole = () => {
  return localStorage.getItem("role");
};

export const isAdmin = () =>
  localStorage.getItem("role") === "ROLE_ADMIN";
