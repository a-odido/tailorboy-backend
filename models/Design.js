const mongoose = require("mongoose")

const designSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  userId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Design", designSchema)