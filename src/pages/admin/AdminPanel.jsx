import { useEffect, useState } from "react";
import { getUsers, promoteUser, deleteUser } from "../../services/AdminService";

export default function AdminPanel() {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handlePromote = async (id) => {
    await promoteUser(id);
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await deleteUser(id);
    loadUsers();
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      <table className="w-full border text-center">

        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">

              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>

              <td className="space-x-2">

                {user.role !== "ROLE_ADMIN" && (
                  <button
                    onClick={() => handlePromote(user.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Promote
                  </button>
                )}

                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}