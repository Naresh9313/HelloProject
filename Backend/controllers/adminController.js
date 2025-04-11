const User = require("../models/userModel"); 

const userCount = async (req, res) => {
    try {
      const count = await User.countDocuments();
      res.status(200).json({ totalUsers: count });
    } catch (error) {
      console.error("Error counting users:", error);
      res.status(500).json({ message: "Failed to get total users" });
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude passwords
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };


  


  const updateUser = async (req, res) => {
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, email },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
  


  module.exports ={userCount,getAllUsers,updateUser,deleteUser};