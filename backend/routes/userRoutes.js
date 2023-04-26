const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

// Import user controllers
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");

// Register user
router.post("/", registerUser);

// Get all users
router.get("/", protect, allUsers);

// Authenticate user
router.post("/login", authUser);

module.exports = router;
