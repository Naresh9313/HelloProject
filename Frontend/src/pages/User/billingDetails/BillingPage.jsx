
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BillingPage.css";

export default function BillingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [billingData, setBillingData] = useState({
    name: "",
    emailAddress: "",
    mobileNumber: "",
    address: "",
    countryName: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (state) {
      setBillingData((prev) => ({
        ...prev,
        ...state,
      }));
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const dataToPass = {
      ...billingData,
      totalAmount,
    };
    navigate("/payment", { state: dataToPass });
  };

  return (
    <div className="billing-container">
      <div className="billing-card">
        <h2 className="billing-title">🧾 Billing Information</h2>
        <form onSubmit={handleSubmit} className="billing-form">
          {[
            { label: "Full Name", name: "name" },
            { label: "Email Address", name: "emailAddress", type: "email" },
            { label: "Mobile Number", name: "mobileNumber" },
            { label: "Address", name: "address" },
            { label: "Country", name: "countryName" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Pincode", name: "pincode" },
          ].map(({ label, name, type }) => (
            <div key={name} className="form-group">
              <label htmlFor={name}>{label}</label>
              <input
                type={type || "text"}
                name={name}
                id={name}
                value={billingData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="submit-button">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}
