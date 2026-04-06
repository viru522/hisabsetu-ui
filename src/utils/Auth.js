import { jwtDecode } from "jwt-decode";

// AUTH CHECK
export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    if (!decoded?.exp) return false;

    return decoded.exp * 1000 > Date.now();

  } catch {
    return false;
  }
};

// GET ROLE FROM TOKEN
export const getRole = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.role;
  } catch {
    return null;
  }
};

// ADMIN CHECK
export const isAdmin = () => {
  const role = getRole();
  return role === "ROLE_ADMIN" || role === "ADMIN";
};