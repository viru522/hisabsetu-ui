import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set) => ({

  user: null,
  role: null,

  //  LOGIN
  login: (accessToken, refreshToken) => {

    const decoded = jwtDecode(accessToken);

    //  STORE IN LOCALSTORAGE
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", decoded.role);
    localStorage.setItem("username", decoded.sub);

    //  UPDATE STATE
    set({
      user: decoded.sub,
      role: decoded.role,
    });
  },

  //  INIT (ON PAGE REFRESH)
  initAuth: () => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      set({
        user: decoded.sub,
        role: decoded.role,
      });

    } catch {
      set({ user: null, role: null });
    }
  },

  //  LOGOUT
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    set({
      user: null,
      role: null,
    });
  },

}));
