
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./register.css";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/user/register", formData);
      navigate(`/otp?phoneNumber=${encodeURIComponent(formData.phoneNumber)}`);
      
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed!");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="register-wrapper">
  <form onSubmit={handleSubmit}>
    <h2>Register</h2>
    {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeholder="Username"
      required
    />
    <input
      type="tel"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      placeholder="Phone Number"
      required
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email"
      required
    />
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      required
    />
    <button type="submit" disabled={loading}>
      {loading ? "Submitting..." : "Submit"}
    </button>
    <p style={{ textAlign: "center", marginTop: "10px" }}>
      Already registered? <a href="/Login">Login</a>
    </p>
  </form>
</div>

  );
};

export default Register;
