import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    const timer = setTimeout(() => {
      navigate("/register");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-wrapper">
      <div className="logout-card">
        <h2 className="logout-title">Logging out...</h2>
        <p className="logout-text">You will be redirected to the Register page shortly.</p>
      </div>
    </div>
  );
};

export default Logout;
