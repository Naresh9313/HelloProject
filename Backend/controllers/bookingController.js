// const nodemailer = require("nodemailer");

// const sendBookingEmail = async (req, res) => {
//   const { name, email, phone, tripName, tripPrice, tripDescription } = req.body;

//   // Validate required fields
//   if (!name || !email || !phone || !tripName || !tripPrice || !tripDescription) {
//     return res.status(400).json({ message: "Missing required fields!" });
//   }

//   try {
//     // Configure the transporter
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // true for 465, false for 587
//       auth: {
//         user: "nareshprajapati9313@gmail.com",
//         pass: "rfulipydufsijegj", // Consider storing this in a .env file
//       },
//     });

//     // Define the email content
//     const mailOptions = {
//       from: "nareshprajapati9313@gmail.com", // Or process.env.EMAIL_USER
//       to: email,
//       subject: "🎉 Your Trip Booking Confirmation",
//       html: `
//         <h2>🎉 Booking Confirmed!</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <hr />
//         <h3>Trip Details:</h3>
//         <p><strong>Trip Name:</strong> ${tripName}</p>
//         <p><strong>Description:</strong> ${tripDescription}</p>
//         <p><strong>Total Price:</strong> ₹${tripPrice}</p>
//       `,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Email sent successfully!" });

//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     res.status(500).json({ message: "Failed to send email", error });
//   }
// };

// module.exports = { sendBookingEmail };
const nodemailer = require("nodemailer");

const sendBookingEmail = async (req, res) => {
  const { name, email, phone} = req.body;

  // Log received data to debug
  console.log("Received booking data:", req.body);

  if (!name || !email || !phone ) {
    return res.status(400).json({ message: "Missing required fields!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "nareshprajapati9313@gmail.com",
        pass: "rfulipydufsijegj", // Use App Password if using Gmail
      },
    });

    const mailOptions = {
      from: "nareshprajapati9313@gmail.com",
      to: email,
      subject: "🎉 Your Trip Booking Confirmation",
      html: `
        <h2>🎉 Booking Confirmed!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
};

module.exports = { sendBookingEmail };
