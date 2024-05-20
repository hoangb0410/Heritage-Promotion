const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {
  //Register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const { username, email, fullname } = req.body;
      //Create new user
      const newUser = await new User({
        username,
        email,
        fullname,
        password: hashed,
      });

      //Save user to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find().sort({ createdAt: -1 });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get user by id
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update user
  updateUser: async (req, res) => {
    try {
      // Validate user ID
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const {
        username,
        email,
        fullname,
        interest_heritage,
        interest_event,
        isAdmin,
      } = req.body;
      const updateData = {};
      updateData.username = username;
      updateData.email = email;
      updateData.fullname = fullname;
      updateData.interest_heritage = interest_heritage;
      updateData.interest_event = interest_event;
      // Only admin can edit isAdmin property
      if (isAdmin) {
        if (req.user.isAdmin) {
          updateData.isAdmin = isAdmin;
        } else {
          return res.status(403).json("Only admin can edit isAdmin");
        }
      }
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        updateData.password = hashed;
      }
      // Update user in the database
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      // Check if the user was found and updated
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Delete user
  deleteUser: async (req, res) => {
    try {
      //const user = await User.findById(req.params.id);
      const user = await User.findByIdAndDelete(req.params.id); // Xoa that
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
