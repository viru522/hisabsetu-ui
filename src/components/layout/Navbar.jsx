import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">

      <h1 className="font-bold text-lg text-blue-600">
        Dashboard
      </h1>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>

    </div>
  );
}