const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: String,
  profilePicture: String,
  suspended: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
