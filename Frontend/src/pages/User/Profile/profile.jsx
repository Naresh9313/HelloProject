
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Profile/profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update with API
  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/profileUpdate", {
        method: "PUT", // or "POST" if your backend uses POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));
        setUserData(updatedUser);
        alert("Profile updated successfully!");
        setIsEditing(false);
        navigate("/");

      } else {
        const errorData = await response.json();
        alert("Error updating profile: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Handle delete
  const handleDelete = () => {
    localStorage.removeItem("user");
    alert("Profile deleted!");
    navigate("/register");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Profile</h2>
        {userData?.username ? (
          <div>
            {/* Username */}
            <div>
              <label className="profile-label">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            {/* Email */}
            <div>
              <label className="profile-label">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="profile-label">Phone</label>
              <input
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            {/* Buttons */}
            <div className="profile-buttons">
              {!isEditing ? (
                <button
                  className="button edit"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              ) : (
                <button className="button update" onClick={handleUpdate}>
                  Update
                </button>
              )}
              <button className="button delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p className="no-user-message">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
