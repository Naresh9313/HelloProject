
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminHomePage.css'; // import if using custom CSS
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/userCount");
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);


  const handleLogout = () => {
    // Optional: clear auth tokens/localStorage here
    // localStorage.removeItem("token");

    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="admin-home p-6">
      <header className="bg-blue-700 text-white p-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Welcome, Admin 👋</h1>
        <p className="text-sm">Manage users, view trips</p>
        <div className="flex justify-end">
  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
  >
    Logout
  </button>
</div>

      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
        </div>

        
        
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="actions">
          <button onClick={() => navigate("/admin/manage-users")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Manage Users
          </button>
          <button onClick={() => navigate("/admin/category")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
           Manage Trips
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminHomePage;
