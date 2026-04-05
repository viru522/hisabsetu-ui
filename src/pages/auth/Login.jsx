 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuthStore } from "../../store/useAuthStore";

export default function Login() {

  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔥 BASIC VALIDATION
    if (!form.username || !form.password) {
      alert("Enter username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      const { accessToken, refreshToken } = res.data;

      // 🔥 STORE IN GLOBAL STATE + LOCALSTORAGE
      loginStore(accessToken, refreshToken);

      navigate("/");

    } catch (err) {
      console.error("LOGIN ERROR:", err.response || err);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          HisabSetu Login
        </h2>

        {/* USERNAME */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>

        {/* SIGNUP */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Sign Up
          </span>
        </p>

      </form>

    </div>
  );
}