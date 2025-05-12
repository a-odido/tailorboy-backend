const mongoose = require("mongoose")

const deliverySchema = new mongoose.Schema({
  customerId: String,
  designId: String,
  comment: String
}, { _id: false })

const scheduleSchema = new mongoose.Schema({
  date: { type: String, required: true },
  userId: { type: String, required: true },
  deliveries: [deliverySchema]
})

module.exports = mongoose.model("Schedule", scheduleSchema)