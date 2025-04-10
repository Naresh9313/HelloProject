const express = require('express');

const router = express.Router();

const categoryController = require('../../controllers/categoryController')
const upload = require("../../middlewares/upload");


router.post(
    "/category/addcategory",
    upload.single("image"),
    categoryController.createCategory
  );
router.get('/category/getcategory', categoryController.getAllCategories);
router.put('/category/updatecategory/:id', categoryController.updateCategory);
router.delete('/category/deletecategory/:id', categoryController.deleteCategory);
router.get("/user/category/:id", categoryController.singleCategoty);


module.exports = router;