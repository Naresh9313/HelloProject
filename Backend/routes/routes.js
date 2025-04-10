const express = require('express');
const router =express.Router();


//user
const user =require('./userRoute/userRoute')
router.use(user);



//admin
const countUser = require ('./AdminRoute/AdminRoute')
const AllUser = require('./AdminRoute/AdminRoute')
const UpdateUser = require('./AdminRoute/AdminRoute')
const DeleteUser = require('./AdminRoute/AdminRoute')

router.use(AllUser);
router.use(countUser);
router.use(UpdateUser);
router.use(DeleteUser);

//category
const createCategory = require('./AdminRoute/categoryRoute')
const getCategory = require('./AdminRoute/categoryRoute')
const updateCategory = require('./AdminRoute/categoryRoute')
const deleteCategory = require('./AdminRoute/categoryRoute')
const singleCategory = require('./AdminRoute/categoryRoute')
const booking = require('./bookingRoute/bookingRoute')

router.use(createCategory);
router.use(getCategory);
router.use(updateCategory);
router.use(deleteCategory);
router.use(singleCategory);
router.use(booking)
module.exports = router;