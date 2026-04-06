import { useEffect } from "react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Routes } from "react-router-dom";
import { appRoutes } from "./routes";

export default function App() {

  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth(); // 🔥 restore session
  }, []);

  return <Routes>{appRoutes}</Routes>;
}