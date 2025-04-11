import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../Dashboard/ManageUser/ManageUser.css'

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // 🔁 Fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/AllUser");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑️ Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/user/delete/${id}`);
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✏️ Update user
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/user/update/${editingUser._id}`, {
        username: editingUser.username,
        email: editingUser.email,
        status: editingUser.status,
      });
      setEditingUser(null);
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold text-blue-800 text-center mb-8">
          👥 Manage Users
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-left">
              <tr>
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Username</th>
                <th className="py-3 px-5">Email</th>
                <th className="py-3 px-5">Phone Number</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition duration-200">
                    <td className="py-3 px-5">{idx + 1}</td>
                    <td className="py-3 px-5 font-medium">{user.username}</td>
                    <td className="py-3 px-5">{user.email}</td>
                    <td className="py-3 px-5">{user.phoneNumber}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          user.status
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.status ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-5 flex gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 font-semibold"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✏️ Edit Form */}
        {editingUser && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              ✏️ Edit User
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={editingUser.username}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, username: e.target.value })
                }
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
