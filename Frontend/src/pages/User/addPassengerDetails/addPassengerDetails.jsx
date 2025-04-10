import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPassengerDetails.css";

export default function AddPassengerDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    emailAddress: "",
    address: "",
    countryName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/billing", { state: formData }); // Navigate with state
  };

  return (
    <div className="passenger-container">
      <div className="passenger-form-card">
        <h2 className="form-title">✈️ Passenger Information</h2>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              placeholder="Enter mobile number"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="countryName"
              value={formData.countryName}
              onChange={handleChange}
              required
              placeholder="Enter country"
            />
          </div>

        
          {/* ...input fields... */}
          <button type="submit" className="submit-btn">Proceed to Billing</button>
        </form>
      </div>
    </div>
  );
}
