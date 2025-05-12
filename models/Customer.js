const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  note: String,
  profileImageUrl: String,
  measurements: {
    neck: String,
    bust: String,
    waist: String,
    hips: String,
    legLength: String,
    sleeve: String,
    shoulder: String,
    wrist: String,
    chest: String,
    inseam: String
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model("Customer", customerSchema)