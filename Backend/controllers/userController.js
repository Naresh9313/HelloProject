const OtpModel = require('../models/otp');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const { otpVerification } = require('../helpers/otpValidate');
const User = require('../models/userModel'); 
const bcrypt = require('bcrypt'); 
const nodemailer = require('nodemailer');





const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "nareshprajapati9313@gmail.com",
      pass: "rfulipydufsijegj",
    },
  });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);





const registerUser = async (req, res) => {
    const { username, phoneNumber, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        const cDate = new Date();
        await OtpModel.findOneAndUpdate(
            { phoneNumber },
            { otp, otpExpiration: new Date(cDate.getTime() + 2 * 60 * 1000) },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const newUser = new User({
            username,
            phoneNumber,
            email,
            password: hashedPassword,
            status: false,
        });

        await newUser.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Registration",
            text: `Welcome to  Your OTP is: ${otp}. This OTP is valid for 30 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("⚠️ Email error: OTP stored but not sent:", error.message);
            } else {
                console.log("✅ OTP sent via Email:", info.response);
            }
        });

        res.status(201).json({
            status: true,
            message: "User registered successfully! OTP sent via email.",
            user: {
                username: newUser.username,
                phoneNumber: newUser.phoneNumber,
                email: newUser.email,
                status: newUser.status,
            },
            otp, 
        });

    } catch (error) {
        console.error("❌ Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const verifyOtpAndRegister = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        const existingOtp = await OtpModel.findOne({ phoneNumber });

        if (!existingOtp || existingOtp.otp !== otp || new Date() > existingOtp.otpExpiration) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        let user = await User.findOneAndUpdate(
            { phoneNumber },
            { status: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send success email upon verification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Registration Successful",
            text: `Dear ${user.username}, your registration was successful. Welcome aboard!`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email sending failed:", error);
            } else {
                console.log("Success Email sent:", info.response);
            }
        });

        await OtpModel.deleteOne({ phoneNumber });

        res.status(201).json({
            message: "User verified successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body; 

    try {
        const user = await User.findOne({
        email: email
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const getProfile = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user: {
                username: user.username,
                phoneNumber: user.phoneNumber,
                email: user.email,
                password: user.password 
            }
        });
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const profileUpdate = async (req, res) => {
    const { email, username, phoneNumber } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (username) user.username = username;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = {
    registerUser,
    verifyOtpAndRegister,
    loginUser,
    profileUpdate
};

