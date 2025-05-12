const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

// Signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, phone, address, profilePicture } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "Email already in use" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      profilePicture
    })

    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.status(201).json({ user: newUser, token })
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.status(200).json({ user, token })
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message })
  }
})

//in you routes/auth.js this ia the endpoint to fetch all users//
const verifyToken = require("../middleware/auth")


router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message })
  }
})



module.exports = router
