const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/adminController"); 



router.get("/user/userCount", AdminController.userCount);
router.get("/user/AllUser", AdminController.getAllUsers);
router.put("/user/update/:id", AdminController.updateUser);
router.delete("/user/delete/:id", AdminController.deleteUser);

module.exports = router;
