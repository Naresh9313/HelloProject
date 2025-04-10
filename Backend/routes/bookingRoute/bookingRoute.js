const express = require('express');

const router = express.Router();



const  sendBooking  = require("../../controllers/bookingController");


router.post("/user/send-booking-email",sendBooking.sendBookingEmail);


module.exports = router;