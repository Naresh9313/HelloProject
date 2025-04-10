const TripCategory = require('../models/categoryModel');
const mongoose = require('mongoose');

const createCategory = async (req, res) => {
    try {
      console.log("REQ BODY:", req.body);
      console.log("REQ FILE:", req.file);
  
      const { name, description, price } = req.body;
      const image = req.file?.filename;
  
      if (!name || !description || !image || price === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newCategory = new TripCategory({
        name,
        description,
        image,
        price
      });
  
      const saved = await newCategory.save();
      res.status(201).json({ message: "Category created", data: saved });
  
    } catch (err) {
      console.error("Error creating category:", err);
  
      if (err.code === 11000) {
        return res.status(400).json({ message: "Category name already exists" });
      }
  
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };
  

const getAllCategories   = async (req, res) => {
    try {
        const categories = await TripCategory.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// const singleCategoty = async(req,res) =>{
//     const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid ID format" });
//   }

//   try {
//     const category = await Category.findById(id);
//     if (!category) {
//       return res.status(404).json({ error: "Category not found" });
//     }

//     res.json(category);
//   } catch (error) {
//     console.error("Error fetching category by ID:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }


const singleCategoty = async(req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const category = await TripCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateCategory   = async (req, res) =>{
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}



const  deleteCategory =  async (req,res) =>{
    try {
        const deleted = await TripCategory.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports = {createCategory,getAllCategories,updateCategory ,singleCategoty,deleteCategory };