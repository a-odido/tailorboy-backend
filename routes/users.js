const express = require("express");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Get all users (only super admin)
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.email !== "support@tailorboy.com") {
      return res.status(403).json({ message: "Access denied" });
    }

   
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// Delete a user (only super admin)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id);

    if (!adminUser || adminUser.email !== "support@tailorboy.com") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userIdToDelete = req.params.id;

    if (userIdToDelete === adminUser._id.toString()) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    await User.findByIdAndDelete(userIdToDelete);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

// Suspend or unsuspend a user (only super admin)
router.put("/:id/suspend", verifyToken, async (req, res) => {
    try {
      const adminUser = await User.findById(req.user.id);
  
      if (!adminUser || adminUser.email !== "support@tailorboy.com") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const userId = req.params.id;
      const { suspended } = req.body;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { suspended },
        { new: true }
      );
  
      res.status(200).json({ message: `User ${suspended ? "suspended" : "unsuspended"} successfully`, user });
    } catch (err) {
      res.status(500).json({ message: "Error updating user", error: err.message });
    }
  });

module.exports = router;