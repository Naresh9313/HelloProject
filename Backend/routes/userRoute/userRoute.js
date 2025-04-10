const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController'); 




router.post("/user/register", userController.registerUser);
router.post("/user/verify", userController.verifyOtpAndRegister);
router.post("/user/login", userController.loginUser);
router.put("/user/profileUpdate", userController.profileUpdate);



module.exports = router;
