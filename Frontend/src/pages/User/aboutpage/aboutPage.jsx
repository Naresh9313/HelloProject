import React from "react";
import "./about.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Us</h1>

        <section className="about-section">
          <h2 className="about-subtitle"></h2>
          <p className="about-paragraph">
            
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-subtitle">What We Offer</h2>
          <ul className="about-list">
            <li>🛒 A wide range of products across trips</li>
            <li>🚀 Fast and secure checkout experience</li>
            <li>📦 Reliable delivery and return policies</li>
            <li>💬 24/7 Customer support</li>
          </ul>
        </section>

       

        <div className="about-footer">
          <p>
            Thank you for choosing us. 🙌 <br />
            — Vishal Parmar
          </p>
        </div>
      </div>
    </div>
  );
}
