import React, { useState } from "react";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    alert("Thank you for reaching out!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h2 className="contact-heading">Contact Us</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label className="contact-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="contact-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="contact-label">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="contact-textarea"
              placeholder="Write your message here..."
            />
          </div>

          <button type="submit" className="contact-button">
            Send Message
          </button>
        </form>

        <div className="contact-footer">
          <p>📍 Ahmedabad, Gujarat</p>
          <p>📧  imsc200038vishal@ljku.edu.in</p>
          <p>📞 +91 8128847951</p>
        </div>
      </div>
    </div>
  );
}
