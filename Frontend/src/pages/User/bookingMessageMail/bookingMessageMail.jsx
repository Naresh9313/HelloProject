
// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./BookingMessageMail.css";

// export default function BookingMessageMail() {
//   const { state } = useLocation();

//   useEffect(() => {
//     if (state) {
//       const { name, email, phone } = state;

//       axios
//         .post("http://localhost:5000/user/send-booking-email", {
//           name,
//           email,
//           phone,
//         })
//         .then((res) => {
//           console.log("✅ Email sent:", res.data);
//         })
//         .catch((err) => {
//           console.error("❌ Error sending email:", err.response?.data || err.message);
//         });
//     }
//   }, [state]);

//   if (!state) {
//     return (
//       <div className="booking-container">
//         <div className="booking-card">
//           <h2 className="booking-title">No booking details found!</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="booking-container">
//       <div className="booking-card">
//         <h2 className="booking-title">🎉 Booking Confirmed!</h2>

//         <div className="booking-details">
//           <p><strong>Name:</strong> {state.name}</p>
//           <p><strong>Email:</strong> {state.email}</p>
//           <p><strong>Phone:</strong> {state.phone}</p>
//         </div>

//         <hr className="booking-divider" />

//         <div className="booking-trip">
//           <div className="booking-trip-info">
//             <h3 className="booking-trip-title">{state.tripName}</h3>
//             <p className="booking-trip-description">{state.tripDescription}</p>
//             <p className="booking-trip-price">₹{state.tripPrice}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./BookingMessageMail.css";

export default function BookingMessageMail() {
  const { state } = useLocation();
  const pdfRef = useRef();

  useEffect(() => {
    if (state) {
      const { name, email, phone } = state;

      axios
        .post("http://localhost:5000/user/send-booking-email", {
          name,
          email,
          phone,
        })
        .then((res) => {
          console.log("✅ Email sent:", res.data);
        })
        .catch((err) => {
          console.error("❌ Error sending email:", err.response?.data || err.message);
        });
    }
  }, [state]);

  const handleDownload = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("booking-confirmation.pdf");
    });
  };

  if (!state) {
    return (
      <div className="booking-container">
        <div className="booking-card">
          <h2 className="booking-title">No booking details found!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-card" ref={pdfRef}>
        <h2 className="booking-title">🎉 Booking Confirmed!</h2>

        <div className="booking-details">
          <p><strong>Name:</strong> {state.name}</p>
          <p><strong>Email:</strong> {state.email}</p>
          <p><strong>Phone:</strong> {state.phone}</p>
        </div>

        <hr className="booking-divider" />

        <div className="booking-trip">
          <div className="booking-trip-info">
            <p className="booking-trip-price">₹{state.tripPrice}</p>
          </div>
        </div>
      </div>

      <button className="booking-download-btn" onClick={handleDownload}>
        📄 Download PDF
      </button>
    </div>
  );
}
