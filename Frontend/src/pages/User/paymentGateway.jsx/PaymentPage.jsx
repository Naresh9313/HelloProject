import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("🎉 Payment Successful!");
    navigate("/booking-message", {
      state: {
        name: state.name,
        email: state.emailAddress,
        phone: state.mobileNumber,
        tripImage: state.tripImage,
        tripName: state.tripName,
        tripPrice: state.totalAmount,
        tripDescription: state.tripDescription,
      },
    });
  };

  if (!state) {
    return (
      <div className="empty-page">
        <div className="empty-message">
          ⚠️ No billing data found. Please go back and fill the form.
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="trip-summary">
          <h2>🌍 Trip Summary</h2>
         
          <div className="amount-section">
            <p className="amount-label">Total Amount</p>
            <p className="amount-value">₹{state.totalAmount}</p>
          </div>
        </div>

        <div className="billing-info">
          <h2>💳 Billing Information</h2>

          <div className="info-group">
            <Info label="Full Name" value={state.name} />
            <Info label="Email" value={state.emailAddress} />
            <Info label="Phone" value={state.mobileNumber} />
            <Info label="Address" value={state.address} />
            <Info label="City" value={state.city} />
            <Info label="State" value={state.state} />
            <Info label="Pincode" value={state.pincode} />
            <Info label="Country" value={state.countryName} />
          </div>

          <button className="pay-button" onClick={handlePayment}>
            Pay ₹{state.totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
}

const Info = ({ label, value }) => (
  <div className="info-row">
    <span className="info-label">{label}:</span>
    <span className="info-value">{value}</span>
  </div>
);
