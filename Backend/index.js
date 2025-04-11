
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Routes = require("./routes/routes");
const path = require("path");

const app = express(); 
app.use('/uploads', express.static('uploads')); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect("mongodb://localhost:27017/otp ", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

app.use(cors({ origin: ['http://localhost:5173','https://hello-project-nine.vercel.app'], credentials: true ,
  methods:'GET, POST, PUT, DELETE',
  allowedHeaders:'content-Type,Authorization',
})); 
app.use(bodyParser.json());
app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/", Routes);

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const port = process.env.SERVER_PORT || 5000 ;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
